// ─────────────────────────────────────────────────────────────
// Content pulled from github.com/SAQIBKHAN1020 — edit freely.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Saqib Khan',
  firstName: 'Saqib',
  lastName: 'Khan',
  role: 'AI Developer',
  roleWords: ['AI Developer', 'Data Scientist', 'ML Engineer', 'Python Dev'],
  tagline:
    'Aspiring AI / Data Science developer — building practical machine learning, NLP and deep learning projects that solve real problems.',
  location: 'Karachi, Pakistan',
  email: 'iamsaqibkhan.edu@gmail.com',
  github: 'https://github.com/SAQIBKHAN1020',
  resumeUrl: '/Saqib_Khan_CV.pdf', // lives in public/
  resumeFileName: 'Saqib_Khan_CV.pdf', // name the browser saves it as
}

export const about = {
  heading: 'Turning data into\nintelligent decisions.',
  paragraphs: [
    'Main ek AI & Data Science developer hoon — Python, Machine Learning, NLP aur Deep Learning ke saath practical projects banata hoon jo real duniya ke masail hal karein.',
    'Resume analyzers se le kar fake-news detection aur sentiment analysis tak — har project ka maqsad hai models ko research se nikaal kar logon ke haath tak pohanchana, clean aur usable interfaces ke zariye.',
  ],
  stats: [
    { value: '10+', label: 'Projects built' },
    { value: '6+', label: 'AI / ML systems' },
    { value: '100%', label: 'Self-driven' },
  ],
}

export const skills = [
  { name: 'Python', level: 92 },
  { name: 'Machine Learning', level: 85 },
  { name: 'NLP', level: 82 },
  { name: 'Deep Learning', level: 75 },
  { name: 'Streamlit / Gradio', level: 88 },
  { name: 'Pandas / NumPy', level: 90 },
  { name: 'Scikit-learn', level: 84 },
  { name: 'FastAPI', level: 72 },
]

// Real repos from github.com/SAQIBKHAN1020
export const projects = [
  {
    title: 'AI Resume Analyzer',
    year: '2026',
    category: 'NLP · Full-stack',
    description:
      'AI-powered resume analyzer built with Python, NLP, Streamlit and FastAPI — parses resumes and surfaces actionable insights.',
    tags: ['Python', 'NLP', 'Streamlit', 'FastAPI'],
    link: 'https://github.com/SAQIBKHAN1020/AI-Resume-Analyzer',
  },
  {
    title: 'Fake News Detection',
    year: '2026',
    category: 'Machine Learning · NLP',
    description:
      'Machine learning system that classifies news as real or fake using natural language processing techniques.',
    tags: ['Python', 'ML', 'NLP'],
    link: 'https://github.com/SAQIBKHAN1020/fake-news-detection-system',
  },
  {
    title: 'Student Performance Dashboard',
    year: '2026',
    category: 'Data Viz · Analytics',
    description:
      'Interactive dashboard analysing student performance data — turning raw academic records into readable insight.',
    tags: ['Python', 'Pandas', 'Dashboard'],
    link: 'https://github.com/SAQIBKHAN1020/Student_Performance_Dashboard',
  },
  {
    title: 'Sentiment Analysis App',
    year: '2026',
    category: 'NLP · Gradio',
    description:
      'Sentiment analysis model wrapped in a Gradio application, making text-emotion classification instantly usable.',
    tags: ['NLP', 'Gradio', 'Jupyter'],
    link: 'https://github.com/SAQIBKHAN1020/Sentiment-Analysis-Using-Given-Dataset-with-Gradio-Application',
  },
  {
    title: 'Weather Classification',
    year: '2025',
    category: 'Supervised ML',
    description:
      'Supervised classification model predicting weather conditions (Clear, Rain, Fog, Snow) from meteorological features.',
    tags: ['Scikit-learn', 'ML', 'Data'],
    link: 'https://github.com/SAQIBKHAN1020/weather_dataset',
  },
  {
    title: 'Python Calculator',
    year: '2025',
    category: 'Fundamentals',
    description:
      'A clean, minimal calculator in Python supporting the core arithmetic operations — fundamentals done right.',
    tags: ['Python', 'CLI'],
    link: 'https://github.com/SAQIBKHAN1020/Python-Calculator',
  },
]

export const socials = [
  { label: 'GitHub', url: 'https://github.com/SAQIBKHAN1020' },
  { label: 'Email', url: 'mailto:iamsaqibkhan.edu@gmail.com' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/' },
]

export const nav = [
  { label: 'Home', target: '#hero' },
  { label: 'About', target: '#about' },
  { label: 'Skills', target: '#skills' },
  { label: 'Work', target: '#projects' },
  { label: 'Contact', target: '#contact' },
]

// Infinite marquee strip text
export const marquee = [
  'Machine Learning',
  'Deep Learning',
  'NLP',
  'Python',
  'Data Science',
  'Streamlit',
  'Computer Vision',
]
