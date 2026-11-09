
import 'leafthrough/element'
import type { LeafThroughElement } from 'leafthrough/element'
import type { LeafThroughOptions } from 'leafthrough'
import { createDevPanel } from './panel'
import './style.css'

// ====================================================
// THE MAHI LAB — 3D MAGAZINE NAVIGATION
// ====================================================

const stage = document.getElementById('reader-mount')!

let element: LeafThroughElement | null = null

// ====================================================
// ACTUAL MAHI LAB PAGE MAPPING
// Based on the seven-page demo/pages.ts (zero-based indices)
// ====================================================

const SECTION_TARGETS: Record<string, number> = {
  home: 0,       // mahi-01.png
  topics: 1,     // mahi-02.png
  services: 2,   // mahi-03.png
  learning: 3,   // mahi-04.png
  cloud: 4,      // mahi-05.png
  posts: 5,      // mahi-06.png
  follow: 6,     // mahi-07.png
}

// Exactly seven magazine pages, one per navbar section.
const SECTION_BY_PAGE: Record<number, string> = {
  0: 'home',       // 01 - Home
  1: 'topics',     // 02 - Topics
  2: 'services',   // 03 - Freelancing Services
  3: 'learning',   // 04 - How to Learn
  4: 'cloud',      // 05 - Cloud & Tools (Ginger Drafts + Ask Bun)
  5: 'posts',      // 06 - Latest Posts
  6: 'follow',     // 07 - Follow Us
}

// ====================================================
// NAVBAR LINKS
// ====================================================

const menuLinks = Array.from(
  document.querySelectorAll<HTMLAnchorElement>(
    'header a[data-target-page]'
  )
)

const navLinks = menuLinks.filter(
  (link) => link.closest('nav') !== null
)

// Synchronize HTML targets with actual magazine pages.
menuLinks.forEach((link) => {
  const section = link.getAttribute('href')?.replace(/^#/, '')

  if (section && section in SECTION_TARGETS) {
    link.dataset.targetPage = String(
      SECTION_TARGETS[section]
    )
  }
})

// Tracks the user's selected section.
// Keeps the selected navbar link highlighted during animated page turns.
let requestedPage: number | null = null
let navigationPending = false

function clearNavigationRequest() {
  requestedPage = null
  navigationPending = false
}

// ====================================================
// VALIDATE PAGE NUMBER
// ====================================================

function getTargetPage(
  link: HTMLAnchorElement
): number | null {
  const value = link.dataset.targetPage

  if (!value || value.trim() === '') {
    return null
  }

  const page = Number(value)

  return Number.isInteger(page) && page >= 0
    ? page
    : null
}

// ====================================================
// ACTIVE NAVBAR HIGHLIGHT
// ====================================================

function setActiveNav(
  activeLink: HTMLAnchorElement | null
) {
  navLinks.forEach((link) => {
    if (link === activeLink) {
      link.setAttribute('aria-current', 'page')
    } else {
      link.removeAttribute('aria-current')
    }
  })
}

function findSectionLink(section: string) {
  return navLinks.find(
    (link) =>
      link.getAttribute('href') === `#${section}`
  ) ?? null
}

// ====================================================
// SYNC NAVBAR WITH MAGAZINE PAGE
// ====================================================

function updateActiveNav() {
  const el = element

  if (!el?.instance) return

  const visiblePages = el.instance.visiblePages

  // Preserve the clicked navbar section while
  // the magazine is turning toward its destination.
  if (requestedPage !== null) {
    const selectedLink = navLinks.find(
      (link) =>
        getTargetPage(link) === requestedPage
    ) ?? null

    // Target is visible, even if it is the
    // right-hand page of a desktop spread.
    if (visiblePages.includes(requestedPage)) {
      navigationPending = false
      setActiveNav(selectedLink)
      return
    }

    // Keep the selected navbar highlighted
    // during intermediate animated page turns.
    if (navigationPending) {
      return
    }

    // The user has turned away from the selected
    // spread. Resume automatic section detection.
    requestedPage = null
  }

  // LeafThrough.page is the first visible page.
  const currentPage = el.page

  const section =
    SECTION_BY_PAGE[currentPage] ?? 'home'

  setActiveNav(findSectionLink(section))
}

// ====================================================
// PAGE MAPPING DIAGNOSTICS
// ====================================================

function printPageMapping(options: LeafThroughOptions) {
  console.info(
    'THE MAHI LAB — Actual magazine page mapping'
  )

  if (options.pages.length !== 7) {
    console.warn(`Mahi Lab: Expected 7 pages, received ${options.pages.length}. Check demo/pages.ts and panel options.`)
  }

  console.table(
    options.pages.map((source, index) => {
      let image = 'Embedded / Texture'

      if (typeof source === 'string') {
        image = source
      } else if (
        source !== null &&
        typeof source === 'object' &&
        'src' in source
      ) {
        image = String(source.src)
      }

      return {
        'Page Number': index + 1,
        'Target Index': index,
        'Image Source': image,
        'Section': SECTION_BY_PAGE[index] ?? 'Other',
      }
    })
  )

  console.info(
    'THE MAHI LAB — Navbar destinations'
  )

  console.table(
    navLinks.map((link) => ({
      Section: link.textContent?.trim() ?? '',
      'Target Index': getTargetPage(link),
      'Magazine Page':
        (getTargetPage(link) ?? -1) + 1,
    }))
  )
}

// ====================================================
// CREATE / REMOUNT LEAFTHROUGH
// ====================================================

function create(options: LeafThroughOptions) {
  element?.remove()

  clearNavigationRequest()

  const el = document.createElement('leaf-through')

  element = el
  el.className = 'magazine'
  el.options = options

  // Page changes
  el.addEventListener('pagechange', (event) => {
    panel.event('pagechange', event.detail)

    updateActiveNav()
  })

  // Magazine ready
  el.addEventListener('ready', () => {
    panel.event('ready')

    updateActiveNav()
  })

  // Page loaded
  el.addEventListener('pageload', (event) => {
    panel.event('pageload', event.detail)
  })

  // Page loading error
  el.addEventListener('pageerror', (event) => {
    panel.event('pageerror', {
      message: String(event.detail.error),
      page: event.detail.page,
    })
  })

  stage.append(el)

  printPageMapping(options)
}

// ====================================================
// ORIGINAL DEVELOPMENT PANEL — PRESERVED
// ====================================================

const panel = createDevPanel(
  document.getElementById('panel')!,
  {
    apply: (options) => {
      if (element) {
        clearNavigationRequest()
        element.options = options
      }
    },

    remount: create,

    handle: () => {
      const el = element

      if (!el?.instance) return null

      return {
        next: () => {
          clearNavigationRequest()
          return el.next()
        },

        prev: () => {
          clearNavigationRequest()
          return el.prev()
        },

        goTo: (page, options) => {
          clearNavigationRequest()
          return el.goTo(page, options)
        },

        get page() {
          return el.page
        },

        get pageCount() {
          return el.pageCount
        },

        get layout() {
          return el.layout
        },

        get visiblePages() {
          return el.instance?.visiblePages ?? []
        },

        get turning() {
          return el.instance?.turning ?? false
        },
      }
    },
  }
)

// ====================================================
// NAVBAR — AUTOMATIC ANIMATED PAGE TURNING
// ====================================================

menuLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()

    const el = element

    if (!el?.instance) {
      console.warn(
        'Mahi Lab: Magazine is not ready.'
      )
      return
    }

    const targetPage = getTargetPage(link)

    if (
      targetPage === null ||
      targetPage >= el.pageCount
    ) {
      console.warn(
        'Mahi Lab: Invalid page target.',
        {
          section: link.textContent?.trim(),
          targetPage,
          pageCount: el.pageCount,
        }
      )
      return
    }

    const section =
      link.getAttribute('href')?.replace(/^#/, '') ??
      'home'

    const selectedLink = findSectionLink(section)

    // Remember the section chosen by the user.
    requestedPage = targetPage
    navigationPending = true

    // Highlight immediately on click.
    setActiveNav(selectedLink)

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    console.info(
      `Mahi Lab: ${section} — Opening page ${targetPage + 1}`
    )

    // Use the LeafThrough page-flip engine.
    el.goTo(targetPage, {
      animate: !reducedMotion,
    })

    // If destination is already visible,
    // the book does not need to turn.
    if (
      el.instance.visiblePages.includes(targetPage)
    ) {
      navigationPending = false
      updateActiveNav()
    } else if (reducedMotion) {
      navigationPending = false
      updateActiveNav()
    }
  })
})

// ====================================================
// INITIALIZE THE MAHI LAB MAGAZINE
// ====================================================

create(panel.options())
