export const profile = {
  name: 'Saqib Khan',
  shortName: 'SK',
  location: 'Karachi, Pakistan',
  email: 'iamsaqibkhan.edu@gmail.com',
  github: 'https://github.com/SAQIBKHAN1020',
  linkedin: 'https://www.linkedin.com/in/dev-saqib1-khan',
  resumeUrl: '/Saqib_Khan_CV.pdf',
  resumeFileName: 'Saqib_Khan_CV.pdf',
}

export const nav = [
  { label: 'About', target: '#about' },
  { label: 'Work', target: '#work' },
  { label: 'Skills', target: '#skills' },
  { label: 'Contact', target: '#contact' },
]

export const projects = [
  {
    number: '01',
    title: 'SIT Interviewer',
    eyebrow: 'AI · Interview Intelligence',
    description:
      'An AI-powered interview practice platform designed around realistic conversations, coding rounds, structured evaluation, and clear feedback.',
    outcome: 'A focused practice flow that brings interview preparation, progress, and feedback into one product.',
    tags: ['React', 'Supabase', 'AI', 'Web'],
    image: '/images/sit-interviewer-demo.jpg',
    imageAlt: 'Temporary concept interface for the SIT Interviewer project',
    featured: true,
  },
  {
    number: '02',
    title: 'Prompt Response System',
    eyebrow: 'AI · Knowledge Systems',
    description:
      'A question-answering system built to generate relevant responses from custom data, with source context and a clean workspace for ongoing queries.',
    outcome: 'Turns scattered source material into a faster, more useful way to find accurate answers.',
    tags: ['Python', 'FastAPI', 'AI', 'NLP'],
    image: '/images/prompt-response-demo.jpg',
    imageAlt: 'Temporary concept interface for the Prompt Response System project',
  },
  {
    number: '03',
    title: 'Qistly',
    eyebrow: 'Fintech · Commerce',
    description:
      'An installment-based shopping experience that makes payment plans easy to understand across a responsive web dashboard and mobile flow.',
    outcome: 'A clearer shopping journey built around transparent schedules and simple installment choices.',
    tags: ['Next.js', 'React Native', 'Supabase', 'Fintech'],
    image: '/images/qistly-demo.jpg',
    imageAlt: 'Temporary concept interface for the Qistly installment platform',
  },
  {
    number: '04',
    title: 'Student Performance',
    eyebrow: 'Predictive Analytics · Data',
    description:
      'An interactive dashboard that turns student inputs into a performance prediction and presents the result in a focused, accessible interface.',
    outcome: 'A usable bridge between a trained model and everyday academic decisions.',
    tags: ['Python', 'Pandas', 'Streamlit', 'ML'],
    image: '/images/student-performance-demo.jpg',
    imageAlt: 'Temporary concept interface for the Student Performance Dashboard project',
  },
]

export const skillGroups = [
  {
    title: 'Core',
    items: ['Python', 'Machine Learning', 'Natural Language Processing', 'Data Analysis'],
  },
  {
    title: 'Build',
    items: ['FastAPI', 'Streamlit', 'Pandas', 'NumPy', 'MongoDB'],
  },
  {
    title: 'Explore',
    items: ['TensorFlow', 'Scikit-learn', 'LLM APIs', 'Plotly', 'Git'],
  },
]

export const journey = [
  {
    period: '2026 — Present',
    role: 'AI & Data Science Intern',
    org: 'Industry Internship',
    text: 'Building practical AI, machine-learning, and automation projects around real product needs.',
  },
  {
    period: '2025 — 2026',
    role: 'AI & Data Science Apprenticeship',
    org: 'Saylani Mass IT Training',
    text: 'Hands-on training across Python, data analysis, machine learning, NLP, APIs, and deployment.',
  },
  {
    period: 'Ongoing',
    role: 'Computer Science',
    org: 'Govt. Inter Boys College',
    text: 'Growing strong computer-science foundations alongside independent product work.',
  },
]
