import { useState, useEffect, useRef } from 'react'

/* ─── Data ─── */
const LINKS = {
  linkedin: 'https://www.linkedin.com/in/nakul-chauhan-504312249/',
  instagram: 'https://instagram.com/_nakulchauhan',
  github: 'https://github.com/nakulchauhan003',
  email: 'mailto:nakulchauhan400@gmail.com',
}

const SKILLS = {
  'Languages': ['Python', 'JavaScript', 'Java', 'SQL', 'HTML5', 'CSS3'],
  'AI / ML & Data': ['TensorFlow', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Power BI'],
  'Frontend': ['React', 'Next.js', 'Angular', 'Vite', 'Tailwind CSS', 'Bootstrap'],
  'Backend & DB': ['Node.js', 'MongoDB', 'MySQL', 'PostgreSQL', 'Supabase', 'Firebase'],
  'Tools': ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Vercel'],
}

const PROJECTS = [
  { title: 'AI-Powered FinTech SaaS Platform', desc: 'Intelligent banking system with loan prediction, risk assessment, fraud detection, and SaaS-based revenue analytics using ML and explainable AI.', tags: ['Python', 'ML', 'SaaS', 'Finance'] },
  { title: 'Music Generation using Deep Learning', desc: 'Built a music generation model with RNNs and GANs to create original musical sequences, showcasing AI in creative arts.', tags: ['Python', 'RNN', 'GAN', 'Deep Learning'] },
  { title: 'Signature Verification System', desc: 'AI-based signature verification using image processing and machine learning to authenticate handwritten signatures.', tags: ['Python', 'CV', 'ML', 'Image Processing'] },
  { title: 'Stock Price Prediction (RNN)', desc: 'Developed a recurrent neural network model to forecast stock trends using historical market data.', tags: ['Python', 'RNN', 'Finance', 'Deep Learning'] },
  { title: 'Travel Buddy', desc: 'Travel planner app recommending destinations, optimizing routes, and providing AI-based suggestions from user preferences.', tags: ['React', 'AI', 'Full Stack'] },
  { title: 'COVID-19 Dashboard', desc: 'Interactive Power BI dashboard visualizing cases, recoveries, fatalities, and trends across pandemic waves.', tags: ['Power BI', 'Data Analytics'] },
  { title: 'City Hulchul (Full Stack)', desc: 'Built the complete City Hulchul website from scratch — frontend, backend, and database systems for a scalable platform.', tags: ['Full Stack', 'React', 'Node.js', 'MongoDB'] },
  { title: 'Netflix Data Analysis', desc: 'Exploratory data analysis on Netflix dataset using Python, Pandas, Matplotlib, and Seaborn to uncover content trends.', tags: ['Python', 'Pandas', 'EDA', 'Visualization'] },
]

const EXPERIENCE = [
  { role: 'Full-Stack Developer', company: 'City Hulchul', date: 'Oct 2025', desc: 'Built the first City Hulchul website from scratch as a complete full-stack platform with frontend, backend, and database systems.' },
  { role: 'Google Cloud Generative AI Intern', company: 'Google Cloud (Remote)', date: 'Sep 2024', desc: 'Learned core concepts of Generative AI using Google Cloud tools and LLMs. Completed hands-on labs and mini-projects.' },
  { role: 'AI Virtual Intern', company: 'Code Alpha (Remote)', date: 'Apr 2025', desc: 'Worked on AI projects involving model building and data preprocessing with Python and ML libraries.' },
]

const CERTS = [
  'Oracle Cloud Infrastructure AI Foundations Associate (1Z0-1122-25) - Oracle, Aug 2025',
  'Career Essentials in Generative AI - Microsoft & LinkedIn, May 2025',
  'Data Analytics Job Simulation - Deloitte Australia, May 2025',
  'Microsoft Excel for Data Analyst - Infosys, Apr 2025',
  'Power BI - ISO 9001, Jul 2025',
  'SQL Project for Beginners - Great Learning, Sep 2024',
  'Getting Started with Java - Infosys, Sep 2024',
]

const HACKATHONS = [
  { name: 'GDG Hackathon', desc: 'Built a travel planner app that recommends destinations and plans optimized routes using user preferences and AI suggestions.' },
  { name: 'MLSA Hackathon', desc: 'Designed a banking analytics solution that helps banks make financial decisions using automated AI-driven insights.' },
]

/* ─── Styles ─── */
const css = `
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#0a0a0f;--bg2:#12121a;--bg3:#1a1a2e;--bg4:#16213e;
  --text:#e0e0e0;--text2:#a0a0b0;--accent:#9850e6;--accent2:#7b2ff7;
  --gradient:linear-gradient(135deg,#9850e6,#7b2ff7,#6366f1);
  --card-border:rgba(152,80,230,0.15);
}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;line-height:1.6}
a{color:inherit;text-decoration:none}
::selection{background:var(--accent);color:#fff}
::-webkit-scrollbar{width:6px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--accent2);border-radius:3px}

.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;backdrop-filter:blur(20px);background:rgba(10,10,15,0.8);border-bottom:1px solid var(--card-border);transition:all 0.3s}
.nav.scrolled{padding:0.6rem 2rem;background:rgba(10,10,15,0.95)}
.nav-logo{font-size:1.4rem;font-weight:800;background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.nav-links{display:flex;gap:1.5rem;list-style:none}
.nav-links a{font-size:0.9rem;font-weight:500;color:var(--text2);transition:color 0.3s;position:relative}
.nav-links a:hover{color:var(--accent)}
.nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:2px;background:var(--gradient);transition:width 0.3s}
.nav-links a:hover::after{width:100%}
.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:4px}
.hamburger span{width:24px;height:2px;background:var(--text);transition:all 0.3s}
.mobile-menu{display:none;position:fixed;top:60px;left:0;right:0;background:rgba(10,10,15,0.98);backdrop-filter:blur(20px);padding:1.5rem;border-bottom:1px solid var(--card-border);z-index:99}
.mobile-menu.open{display:flex;flex-direction:column;gap:1rem}
.mobile-menu a{font-size:1.1rem;color:var(--text2);padding:0.5rem 0;border-bottom:1px solid rgba(255,255,255,0.05)}

.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:2rem}
.hero::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle at 30% 50%,rgba(152,80,230,0.08) 0%,transparent 50%),radial-gradient(circle at 70% 50%,rgba(99,102,241,0.06) 0%,transparent 50%);animation:bgPulse 8s ease-in-out infinite alternate}
@keyframes bgPulse{0%{transform:scale(1)}100%{transform:scale(1.1)}}
.hero-content{text-align:center;position:relative;z-index:1;max-width:800px}
.hero-badge{display:inline-block;padding:0.4rem 1.2rem;border-radius:50px;background:rgba(152,80,230,0.15);border:1px solid rgba(152,80,230,0.3);color:var(--accent);font-size:0.85rem;font-weight:500;margin-bottom:1.5rem;letter-spacing:1px}
.hero h1{font-size:clamp(2.5rem,6vw,4.5rem);font-weight:900;line-height:1.1;margin-bottom:1rem}
.hero h1 .gradient{background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:1.15rem;color:var(--text2);max-width:600px;margin:0 auto 2rem}
.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}
.btn{padding:0.75rem 2rem;border-radius:50px;font-weight:600;font-size:0.95rem;cursor:pointer;transition:all 0.3s;border:none;display:inline-flex;align-items:center;gap:0.5rem}
.btn-primary{background:var(--gradient);color:#fff;box-shadow:0 4px 20px rgba(152,80,230,0.3)}
.btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(152,80,230,0.4)}
.btn-outline{background:transparent;color:var(--accent);border:2px solid var(--accent)}
.btn-outline:hover{background:rgba(152,80,230,0.1);transform:translateY(-2px)}
.typing{font-family:'Fira Code',monospace;font-size:1.1rem;color:var(--accent);min-height:1.8rem;margin-bottom:1.5rem}

section{padding:5rem 2rem;max-width:1100px;margin:0 auto}
.section-title{font-size:2rem;font-weight:800;text-align:center;margin-bottom:0.5rem}
.section-title .gradient{background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.section-sub{text-align:center;color:var(--text2);margin-bottom:3rem;font-size:0.95rem}
.divider{width:60px;height:4px;background:var(--gradient);border-radius:2px;margin:0.8rem auto 0}

.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center}
.about-text h3{font-size:1.5rem;margin-bottom:1rem}
.about-text p{color:var(--text2);margin-bottom:1rem;font-size:0.95rem}
.about-info{display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;margin-top:1.5rem}
.about-info div{padding:0.8rem;background:var(--bg2);border-radius:10px;border:1px solid var(--card-border)}
.about-info span{font-size:0.75rem;color:var(--text2);display:block}
.about-info strong{font-size:0.9rem;color:var(--text)}
.about-code{background:var(--bg2);border:1px solid var(--card-border);border-radius:16px;padding:1.5rem;font-family:'Fira Code',monospace;font-size:0.82rem;line-height:1.8;overflow:auto}
.about-code .kw{color:#c792ea}.about-code .fn{color:#82aaff}.about-code .str{color:#c3e88d}.about-code .cm{color:#546e7a}

.skills-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem}
.skill-card{background:var(--bg2);border:1px solid var(--card-border);border-radius:16px;padding:1.5rem;transition:all 0.3s}
.skill-card:hover{transform:translateY(-4px);border-color:var(--accent);box-shadow:0 8px 30px rgba(152,80,230,0.15)}
.skill-card h4{color:var(--accent);margin-bottom:1rem;font-size:1rem}
.skill-tags{display:flex;flex-wrap:wrap;gap:0.5rem}
.skill-tag{padding:0.35rem 0.8rem;background:rgba(152,80,230,0.1);border:1px solid rgba(152,80,230,0.2);border-radius:20px;font-size:0.8rem;color:var(--text);transition:all 0.3s}
.skill-tag:hover{background:rgba(152,80,230,0.25);transform:scale(1.05)}

.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1.5rem}
.project-card{background:var(--bg2);border:1px solid var(--card-border);border-radius:16px;padding:1.8rem;transition:all 0.3s;position:relative;overflow:hidden}
.project-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--gradient);transform:scaleX(0);transition:transform 0.3s;transform-origin:left}
.project-card:hover::before{transform:scaleX(1)}
.project-card:hover{transform:translateY(-4px);border-color:var(--accent);box-shadow:0 8px 30px rgba(152,80,230,0.15)}
.project-card h4{font-size:1.1rem;margin-bottom:0.6rem}
.project-card p{color:var(--text2);font-size:0.88rem;margin-bottom:1rem;line-height:1.6}
.project-tags{display:flex;flex-wrap:wrap;gap:0.4rem}
.project-tags span{padding:0.25rem 0.65rem;background:rgba(152,80,230,0.1);border-radius:12px;font-size:0.75rem;color:var(--accent)}

.timeline{position:relative;padding-left:2rem}
.timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--gradient)}
.timeline-item{position:relative;margin-bottom:2rem;padding-left:1.5rem}
.timeline-item::before{content:'';position:absolute;left:-2.35rem;top:0.4rem;width:12px;height:12px;border-radius:50%;background:var(--accent);box-shadow:0 0 10px rgba(152,80,230,0.5)}
.timeline-item h4{font-size:1.05rem;margin-bottom:0.2rem}
.timeline-item .company{color:var(--accent);font-size:0.9rem;font-weight:500}
.timeline-item .date{color:var(--text2);font-size:0.8rem;margin-bottom:0.5rem}
.timeline-item p{color:var(--text2);font-size:0.88rem}

.cert-list{display:grid;gap:0.8rem;max-width:800px;margin:0 auto}
.cert-item{padding:1rem 1.5rem;background:var(--bg2);border:1px solid var(--card-border);border-radius:12px;font-size:0.9rem;transition:all 0.3s;display:flex;align-items:center;gap:0.8rem}
.cert-item:hover{border-color:var(--accent);transform:translateX(4px)}
.cert-dot{width:8px;height:8px;border-radius:50%;background:var(--accent);flex-shrink:0}

.hackathon-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1.5rem;max-width:800px;margin:0 auto}
.hackathon-card{background:var(--bg2);border:1px solid var(--card-border);border-radius:16px;padding:1.5rem;transition:all 0.3s}
.hackathon-card:hover{border-color:var(--accent);transform:translateY(-3px)}
.hackathon-card h4{color:var(--accent);margin-bottom:0.5rem}
.hackathon-card p{color:var(--text2);font-size:0.88rem}

.contact{text-align:center}
.contact p{color:var(--text2);margin-bottom:2rem;max-width:500px;margin-left:auto;margin-right:auto}
.contact-links{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-top:1.5rem}
.contact-btn{padding:0.7rem 1.5rem;background:var(--bg2);border:1px solid var(--card-border);border-radius:50px;display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;transition:all 0.3s;color:var(--text)}
.contact-btn:hover{border-color:var(--accent);background:rgba(152,80,230,0.1);transform:translateY(-2px)}

footer{text-align:center;padding:2rem;border-top:1px solid var(--card-border);color:var(--text2);font-size:0.85rem}

.fade-in{opacity:0;transform:translateY(30px);transition:all 0.6s ease}
.fade-in.visible{opacity:1;transform:translateY(0)}

@media(max-width:768px){
  .nav-links{display:none}
  .hamburger{display:flex}
  .about-grid{grid-template-columns:1fr}
  .hero h1{font-size:2.2rem}
  .projects-grid{grid-template-columns:1fr}
  section{padding:3rem 1.2rem}
}
`

/* ─── Icons (inline SVG) ─── */
const Icon = ({ name, size = 20 }) => {
  const icons = {
    linkedin: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
    github: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>,
    email: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
    instagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>,
  }
  return icons[name] || null
}

/* ─── Typing effect ─── */
const useTyping = (strings, speed = 80, pause = 2000) => {
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[idx]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1))
        if (text.length === current.length) setTimeout(() => setDeleting(true), pause)
      } else {
        setText(current.slice(0, text.length - 1))
        if (text.length === 0) { setDeleting(false); setIdx((idx + 1) % strings.length) }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(timeout)
  }, [text, idx, deleting, strings, speed, pause])

  return text
}

/* ─── Fade-in on scroll ─── */
const useFadeIn = () => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.unobserve(el) } }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

const FadeIn = ({ children, className = '', ...props }) => {
  const ref = useFadeIn()
  return <div ref={ref} className={`fade-in ${className}`} {...props}>{children}</div>
}

/* ─── App ─── */
export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const typed = useTyping(['AI Engineer', 'Full Stack Developer', 'Data Science Enthusiast', 'Machine Learning Engineer'], 70, 1800)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Certifications', 'Contact']

  return (
    <>
      <style>{css}</style>

      {/* Nav */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="nav-logo">NC</a>
        <ul className="nav-links">
          {navItems.map(item => <li key={item}><a href={`#${item.toLowerCase()}`}>{item}</a></li>)}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
      </div>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-content">
          <span className="hero-badge">AVAILABLE FOR OPPORTUNITIES</span>
          <h1>Hi, I'm <span className="gradient">Nakul Chauhan</span></h1>
          <div className="typing">{typed}<span style={{ borderRight: '2px solid var(--accent)', marginLeft: 2, animation: 'none' }}>&nbsp;</span></div>
          <p>AI Engineer skilled in building intelligent solutions, data-driven applications, and full-stack platforms. Based in India.</p>
          <div className="hero-btns">
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="btn btn-primary"><Icon name="github" size={18} /> View GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline"><Icon name="linkedin" size={18} /> LinkedIn</a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about">
        <FadeIn>
          <h2 className="section-title">About <span className="gradient">Me</span></h2>
          <p className="section-sub">Transforming ideas into intelligent solutions</p>
          <div className="divider" />
        </FadeIn>
        <div className="about-grid" style={{ marginTop: '2.5rem' }}>
          <FadeIn>
            <div className="about-text">
              <h3>AI Engineer & Full Stack Developer</h3>
              <p>I'm Nakul Chauhan, an AI Engineer skilled in Python, Web Development, Deep Learning, Machine Learning, Data Analytics, Power BI, and MongoDB. Experienced in building AI-powered solutions, developing predictive models, and implementing end-to-end data pipelines.</p>
              <p>Currently pursuing B.Tech in Computer Science (AI) at Meerut Institute of Engineering and Technology.</p>
              <div className="about-info">
                <div><span>Location</span><strong>Meerut, India</strong></div>
                <div><span>Education</span><strong>B.Tech CS (AI)</strong></div>
                <div><span>Email</span><strong style={{ fontSize: '0.8rem' }}>nakulchauhan400@gmail.com</strong></div>
                <div><span>Phone</span><strong>+91 8449981583</strong></div>
              </div>
            </div>
          </FadeIn>
          <FadeIn>
            <div className="about-code">
              <span className="cm">// nakul.js</span><br />
              <span className="kw">const</span> nakul = {'{'}<br />
              &nbsp;&nbsp;name: <span className="str">"Nakul Chauhan"</span>,<br />
              &nbsp;&nbsp;role: <span className="str">"AI Engineer"</span>,<br />
              &nbsp;&nbsp;skills: [<span className="str">"Python"</span>, <span className="str">"React"</span>, <span className="str">"ML"</span>],<br />
              &nbsp;&nbsp;passion: <span className="str">"Building the future with AI"</span>,<br />
              &nbsp;&nbsp;<span className="fn">isAvailable</span>: () =&gt; <span className="kw">true</span><br />
              {'}'};
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Skills */}
      <section id="skills">
        <FadeIn>
          <h2 className="section-title">Tech <span className="gradient">Stack</span></h2>
          <p className="section-sub">Technologies I work with</p>
          <div className="divider" />
        </FadeIn>
        <div className="skills-grid" style={{ marginTop: '2.5rem' }}>
          {Object.entries(SKILLS).map(([cat, items]) => (
            <FadeIn key={cat}>
              <div className="skill-card">
                <h4>{cat}</h4>
                <div className="skill-tags">
                  {items.map(s => <span key={s} className="skill-tag">{s}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <FadeIn>
          <h2 className="section-title">Featured <span className="gradient">Projects</span></h2>
          <p className="section-sub">Some things I've built</p>
          <div className="divider" />
        </FadeIn>
        <div className="projects-grid" style={{ marginTop: '2.5rem' }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={i}>
              <div className="project-card">
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map(t => <span key={t}>{t}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience">
        <FadeIn>
          <h2 className="section-title">Work <span className="gradient">Experience</span></h2>
          <p className="section-sub">My professional journey</p>
          <div className="divider" />
        </FadeIn>
        <div className="timeline" style={{ marginTop: '2.5rem' }}>
          {EXPERIENCE.map((e, i) => (
            <FadeIn key={i}>
              <div className="timeline-item">
                <h4>{e.role}</h4>
                <div className="company">{e.company}</div>
                <div className="date">{e.date}</div>
                <p>{e.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications">
        <FadeIn>
          <h2 className="section-title"><span className="gradient">Certifications</span></h2>
          <p className="section-sub">Professional credentials</p>
          <div className="divider" />
        </FadeIn>
        <div className="cert-list" style={{ marginTop: '2.5rem' }}>
          {CERTS.map((c, i) => (
            <FadeIn key={i}>
              <div className="cert-item"><div className="cert-dot" />{c}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Hackathons */}
      <section id="hackathons">
        <FadeIn>
          <h2 className="section-title"><span className="gradient">Hackathons</span></h2>
          <p className="section-sub">Competition highlights</p>
          <div className="divider" />
        </FadeIn>
        <div className="hackathon-grid" style={{ marginTop: '2.5rem' }}>
          {HACKATHONS.map((h, i) => (
            <FadeIn key={i}>
              <div className="hackathon-card">
                <h4>{h.name}</h4>
                <p>{h.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact">
        <FadeIn>
          <h2 className="section-title">Get In <span className="gradient">Touch</span></h2>
          <p className="section-sub">Let's build something amazing together</p>
          <div className="divider" />
          <p style={{ marginTop: '2rem' }}>I'm always excited to collaborate on innovative projects, especially in AI/ML, Data Science, and Full Stack Development.</p>
          <div className="contact-links">
            <a href={LINKS.email} className="contact-btn"><Icon name="email" size={18} /> Email Me</a>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="contact-btn"><Icon name="linkedin" size={18} /> LinkedIn</a>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="contact-btn"><Icon name="github" size={18} /> GitHub</a>
            <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="contact-btn"><Icon name="instagram" size={18} /> Instagram</a>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer>
        <p>Designed & Built by Nakul Chauhan &bull; 2025</p>
      </footer>
    </>
  )
}
