import type { PageDescriptor } from "leafthrough";

// Mahi Lab — The Modern Startup
// Seven single-page magazine images, one for each navigation section.
// Visible magazine lettering is part of each PNG; `text` provides an accessible transcript.
const page = (file: string, alt: string, text: string): PageDescriptor => ({
  src: new URL(`./assets/magazine/${file}`, import.meta.url).href,
  alt,
  text,
});

export const demoPages: PageDescriptor[] = [
  // 01 — HOME
  page(
    "mahi-01.png",
    "Mahi Lab — The Modern Startup, home and introduction",
    `MAHI LAB — THE MODERN STARTUP

Learn. Build. Create. Grow.

Mahi Lab makes modern technology easier to understand and more accessible. We bring together free, beginner-friendly tech education, useful digital products, and practical freelancing services.

Our mission is to help students, freshers, creators, and curious learners gain skills, build real projects, and use helpful digital tools.

EXPLORE MAHI LAB
Topics • Freelancing Services • How to Learn • Cloud & Tools • Latest Posts • Follow Us

OUR FREE PRODUCTS
Ginger Drafts — ATS-friendly resume builder.
Ask Bun — Technical learning and interview Q&A hub.

Technology made simple. Ideas brought to life.`,
  ),

  // 02 — TOPICS
  page(
    "mahi-02.png",
    "Mahi Lab — Technology topics, coding, AI, cloud and cybersecurity",
    `TOPICS — WHAT YOU CAN LEARN

Clear explanations, practical examples, and beginner-friendly learning.

PROGRAMMING
Java, Python, C++, SQL, Data Structures and Algorithms (DSA), coding fundamentals, and practice questions.

ARTIFICIAL INTELLIGENCE
AI, Generative AI, Large Language Models (LLMs), AI applications, and automation concepts.

CLOUD & DEVOPS
AWS, cloud fundamentals, Linux, Git, GitHub, Docker, Kubernetes, CI/CD, Jenkins, and Terraform.

WEB DEVELOPMENT
HTML, CSS, JavaScript, React, backend development, APIs, databases, and full-stack projects.

CYBERSECURITY
Online safety, security fundamentals, and essential cybersecurity concepts.

CAREER PREPARATION
Practical projects, technical interview questions, and job-ready skills.`,
  ),

  // 03 — FREELANCING SERVICES
  page(
    "mahi-03.png",
    "Mahi Lab — Website development, deployment, reels, motion graphics and AI chatbot services",
    `FREELANCING SERVICES

From idea to digital experience.

Mahi Lab helps individuals, creators, startups, and businesses build, improve, and launch digital work.

01 — FULL-STACK DEVELOPMENT
Web applications with modern frontend and backend technologies.

02 — MODERN WEBSITE DEVELOPMENT
Responsive, professional websites and interactive experiences.

03 — BUG FIXING & DEPLOYMENT
Troubleshooting, improvements, hosting, and website launches.

04 — REELS EDITING
Short-form video editing for Instagram and YouTube Shorts.

05 — MOTION GRAPHICS
Animated visuals, graphics, and engaging digital presentations.

06 — AI CHATBOT DEVELOPMENT
Conversational features and AI-powered chatbot experiences.

07 — TECH CONTENT CREATION
Ideas, educational content planning, and technology-focused posts.

Share your project idea and connect with Mahi Lab.`,
  ),

  // 04 — HOW TO LEARN
  page(
    "mahi-04.png",
    "Mahi Lab — Free beginner-friendly technology learning roadmap",
    `HOW TO LEARN

Start simple. Practice often. Build confidently.

01 — START WITH THE BASICS
Choose a topic and understand its core ideas through simple Telugu-English explanations and educational notes.

02 — LEARN STEP BY STEP
Explore Instagram classes, short tutorials, coding examples, and clear concept breakdowns.

03 — PRACTICE
Try coding exercises, technical questions, SQL queries, and small hands-on tasks.

04 — BUILD REAL PROJECTS
Apply your learning to websites, applications, automation, cloud, and DevOps workflows.

05 — PREPARE FOR OPPORTUNITIES
Create a portfolio, practice interview questions, and build an ATS-friendly resume with Ginger Drafts.

06 — KEEP GROWING
Follow new Mahi Lab posts, revisit concepts, and keep improving your skills.

Free learning resources for students, freshers, and beginners.`,
  ),

  // 05 — CLOUD & TOOLS + BOTH PRODUCTS
  page(
    "mahi-05.png",
    "Mahi Lab — Cloud and development tools, Ginger Drafts and Ask Bun",
    `CLOUD & TOOLS

Learn the tools. Use the tools. Build something useful.

CLOUD & DEVOPS
Explore AWS, Linux, Git, GitHub, Docker, Kubernetes, Jenkins, Terraform, CI/CD, hosting, and deployment.

DEVELOPMENT & AI
Learn programming tools, APIs, databases, full-stack workflows, AI concepts, and chatbot development.

FREE PRODUCT 01 — GINGER DRAFTS
A free ATS-friendly resume builder for students, freshers, and job seekers. Choose professional templates, add your experience, and prepare resumes for applications.

Website: https://gingerdrafts.mahilab.in/

FREE PRODUCT 02 — ASK BUN
A free technical learning and interview Q&A hub covering Java, Python, C++, SQL, and Data Structures and Algorithms (DSA).

Website: https://askbun.mahilab.in/

Two free products. One goal: make learning and career tools accessible.`,
  ),

  // 06 — LATEST POSTS
  page(
    "mahi-06.png",
    "Mahi Lab — Latest Instagram technology posts, tutorials and classes",
    `LATEST POSTS

Fresh ideas. Simple explanations. Practical learning.

Mahi Lab shares free technology-related educational content and classes on Instagram, with a focus on helping beginners understand concepts step by step.

WHAT WE SHARE
• Programming notes, Java examples, Python, C++, SQL, and DSA.
• Artificial Intelligence, Generative AI, and LLM explainers.
• Linux, DevOps, cloud computing, and development tools.
• Full-stack development and cybersecurity fundamentals.
• Coding exercises, practical projects, and interview preparation.
• Short educational reels, diagrams, and learning updates.

HOW TO USE OUR POSTS
Read the explanation, try the example, save useful notes, and practice what you learn.

Visit Mahi Lab on Instagram for current posts and classes.

Learn something new. Build something useful.`,
  ),

  // 07 — FOLLOW US
  page(
    "mahi-07.png",
    "Mahi Lab — Follow our community, free products and freelancing services",
    `FOLLOW US

Thank you for visiting Mahi Lab — The Modern Startup.

We are building a place where technology education, useful free products, and creative digital services come together.

LEARN WITH US
Follow our Instagram technology posts, classes, tutorials, and beginner-friendly learning resources.

EXPLORE OUR FREE PRODUCTS
Ginger Drafts — https://gingerdrafts.mahilab.in/
Ask Bun — https://askbun.mahilab.in/

WORK WITH MAHI LAB
Connect for full-stack development, modern websites, bug fixing, deployment, reels editing, motion graphics, AI chatbots, and tech content ideas.

STAY CONNECTED
Instagram: https://www.instagram.com/mahilab.in/
Website: https://www.mahilab.in/

Learn. Build. Create. Grow.

© 2026 Mahi Lab. All rights reserved.`,
  ),
];
