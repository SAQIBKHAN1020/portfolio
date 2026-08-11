// ─────────────────────────────────────────────────────────────
// Content sourced from Saqib_Khan_CV_updated.pdf + github.com/SAQIBKHAN1020
// + linkedin.com/in/dev-saqib1-khan — edit freely.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Saqib Khan',
  firstName: 'Saqib',
  lastName: 'Khan',
  role: 'Aspiring AI Engineer',
  roleWords: ['AI Engineer', 'Data Scientist', 'ML Engineer', 'Python Developer'],
  tagline:
    'Aspiring AI Engineer working across Python, Machine Learning and NLP — 3+ end-to-end AI apps shipped with up to 90%+ model accuracy, from data preprocessing to real deployment.',
  location: 'Karachi, Pakistan',
  email: 'iamsaqibkhan.edu@gmail.com',
  phone: '+92 343 2048645',
  github: 'https://github.com/SAQIBKHAN1020',
  linkedin: 'https://www.linkedin.com/in/dev-saqib1-khan',
  resumeUrl: '/Saqib_Khan_CV.pdf', // lives in public/
  resumeFileName: 'Saqib_Khan_CV.pdf', // name the browser saves it as
}

export const about = {
  heading: 'Turning data into\nintelligent decisions.',
  paragraphs: [
    'I spent the last year in Saylani Mass IT Training’s AI & Data Science apprenticeship — 100+ hours of hands-on work in Python, data analysis, machine learning and NLP, not just lectures.',
    'What I actually enjoy is the last mile: taking a model that works in a notebook and turning it into something people can open in a browser and use. That’s the thread running through everything below — an LLM-powered query engine, a fake-news classifier, a student performance dashboard — all shipped, not just trained.',
  ],
  stats: [
    { value: '3+', label: 'AI apps deployed' },
    { value: '90%', label: 'Peak model accuracy' },
    { value: '100+', label: 'Hours, hands-on' },
  ],
}

export const skills = [
  { name: 'Python', level: 92 },
  { name: 'Machine Learning · Scikit-learn', level: 85 },
  { name: 'NLP · NLTK · TF-IDF', level: 82 },
  { name: 'Deep Learning · TensorFlow / Keras', level: 75 },
  { name: 'Pandas / NumPy · Data Analysis', level: 88 },
  { name: 'FastAPI · MongoDB · REST APIs', level: 78 },
  { name: 'LLM APIs · Gemini · Groq (Llama 3.3)', level: 76 },
  { name: 'Streamlit · SQL · Git', level: 84 },
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
    points: ['Core CS foundations, running alongside self-driven AI & ML project work.'],
  },
]

// Real repos from github.com/SAQIBKHAN1020 + resume key projects
export const projects = [
  {
    featured: true,
    title: 'AI-Powered Student Insights Dashboard',
    year: '2026',
    category: 'Featured · SMIT · Full-stack AI',
    description:
      'A natural-language query engine built during my SMIT apprenticeship — ask a plain-English question and it turns into MongoDB filters, then comes back as tables, KPI cards and charts. If the answer isn’t in the database, it scrapes it live from the organization’s site instead.',
    highlights: [
      'Groq (Llama 3.3) LLM with key rotation + rule-based fallback so typos and vague phrasing still resolve',
      'Google Gemini API for query understanding',
      'Live web scraping (Requests + BeautifulSoup) for data outside the database',
      'FastAPI backend, MongoDB (PyMongo), Plotly charts, Streamlit UI',
    ],
    tags: ['Python', 'FastAPI', 'MongoDB', 'Groq · Gemini', 'BeautifulSoup', 'Plotly', 'Streamlit'],
    link: 'https://github.com/SAQIBKHAN1020',
  },
  {
    title: 'Fake News Detection System',
    year: '2026',
    category: 'Machine Learning · NLP',
    description:
      'Classifies 5,000+ news articles as Real or Fake at 90%+ accuracy — TF-IDF feature extraction, with 3+ classification models trained and compared in Scikit-learn.',
    tags: ['Python', 'Scikit-learn', 'NLTK', 'TF-IDF', 'Streamlit'],
    link: 'https://github.com/SAQIBKHAN1020/fake-news-detection-system',
  },
  {
    title: 'Intelligent Student Performance Prediction',
    year: '2026',
    category: 'Machine Learning · Analytics',
    description:
      'Predicts student academic performance from historical data and surfaces it through an interactive dashboard, with personalized learning recommendations built on top of the model output.',
    tags: ['Python', 'Scikit-learn', 'FastAPI', 'Streamlit', 'Plotly'],
    link: 'https://github.com/SAQIBKHAN1020/Student_Performance_Dashboard',
  },
  {
    title: 'AI Resume Analyzer',
    year: '2026',
    category: 'NLP · Full-stack',
    description:
      'Parses resumes and surfaces actionable feedback — built end-to-end with Python, NLP and a FastAPI + Streamlit stack.',
    tags: ['Python', 'NLP', 'Streamlit', 'FastAPI'],
    link: 'https://github.com/SAQIBKHAN1020/AI-Resume-Analyzer',
  },
  {
    title: 'Sentiment Analysis System',
    year: '2026',
    category: 'Deep Learning · NLP',
    description:
      'A TensorFlow/Keras neural network classifying text as positive or negative at 85%+ accuracy, wrapped in a Gradio app for instant use.',
    tags: ['TensorFlow', 'Keras', 'NLP', 'Gradio'],
    link: 'https://github.com/SAQIBKHAN1020/Sentiment-Analysis-Using-Given-Dataset-with-Gradio-Application',
  },
  {
    title: 'Weather Classification',
    year: '2025',
    category: 'Supervised ML',
    description:
      'Supervised model predicting weather conditions — Clear, Rain, Fog, Snow — from meteorological features.',
    tags: ['Scikit-learn', 'ML', 'Data'],
    link: 'https://github.com/SAQIBKHAN1020/weather_dataset',
  },
]

export const socials = [
  { label: 'GitHub', url: 'https://github.com/SAQIBKHAN1020' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/dev-saqib1-khan' },
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
  'LLM APIs',
  'FastAPI',
  'MongoDB',
  'Streamlit',
]
