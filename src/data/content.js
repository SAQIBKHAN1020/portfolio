// Every fact here is traceable to Saqib_Khan_CV.pdf, github.com/SAQIBKHAN1020,
// or linkedin.com/in/dev-saqib1-khan. Nothing invented.

export const profile = {
  name: 'Saqib Khan',
  shortName: 'SK',
  title: 'AI Engineer',
  subtitle: 'AI Engineer & Python Developer',
  location: 'Karachi, Pakistan',
  email: 'iamsaqibkhan.edu@gmail.com',
  phone: '+92 343 2048645',
  github: 'https://github.com/SAQIBKHAN1020',
  linkedin: 'https://www.linkedin.com/in/dev-saqib1-khan',
  resumeUrl: '/Saqib_Khan_CV.pdf',
  resumeFileName: 'Saqib_Khan_CV.pdf',
  availability: 'Open to AI roles and internships',
}

export const nav = [
  { label: 'Work', target: '#work' },
  { label: 'About', target: '#about' },
  { label: 'Skills', target: '#skills' },
  { label: 'Journey', target: '#journey' },
  { label: 'Contact', target: '#contact' },
]

export const hero = {
  kicker: 'AI ENGINEER · PYTHON DEVELOPER',
  headlineLines: ['Turning', 'models into'],
  headlineAccent: 'products people use',
  intro:
    'I build end to end AI systems with Python, machine learning and NLP, then ship them as real applications using FastAPI, Streamlit and React. Based in Karachi, working with teams anywhere.',
  // Set this to a real video URL to turn the Watch intro button into a
  // player link. While it is null the button scrolls to the About section.
  introUrl: null,
  stats: [
    { value: 90, suffix: '%+', label: 'Model accuracy', hint: 'Fake News Detection', icon: 'target' },
    { value: 4, suffix: '', label: 'Products shipped', hint: 'AI and full stack', icon: 'stack' },
    { value: 100, suffix: '+', label: 'Training hours', hint: 'Practical assignments', icon: 'clock' },
    { value: 13, suffix: ' mo', label: 'AI apprenticeship', hint: 'Saylani Mass IT', icon: 'badge' },
  ],
  // Two non-numeric facts that close out the stats panel
  facts: [
    { icon: 'pin', title: 'Karachi, Pakistan', text: 'Available remote or onsite' },
    { icon: 'calendar', title: 'Open to opportunities', text: 'Internships and full time' },
  ],
  // Floating glass cards down the right edge of the portrait
  focus: [
    { icon: 'brain', label: 'AI / ML' },
    { icon: 'python', label: 'Python', brand: true },
    { icon: 'code', label: 'Web Development' },
    { icon: 'chart', label: 'Data Analysis' },
    { icon: 'stack', label: 'Real Projects' },
  ],
}

// Three flagship builds get the full card. Everything else uses the compact
// card so the section stays short.
export const projects = [
  {
    id: 'sit-interviewer',
    number: '01',
    title: 'SIT Interviewer',
    eyebrow: 'AI · Interview Intelligence',
    summary: 'AI powered interview platform',
    description:
      'An interview platform that runs structured AI interviews end to end: proctored sessions, a live coding sandbox, recorded answers, and an admin dashboard that scores and compares candidates.',
    features: ['AI proctoring', 'Live coding sandbox', 'Video and audio capture', 'Admin analytics'],
    tags: ['React', 'Supabase', 'AI', 'WebRTC'],
    image: '/images/sit-interviewer.webp',
    imageAlt: 'SIT Interviewer dashboard showing interview activity and candidate status',
    accent: '#2563EB',
    access: 'private',
    featured: true,
  },
  {
    id: 'qistly',
    number: '02',
    title: 'Qistly',
    eyebrow: 'Fintech · Commerce',
    summary: 'Installment shopping platform',
    description:
      'A shop now pay later platform with a web dashboard and a mobile app. Monthly plans, delivery tracking, and secure checkout are built around one clear idea: the customer should always know what they owe.',
    features: ['Flexible installment plans', 'Web and mobile app', 'Secure payments', 'Order tracking'],
    tags: ['Next.js', 'React Native', 'Supabase', 'Fintech'],
    image: '/images/qistly.webp',
    imageAlt: 'Qistly installment shopping platform shown on desktop and mobile',
    accent: '#16A34A',
    access: 'private',
    featured: true,
    reverse: true,
  },
  {
    id: 'prompt-response',
    number: '03',
    title: 'Prompt Response',
    eyebrow: 'LLM · Knowledge Systems',
    summary: 'Natural language database query engine',
    description:
      'A query engine that turns plain English questions into MongoDB filters and returns live results as tables, KPI cards, and charts. When an answer is not in the database, a scraping layer pulls it from the official site.',
    features: [
      'Plain English to MongoDB filters',
      'Groq Llama 3.3 with key rotation',
      'Rule based fallback parsing',
      'Live web scraping layer',
    ],
    tags: ['Python', 'FastAPI', 'MongoDB', 'Groq LLM', 'Gemini'],
    image: '/images/prompt-response.webp',
    imageAlt: 'Prompt Response AI portal answering questions about courses and admissions',
    accent: '#1D4ED8',
    access: 'private',
    featured: true,
  },
]

// Compact cards. Descriptions come from the resume, the public repos, or the
// project's own banner, never from guesswork.
export const moreProjects = [
  {
    id: 'student-performance',
    title: 'Student Performance',
    eyebrow: 'Predictive Analytics',
    description:
      'Predicts student academic performance and flags at risk students early, with personalized learning recommendations.',
    tags: ['Python', 'Scikit-learn', 'Streamlit'],
    image: '/images/student-performance.webp',
    imageAlt: 'Student Performance dashboard with grade distribution and at risk students',
    accent: '#4F46E5',
    access: 'public',
    github: 'https://github.com/SAQIBKHAN1020/Student_Performance_Dashboard',
  },
  {
    id: 'resume-analyzer',
    title: 'AI Resume Analyzer',
    eyebrow: 'NLP · Career Tools',
    description:
      'Scores a resume and returns actionable feedback: skills match, experience signal, and ATS compatibility.',
    tags: ['Python', 'NLP', 'Streamlit', 'FastAPI'],
    image: '/images/resume-analyzer.webp',
    imageAlt: 'AI Resume Analyzer showing an overall score and key insights',
    accent: '#6D3EF0',
    access: 'public',
    github: 'https://github.com/SAQIBKHAN1020/AI-Resume-Analyzer',
  },
  {
    id: 'fake-news',
    title: 'Fake News Detection',
    eyebrow: 'Machine Learning · NLP',
    description:
      'Classifies news articles as real or fake using TF-IDF features, with over 90% accuracy across the test set.',
    tags: ['Python', 'Scikit-learn', 'NLTK', 'TF-IDF'],
    image: '/images/fake-news.webp',
    imageAlt: 'Fake News Detection app showing a prediction with a confidence score',
    accent: '#2563EB',
    access: 'public',
    github: 'https://github.com/SAQIBKHAN1020/fake-news-detection-system',
  },
  {
    id: 'scentora',
    title: 'Scentora',
    eyebrow: 'E-commerce · Web + Mobile',
    description:
      'A fragrance storefront with a curated catalogue, category browsing, and personalized recommendations across web and mobile.',
    tags: ['Web app', 'Mobile app', 'E-commerce'],
    image: '/images/scentora.webp',
    imageAlt: 'Scentora perfume platform shown on desktop and mobile',
    accent: '#B08D4F',
    access: 'private',
  },
  {
    id: 'karim-store',
    title: 'Karim General Store',
    eyebrow: 'E-commerce · Web + Mobile',
    description:
      'Brings a neighbourhood grocery online: category browsing, cart and orders, and local delivery on web and mobile.',
    tags: ['Web app', 'Mobile app', 'E-commerce'],
    image: '/images/karim-store.webp',
    imageAlt: 'Karim General Store grocery platform on desktop and mobile',
    accent: '#16A34A',
    access: 'private',
  },
  {
    id: 'nextarift',
    title: 'Nextarift',
    eyebrow: 'Product · Landing Page',
    description:
      'A launch page for an action adventure game: feature highlights, platform lineup, and an email capture for release news.',
    tags: ['Landing page', 'Product design'],
    image: '/images/nextarift.webp',
    imageAlt: 'Nextarift game launch page with a coming soon message',
    accent: '#8B5CF6',
    access: 'private',
  },
  {
    id: 'portfolio-site',
    title: 'This Portfolio',
    eyebrow: 'Front end · Design',
    description:
      'The site you are reading. Built from scratch in React with no UI framework, a light and dark theme, and hand written animation.',
    tags: ['React', 'Vite', 'CSS'],
    image: '/images/portfolio-site.webp',
    imageAlt: 'Saqib Khan portfolio shown on a laptop and a phone',
    accent: '#0EA5E9',
    access: 'public',
    github: 'https://github.com/SAQIBKHAN1020/portfolio',
    live: 'https://saqib-khan.vercel.app',
  },
]

export const about = {
  headline: 'I care about the part after the model works.',
  paragraphs: [
    'I am Saqib, an AI engineer from Karachi. Most of my work starts in a notebook and does not stop there. Training a model is the easy half. The real work is turning it into something a teacher, a recruiter, or a shopper can open and immediately understand.',
    'I trained through a 13 month AI and Data Science apprenticeship at Saylani Mass IT Training and now work there as an intern on production AI projects. My comfort zone is Python, machine learning, and NLP, extended by FastAPI, Streamlit, React, and Supabase when a model needs a front door.',
  ],
  highlights: [
    { title: 'Applied AI', text: 'NLP, classification, and prediction systems trained, tuned, and deployed.' },
    { title: 'Full stack delivery', text: 'FastAPI and React apps that put a model in front of real users.' },
    { title: 'Data first', text: 'Careful preprocessing and evaluation before a single chart gets drawn.' },
  ],
  facts: [
    { icon: 'pin', label: 'Based in', value: 'Karachi, Pakistan' },
    { icon: 'badge', label: 'Training', value: 'AI & Data Science, SMIT' },
    { icon: 'calendar', label: 'Status', value: 'Open to opportunities' },
  ],
  quote: {
    text: 'Consistent effort creates extraordinary results.',
    author: 'Saqib Khan',
  },
}

// Grouped exactly as the resume lists them.
export const skillGroups = [
  {
    title: 'Programming & Databases',
    marks: ['python', 'postgresql', 'mongodb', 'supabase'],
    items: ['Python', 'SQL', 'PostgreSQL', 'MongoDB', 'Supabase'],
  },
  {
    title: 'Machine Learning & NLP',
    marks: ['scikitlearn', 'python'],
    items: ['Scikit-learn', 'Model Training', 'Model Evaluation', 'NLTK', 'TF-IDF', 'Text Preprocessing'],
  },
  {
    title: 'Data Analysis',
    marks: ['pandas', 'numpy', 'plotly'],
    items: ['Pandas', 'NumPy', 'Data Cleaning', 'Data Visualization'],
  },
  {
    title: 'Web & Deployment',
    marks: ['fastapi', 'streamlit', 'react'],
    items: ['FastAPI', 'Streamlit', 'React', 'REST API'],
  },
  {
    title: 'Tools',
    marks: ['git', 'github', 'jupyter'],
    items: ['Jupyter Notebook', 'VS Code', 'Git', 'GitHub'],
  },
]

// Brand marks for the marquee strip under the hero.
export const techStrip = [
  'python',
  'fastapi',
  'scikitlearn',
  'pandas',
  'numpy',
  'streamlit',
  'react',
  'mongodb',
  'postgresql',
  'supabase',
  'nextdotjs',
  'plotly',
  'jupyter',
  'git',
]

export const journey = {
  experience: [
    {
      period: 'Jun 2026 - Present',
      role: 'AI & Data Science Intern',
      org: 'Saylani Mass IT Training (SMIT)',
      points: [
        'Working on real world AI and machine learning projects and industry focused tasks.',
        'Building and deploying NLP and automation driven AI applications using Python.',
      ],
      current: true,
    },
    {
      period: 'Apr 2025 - May 2026 · 13 months',
      role: 'AI & Data Science Apprenticeship',
      org: 'Saylani Mass IT Training (SMIT)',
      points: [
        'Completed an intensive program covering Python, data analysis, machine learning, and NLP across 100+ hours of practical assignments.',
        'Built and deployed 3 ML applications with Streamlit and FastAPI, improving model accuracy by up to 15% through feature engineering and tuning.',
      ],
    },
  ],
  education: [
    {
      period: 'Completed 2026',
      role: 'Artificial Intelligence & Data Science Course',
      org: 'Saylani Mass IT Training (SMIT)',
      points: [
        'One year certification covering Python, data science, machine learning, and AI.',
        'Assessed through practical assignments and real world project work.',
      ],
      credential: true,
    },
    {
      period: 'Ongoing',
      role: 'Intermediate, Computer Science',
      org: 'Govt. Inter Boys College, Landhi-4',
      points: ['Building computer science foundations alongside independent product work.'],
    },
  ],
}

// Right-hand visual for the Journey section. Every figure traces to the CV.
export const progress = {
  ring: { value: 13, unit: 'months', caption: 'AI & Data Science apprenticeship, completed at SMIT' },
  tracks: [
    { label: 'AI & Data Science apprenticeship', state: 'Completed', done: true },
    { label: 'AI & Data Science internship', state: 'In progress', current: true },
    { label: 'Intermediate, Computer Science', state: 'Ongoing', current: true },
  ],
  notes: [
    { value: '100+', label: 'Practical hours' },
    { value: '3', label: 'ML apps deployed' },
    { value: '15%', label: 'Accuracy gained by tuning' },
  ],
}

export const contact = {
  eyebrow: 'Get in touch',
  headlineTop: 'Let us build',
  headlineMid: 'something amazing',
  headlineAccent: 'together',
  text: 'Have a role in mind, a project, or just want to say hi? I am open to AI engineering roles, internships, and collaborative builds, and I reply to every genuine message.',
  // Three promises, each one something I actually control
  promises: [
    { icon: 'bolt', title: 'Quick response', text: 'Usually within 24 hours' },
    { icon: 'stack', title: 'Open to collaborate', text: 'Roles and projects' },
    { icon: 'target', title: 'Clear scope first', text: 'Goals agreed up front' },
  ],
}
