import { useState, useEffect } from 'react'
import {
  Linkedin, Mail, Github, Menu, X, MapPin,
  Check, Send, Award, Trophy, Loader2, AlertCircle
} from 'lucide-react'
import emailjs from '@emailjs/browser'
import './App.css'

// Exact details from Resume
const name = 'Aditya Diwan'
const location = 'Surat, Gujarat'
const phone = '8320437612'
const email = 'aditya.diwan04@gmail.com'
const linkedin = 'http://www.linkedin.com/in/aditya-diwan-2b0776200'
const github = 'https://github.com/Aditya-Diwan'

// WhatsApp URL with verified phone number from resume (only used in WhatsApp logo)
const whatsappUrl = `https://wa.me/91${phone}?text=Hi%20Aditya,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!`

// Previous roles kept intact + SQL Developer added (rotating every 3-4 seconds)
const roles = [
  'Full Stack Developer',
  'SQL Developer',
  'ASP.NET Core Developer',
  'Backend Engineer'
]

// C# & .NET Development Skills (Shows First)
const csharpSkills = [
  'C#',
  'ASP.NET Core MVC',
  'ASP.NET MVC',
  'Entity Framework Core',
  'HTML & CSS',
  'JavaScript'
]

// Database & SQL Skills (Shows Second)
const databaseSkills = [
  'Microsoft SQL Server (MSSQL)',
  'SQL Server Management Studio (SSMS)',
  'Basic & Advanced SQL',
  'Stored Procedures & T-SQL',
  'Database Management',
  'Query Optimization'
]

// Exact Official WhatsApp SVG Icon
const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    style={{ display: 'inline-block', verticalAlign: 'middle' }}
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.25 8.24-8.25M8.53 7.33c-.16 0-.42.06-.64.3-.23.25-.87.85-.87 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28-.25-.13-1.47-.73-1.7-.82-.23-.09-.39-.13-.56.12-.17.25-.65.82-.8.98-.15.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.01-.39.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43z" />
  </svg>
)

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
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // Typewriter effect logic (rotates every 3-4 seconds)
  useEffect(() => {
    const currentRole = roles[roleIndex]
    const typingSpeed = isDeleting ? 40 : 90

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentRole.substring(0, charIndex + 1))
        setCharIndex((prev) => prev + 1)
        if (charIndex + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 3500)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message || isSending) return

    setIsSending(true)
    setErrorMessage('')

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_8mzttj8'
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_8pg2dos'
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'bVi-vMvqp0EW0oM96'

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        publicKey
      )

      setFormSubmitted(true)
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => {
        setFormSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error('EmailJS error:', error)
      setErrorMessage('Failed to send message. Please try again or reach out directly.')
    } finally {
      setIsSending(false)
    }
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

      {/* 1. HOME / LANDING SECTION (No social links here - purely in Contact section) */}
      <section className="home" id="home">
        <div className="home-content">
          <div className="home-text">
            <h3>Hello, It's Me!</h3>
            <h1>{name}</h1>
            <h3>
              And I'm a <span className="typed-text">{typedText}</span>
              <span className="cursor">|</span>
            </h3>

            {/* Dedicated Database & SQL Developer Summary */}
            <p>
              Computer Engineering graduate from CVM with hands-on experience in Database Management, SQL Querying, and Full Stack Web Development. Proficient in Microsoft SQL Server, Basic &amp; Advanced SQL, ASP.NET MVC, C#, HTML, and CSS.
            </p>

            {/* Clean CTA Buttons: Reassigned to About Me & Direct Resume Download */}
            <div className="home-btn-group">
              <a href="#about" className="btn-box">About Me</a>
              <a
                href="/Aditya_Diwan_Resume.pdf"
                download="Aditya_Diwan_Resume.pdf"
                className="btn-box download-resume"
                title="Download Aditya Diwan's Resume"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* Right Column: Developer Snapshot & Quick Highlights Card */}
          <div className="home-photo">
            <div className="dev-snapshot-card">
              <div className="snapshot-header">
                <div className="status-indicator">
                  <span className="pulse-dot" />
                  <span className="status-text">Available for Opportunities</span>
                </div>
                <span className="location-chip">Surat, Gujarat</span>
              </div>

              <div className="snapshot-stat-grid">
                <div className="stat-card">
                  <span className="stat-value">8.01</span>
                  <span className="stat-label">B.Tech CGPA</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">1st Prize</span>
                  <span className="stat-label">Project Winner</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">Top 55</span>
                  <span className="stat-label">SVNIT Hackathon</span>
                </div>
                <div className="stat-card">
                  <span className="stat-value">Intern</span>
                  <span className="stat-label">SSM InfoTech</span>
                </div>
              </div>

              <div className="snapshot-focus-box">
                <div className="focus-header">Core Expertise</div>
                <div className="focus-tags">
                  <span className="focus-tag">C#</span>
                  <span className="focus-tag">ASP.NET MVC Core</span>
                  <span className="focus-tag">SSMS</span>
                  <span className="focus-tag">MSSQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT ME SECTION (Clean Layout with Location Arranged beside Contact Me) */}
      <section className="about" id="about">
        <div className="about-img">
          <div className="about-photo-card">
            <div className="about-photo-glow-border">
              <img
                src="/aditya.jpg"
                alt="Aditya Diwan"
                className="about-portrait-img"
              />
            </div>
            <div className="about-photo-badge">
              <span className="photo-badge-name">Aditya Diwan</span>
              <span className="photo-badge-role">.NET Developer</span>
              <span className="photo-badge-loc">
                <MapPin size={13} /> {location}
              </span>
            </div>
          </div>
        </div>
        <div className="about-text">
          <h2>About <span>Me</span></h2>
          <h4>.NET Developer</h4>
          <p>
            I am a passionate and dedicated .NET Developer with a strong foundation in C#, ASP.NET Core MVC, SQL Server, HTML, CSS, and JavaScript. I enjoy building user-friendly, responsive, and efficient web applications while continuously improving my technical skills.
          </p>
          <p>
            As a motivated fresher, I am eager to learn new technologies, solve challenging problems, and contribute to innovative software solutions. I am looking for opportunities to grow professionally, collaborate with experienced developers, and apply my knowledge to real-world applications.
          </p>
          <div className="about-btn-row">
            <a href="#contact" className="btn-box">Contact Me</a>
            <div className="about-location-pill">
              <MapPin size={15} /> <span>{location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WORK EXPERIENCE SECTION */}
      <section className="timeline" id="experience">
        <h1 className="sub-title"><span>Work </span>Experience</h1>
        <div className="timeline-container">
          {/* Work Experience from Resume */}
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-date">1 Jan 2026 — 30 April 2026</div>
            <div className="timeline-content">
              <h3>Full Stack Developer Intern (ASP.NET Core MVC)</h3>
              <h4 className="exp-company-sub">SSM InfoTech Solution Pvt. Ltd. • Surat, Gujarat</h4>
              <ul className="exp-bullet-list">
                <li>Developed and maintained web applications using ASP.NET Core MVC, C#, SQL Server, HTML, CSS, JavaScript.</li>
                <li>Implemented CRUD operations, database integration, and responsive user interfaces, improving application functionality and user experience.</li>
                <li>Wrote and optimized SQL queries, managed database operations, and enhanced data retrieval performance for business applications.</li>
              </ul>
            </div>
          </div>

          {/* Summer Internship from Certificate */}
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-date">May 28, 2025 — June 11, 2025</div>
            <div className="timeline-content">
              <h3>Summer Internship on Basic and Advance SQL</h3>
              <h4 className="exp-company-sub">SSM Learning Excellence Centre (Powered By: SSM InfoTech Solutions Pvt. Ltd.) • Surat, Gujarat</h4>
              <p>
                Successfully accomplished summer internship on Basic and Advance SQL, mastering query optimization, database design, stored procedures, and relational data management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EDUCATION SECTION (Degree in BIG font, College name in NORMAL readable font, City mentioned clearly) */}
      <section className="timeline education-section" id="education">
        <h1 className="sub-title"><span>My </span>Education</h1>
        <div className="timeline-container">
          {/* B.Tech */}
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content edu-clean-card">
              <h2 className="edu-degree-big">Bachelor's Degree in Technology — Computer Engineering</h2>
              <h3 className="edu-college-name">Madhuben and Bhanubhai Patel Institute of technology (MBIT)</h3>
              <p className="edu-city-location"><MapPin size={14} /> Anand, Gujarat</p>
              <div className="edu-meta-row">
                <span className="edu-year-tag">2026</span>
                <span className="edu-score-pill">CGPA: 8.01</span>
              </div>
            </div>
          </div>

          {/* Diploma */}
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content edu-clean-card">
              <h2 className="edu-degree-big">Diploma in Information Technology</h2>
              <h3 className="edu-college-name">Tapi Diploma Engineering College</h3>
              <p className="edu-city-location"><MapPin size={14} /> Surat, Gujarat</p>
              <div className="edu-meta-row">
                <span className="edu-year-tag">2023</span>
                <span className="edu-score-pill">CGPA: 7.76</span>
              </div>
            </div>
          </div>

          {/* SSC */}
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content edu-clean-card">
              <h2 className="edu-degree-big">SSC — GSEB</h2>
              <h3 className="edu-college-name">Smt. I. N. Tekrawala High School</h3>
              <p className="edu-city-location"><MapPin size={14} /> Surat, Gujarat</p>
              <div className="edu-meta-row">
                <span className="edu-year-tag">2020</span>
                <span className="edu-score-pill">Percentage: 67%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SKILLS SECTION (C# Section First, then Database Section) */}
      <section className="skills-section" id="skills">
        <h1 className="sub-title">My <span>Skills</span></h1>
        
        <div className="skills-category-group">
          {/* C# Section First */}
          <div className="skill-category-block">
            <h3 className="skill-category-title">C# &amp; .NET Development</h3>
            <div className="skills-badges-wrapper">
              {csharpSkills.map((skill) => (
                <div className="skill-badge" key={skill}>
                  {skill}
                </div>
              ))}
            </div>
          </div>

          {/* Database Section Second */}
          <div className="skill-category-block">
            <h3 className="skill-category-title">Database &amp; SQL</h3>
            <div className="skills-badges-wrapper">
              {databaseSkills.map((skill) => (
                <div className="skill-badge" key={skill}>
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROJECTS SECTION (Word for Word from Resume) */}
      <section className="projects" id="projects">
        <h1 className="sub-title"><span>My </span>Projects</h1>
        <div className="projects-container">
          {/* 1st Project: Elite cars */}
          <div className="project">
            <div className="project-info">
              <h3>Elite cars (Car Rental Management System | ASP.NET Core MVC)</h3>
              <ul className="project-bullet-list">
                <li>Built a Car Rental Management System using ASP.NET Core MVC, EF Core, and SQL Server.</li>
                <li>Implemented role-based authentication, vehicle booking, and rental management features.</li>
                <li>Integrated Stripe Payment Gateway for secure online payments and transaction processing.</li>
              </ul>
              <div className="project-tech-section">
                <span className="project-tech-label">Technologies Used:</span>
                <div className="project-tags">
                  <span>ASP.NET Core MVC</span>
                  <span>EF Core</span>
                  <span>SQL Server</span>
                  <span>Stripe API</span>
                </div>
              </div>
              <div className="project-links">
                <a
                  href="https://github.com/Aditya-Diwan/CarRentaleSystem"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-box"
                >
                  GitHub Repo
                </a>
              </div>
            </div>
          </div>

          {/* 2nd Project: TuneSync */}
          <div className="project">
            <div className="project-info">
              <h3>TuneSync (Music Web App | ASP.NET MVC)</h3>
              <ul className="project-bullet-list">
                <li>Developed a full-stack music streaming platform featuring separate Admin, Artist, and User panels.</li>
                <li>Implemented role-based authentication and authorization to provide secure access for different user roles.</li>
                <li>Built core functionalities including song management, playlist creation, and database integration for efficient data handling.</li>
              </ul>
              <div className="project-tech-section">
                <span className="project-tech-label">Technologies Used:</span>
                <div className="project-tags">
                  <span>ASP.NET MVC</span>
                  <span>C#</span>
                  <span>SQL Server</span>
                  <span>JavaScript</span>
                </div>
              </div>
              <div className="project-links">
                <a
                  href="https://github.com/Aditya-Diwan/MusicWeb"
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

      {/* 7. CERTIFICATIONS & AWARDS (Directly from Resume, above Contact) */}
      <section className="achievements" id="achievements">
        <h1 className="sub-title">Certifications &amp; <span>Awards</span></h1>
        <div className="achievements-container">
          <div className="achievement-box">
            <div className="ach-icon-circle">
              <Award size={32} />
            </div>
            <h3>First Prize Winner</h3>
            <h4>Final Year Diploma Mini Project</h4>
            <p>
              Awarded First Prize for developing and executing an exceptional project in the Final Year Diploma Engineering Exhibition.
            </p>
          </div>

          <div className="achievement-box">
            <div className="ach-icon-circle">
              <Trophy size={32} />
            </div>
            <h3>Top 55 Finalist</h3>
            <h4>Mindbend '25 Hackathon @ SVNIT</h4>
            <p>
              Selected in top 55 from 1,200+ participants at the national hackathon hosted by Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat.
            </p>
          </div>
        </div>
      </section>

      {/* 8. CONTACT SECTION (All links are exclusively showcased here!) */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="contact-content">
            <h2>Contact <span>Me !</span></h2>
            <p className="contact-sub">Let's work together!</p>

            {/* Glowing Social Circles - Exclusively in Contact section */}
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
                <WhatsAppIcon size={22} />
              </a>
            </div>

            <p className="contact-location-direct">
              <MapPin size={16} /> Location: <span>{location}</span>
            </p>

            {/* Clean Direct Message Form */}
            <form onSubmit={handleSubmit} className="contact-form-clean">
              {formSubmitted ? (
                <div className="form-success-badge">
                  <Check size={20} />
                  <span>Message sent successfully! I'll reply to your email soon.</span>
                </div>
              ) : (
                <>
                  {errorMessage && (
                    <div className="form-error-badge">
                      <AlertCircle size={18} />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                  <input
                    type="text"
                    required
                    placeholder="Enter Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    disabled={isSending}
                  />
                  <input
                    type="email"
                    required
                    placeholder="Enter Your Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    disabled={isSending}
                  />
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter Your Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    disabled={isSending}
                  />
                  <button type="submit" className="btn-box submit-btn" disabled={isSending}>
                    {isSending ? (
                      <>
                        <span>Sending...</span>
                        <Loader2 size={16} className="btn-spinner" />
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div className="last-text">
        <p className="footer-left">Designed &amp; Developed by Aditya Diwan.</p>
        <p className="footer-right">© 2026 Aditya Diwan. All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default App
