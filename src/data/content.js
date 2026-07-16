// ─────────────────────────────────────────────────────────────
// Content merged from Saqib_Khan_CV.pdf + github.com/SAQIBKHAN1020
// + linkedin.com/in/saqib1-khan- — edit freely.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Saqib Khan',
  firstName: 'Saqib',
  lastName: 'Khan',
  role: 'AI & Data Science Developer',
  roleWords: ['AI Developer', 'Data Scientist', 'ML Engineer', 'Python Dev'],
  tagline:
    'Aspiring AI & Data Science Developer — hands-on with Python, Machine Learning and NLP. 3+ end-to-end AI/ML apps deployed with up to 90%+ model accuracy.',
  location: 'Karachi, Pakistan',
  email: 'iamsaqibkhan.edu@gmail.com',
  phone: '+92 343 2048645',
  github: 'https://github.com/SAQIBKHAN1020',
  linkedin: 'https://www.linkedin.com/in/saqib1-khan-',
  resumeUrl: '/Saqib_Khan_CV.pdf', // lives in public/
  resumeFileName: 'Saqib_Khan_CV.pdf', // name the browser saves it as
}

export const about = {
  heading: 'Turning data into\nintelligent decisions.',
  paragraphs: [
    'I’m an AI & Data Science developer trained through Saylani Mass IT Training’s 1-year intensive apprenticeship — 100+ hours of practical work across Python, Data Analysis, Machine Learning and NLP.',
    'From fake-news detection at 90%+ accuracy to an AI-powered student insights dashboard — I take models out of notebooks and ship them as real, usable apps with Streamlit and FastAPI.',
  ],
  stats: [
    { value: '10+', label: 'Projects built' },
    { value: '90%', label: 'Best model accuracy' },
    { value: '100+', label: 'Hours of training' },
  ],
}

export const skills = [
  { name: 'Python', level: 92 },
  { name: 'Machine Learning · Scikit-learn', level: 86 },
  { name: 'NLP · NLTK · TF-IDF', level: 84 },
  { name: 'Deep Learning · TensorFlow / Keras', level: 76 },
  { name: 'Pandas / NumPy · Data Analysis', level: 90 },
  { name: 'Streamlit / Gradio', level: 88 },
  { name: 'FastAPI · REST APIs', level: 74 },
  { name: 'SQL · Git / GitHub', level: 78 },
]

// Experience timeline — from resume
export const experience = [
  {
    period: 'Jun 2026 — Present',
    role: 'AI & Data Science Intern',
    org: 'Industry Internship',
    points: [
      'Working on real-world AI and Machine Learning projects with industry-focused tasks.',
      'Building and deploying NLP and automation-driven AI applications using Python.',
    ],
  },
  {
    period: 'Apr 2025 — May 2026',
    role: 'AI & Data Science Apprenticeship',
    org: 'Saylani Mass IT Training (SMIT)',
    points: [
      '1-year intensive program — Python, Data Analysis, Machine Learning & NLP across 100+ hours of practical assignments.',
      'Built and deployed 3 ML applications with Streamlit and FastAPI, improving model accuracy by up to 15% through feature engineering and tuning.',
    ],
  },
  {
    period: 'Ongoing',
    role: 'Intermediate — Computer Science',
    org: 'Govt Inter Boys College Landhi-4',
    points: [
      'Building core CS foundations alongside self-driven AI & ML project work.',
    ],
  },
]

// Real repos from github.com/SAQIBKHAN1020 + resume key projects
export const projects = [
  {
    featured: true,
    title: 'AI Student Insights Dashboard',
    year: '2026',
    category: 'Featured · AI · Full-stack',
    description:
      'Intelligent Learning & Student Performance Prediction System built at SMIT — an AI-powered dashboard that predicts student academic performance and generates personalized learning recommendations.',
    highlights: [
      'ML models predicting academic performance',
      'Interactive Plotly dashboard for insights',
      'Personalized learning recommendations',
      'FastAPI backend + Streamlit frontend',
    ],
    tags: ['Python', 'Scikit-learn', 'Streamlit', 'FastAPI', 'Plotly', 'Pandas'],
    link: 'https://github.com/SAQIBKHAN1020/Student_Performance_Dashboard',
  },
  {
    title: 'Fake News Detection',
    year: '2026',
    category: 'Machine Learning · NLP',
    description:
      'NLP system classifying 5,000+ news articles as Real or Fake with 90%+ accuracy — TF-IDF features, 3+ algorithms compared.',
    tags: ['Python', 'Scikit-learn', 'NLTK', 'TF-IDF', 'Streamlit'],
    link: 'https://github.com/SAQIBKHAN1020/fake-news-detection-system',
  },
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
    title: 'Sentiment Analysis System',
    year: '2026',
    category: 'Deep Learning · NLP',
    description:
      'Deep-learning sentiment classifier at 85%+ accuracy — neural network built and trained with TensorFlow/Keras, wrapped in a Gradio app.',
    tags: ['TensorFlow', 'Keras', 'NLP', 'Gradio'],
    link: 'https://github.com/SAQIBKHAN1020/Sentiment-Analysis-Using-Given-Dataset-with-Gradio-Application',
  },
  {
    title: 'Prompt Response DB Query',
    year: '2026',
    category: 'NLP · Data',
    description:
      'Natural-language query system over a database — turning plain-English prompts into structured data answers.',
    tags: ['Python', 'NLP', 'Pandas', 'Streamlit'],
    link: 'https://github.com/SAQIBKHAN1020',
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
]

export const socials = [
  { label: 'GitHub', url: 'https://github.com/SAQIBKHAN1020' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/saqib1-khan-' },
  { label: 'Email', url: 'mailto:iamsaqibkhan.edu@gmail.com' },
]

export const nav = [
  { label: 'Home', target: '#hero' },
  { label: 'About', target: '#about' },
  { label: 'Skills', target: '#skills' },
  { label: 'Journey', target: '#journey' },
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
  'FastAPI',
  'TensorFlow',
]
