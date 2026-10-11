import { useEffect, useState } from 'react'
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, Code2, Database,
  Github, Linkedin, Mail, Menu, X, Braces, Layers3, CarFront, Music2,
  GraduationCap, BriefcaseBusiness, Award, ExternalLink, Terminal,
} from 'lucide-react'
import './App.css'

const email = 'aditya.diwan04@gmail.com'
const github = 'https://github.com/Aditya-Diwan'
const linkedin = 'http://www.linkedin.com/in/aditya-diwan-2b0776200'

const projects = [
  {
    number: '01',
    name: 'Elite Cars',
    type: 'CAR RENTAL MANAGEMENT',
    description: 'A full-stack rental platform for browsing vehicles, managing bookings, and handling rental workflows with role-based access.',
    stack: ['ASP.NET Core MVC', 'EF Core', 'SQL Server', 'Stripe'],
    icon: CarFront,
    className: 'project-car',
    accent: '01 / Booking platform',
    features: ['Vehicle booking flow', 'Role-based authentication', 'Stripe payment integration'],
    link: `${github}?tab=repositories`,
  },
  {
    number: '02',
    name: 'TuneSync',
    type: 'MUSIC WEB APPLICATION',
    description: 'A music web app built around distinct user, artist, and admin experiences, with protected routes and music-library management.',
    stack: ['ASP.NET MVC', 'C#', 'SQL Server', 'JavaScript'],
    icon: Music2,
    className: 'project-music',
    accent: '02 / Music ecosystem',
    features: ['Separate Admin, Artist & User panels', 'Playlist creation', 'Song management'],
    link: `${github}?tab=repositories`,
  },
]

const skills = [
  { title: 'Backend', icon: Braces, items: ['C#', 'ASP.NET MVC', 'ASP.NET Core MVC', 'Entity Framework Core'] },
  { title: 'Database', icon: Database, items: ['Microsoft SQL Server', 'SQL queries', 'CRUD operations', 'Database design'] },
  { title: 'Frontend', icon: Code2, items: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'] },
  { title: 'Workflow', icon: Layers3, items: ['RESTful patterns', 'Role-based access', 'Debugging', 'Problem solving'] },
]

const education = [
  { year: '2023 — 2026', title: 'Bachelor of Technology', place: 'Madhuben and Bhanubhai Patel Institute of Technology (MBIT)', detail: 'Computer Engineering', score: 'CGPA 8.01' },
  { year: '2020 — 2023', title: 'Diploma', place: 'Tapi Diploma Engineering College', detail: 'Information Technology', score: 'CGPA 7.76' },
  { year: '2020', title: 'SSC — GSEB', place: 'Smt. I. N. Tekrawala High School', detail: 'Secondary education', score: '67%' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <div className="site-noise" aria-hidden="true" />
      <header className={`topbar ${scrolled ? 'topbar-scrolled' : ''}`}>
        <a href="#home" className="brand" onClick={closeMenu} aria-label="Aditya Diwan home">
          <span className="brand-mark">ad<span>.</span></span>
          <span className="brand-caption">DEVELOPER PORTFOLIO</span>
        </a>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Main navigation">
          {[['About', '#about'], ['Work', '#work'], ['Skills', '#skills'], ['Journey', '#journey']].map(([label, href]) => (
            <a key={label} href={href} onClick={closeMenu}>{label}</a>
          ))}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> AVAILABLE FOR OPPORTUNITIES <span className="eyebrow-line" /></div>
            <p className="hero-kicker">HELLO, I'M ADITYA DIWAN</p>
            <h1>Building digital<br />things with <span className="accent-word">purpose<span className="period">.</span></span></h1>
            <p className="hero-description">Full Stack Developer focused on building reliable web applications with <strong>C#, ASP.NET Core MVC</strong> and <strong>SQL Server</strong>.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={17} /></a>
              <a className="button button-quiet" href="#contact">Get in touch <ArrowUpRight size={16} /></a>
            </div>
            <div className="hero-socials">
              <a href={github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={12} /></a>
              <a href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={12} /></a>
              <span className="social-separator" />
              <span className="location-label">SURAT, INDIA <span className="location-pin">↗</span></span>
            </div>
          </div>

          <div className="hero-art" aria-label="Animated code editor illustration">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="art-cross cross-a">+</div>
            <div className="art-cross cross-b">+</div>
            <div className="code-window">
              <div className="window-bar">
                <div className="window-dots"><i /><i /><i /></div>
                <span>aditya.dev <span className="window-path">/ intro.tsx</span></span>
                <span className="window-status">● live</span>
              </div>
              <div className="code-body">
                <div className="code-line"><span className="line-no">01</span><span><b className="code-purple">const</b> <b className="code-blue">developer</b> = {'{'}</span></div>
                <div className="code-line indent"><span className="line-no">02</span><span><b className="code-pink">name</b>: <b className="code-green">'Aditya Diwan'</b>,</span></div>
                <div className="code-line indent"><span className="line-no">03</span><span><b className="code-pink">focus</b>: <b className="code-green">'Full Stack'</b>,</span></div>
                <div className="code-line indent"><span className="line-no">04</span><span><b className="code-pink">stack</b>: [</span></div>
                <div className="code-line indent double"><span className="line-no">05</span><span><b className="code-green">'C#'</b>, <b className="code-green">'ASP.NET'</b>,</span></div>
                <div className="code-line indent double"><span className="line-no">06</span><span><b className="code-green">'SQL Server'</b></span></div>
                <div className="code-line indent"><span className="line-no">07</span><span>],</span></div>
                <div className="code-line indent"><span className="line-no">08</span><span><b className="code-pink">mindset</b>: <b className="code-green">'Always learning'</b></span></div>
                <div className="code-line"><span className="line-no">09</span><span>{'}'}<span className="cursor-block" /></span></div>
              </div>
              <div className="window-footer"><span><span className="footer-pulse" /> TypeScript</span><span>UTF-8&nbsp;&nbsp; LF</span></div>
            </div>
            <div className="floating-chip chip-top"><span className="chip-icon"><Code2 size={15} /></span><span><b>C# / .NET</b><small>Backend development</small></span></div>
            <div className="floating-chip chip-bottom"><span className="chip-icon chip-icon-blue"><Database size={15} /></span><span><b>SQL Server</b><small>Data & persistence</small></span></div>
            <div className="art-index">FIG. 01 <span>—</span> DEVELOPER AT WORK</div>
          </div>
          <a href="#about" className="scroll-cue"><span className="scroll-line" /> SCROLL TO EXPLORE <ArrowDownRight size={13} /></a>
          <div className="hero-index">01 <span>/</span> 05</div>
        </section>

        <section className="intro-strip">
          <div className="section-shell intro-inner">
            <span className="strip-label">MY APPROACH</span>
            <p>Thoughtful code. <span>Useful products.</span> A little curiosity in everything.</p>
            <span className="strip-mark">✳</span>
          </div>
        </section>

        <section className="section-shell about-section section-pad" id="about">
          <div className="section-heading reveal">
            <span className="section-number">01 — ABOUT</span>
            <h2>Curious by nature.<br /><span>Developer by choice.</span></h2>
          </div>
          <div className="about-grid">
            <div className="about-main reveal">
              <p className="large-copy">I’m a Computer Engineering graduate who enjoys turning practical problems into clear, dependable web experiences.</p>
              <p className="body-copy">My work so far has centred on the .NET ecosystem—from building MVC applications and connecting data layers to creating role-based experiences. I care about writing maintainable code, understanding the problem before solving it, and continuously learning better ways to build.</p>
              <a href="#contact" className="text-link">Let's build something useful <ArrowUpRight size={15} /></a>
            </div>
            <div className="about-aside reveal">
              <div className="aside-stat"><span className="stat-icon"><BriefcaseBusiness size={17} /></span><div><b>Full Stack Development</b><small>Internship experience · 2026</small></div></div>
              <div className="aside-stat"><span className="stat-icon"><GraduationCap size={18} /></span><div><b>Computer Engineering</b><small>MBIT · CGPA 8.01</small></div></div>
              <div className="aside-stat"><span className="stat-icon"><Award size={18} /></span><div><b>Hackathon recognition</b><small>Top 55 · Mindbend ’25, SVNIT</small></div></div>
              <div className="aside-note"><span>“</span><p>Good software starts with understanding people and the problems they need solved.</p></div>
            </div>
          </div>
        </section>

        <section className="work-section section-pad" id="work">
          <div className="section-shell">
            <div className="section-heading work-heading reveal">
              <span className="section-number">02 — SELECTED WORK</span>
              <h2>Ideas made <span>real.</span></h2>
              <p className="heading-note">A couple of projects where application logic, data, and user experience come together.</p>
            </div>
            <div className="projects-list">
              {projects.map((project) => {
                const Icon = project.icon
                return (
                  <article className={`project-card ${project.className} reveal`} key={project.name}>
                    <div className="project-visual">
                      <div className="project-visual-top"><span>{project.accent}</span><span>AD / PROJECTS</span></div>
                      <div className="project-graphic">
                        {project.name === 'Elite Cars' ? (
                          <div className="car-illustration">
                            <div className="car-sun" /><div className="car-road" />
                            <div className="car-shape"><div className="car-window" /><div className="car-wheel wheel-left" /><div className="car-wheel wheel-right" /><div className="car-light" /></div>
                            <span className="car-tag">BOOK. DRIVE. GO.</span>
                          </div>
                        ) : (
                          <div className="music-illustration">
                            <div className="music-ring ring-one" /><div className="music-ring ring-two" />
                            <div className="music-disc"><div className="disc-center"><Music2 size={34} /></div></div>
                            <div className="equalizer"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                            <span className="music-tag">YOUR SOUND. YOUR SPACE.</span>
                          </div>
                        )}
                      </div>
                      <div className="project-visual-bottom"><Icon size={16} /><span>{project.type}</span><span className="visual-arrow"><ArrowUpRight size={17} /></span></div>
                    </div>
                    <div className="project-details">
                      <div className="project-title-line"><span className="project-number">{project.number}</span><h3>{project.name}</h3><a href={project.link} target="_blank" rel="noreferrer" aria-label={`View ${project.name} repositories on GitHub`} className="project-external"><ExternalLink size={18} /></a></div>
                      <p>{project.description}</p>
                      <ul className="feature-list">{project.features.map((feature) => <li key={feature}><span>↳</span>{feature}</li>)}</ul>
                      <div className="tag-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    </div>
                  </article>
                )
              })}
            </div>
            <div className="github-callout reveal"><span className="github-callout-icon"><Github size={20} /></span><p>Want to see more of what I’m building?</p><a href={github} target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={15} /></a></div>
          </div>
        </section>

        <section className="section-shell section-pad skills-section" id="skills">
          <div className="section-heading reveal">
            <span className="section-number">03 — TOOLKIT</span>
            <h2>Tools I use to<br /><span>make things work.</span></h2>
          </div>
          <div className="skills-grid">
            {skills.map((skill, index) => {
              const Icon = skill.icon
              return <article className="skill-card reveal" key={skill.title} style={{ transitionDelay: `${index * 80}ms` }}>
                <div className="skill-card-top"><span className="skill-icon"><Icon size={19} /></span><span className="skill-index">0{index + 1}</span></div>
                <h3>{skill.title}</h3>
                <div className="skill-items">{skill.items.map((item) => <span key={item}>{item}</span>)}</div>
              </article>
            })}
          </div>
          <div className="skills-footnote reveal"><span className="footnote-star">✳</span><p>Also bringing problem solving, adaptability, communication, and teamwork to every project.</p></div>
        </section>

        <section className="experience-section section-pad" id="journey">
          <div className="section-shell">
            <div className="section-heading reveal">
              <span className="section-number">04 — THE JOURNEY</span>
              <h2>Learning by <span>building.</span></h2>
            </div>
            <div className="journey-grid">
              <div className="timeline">
                <div className="timeline-entry reveal">
                  <div className="timeline-marker"><BriefcaseBusiness size={16} /></div>
                  <div className="timeline-content">
                    <div className="timeline-meta"><span>JAN — APR 2026</span><span className="current-pill">INTERNSHIP</span></div>
                    <h3>Full Stack Developer Intern</h3>
                    <p className="timeline-company">SSM InfoTech Solution Pvt. Ltd. <span>· Surat</span></p>
                    <p className="timeline-description">Developed and maintained web applications using ASP.NET Core MVC, C#, SQL Server, HTML, CSS and JavaScript. Implemented CRUD features, integrated databases, built responsive interfaces, and worked on SQL query optimisation and database operations.</p>
                    <div className="tag-list"><span>ASP.NET Core MVC</span><span>C#</span><span>SQL Server</span></div>
                  </div>
                </div>
                <div className="timeline-entry reveal">
                  <div className="timeline-marker"><GraduationCap size={17} /></div>
                  <div className="timeline-content">
                    <div className="timeline-meta"><span>2023 — 2026</span><span>EDUCATION</span></div>
                    <h3>B.Tech — Computer Engineering</h3>
                    <p className="timeline-company">MBIT <span>· Madhuben and Bhanubhai Patel Institute of Technology</span></p>
                    <p className="timeline-description">Built a foundation in computer engineering, software development, and database-driven applications.</p>
                    <div className="result-chip">CGPA <b>8.01</b></div>
                  </div>
                </div>
              </div>
              <aside className="education-side reveal">
                <span className="side-label">BEFORE THAT</span>
                {education.slice(1).map((item) => <div className="education-item" key={item.title + item.year}><span className="education-year">{item.year}</span><h4>{item.title}</h4><p>{item.place}</p><span className="education-score">{item.score}</span></div>)}
                <div className="award-card"><div className="award-icon"><Award size={20} /></div><span className="side-label">HIGHLIGHT</span><h4>First Prize Winner</h4><p>Final Year Diploma Mini Project</p><div className="award-rule" /><h4>Mindbend ’25 · SVNIT</h4><p>Selected among the top 55 from 1,200+ participants at the hackathon.</p></div>
              </aside>
            </div>
          </div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="section-shell contact-shell">
            <div className="contact-orb orb-a" /><div className="contact-orb orb-b" />
            <div className="contact-content reveal">
              <span className="section-number">05 — WHAT'S NEXT?</span>
              <p className="contact-kicker">HAVE A PROJECT IN MIND?</p>
              <h2>Let's make<br />something <span>matter.</span></h2>
              <p className="contact-description">Open to opportunities, collaborations, and conversations about building useful software.</p>
              <div className="contact-actions">
                <a href={`mailto:${email}`} className="button button-primary">Say hello <ArrowUpRight size={17} /></a>
                <button className="button button-outline" onClick={copyEmail}>{copied ? <Check size={16} /> : <Mail size={16} />}{copied ? 'Email copied' : 'Copy email'}</button>
              </div>
              <div className="contact-links"><a href={linkedin} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={13} /></a><a href={github} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={13} /></a></div>
            </div>
            <div className="contact-terminal reveal"><div className="terminal-top"><Terminal size={15} /><span>connect.sh</span><div className="window-dots"><i /><i /><i /></div></div><div className="terminal-content"><p><span className="terminal-prompt">$</span> whoami</p><p className="terminal-output">aditya-diwan</p><p><span className="terminal-prompt">$</span> echo $EMAIL</p><p className="terminal-output">{email}</p><p><span className="terminal-prompt">$</span> ./start-a-conversation.sh</p><p className="terminal-success"><span>✓</span> Ready when you are<span className="terminal-cursor">_</span></p></div></div>
          </div>
        </section>
      </main>

      <footer className="footer section-shell">
        <a href="#home" className="footer-brand">ad<span>.</span></a>
        <span>Designed & built with intention.</span>
        <span>© {new Date().getFullYear()} Aditya Diwan</span>
        <a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={13} /></a>
      </footer>
    </>
  )
}

export default App
