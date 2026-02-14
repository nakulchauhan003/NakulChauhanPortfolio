import { useState, useEffect, useRef } from 'react'

/* ─── Data ─── */
const LINKS = {
  linkedin: 'https://www.linkedin.com/in/nakul-chauhan-504312249/',
  instagram: 'https://instagram.com/_nakulchauhan',
  github: 'https://github.com/nakulchauhan003',
  email: 'https://mail.google.com/mail/?view=cm&fs=1&to=nakulchauhan400@gmail.com',
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
  { title: 'Career Essentials in Generative AI', issuer: 'Microsoft & LinkedIn', date: 'May 2025', file: '/certificates/CertificateOfCompletion_Career%20Essentials%20in%20Generative%20AI%20by%20Microsoft%20and%20LinkedIn.jpg' },
  { title: 'Data Analytics Job Simulation', issuer: 'Deloitte Australia', date: 'May 2025', file: '/certificates/deliotte.jpg' },
  { title: 'Power BI', issuer: 'ISO 9001', date: 'Jul 2025', file: '/certificates/Power%20BI.jpg' },
  { title: 'Oracle Cloud Infrastructure AI', issuer: 'Oracle', date: 'Aug 2025', file: '/certificates/eCertificate.jpg' },
  { title: 'Data Visualization', issuer: 'Forage', date: 'Jul 2025', file: '/certificates/data%20visualisation.jpg' },
  { title: 'Getting Started with Java', issuer: 'Infosys', date: 'Sep 2024', file: '/certificates/Infosyscertificate.jpg' },
  { title: 'SQL Project for Beginners', issuer: 'Great Learning', date: 'Sep 2024', file: '/certificates/Nakul%20Chauhan%20(2).jpg' },
  { title: 'Microsoft Excel for Data Analyst', issuer: 'Great Learning', date: 'Sep 2024', file: '/certificates/infosys.jpg' },
]

const HACKATHONS = [
  { name: 'GDG Hackathon', desc: 'Developed an AI-powered travel planner application that recommends personalized destinations based on user interests, budget, and travel preferences. Implemented intelligent route optimization to minimize travel time and cost using algorithm-based path planning. Integrated dynamic suggestions for accommodations, attractions, and itineraries to enhance user experience. Focused on clean UI design, performance efficiency, and real-time recommendation logic.' },
  { name: 'MLSA Hackathon', desc: 'Built a banking analytics solution that leverages AI and data-driven insights to support smarter financial decision-making. Designed models to analyze customer transaction patterns, detect trends, and generate automated financial recommendations. Implemented predictive analytics techniques to assist in risk assessment and customer segmentation. Created interactive dashboards for visualizing key financial metrics and insights to improve strategic planning.' },
]

/* ─── Styles ─── */
const css = `
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#05050a;--bg2:#0a0a12;--bg3:#12121e;--bg4:#16213e;
  --text:#ffffff;--text2:#b0b0c0;--accent:#a855f7;--accent2:#ec4899;--accent3:#6366f1;
  --gradient:linear-gradient(135deg,#a855f7,#ec4899,#6366f1);
  --gradient-hover:linear-gradient(135deg,#9333ea,#db2777,#4f46e5);
  --glass:rgba(255,255,255,0.03);
  --glass-border:rgba(255,255,255,0.08);
  --glass-highlight:rgba(255,255,255,0.15);
  --card-border:rgba(168,85,247,0.2);
  --shadow-glow:0 0 20px rgba(168,85,247,0.3);
}
html{scroll-behavior:smooth;font-size:19px}
body{font-family:'Outfit','Inter',system-ui,sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;line-height:1.7;position:relative}
a{color:inherit;text-decoration:none}
::selection{background:var(--accent2);color:#fff}
::-webkit-scrollbar{width:8px}
::-webkit-scrollbar-track{background:var(--bg)}
::-webkit-scrollbar-thumb{background:var(--bg3);border:1px solid var(--glass-border);border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:var(--accent)}

/* Background Blobs */
.bg-blobs{position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;overflow:hidden;pointer-events:none}
.blob{position:absolute;border-radius:50%;filter:blur(60px);opacity:0.35;animation:float 10s infinite ease-in-out alternate}
.blob-1{top:-10%;left:-10%;width:50vw;height:50vw;background:var(--accent);animation-duration:25s}
.blob-2{bottom:-10%;right:-10%;width:40vw;height:40vw;background:var(--accent3);animation-duration:30s;animation-delay:-5s}
.blob-3{top:40%;left:40%;width:30vw;height:30vw;background:var(--accent2);filter:blur(80px);opacity:0.2;animation-duration:20s;animation-delay:-10s}
@keyframes float{0%{transform:translate(0,0) scale(1)}100%{transform:translate(20px,40px) scale(1.1)}}

/* Nav */
.nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:1.2rem 2rem;display:flex;justify-content:space-between;align-items:center;transition:all 0.4s ease}
.nav.scrolled{padding:0.8rem 2rem;background:rgba(5,5,10,0.88);backdrop-filter:blur(20px);border-bottom:1px solid var(--glass-border);box-shadow:0 4px 30px rgba(0,0,0,0.15)}
.nav-logo{font-size:1.6rem;font-weight:800;letter-spacing:-0.5px;position:relative;background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.nav-logo::after{content:'.';color:var(--accent2);-webkit-text-fill-color:var(--accent2)}
.nav-links{display:flex;gap:2rem;list-style:none}
.nav-links a{font-size:0.95rem;font-weight:500;color:var(--text2);transition:all 0.3s;padding:0.5rem 0;position:relative}
.nav-links a:hover{color:var(--text)}
.nav-links a::after{content:'';position:absolute;bottom:0;left:0;width:0;height:2px;background:var(--gradient);transition:width 0.3s ease}
.nav-links a:hover::after{width:100%}

/* Mobile Menu */
.hamburger{display:none;flex-direction:column;gap:6px;cursor:pointer;background:none;border:none;padding:5px}
.hamburger span{width:26px;height:2px;background:var(--text);transition:all 0.3s}
.mobile-menu{display:none;position:fixed;top:70px;left:0;right:0;background:rgba(5,5,10,0.95);backdrop-filter:blur(20px);padding:2rem;border-bottom:1px solid var(--glass-border);z-index:999;animation:slideDown 0.4s ease forwards}
@keyframes slideDown{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse-glow{0%{box-shadow:0 0 0 0 rgba(168,85,247,0.4)}70%{box-shadow:0 0 0 10px rgba(168,85,247,0)}100%{box-shadow:0 0 0 0 rgba(168,85,247,0)}}
.mobile-menu.open{display:flex;flex-direction:column;gap:1.2rem}
.mobile-menu a{font-size:1.2rem;color:var(--text2);padding:0.8rem 0;border-bottom:1px solid var(--glass-border)}
.mobile-menu a:hover{color:var(--accent);padding-left:10px;transition:all 0.3s}

/* Hero */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;padding:6rem 2rem 2rem;text-align:left}
.hero-container{display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;max-width:1200px;width:100%}
.hero-content{z-index:10}
.hero-img-box{position:relative;display:flex;justify-content:center;align-items:center;z-index:1}
.hero-img{width:100%;max-width:400px;aspect-ratio:1;border-radius:50%;object-fit:cover;border:4px solid transparent;background:linear-gradient(var(--bg),var(--bg)) padding-box,var(--gradient) border-box;box-shadow:0 0 40px rgba(168,85,247,0.3);animation:float 6s ease-in-out infinite}
.hero-img:hover{box-shadow:0 0 60px rgba(168,85,247,0.5)}
.hero-badge{display:inline-block;padding:0.5rem 1.5rem;border-radius:50px;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.3);color:var(--accent);font-size:0.75rem;font-weight:600;margin-bottom:1.5rem;letter-spacing:1.5px;text-transform:uppercase;backdrop-filter:blur(5px);box-shadow:0 0 15px rgba(168,85,247,0.15);animation:pulse-glow 3s infinite}
.hero h1{font-size:clamp(2.8rem,5vw,4.5rem);font-weight:900;line-height:1.1;margin-bottom:1.2rem;letter-spacing:-2px}
.hero p{font-size:1.15rem;color:var(--text2);max-width:550px;margin-bottom:2.5rem;line-height:1.7}
.hero-btns{display:flex;gap:1.2rem;justify-content:flex-start;flex-wrap:wrap}

/* Gradient Text */
.gradient{background:var(--gradient);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200% auto;animation:textShimmer 4s linear infinite}
@keyframes textShimmer{0%{background-position:0% 50%}100%{background-position:200% 50%}}

/* Buttons */
.btn{padding:0.8rem 2.2rem;border-radius:50px;font-weight:600;font-size:1rem;cursor:pointer;transition:all 0.3s ease;border:none;display:inline-flex;align-items:center;gap:0.6rem;position:relative;overflow:hidden;z-index:1}
.btn-primary{background:var(--gradient);color:#fff;box-shadow:0 4px 25px rgba(168,85,247,0.4)}
.btn-primary::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:var(--gradient-hover);opacity:0;z-index:-1;transition:opacity 0.3s}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 8px 35px rgba(236,72,153,0.5)}
.btn-primary:hover::before{opacity:1}
.btn-outline{background:rgba(255,255,255,0.03);color:#fff;border:1px solid rgba(255,255,255,0.2);backdrop-filter:blur(5px)}
.btn-outline:hover{background:rgba(255,255,255,0.1);border-color:var(--accent);transform:translateY(-3px);box-shadow:0 4px 20px rgba(0,0,0,0.2)}
.typing{font-family:'Fira Code',monospace;font-size:1.15rem;color:var(--accent3);min-height:1.8rem;margin-bottom:2rem;display:inline-block;padding:0.3rem 0.8rem;background:rgba(99,102,241,0.1);border-radius:6px;border:1px solid rgba(99,102,241,0.15)}

/* Section Divider */
.divider{width:60px;height:4px;background:var(--gradient);border-radius:10px;margin:1.5rem auto 0;position:relative}
.divider::after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:var(--gradient);filter:blur(8px);opacity:0.6}

/* Sections */
section{padding:6rem 2rem;max-width:1200px;margin:0 auto}
.section-title{font-size:2.5rem;font-weight:800;text-align:center;margin-bottom:0.5rem;letter-spacing:-1px}
.section-sub{text-align:center;color:var(--text2);margin-bottom:0;font-size:1.1rem}

/* Cards & Grid */
.glass-panel{background:var(--bg2);border:1px solid var(--glass-border);border-radius:24px;padding:2rem;position:relative;overflow:hidden;transition:all 0.4s ease;box-shadow:0 4px 20px rgba(0,0,0,0.2)}
.glass-panel::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--glass-highlight),transparent);opacity:0.5}
.glass-panel:hover{transform:translateY(-8px);border-color:var(--accent);box-shadow:var(--shadow-glow)}

/* About */
.about-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:4rem;align-items:start;margin-top:3rem}
.about-text h3{font-size:1.8rem;margin-bottom:1.5rem;background:linear-gradient(to right,#fff,#b0b0c0);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.about-text p{color:var(--text2);margin-bottom:1.5rem;font-size:1.05rem}
.about-info{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem;margin-top:2rem}
.about-info div{padding:1rem;background:rgba(255,255,255,0.03);border-radius:16px;border:1px solid var(--glass-border);text-align:center;transition:all 0.3s;word-break:break-all;overflow:hidden}
.about-info div:hover{background:rgba(255,255,255,0.06);border-color:var(--accent3);transform:translateY(-3px)}
.about-info span{font-size:0.75rem;color:var(--text2);display:block;margin-bottom:0.3rem;text-transform:uppercase;letter-spacing:1px}
.about-info strong{font-size:0.95rem;color:#fff}
.about-code{font-family:'Fira Code',monospace;font-size:0.85rem;line-height:1.8;background:var(--bg2);border:1px solid var(--glass-border);border-radius:16px;padding:2rem;box-shadow:0 10px 40px rgba(0,0,0,0.3);position:relative;overflow:hidden}
.about-code::before{content:'● ● ●';position:absolute;top:0;left:0;right:0;padding:0.8rem 1.2rem;font-size:0.5rem;letter-spacing:4px;color:var(--text2);background:rgba(255,255,255,0.03);border-bottom:1px solid var(--glass-border)}
.about-code>*:first-child{margin-top:1.5rem}
.cm{color:#6b7280}
.kw{color:#c084fc}
.str{color:#34d399}
.fn{color:#60a5fa}

/* Skills */
.skills-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;margin-top:3rem}
.skill-card{background:var(--bg2);border:1px solid var(--glass-border);border-radius:20px;padding:2rem;transition:all 0.4s cubic-bezier(0.175,0.885,0.32,1.275)}
.skill-card:hover{transform:translateY(-5px) scale(1.02);border-color:var(--accent2);box-shadow:0 10px 30px rgba(236,72,153,0.15)}
.skill-card h4{color:var(--accent2);margin-bottom:1.2rem;font-size:1.2rem;font-weight:700}
.skill-tags{display:flex;flex-wrap:wrap;gap:0.6rem}
.skill-tag{padding:0.4rem 1rem;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:50px;font-size:0.85rem;color:var(--text2);transition:all 0.3s}
.skill-tag:hover{background:var(--accent2);border-color:var(--accent2);color:#fff;transform:translateY(-2px)}

/* Projects */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:2rem;margin-top:3rem;counter-reset:project}
.project-card{background:var(--bg2);border:1px solid var(--glass-border);border-radius:24px;padding:2.2rem;transition:all 0.4s ease;display:flex;flex-direction:column;height:100%;position:relative;z-index:1;counter-increment:project}
.project-card::before{content:counter(project,decimal-leading-zero);position:absolute;top:1.5rem;right:1.5rem;font-size:3rem;font-weight:900;color:rgba(255,255,255,0.03);line-height:1;pointer-events:none}
.project-card:hover::before{color:rgba(168,85,247,0.1)}
.project-card::after{content:'';position:absolute;inset:0;background:radial-gradient(400px circle at var(--mouse-x,50%) var(--mouse-y,50%),rgba(255,255,255,0.06),transparent 40%);border-radius:24px;z-index:-1;opacity:0;transition:opacity 0.3s}
.project-card:hover::after{opacity:1}
.project-card:hover{transform:translateY(-10px);border-color:var(--accent3);box-shadow:0 15px 40px rgba(99,102,241,0.2)}
.project-card h4{font-size:1.3rem;margin-bottom:0.8rem;font-weight:700}
.project-card p{color:var(--text2);font-size:0.95rem;margin-bottom:1.5rem;line-height:1.7;flex-grow:1}
.project-tags{display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:auto}
.project-tags span{padding:0.3rem 0.8rem;background:rgba(99,102,241,0.1);border-radius:8px;font-size:0.75rem;color:var(--accent3);border:1px solid rgba(99,102,241,0.2);transition:all 0.3s}
.project-tags span:hover{background:rgba(99,102,241,0.25);transform:translateY(-2px)}

/* Hackathons */
.hackathon-list{display:flex;flex-direction:column;gap:3rem;max-width:900px;margin:3rem auto 0}
.hackathon-item{position:relative;padding:1.5rem 2rem;border-left:3px solid var(--glass-border);background:linear-gradient(90deg,rgba(255,255,255,0.02) 0%,transparent 100%);transition:all 0.4s ease;border-radius:0 12px 12px 0}
.hackathon-item:hover{border-left-color:var(--accent2);background:linear-gradient(90deg,rgba(236,72,153,0.05) 0%,transparent 100%);transform:translateX(10px)}
.hackathon-item h4{font-size:1.5rem;color:#fff;margin-bottom:0.6rem;font-weight:700}
.hackathon-item p{color:var(--text2);font-size:1rem;line-height:1.7}

/* Timeline */
.timeline{position:relative;padding-left:3rem;max-width:800px;margin:3rem auto 0}
.timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,var(--accent),var(--accent3),var(--accent2));border-radius:3px;opacity:0.3}
.timeline-item{position:relative;margin-bottom:3.5rem;padding-left:1.5rem}
.timeline-item::before{content:'';position:absolute;left:-3.6rem;top:0.4rem;width:20px;height:20px;border-radius:50%;background:var(--bg);border:4px solid var(--accent);box-shadow:0 0 0 4px rgba(168,85,247,0.2);transition:all 0.3s}
.timeline-item:hover::before{background:var(--accent);box-shadow:0 0 20px var(--accent)}
.timeline-item h4{font-size:1.3rem;margin-bottom:0.3rem;font-weight:700}
.timeline-item .company{color:var(--accent);font-size:1rem;font-weight:600;margin-bottom:0.2rem}
.timeline-item .date{display:inline-block;padding:0.2rem 0.8rem;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.15);border-radius:20px;font-size:0.8rem;color:var(--accent);margin-bottom:1rem;font-weight:500}
.timeline-item p{color:var(--text2);font-size:1rem;line-height:1.7}

/* Certifications */
.cert-gallery{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:2rem;margin-top:3rem}
.cert-item-b{background:var(--bg2);border:1px solid var(--glass-border);border-radius:16px;overflow:hidden;cursor:pointer;transition:all 0.4s ease;display:flex;flex-direction:column}
.cert-item-b:hover{transform:translateY(-8px);border-color:var(--accent);box-shadow:0 15px 40px rgba(168,85,247,0.15)}
.cert-img-wrapper{width:100%;aspect-ratio:4/3;overflow:hidden;background:var(--bg3)}
.cert-img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s ease;opacity:0.9}
.cert-item-b:hover .cert-img{transform:scale(1.05);opacity:1}
.cert-info{padding:1.5rem;flex-grow:1;display:flex;flex-direction:column;justify-content:space-between}
.cert-info h5{font-size:1.05rem;margin-bottom:0.4rem;font-weight:700;line-height:1.4}
.cert-info span{color:var(--text2);font-size:0.85rem;display:block}

/* Contact */
.contact{text-align:center;position:relative;padding:6rem 2rem}
.contact-container{background:linear-gradient(180deg,var(--bg2) 0%,rgba(10,10,12,0) 100%);border-radius:30px;padding:4rem 2rem;border:1px solid var(--glass-border);position:relative;overflow:hidden}
.contact-container::before{content:'';position:absolute;top:-50%;left:50%;transform:translateX(-50%);width:400px;height:400px;background:var(--accent);filter:blur(100px);opacity:0.12;border-radius:50%;z-index:0}
.contact p{font-size:1.15rem;max-width:600px;margin:0 auto 2.5rem;color:var(--text2);position:relative;z-index:1}
.contact-links{display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap;position:relative;z-index:1}
.contact-btn{padding:1rem 2rem;background:rgba(255,255,255,0.05);border:1px solid var(--glass-border);border-radius:16px;display:flex;align-items:center;gap:0.8rem;font-size:1rem;font-weight:500;transition:all 0.3s;color:var(--text);backdrop-filter:blur(5px)}
.contact-btn:hover{background:var(--accent);border-color:var(--accent);transform:translateY(-5px);box-shadow:0 10px 30px rgba(168,85,247,0.4)}

/* Footer */
footer{text-align:center;padding:3rem 2rem;color:var(--text2);font-size:0.9rem;border-top:1px solid var(--glass-border);background:var(--bg)}
footer .footer-links{display:flex;justify-content:center;gap:2rem;margin-bottom:1.5rem}
footer .footer-links a{color:var(--text2);transition:all 0.3s;display:flex;align-items:center}
footer .footer-links a:hover{color:var(--accent);transform:translateY(-3px)}
footer p{opacity:0.7}

/* Animations */
.fade-in{opacity:0;transform:translateY(40px);transition:all 0.8s cubic-bezier(0.2,0.8,0.2,1)}
.fade-in.visible{opacity:1;transform:translateY(0)}

/* Responsive */
@media(max-width:768px){
  .nav-links{display:none}
  .hamburger{display:flex}
  .about-grid{grid-template-columns:1fr}
  .hero h1{font-size:2.6rem}
  .hero{text-align:center;padding-top:8rem}
  .hero-container{grid-template-columns:1fr;gap:2rem}
  .hero-btns{justify-content:center}
  .hero-img{max-width:260px}
  .projects-grid{grid-template-columns:1fr}
  .skills-grid{grid-template-columns:1fr}
  .cert-gallery{grid-template-columns:1fr}
  .about-code{font-size:0.75rem;padding:1.5rem 1rem}
  .blob{opacity:0.5}
  section{padding:4rem 1.5rem}
  .section-title{font-size:2rem}
  .hackathon-item{padding:1rem 1.5rem}
  .timeline{padding-left:2.5rem}
}
@media(max-width:480px){
  html{font-size:16px}
  .hero h1{font-size:2.2rem}
  .hero-img{max-width:200px}
  .btn{padding:0.7rem 1.5rem;font-size:0.9rem}
  .contact-btn{padding:0.8rem 1.5rem;font-size:0.9rem}
}
`

/* ─── Icons (inline SVG) ─── */
const Icon = ({ name, size = 20 }) => {
  const icons = {
    linkedin: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>,
    github: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>,
    email: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>,
    instagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>,
    arrow: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" /></svg>,
    award: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>,
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
  return <div ref={ref} className={`fade -in ${className} `} {...props}>{children}</div>
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

  const handleMouseMove = (e) => {
    const cards = document.querySelectorAll('.project-card, .skill-card, .glass-panel')
    for (const card of cards) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Certifications', 'Contact']

  return (
    <>
      <style>{css}</style>
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Nav */}
      <nav className={`nav ${scrolled ? 'scrolled' : ''} `}>
        <a href="#" className="nav-logo">NC</a>
        <ul className="nav-links">
          {navItems.map(item => <li key={item}><a href={`#${item.toLowerCase()} `}>{item}</a></li>)}
        </ul>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <div className={`mobile - menu ${menuOpen ? 'open' : ''} `}>
        {navItems.map(item => <a key={item} href={`#${item.toLowerCase()} `} onClick={() => setMenuOpen(false)}>{item}</a>)}
      </div>

      {/* Hero */}
      <section className="hero" id="hero">
        <div className="hero-container">
          <div className="hero-content">
            <span className="hero-badge">AVAILABLE FOR OPPORTUNITIES</span>
            <h1>Hi, I'm <span className="gradient">Nakul Chauhan</span></h1>
            <div className="typing">{typed}<span style={{ borderRight: '2px solid var(--accent)', marginLeft: 2, animation: 'none' }}>&nbsp;</span></div>
            <p>AI Engineer skilled in building intelligent solutions, data-driven applications, and full-stack platforms. Based in India.</p>
            <div className="hero-btns">
              <a href="/NakulChauhanResume.pdf" download="Nakul_Chauhan_Resume.pdf" className="btn btn-primary" style={{ animation: 'pulse-glow 2s infinite' }}><Icon name="download" size={18} /> Download Resume</a>
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="btn btn-outline"><Icon name="github" size={18} /> GitHub</a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="btn btn-outline"><Icon name="linkedin" size={18} /> LinkedIn</a>
            </div>
          </div>
          <div className="hero-img-box">
            <img src="/profile.jpg" alt="Nakul Chauhan" className="hero-img" />
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
        <div className="about-grid">
          <FadeIn>
            <div className="about-text">
              <h3>AI Engineer & Full Stack Developer</h3>
              <p>I'm Nakul Chauhan, an AI Engineer skilled in Python, Web Development, Deep Learning, Machine Learning, Data Analytics, Power BI, and MongoDB. Experienced in building AI-powered solutions, developing predictive models, and implementing end-to-end data pipelines.</p>
              <p>Currently pursuing B.Tech in Computer Science (AI) at Meerut Institute of Engineering and Technology.</p>
              <div className="about-info">
                <div><span>Location</span><strong>Meerut, India</strong></div>
                <div><span>Education</span><strong>B.Tech CS (AI)</strong></div>
                <div><span>Email</span><strong>nakulchauhan400@gmail.com</strong></div>
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
        <div className="skills-grid">
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
        <div className="projects-grid">
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
        <div className="timeline">
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


        <div className="cert-gallery">
          {CERTS.map((c, i) => (
            <FadeIn key={i}>
              <div className="cert-item-b" onClick={() => window.open(c.file, '_blank')}>
                <div className="cert-img-wrapper">
                  <img src={c.file} alt={c.title} className="cert-img" loading="lazy" />
                </div>
                <div className="cert-info">
                  <h5>{c.title}</h5>
                  <span>{c.issuer} &bull; {c.date}</span>
                </div>
              </div>
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
        <div className="hackathon-list">
          {HACKATHONS.map((h, i) => (
            <FadeIn key={i}>
              <div className="hackathon-item">
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
          <div className="contact-container">
            <h2 className="section-title">Get In <span className="gradient">Touch</span></h2>
            <p className="section-sub">Let's build something amazing together</p>
            <div className="divider" />
            <p style={{ marginTop: '2rem' }}>I'm always excited to collaborate on innovative projects, especially in AI/ML, Data Science, and Full Stack Development.</p>
            <div className="contact-links">
              <a href={LINKS.email} target="_blank" rel="noreferrer" className="contact-btn"><Icon name="email" size={18} /> Email Me</a>
              <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="contact-btn"><Icon name="linkedin" size={18} /> LinkedIn</a>
              <a href={LINKS.github} target="_blank" rel="noreferrer" className="contact-btn"><Icon name="github" size={18} /> GitHub</a>
              <a href={LINKS.instagram} target="_blank" rel="noreferrer" className="contact-btn"><Icon name="instagram" size={18} /> Instagram</a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-links">
          <a href={LINKS.github} target="_blank" rel="noreferrer"><Icon name="github" size={20} /></a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer"><Icon name="linkedin" size={20} /></a>
          <a href={LINKS.instagram} target="_blank" rel="noreferrer"><Icon name="instagram" size={20} /></a>
          <a href={LINKS.email} target="_blank" rel="noreferrer"><Icon name="email" size={20} /></a>
        </div>
        <p>Designed & Built by Nakul Chauhan &bull; 2026</p>
      </footer>
    </>
  )
}
