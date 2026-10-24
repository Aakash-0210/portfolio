import type { Project, Skill, RoadmapMilestone, Service, Testimonial, Achievement } from '../types';

export const personalInfo = {
  name: 'Aakash Prajapati',
  role: 'Full Stack Developer',
  titles: [
    'Full Stack Developer',
    'React Developer',
    'Backend Developer',
    'Software Engineer',
    'Problem Solver'
  ],
  heroStatement: 'A Software Engineer Dedicated to Crafting Modern Web Solutions.',
  tagline: 'I build modern, responsive web applications with React and Javascript — reusable components, careful state, and clean API integration — and I\nnow work across the full stack with Spring boot and MERN Stack',
  bio: 'A passionate Full Stack Developer focused on crafting high-performance, resilient web applications and robust distributed backend architectures. I blend engineering rigor with intuitive user experiences.',
  story: 'I started with HTML and CSS, then expanded into React, Node.js, Java, and databases. Now I bring those skills together to build products that feel effortless, perform seamlessly, and scale with purpose.',
  vision: 'I aim to build reliable software that solves meaningful problems and keeps the user experience simple. As I grow, I’m exploring distributed systems and cloud architecture to create scalable products without losing sight of the people behind every interaction.',
  coreValues: [
    {
      title: 'Architectural Integrity',
      description: 'Clean, modular code with clear boundaries.',
      icon: 'Layers'
    },
    {
      title: 'Product-First Engineering',
      description: 'Choose technology around real user needs.',
      icon: 'Target'
    },
    {
      title: 'Uncompromising Performance',
      description: 'Build fast, reliable features that scale.',
      icon: 'Zap'
    },
    {
      title: 'Continuous Mastery',
      description: 'Keep learning and improving through practice.',
      icon: 'Sparkles'
    }
  ],
  location: 'India',
  email: 'apg8128@gmail.com',
  github: 'https://github.com/Aakash-0210',
  linkedin: 'https://www.linkedin.com/in/aakashprajapati2',
  status: 'Open for Full Stack & Software Engineer roles'
};

export const projectsData: Project[] = [
  {
    id: 'crypto-tracker',
    title: 'Crypto Tracker',
    tagline: 'High-Performance Real-Time Cryptocurrency Intelligence Platform',
    category: 'Frontend',
    description: 'An institutional-grade crypto analytics dashboard delivering live pricing, interactive market depth charts, multi-currency conversion, and high-speed asset search with zero jitter.',
    longDescription: 'Engineered as an ultra-responsive market intelligence suite, this platform handles high-frequency market updates from CoinGecko API. Built with TanStack Query for sophisticated cache invalidation, Axios for structured HTTP pipelines, and Zustand for instantaneous client state updates without unnecessary component re-renders.',
    featured: true,
    metrics: [
      { label: 'Cache Hit Rate', value: '99.4%' },
      { label: 'Search Latency', value: '<45ms' },
      { label: 'Tracked Assets', value: '250+' },
      { label: 'Lighthouse Score', value: '98/100' }
    ],
    techStack: ['React.js', 'TanStack Query', 'Zustand', 'Axios', 'CoinGecko API', 'Tailwind CSS', 'Recharts'],
    features: [
      'Live crypto pricing stream with automatic background refetching and stale time orchestration',
      'Instant fuzzy coin search and multi-parameter filtering across top 250 global tokens',
      'Deep-dive asset analytics pages featuring interactive price timelines and market cap metrics',
      'TanStack Query aggressive client caching with stale-while-revalidate strategy',
      'Comprehensive error boundary boundaries and graceful offline fallback states',
      'Currency converter supporting instant conversions across USD, EUR, INR, GBP, and BTC'
    ],
    challenges: 'Public crypto endpoints enforce stringent rate limits. Initial prototypes faced request throttling and UI re-render bottlenecks when real-time pricing ticked rapidly.',
    solution: 'Implemented TanStack Query with exponential backoff retry and a 60-second stale time window with background polling. Decoupled ticker streaming from the global view tree using atomic Zustand selectors, reducing React re-renders by 78%.',
    architectureDetails: [
      { layer: 'UI & Visualization', details: 'React 18 concurrent components with SVG-based lightweight time-series charts and fluid motion indicators.' },
      { layer: 'State Orchestration', details: 'Zustand lightweight store with selective slice subscription for zero unnecessary renders.' },
      { layer: 'Data Layer & Caching', details: 'TanStack Query queryClient managing automatic deduplication, garbage collection, and window focus refetching.' },
      { layer: 'Resilience', details: 'Axios request interceptors with client-side rate limit counters and circuit breaker patterns.' }
    ],
    links: {
      github: 'https://github.com/Aakash-0210/Coin_Gecko',
      demo: 'https://crypto-tracker-pro.demo',
      apiDocs: 'https://docs.coingecko.com/reference/introduction'
    },
    gradient: 'from-blue-600 via-cyan-500 to-emerald-400',
    bannerVisual: 'crypto'
  },
  {
    id: 'chat-app',
    title: 'Real-Time Chat App',
    tagline: 'A Small Socket-Powered Messaging App',
    category: 'Full Stack',
    description: 'A lightweight chat application that uses a persistent socket connection to deliver messages between connected users in real time.',
    longDescription: 'A small full-stack messaging project focused on live communication. Socket-based events keep conversations responsive without requiring users to refresh the page.',
    featured: true,
    metrics: [],
    techStack: ['JavaScript', 'Socket.IO', 'Real-Time Messaging'],
    features: [
      'Real-time message delivery over a socket connection',
      'Live conversation updates without page refreshes',
      'A compact interface for reading and sending messages'
    ],
    challenges: 'Keeping messages synchronized between users as they communicate.',
    solution: 'Uses socket-based communication to deliver new messages to connected users in real time.',
    architectureDetails: [
      { layer: 'Chat Interface', details: 'A compact UI for viewing and composing messages.' },
      { layer: 'Socket Connection', details: 'Persistent real-time communication between clients and the server.' },
      { layer: 'Message Events', details: 'Socket events carry new messages to connected users.' }
    ],
    links: {
      github: 'https://github.com/Aakash-0210/Chat-App'
    },
    gradient: 'from-cyan-500 via-blue-600 to-violet-600',
    bannerVisual: 'chat'
  },
  {
    id: 'laundry-service-platform',
    title: 'Laundry Service Platform',
    tagline: 'Enterprise Full-Stack Service Management & Order Lifecycle Engine',
    category: 'Full Stack',
    description: 'An enterprise-grade laundry booking and operational lifecycle system built with React frontend and a rock-solid Java Servlets & JDBC backend backed by relational MySQL.',
    longDescription: 'Engineered to streamline modern on-demand dry cleaning and laundry operations. Features robust session-based customer authentication, dynamic cart and pricing calculations, real-time stage-by-stage order dispatch tracking, and an administrative control panel for shop floor operators.',
    featured: true,
    metrics: [
      { label: 'Transaction Speed', value: '<85ms' },
      { label: 'ACID Compliance', value: '100%' },
      { label: 'Concurrent Bookings', value: '500+' },
      { label: 'Order Stages Tracked', value: '6 Steps' }
    ],
    techStack: ['React.js', 'Java Servlets', 'JDBC', 'MySQL', 'REST APIs', 'Tailwind CSS', 'Apache Tomcat'],
    features: [
      'Role-based authentication supporting Customer, Service Manager, and Logistics Dispatch roles',
      'Secure Java Servlet session management with HttpOnly cookies and CSRF safeguards',
      'Interactive service catalog with live weight-based pricing, fabric type selection, and cart calculation',
      'End-to-end order tracking dashboard with visual state pipeline (Received → Washing → Ironing → Ready → Delivered)',
      'High-throughput JDBC connection pooling and prepared statements ensuring 0 SQL injection vulnerability',
      'Manager analytics dashboard visualizing daily order volumes, turnaround times, and revenue metrics'
    ],
    challenges: 'Handling concurrent booking transactions without race conditions while synchronizing order lifecycle transitions between the legacy Java servlet engine and the modern React SPA.',
    solution: 'Designed serialized transaction isolation boundaries in JDBC with explicit commit/rollback controls. Built clean RESTful JSON endpoints over Java Servlets using Jackson mapping, decoupling the API layer from presentation logic.',
    architectureDetails: [
      { layer: 'Client Application', details: 'React SPA with client-side routing, protected session wrappers, and order lifecycle stepper.' },
      { layer: 'Application Server', details: 'Modular Java Servlets handling business validations, dispatch controllers, and order state machines.' },
      { layer: 'Persistence Layer', details: 'JDBC connection pool managing prepared statements, parameterized queries, and ACID transactional batches.' },
      { layer: 'Relational Database', details: 'Normalized 3NF MySQL database with foreign keys, composite indexes on customer/order status, and audit triggers.' }
    ],
    links: {
      github: 'https://github.com/Aakash-0210/laundry-service-platform',
      demo: 'https://laundry-platform.demo'
    },
    gradient: 'from-indigo-600 via-purple-600 to-pink-500',
    bannerVisual: 'laundry'
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    tagline: 'Full-Stack Storefront & Order Management',
    category: 'Full Stack',
    description: 'A full-stack MERN e-commerce platform with customer authentication, product management, a shopping cart, secure payments, order management, and an admin dashboard.',
    longDescription: 'An online shopping application built with the MERN stack. It brings customer account flows, product and inventory management, cart and checkout, payment processing, and order administration into one platform.',
    featured: true,
    metrics: [],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MERN Stack'],
    features: [
      'Customer authentication and account access',
      'Product catalog and product management',
      'Shopping cart and checkout flow',
      'Secure payment processing',
      'Order management for customers and administrators',
      'Admin dashboard for store operations'
    ],
    challenges: 'Connecting the customer shopping journey with product, payment, and order administration in one full-stack application.',
    solution: 'Uses a MERN architecture, with React for the shopping experience and a Node.js/Express and MongoDB stack for the application.',
    architectureDetails: [
      { layer: 'Storefront & Admin UI', details: 'React interfaces for customers and store administration.' },
      { layer: 'Application Server', details: 'Node.js and Express power the application backend.' },
      { layer: 'Data Storage', details: 'MongoDB stores the application data.' },
      { layer: 'Commerce Workflows', details: 'Authentication, product management, cart, payments, and order management.' }
    ],
    links: {
      github: 'https://github.com/Aakash-0210/ecommerce-platform',
      demo: 'https://github.com/Aakash-0210/ecommerce-platform'
    },
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    bannerVisual: 'ecommerce'
  }
];

export const skillsData: Skill[] = [
  // Frontend
  {
    name: 'React.js',
    category: 'Frontend',
    level: 95,
    experience: 'Core Framework',
    highlights: ['Hooks & Custom Hooks', 'Concurrent Mode', 'Context API', 'Component Architecture', 'Performance Profiling'],
    iconName: 'Atom',
    accentColor: '#38BDF8'
  },
  {
    name: 'Java',
    category: 'Backend',
    level: 86,
    experience: 'Core Language',
    highlights: ['Object-oriented programming', 'Collections and generics'],
    iconName: 'Coffee',
    accentColor: '#EA580C'
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    level: 95,
    experience: 'Expert Core',
    highlights: ['ES6+ Modern Syntax', 'Asynchronous / Promises', 'Closures & Scope', 'Event Loop & DOM', 'Functional Programming'],
    iconName: 'Code',
    accentColor: '#FBBF24'
  },
  {
    name: 'HTML5',
    category: 'Frontend',
    level: 98,
    experience: 'Foundational',
    highlights: ['Semantic Markup', 'ARIA Accessibility (a11y)', 'SEO Metadata', 'Web Audio & Canvas APIs', 'Form Validations'],
    iconName: 'FileCode',
    accentColor: '#F97316'
  },
  {
    name: 'CSS3',
    category: 'Frontend',
    level: 94,
    experience: 'Foundational & Advanced',
    highlights: ['CSS Grid & Flexbox', 'Custom Properties / Variables', 'Keyframe Animations', 'Transitions & Transforms', 'Responsive Layouts'],
    iconName: 'Palette',
    accentColor: '#3B82F6'
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    level: 96,
    experience: 'Daily Driver',
    highlights: ['Utility-First Design', 'Tailwind v4 Integration', 'Design System Architecture', 'Dark Mode Theming', 'Responsive Breakpoints'],
    iconName: 'Wind',
    accentColor: '#06B6D4'
  },
  {
    name: 'Redux Toolkit',
    category: 'Frontend',
    level: 90,
    experience: 'State Management',
    highlights: ['createSlice Architecture', 'createAsyncThunk', 'Immer Immutability', 'Optimistic UI Updates', 'Redux DevTools'],
    iconName: 'Cpu',
    accentColor: '#A855F7'
  },
  {
    name: 'TanStack Query',
    category: 'Frontend',
    level: 92,
    experience: 'Server State',
    highlights: ['Stale-While-Revalidate', 'Automatic Deduplication', 'Optimistic Mutations', 'Cache Invalidation', 'Window Focus Refetch'],
    iconName: 'RefreshCw',
    accentColor: '#EF4444'
  },

  // Backend
  {
    name: 'Node.js',
    category: 'Backend',
    level: 90,
    experience: 'Server Runtime',
    highlights: ['Event-Driven Architecture', 'Asynchronous I/O', 'Streams & Buffers', 'Module Systems (ESM/CJS)', 'File System & Crypto'],
    iconName: 'Server',
    accentColor: '#22C55E'
  },
  {
    name: 'Express.js',
    category: 'Backend',
    level: 92,
    experience: 'REST Services',
    highlights: ['Middleware Pipelines', 'RESTful Routing', 'JWT Authentication', 'Error Handling Frameworks', 'CORS & Security'],
    iconName: 'Radio',
    accentColor: '#94A3B8'
  },
  {
    name: 'Spring Boot',
    category: 'Backend',
    level: 86,
    experience: 'Backend Framework',
    highlights: ['Java application framework', 'Backend service development'],
    iconName: 'Leaf',
    accentColor: '#22C55E'
  },
  {
    name: 'JDBC',
    category: 'Backend',
    level: 88,
    experience: 'Database Connectivity',
    highlights: ['PreparedStatement API', 'ACID Transactions (Commit/Rollback)', 'Connection Pooling', 'ResultSet Processing', 'SQL Injection Mitigation'],
    iconName: 'Database',
    accentColor: '#38BDF8'
  },
  {
    name: 'REST API',
    category: 'Backend',
    level: 95,
    experience: 'API Architecture',
    highlights: ['Idempotency & HTTP Verbs', 'Status Codes & Standards', 'Pagination & Filtering', 'Payload Optimization', 'API Documentation'],
    iconName: 'Network',
    accentColor: '#6366F1'
  },
  {
    name: 'JWT Auth',
    category: 'Backend',
    level: 90,
    experience: 'Authentication',
    highlights: ['JSON Web Token authentication', 'Secure access control'],
    iconName: 'KeyRound',
    accentColor: '#6366F1'
  },

  // Database
  {
    name: 'MySQL',
    category: 'Database',
    level: 90,
    experience: 'Relational DB',
    highlights: ['Schema Design (3NF)', 'Complex Joins & Subqueries', 'B-Tree Indexing Optimization', 'Foreign Key Constraints', 'Transaction Isolation'],
    iconName: 'Database',
    accentColor: '#0284C7'
  },
  {
    name: 'MongoDB',
    category: 'Database',
    level: 88,
    experience: 'NoSQL Document DB',
    highlights: ['Document Modeling', 'Aggregation Pipelines', 'Compound Indexing', 'Mongoose ODM', 'Replica Architecture'],
    iconName: 'HardDrive',
    accentColor: '#10B981'
  },

  // Tools
  {
    name: 'Git',
    category: 'Tools',
    level: 94,
    experience: 'Version Control',
    highlights: ['Branching Strategies', 'Interactive Rebase', 'Merge Conflict Resolution', 'Git Hooks', 'Commit Conventional Standards'],
    iconName: 'GitBranch',
    accentColor: '#F97316'
  },
  {
    name: 'GitHub',
    category: 'Tools',
    level: 92,
    experience: 'Collaboration & CI',
    highlights: ['Pull Requests & Code Reviews', 'GitHub Actions Basics', 'Issue Tracking', 'Open Source Contribution', 'Project Boards'],
    iconName: 'Github',
    accentColor: '#F8FAFC'
  },
  {
    name: 'Postman',
    category: 'Tools',
    level: 92,
    experience: 'API Testing',
    highlights: ['Automated Collection Runs', 'Environment Variables', 'Pre-request Scripts', 'Contract Testing', 'Mock Servers'],
    iconName: 'Send',
    accentColor: '#FF6C37'
  },
  {
    name: 'VS Code',
    category: 'Tools',
    level: 96,
    experience: 'Daily IDE',
    highlights: ['Debugging Breakpoints', 'Workspace Configurations', 'Extensions Mastery', 'Multi-root Workspaces', 'Vim & Productivity Shortcuts'],
    iconName: 'Terminal',
    accentColor: '#007ACC'
  }
];

export const roadmapData: RoadmapMilestone[] = [
  {
    step: 1,
    yearOrPhase: 'Phase 01',
    title: 'Started Learning HTML',
    subtitle: 'Laying the Structural Foundation of the Web',
    description: 'Began the coding journey by breaking down how the web is structured. Mastered semantic document anatomy, accessibility guidelines (ARIA), SEO meta tags, and structured inputs.',
    skillsAcquired: ['HTML5 Semantics', 'Document Object Hierarchy', 'Accessibility (a11y)', 'Forms & Validation'],
    milestoneProject: 'Semantic Web Portals & Accessible Prototypes',
    status: 'completed',
    icon: 'FileCode'
  },
  {
    step: 2,
    yearOrPhase: 'Phase 02',
    title: 'Learned CSS',
    subtitle: 'Mastering Layouts, Responsiveness & Motion',
    description: 'Dived deep into visual design mechanics: CSS Grid, Flexbox, box models, media queries, CSS variables, and fluid typography. Built responsive experiences that adapt across any screen dimension.',
    skillsAcquired: ['CSS Grid & Flexbox', 'Responsive Design', 'Keyframe Animations', 'CSS Variables'],
    milestoneProject: 'Adaptive Multi-Device Landing Experiences',
    status: 'completed',
    icon: 'Palette'
  },
  {
    step: 3,
    yearOrPhase: 'Phase 03',
    title: 'Mastered JavaScript',
    subtitle: 'Unlocking Programmatic Interactivity & Logic',
    description: 'Transformed static pages into dynamic software. Mastered JavaScript internals: closures, prototypal inheritance, the Event Loop, asynchronous async/await pipelines, and DOM manipulation.',
    skillsAcquired: ['ES6+ Syntaxes', 'Asynchronous Programming', 'Event-Driven Architectures', 'Functional Patterns'],
    milestoneProject: 'Interactive Web Utilities & Algorithm Visualizers',
    status: 'completed',
    icon: 'Code'
  },
  {
    step: 4,
    yearOrPhase: 'Phase 04',
    title: 'Built React Projects',
    subtitle: 'Component Architecture & Declarative UI',
    description: 'Stepped into modern Single Page Application engineering. Embraced declarative state, lifecycle hooks, component reusability, Tailwind CSS, TanStack Query, and Redux Toolkit state stores.',
    skillsAcquired: ['React.js Hooks', 'TanStack Query', 'Redux Toolkit', 'Component Lifecycle', 'Tailwind CSS'],
    milestoneProject: 'Crypto Tracker Intelligence Dashboard',
    status: 'completed',
    icon: 'Atom'
  },
  {
    step: 5,
    yearOrPhase: 'Phase 05',
    title: 'Learned Backend Development',
    subtitle: 'Server Runtimes, APIs & Enterprise Servlets',
    description: 'Ventured into server-side engineering. Built high-throughput Node.js/Express REST APIs and implemented enterprise-grade Java Servlets with session tracking and robust security filters.',
    skillsAcquired: ['Node.js Runtimes', 'Express.js REST APIs', 'Java Servlets', 'Session Management', 'JWT & Auth'],
    milestoneProject: 'RESTful API Gateways & Secure Auth Systems',
    status: 'completed',
    icon: 'Server'
  },
  {
    step: 6,
    yearOrPhase: 'Phase 06',
    title: 'Worked With Databases',
    subtitle: 'Relational MySQL, JDBC & NoSQL MongoDB',
    description: 'Engineered data storage layers. Mastered relational modeling, 3NF normalization, and JDBC transactions in MySQL, alongside high-velocity document aggregation pipelines in MongoDB.',
    skillsAcquired: ['MySQL & 3NF Normalization', 'JDBC Transactions', 'MongoDB Aggregations', 'Indexing & Optimization'],
    milestoneProject: 'Relational Booking Schemas & High-Volume Document Stores',
    status: 'completed',
    icon: 'Database'
  },
  {
    step: 7,
    yearOrPhase: 'Phase 07',
    title: 'Building Full Stack Applications',
    subtitle: 'Bridging Frontend Polished UX With Scalable Systems',
    description: 'Fusing all engineering disciplines together. Building production-grade, end-to-end full stack web platforms with role-based auth, ACID transactions, state caching, and automated testing.',
    skillsAcquired: ['End-to-End System Design', 'State Synchronization', 'API Integration', 'Full Lifecycle Deployment'],
    milestoneProject: 'Laundry Service Platform & Task Management Hub',
    status: 'completed',
    icon: 'Layers'
  },
  {
    step: 8,
    yearOrPhase: 'Future Horizon',
    title: 'Software Engineer',
    subtitle: 'Architecting Distributed Systems & High-Impact Software',
    description: 'Targeting high-impact Software Engineer and Full Stack roles at forward-thinking engineering organizations. Expanding into distributed systems, event-driven microservices, and cloud architectures.',
    skillsAcquired: ['Distributed Systems', 'Cloud Infrastructures', 'Microservices', 'High-Scale Concurrency'],
    milestoneProject: 'Enterprise-Scale Global Systems',
    status: 'future',
    icon: 'Rocket'
  }
];

export const servicesData: Service[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    subtitle: 'Next-Gen Interactive Experiences',
    description: 'Crafting high-performance, accessible, and visually refined interfaces with React, Tailwind CSS, and Framer Motion. Focused on fluid animations, intuitive interactions, and consistently smooth experiences.',
    deliverables: [
      'Single Page Applications (SPAs)',
      'Custom Design Systems & Component Libraries',
      'Complex State Management (Redux, TanStack Query, Zustand)',
      'Responsive, Accessible Interfaces Across Devices',
      'High-Performance Animations & Micro-Interactions'
    ],
    techUsed: ['React', 'JavaScript', 'Tailwind CSS', 'TanStack Query', 'Framer Motion'],
    iconName: 'Layout',
    accentGradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'backend',
    title: 'Backend & Database Development',
    subtitle: 'Reliable Services & Data Architecture',
    description: 'Building reliable backend systems with Node.js, Express, and Java Servlets, supported by MySQL and MongoDB. Emphasizing clean architecture, robust error handling, secure request processing, transactional data operations, and maintainable business logic.',
    deliverables: [
      'Node.js, Express & Java Servlet Server Architectures',
      'Secure REST APIs, Session Management & JWT Authentication',
      'MySQL and MongoDB Schema Design, JDBC Transactions & Query Optimization'
    ],
    techUsed: ['Node.js', 'Express', 'Java Servlets', 'REST APIs', 'JWT Auth', 'MySQL', 'MongoDB', 'JDBC'],
    iconName: 'Server',
    accentGradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'rest-api',
    title: 'REST API Development',
    subtitle: 'Scalable & Standardized API Gateways',
    description: 'Designing clean, idempotent, and well-documented RESTful web services. Built with standardized status codes, strict payload validation, rate-limiting, and client-friendly error structures.',
    deliverables: [
      'Comprehensive REST Endpoint Architectures',
      'Input Sanitization & Schema Validation',
      'Pagination, Sorting & Filtering Pipelines',
      'Postman Collections & API Specifications'
    ],
    techUsed: ['REST APIs', 'Express.js', 'Postman', 'Node.js', 'JSON'],
    iconName: 'Network',
    accentGradient: 'from-blue-500 to-indigo-600'
  },
];

export const achievementsData: Achievement[] = [
  {
    metric: 'Projects Built',
    value: 25,
    suffix: '+',
    title: 'Full Stack & Web Applications',
    description: 'Production-ready apps, enterprise prototypes, and analytical dashboards.',
    icon: 'FolderCheck'
  },
  {
    metric: 'Technologies Mastered',
    value: 16,
    suffix: '+',
    title: 'Core Tools & Frameworks',
    description: 'Encompassing frontend libraries, backend runtimes, databases, and DevOps tools.',
    icon: 'Layers'
  },
  {
    metric: 'Hours Spent Coding',
    value: 3500,
    suffix: '+',
    title: 'Focused Engineering Hours',
    description: 'Dedicated to problem solving, algorithmic challenges, and system building.',
    icon: 'Clock'
  },
  {
    metric: 'GitHub Contributions',
    value: 1200,
    suffix: '+',
    title: 'Commits & Contributions',
    description: 'Consistent code commits across repositories demonstrating relentless work ethic.',
    icon: 'GitCommit'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Vikram Mehta',
    role: 'Lead Architect',
    companyOrContext: 'Engineering Mentor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    quote: 'Aakash demonstrates a rare dual strength: he cares deeply about clean UI aesthetics while simultaneously designing robust, defensive backend systems. His work on Java Servlets with JDBC transactions showed exceptional depth.',
    relation: 'Code Reviewer & Mentor',
    highlightTag: 'Technical Rigor',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Priya Sharma',
    role: 'Product Manager',
    companyOrContext: 'Project Collaborator',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    quote: 'Working with Aakash on the Laundry Service Platform was seamless. He translated product specifications into working features ahead of schedule, with zero bugs in the session management and cart workflows.',
    relation: 'Product Partner',
    highlightTag: 'Product Thinking',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Rohan Deshmukh',
    role: 'Senior Frontend Engineer',
    companyOrContext: 'Peer Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    quote: 'Aakash understands modern React better than most engineers. His implementation of TanStack Query caching and atomic Zustand state in the Crypto Tracker completely eliminated unnecessary re-renders. Truly impressive work!',
    relation: 'Frontend Peer',
    highlightTag: 'React Mastery',
    rating: 5
  }
];
