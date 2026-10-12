import { useState, useEffect } from 'react'
import {
  Linkedin, Mail, Github, Menu, X,
  Code2, Database, Layers, Check, Send, Award, Trophy, GraduationCap
} from 'lucide-react'
import './App.css'

const email = 'aditya.diwan04@gmail.com'
const github = 'https://github.com/Aditya-Diwan'
const linkedin = 'https://www.linkedin.com/in/aditya-diwan-2b0776200'

// WhatsApp configuration (User can supply their exact number)
const whatsappNumber = '+919999999999'
const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi%20Aditya,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!`

const roles = [
  'Full Stack Developer',
  'ASP.NET Core Developer',
  'C# Specialist',
  'Backend Engineer'
]

const skillsList = [
  { name: 'C#', category: 'Backend' },
  { name: 'ASP.NET Core MVC', category: 'Backend' },
  { name: 'ASP.NET MVC', category: 'Backend' },
  { name: 'Entity Framework Core', category: 'ORM' },
  { name: 'SQL Server', category: 'Database' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'HTML5', category: 'Frontend' },
  { name: 'CSS3', category: 'Frontend' },
  { name: 'RESTful APIs', category: 'Architecture' },
  { name: 'Git & GitHub', category: 'Tools' },
]

export function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('home')

  // Typewriter effect state
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typedText, setTypedText] = useState('')

  // Contact form state
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Typewriter effect logic
  useEffect(() => {
    const currentRole = roles[roleIndex]
    const typingSpeed = isDeleting ? 40 : 100

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentRole.substring(0, charIndex + 1))
        setCharIndex((prev) => prev + 1)
        if (charIndex + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        setTypedText(currentRole.substring(0, charIndex - 1))
        setCharIndex((prev) => prev - 1)
        if (charIndex - 1 === 0) {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, roleIndex])

  // Scroll active spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'education', 'skills', 'projects', 'achievements', 'contact']
      const scrollPos = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNav(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setForm({ name: '', email: '', message: '' })
    }, 4000)
  }

  return (
    <div className="portfolio-app">
      {/* HEADER / NAVBAR */}
      <header className="header">
        <a href="#home" className="header-brand">
          <img src="/logo.png" alt="Aditya Diwan Logo" className="navbar-logo" />
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar">
          <a href="#home" className={activeNav === 'home' ? 'active' : ''}>Home</a>
          <a href="#about" className={activeNav === 'about' ? 'active' : ''}>About</a>
          <a href="#experience" className={activeNav === 'experience' ? 'active' : ''}>Experience</a>
          <a href="#education" className={activeNav === 'education' ? 'active' : ''}>Education</a>
          <a href="#skills" className={activeNav === 'skills' ? 'active' : ''}>Skills</a>
          <a href="#projects" className={activeNav === 'projects' ? 'active' : ''}>Projects</a>
          <a href="#achievements" className={activeNav === 'achievements' ? 'active' : ''}>Achievements</a>
          <a href="#contact" className={activeNav === 'contact' ? 'active' : ''}>Contact</a>
        </nav>

        {/* Mobile Drawer Toggle */}
        <button
          className="drawer-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </header>

      {/* Mobile Side Drawer */}
      {menuOpen && (
        <div className="side-drawer">
          <button className="closebtn" onClick={() => setMenuOpen(false)}>×</button>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#achievements" onClick={() => setMenuOpen(false)}>Achievements</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}

      {/* 1. HOME / LANDING SECTION */}
      <section className="home" id="home">
        <div className="home-content">
          <div className="home-text">
            <h3>Hello, It's Me!</h3>
            <h1>Aditya Diwan</h1>
            <h3>
              And I'm a <span className="typed-text">{typedText}</span>
              <span className="cursor">|</span>
            </h3>

            <p>
              I'm a Full Stack Developer specializing in C#, ASP.NET Core MVC, and Microsoft SQL Server. Dedicated to building reliable, scalable web applications and crafting clean, maintainable software solutions.
            </p>

            {/* Circular Glowing Social Icons */}
            <div className="home-sci">
              <a href={linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href={`mailto:${email}`} title="Email">
                <Mail size={20} />
              </a>
              <a href={github} target="_blank" rel="noreferrer" title="GitHub">
                <Github size={20} />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" title="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.818 2.806.818 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.768-5.767-5.768zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.025-.494-1.623-.676-2.657-2.339-2.737-2.447-.079-.109-.646-.86-.646-1.637 0-.776.406-1.159.55-1.317.144-.159.314-.199.418-.199.105 0 .21.002.302.007.098.005.228-.037.357.273.131.317.447 1.092.486 1.171.04.079.066.172.013.277-.052.106-.079.172-.158.264-.079.092-.165.206-.236.277-.079.079-.161.165-.069.324.092.158.409.675.877 1.091.603.536 1.11.702 1.268.781.158.079.25.066.342-.04.092-.105.394-.461.499-.619.106-.158.21-.132.355-.079.145.053.918.434 1.076.513.158.079.263.118.302.184.04.066.04.382-.104.787zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.3c1.472.82 3.161 1.3 4.975 1.3 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                </svg>
              </a>
            </div>

            {/* Glowing CTA Buttons */}
            <div className="home-btn-group">
              <a href="#about" className="btn-box">More About Me</a>
              <a href={github} target="_blank" rel="noreferrer" className="btn-box download-resume">
                Download Resume
              </a>
            </div>
          </div>

          {/* Right Column: Authentic 3D Blue Logo in Glow Frame */}
          <div className="home-photo">
            <div className="photo-glow-circle">
              <img src="/logo.png" alt="Aditya Diwan" className="hero-logo-img" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT ME SECTION */}
      <section className="about" id="about">
        <div className="about-img">
          <div className="about-logo-frame">
            <img src="/logo.png" alt="Aditya Diwan Logo" className="about-logo" />
          </div>
        </div>
        <div className="about-text">
          <h2>About <span>Me</span></h2>
          <h4>Full Stack Developer ...</h4>
          <p>
            Hello, I'm Aditya Diwan, a dedicated Full Stack Developer specializing in the .NET ecosystem. I build end-to-end web applications with clean architecture, robust relational databases, and responsive user interfaces.
          </p>
          <p>
            I have industry experience as a Full Stack Developer Intern at SSM InfoTech Solution Pvt. Ltd. (Surat), developing modules using ASP.NET Core MVC, C#, SQL Server, and JavaScript. My achievements include securing First Prize in the Final Year Diploma Mini Project and being recognized in the Top 55 out of 1,200+ participants at the national Mindbend '25 Hackathon at SVNIT.
          </p>
          <div className="about-btn-row">
            <a href="#contact" className="btn-box">Contact Me</a>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE SECTION */}
      <section className="timeline" id="experience">
        <h1 className="sub-title"><span>Experience </span>Timeline</h1>
        <div className="timeline-container">
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-date">Jan 2026 — Apr 2026</div>
            <div className="timeline-content">
              <h3>Full Stack Developer Intern @ SSM InfoTech Solution Pvt. Ltd.</h3>
              <p>
                Developed and maintained enterprise web applications using ASP.NET Core MVC, C#, SQL Server, HTML5, CSS3, and JavaScript. Built full CRUD pipelines, integrated Entity Framework Core, and optimized SQL queries for maximum throughput.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-date">2024 — Present</div>
            <div className="timeline-content">
              <h3>Full Stack Project Development &amp; Competitive Hackathons</h3>
              <p>
                Architected production-ready platforms including Elite Cars (Car Rental Management) and TuneSync (Music Web App). Competed at SVNIT Mindbend '25 Hackathon, finishing in the Top 55 among 1,200+ participants nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SEPARATE EDUCATION SECTION */}
      <section className="timeline education-section" id="education">
        <h1 className="sub-title"><span>Educational </span>Journey</h1>
        <div className="timeline-container">
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-date">2023 — 2026</div>
            <div className="timeline-content">
              <h3>B.Tech — Computer Engineering @ MBIT</h3>
              <p>
                Madhuben and Bhanubhai Patel Institute of Technology • <strong>CGPA: 8.01 / 10</strong>. Rigorous study in Database Management Systems (DBMS), Advanced OOP with C#/.NET, Computer Networks, and Software Engineering.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-date">2020 — 2023</div>
            <div className="timeline-content">
              <h3>Diploma — Information Technology @ Tapi Diploma Engineering College</h3>
              <p>
                Tapi Diploma Engineering College, Surat • <strong>CGPA: 7.76 / 10</strong>. Foundation in software engineering, C/C++ programming, relational databases, and web development. Awarded First Prize in the Final Year Mini Project.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-date">2020</div>
            <div className="timeline-content">
              <h3>SSC — Secondary School Certificate @ Smt. I. N. Tekrawala High School</h3>
              <p>
                Gujarat Secondary and Higher Secondary Education Board (GSEB), Surat • <strong>67%</strong>. Built analytical, mathematical, and problem-solving foundations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SKILLS SECTION */}
      <section className="skills-section" id="skills">
        <h1 className="sub-title">My <span>Skills</span></h1>
        <div className="container">
          <div className="skills-container">
            {skillsList.map((skill) => (
              <div className="skill" key={skill.name}>
                <div className="skill-icon">
                  {skill.name.includes('SQL') || skill.name.includes('Framework') ? (
                    <Database size={32} />
                  ) : skill.name.includes('APIs') || skill.name.includes('Git') ? (
                    <Layers size={32} />
                  ) : (
                    <Code2 size={32} />
                  )}
                </div>
                <div className="skill-name">{skill.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROJECTS SECTION */}
      <section className="projects" id="projects">
        <h1 className="sub-title"><span>My </span>Projects</h1>
        <div className="projects-container">
          {/* Project 1 */}
          <div className="project">
            <div className="project-info">
              <h3>1. Elite Cars — Car Rental Management System</h3>
              <p>
                A full-stack car rental platform featuring vehicle fleet management, role-based access control for Admins and Customers, real-time availability tracking, and integrated Stripe payment processing.
              </p>
              <div className="project-tags">
                <span>ASP.NET Core MVC</span>
                <span>EF Core</span>
                <span>SQL Server</span>
                <span>Stripe API</span>
              </div>
              <div className="project-links">
                <a
                  href={`${github}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-box"
                >
                  GitHub Repo
                </a>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="project">
            <div className="project-info">
              <h3>2. TuneSync — Music Streaming Web Application</h3>
              <p>
                A comprehensive music web application built with distinct experiences for listeners, artists, and administrators. Includes protected routes, playlist management, and normalized SQL Server audio libraries.
              </p>
              <div className="project-tags">
                <span>ASP.NET MVC</span>
                <span>C# .NET</span>
                <span>SQL Server</span>
                <span>JavaScript</span>
              </div>
              <div className="project-links">
                <a
                  href={`${github}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-box"
                >
                  GitHub Repo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. KEY ACHIEVEMENTS SECTION (Directly above Contact) */}
      <section className="achievements" id="achievements">
        <h1 className="sub-title">Key <span>Achievements</span></h1>
        <div className="achievements-container">
          <div className="achievement-box">
            <div className="ach-icon-circle">
              <Award size={32} />
            </div>
            <h3>1st Prize Winner — Mini Project</h3>
            <h4>Final Year Diploma Engineering Exhibition</h4>
            <p>
              Secured First Place for developing and presenting an outstanding software application solving real practical workflows, evaluated by departmental faculty and judges.
            </p>
          </div>

          <div className="achievement-box">
            <div className="ach-icon-circle">
              <Trophy size={32} />
            </div>
            <h3>Top 55 Finalist — Mindbend '25</h3>
            <h4>National Hackathon @ SVNIT, Surat</h4>
            <p>
              Selected among the top 55 teams out of 1,200+ participants from engineering colleges across India, executing an innovative project under tight hackathon constraints.
            </p>
          </div>

          <div className="achievement-box">
            <div className="ach-icon-circle">
              <GraduationCap size={32} />
            </div>
            <h3>Academic Distinction — 8.01 CGPA</h3>
            <h4>B.Tech in Computer Engineering @ MBIT</h4>
            <p>
              Maintained consistent academic distinction across semesters with an aggregate 8.01 CGPA, combining engineering theory with practical software development.
            </p>
          </div>
        </div>
      </section>

      {/* 8. CONTACT SECTION */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-content">
            <h2>Contact <span>Me !</span></h2>
            <p className="contact-sub">Let's work together!</p>

            {/* Glowing Social Circles */}
            <div className="social-icons">
              <a href={linkedin} target="_blank" rel="noreferrer" title="LinkedIn">
                <Linkedin size={22} />
              </a>
              <a href={`mailto:${email}`} title="Email">
                <Mail size={22} />
              </a>
              <a href={github} target="_blank" rel="noreferrer" title="GitHub">
                <Github size={22} />
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" title="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.697c.969.529 1.777.818 2.806.818 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.768-5.767-5.768zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.06-2.025-.494-1.623-.676-2.657-2.339-2.737-2.447-.079-.109-.646-.86-.646-1.637 0-.776.406-1.159.55-1.317.144-.159.314-.199.418-.199.105 0 .21.002.302.007.098.005.228-.037.357.273.131.317.447 1.092.486 1.171.04.079.066.172.013.277-.052.106-.079.172-.158.264-.079.092-.165.206-.236.277-.079.079-.161.165-.069.324.092.158.409.675.877 1.091.603.536 1.11.702 1.268.781.158.079.25.066.342-.04.092-.105.394-.461.499-.619.106-.158.21-.132.355-.079.145.053.918.434 1.076.513.158.079.263.118.302.184.04.066.04.382-.104.787zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.179L2 22l4.957-1.3c1.472.82 3.161 1.3 4.975 1.3 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                </svg>
              </a>
            </div>

            {/* Clean Direct Message Form */}
            <form onSubmit={handleSubmit} className="contact-form-clean">
              {formSubmitted ? (
                <div className="form-success-badge">
                  <Check size={20} />
                  <span>Message sent successfully! I'll reply to your email soon.</span>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter Your Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                  <button type="submit" className="btn-box submit-btn">
                    <span>Send Message</span>
                    <Send size={16} />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="last-text">
        <p>© Coding excellence at your service - developed by Aditya Diwan</p>
      </div>
    </div>
  )
}

export default App
