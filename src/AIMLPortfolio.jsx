import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    emoji: "⚔️",
    title: "Argus — Real-Time AI Debate Platform",
    desc: "Real-time 2-player debate arena with server-authoritative Socket.io state sync, sub-100ms event propagation, and a multi-model ML scoring pipeline (DistilBERT, BART, Sentence-BERT) across 4 weighted dimensions producing live 0–100 scores.",
    tags: ["React", "FastAPI", "Socket.io", "PyTorch", "HuggingFace"],
    accent: "#0f3460",
    metric: "sub-100ms",
    link: "https://github.com/Swap-24/ARGUS",
  },
  {
    emoji: "💬",
    title: "AI Document Q&A System (RAG)",
    desc: "Retrieval-Augmented Generation pipeline for natural-language Q&A over multi-page PDFs using ChromaDB vector embeddings and FLAN-T5, with session-persistent conversation history and zero hallucination on 50+ page documents.",
    tags: ["Python", "Streamlit", "FLAN-T5", "ChromaDB"],
    accent: "#1a1a2e",
    metric: "50+ pg PDFs",
    link: "https://github.com/H-d12s/rag-document-answer-chatbot",
  },
  {
    emoji: "🤖",
    title: "AI Physics Study Buddy",
    desc: "8-node agentic LangGraph pipeline with conditional routing to ChromaDB RAG, calculator tool, or memory-only responses. Self-reflection eval node scores faithfulness and auto-retries below 0.7 to prevent hallucination.",
    tags: ["LangGraph", "ChromaDB", "Groq LLM", "Sentence-BERT", "Streamlit"],
    accent: "#16213e",
    metric: "Agentic RAG",
    link: "https://github.com/H-d12s/physics-study-buddy",
  },
  {
    emoji: "🎙️",
    title: "Voice-Controlled Spotify App",
    desc: "Custom CNN trained on Mel spectrogram representations to classify 4 voice commands with high accuracy, integrated with Spotify Web API for real-time hands-free playback. End-to-end ML deployment from raw audio to live app.",
    tags: ["PyTorch", "Spotify API", "librosa", "Python"],
    accent: "#0d2137",
    metric: "4 commands",
    link: "https://github.com/H-d12s/voice-controlled-spotify",
  },
  {
    emoji: "🤟",
    title: "Sign Language ASL Recognition",
    desc: "Real-time A–Z American Sign Language recognition using a PyTorch CNN trained on MediaPipe hand landmark data. Dataset of 2,600+ images (100/class) with strong per-class accuracy across all 26 ASL letters.",
    tags: ["PyTorch", "MediaPipe", "OpenCV", "CNN"],
    accent: "#0a1628",
    metric: "26,000+ imgs",
    link: "https://github.com/H-d12s/hand-sign-asl-detection",
  },
];

const SKILLS = [
  { category: "Languages", items: ["Python", "C++", "C#", "Java", "C", "SQL"] },
  { category: "ML / AI", items: ["PyTorch",  "Scikit-learn", "CNN", "NLP"] },
  { category: "LLM & GenAI", items: ["HuggingFace", "DistilBERT", "BART", "FLAN-T5", "RAG", "LangGraph"] },
  { category: "Frameworks", items: ["FastAPI", "Flask", "Streamlit", "React", "Node.js", "Socket.io"] },
  { category: "Databases", items: ["ChromaDB", "MongoDB", "MySQL", "Firebase"] },
  { category: "Dev Tools", items: ["Git", "Docker", "REST APIs", "WebSockets", "Unity"] },
];

function NeuralBackground() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
    }));

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100,180,255,${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100,180,255,0.5)";
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [typed, setTyped] = useState("");
  const roles = ["AI/ML Engineer",  "Deep Learning Practitioner", "Agentic AI Builder"];
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setTyped(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), 1400);
        else setCharIdx((c) => c + 1);
      } else {
        setTyped(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setRoleIdx((r) => (r + 1) % roles.length);
          setCharIdx(0);
        } else setCharIdx((c) => c - 1);
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  const S = {
    page: {
      fontFamily: "'DM Mono', 'Courier New', monospace",
      background: "#080c14",
      color: "#c8d8e8",
      minHeight: "100vh",
    },
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      borderBottom: "1px solid rgba(100,180,255,0.12)",
      position: "sticky",
      top: 0,
      background: "rgba(8,12,20,0.92)",
      backdropFilter: "blur(12px)",
      zIndex: 100,
    },
    logo: {
      fontFamily: "'DM Mono', monospace",
      fontSize: 16,
      fontWeight: 700,
      color: "#64b4ff",
      letterSpacing: "0.08em",
    },
    navLink: (active) => ({
      fontSize: 12,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: active ? "#64b4ff" : "rgba(200,216,232,0.5)",
      cursor: "pointer",
      background: "none",
      border: "none",
      fontFamily: "inherit",
      padding: "4px 0",
      borderBottom: active ? "1px solid #64b4ff" : "1px solid transparent",
      transition: "color 0.2s, border-color 0.2s",
    }),
    hero: {
      position: "relative",
      minHeight: 520,
      display: "flex",
      alignItems: "center",
      padding: "5rem 2rem 4rem",
      overflow: "hidden",
    },
    heroContent: { position: "relative", zIndex: 2, maxWidth: 600 },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontSize: 11,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "#64b4ff",
      border: "1px solid rgba(100,180,255,0.3)",
      borderRadius: 4,
      padding: "4px 12px",
      marginBottom: "1.5rem",
    },
    dot: { width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" },
    h1: {
      fontSize: "clamp(32px,5vw,52px)",
      fontWeight: 700,
      lineHeight: 1.1,
      color: "#e8f4ff",
      marginBottom: "0.5rem",
      letterSpacing: "-0.02em",
    },
    typeRow: {
      fontSize: "clamp(16px,2.5vw,22px)",
      color: "#64b4ff",
      marginBottom: "1.5rem",
      minHeight: 32,
      fontWeight: 400,
    },
    cursor: { display: "inline-block", width: 2, height: "1em", background: "#64b4ff", marginLeft: 2, animation: "blink 1s step-end infinite", verticalAlign: "text-bottom" },
    heroPara: { fontSize: 14, lineHeight: 1.8, color: "rgba(200,216,232,0.7)", maxWidth: 480, marginBottom: "2rem" },
    btnRow: { display: "flex", gap: 12, flexWrap: "wrap" },
    btnPrimary: {
      background: "#64b4ff",
      color: "#080c14",
      border: "none",
      padding: "10px 24px",
      borderRadius: 6,
      fontSize: 12,
      fontFamily: "inherit",
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      cursor: "pointer",
    },
    btnOutline: {
      background: "transparent",
      color: "#64b4ff",
      border: "1px solid rgba(100,180,255,0.4)",
      padding: "10px 24px",
      borderRadius: 6,
      fontSize: 12,
      fontFamily: "inherit",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      cursor: "pointer",
    },
    section: { padding: "3rem 2rem", borderTop: "1px solid rgba(100,180,255,0.08)", maxWidth: 860, margin: "0 auto" },
    sectionLabel: { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#64b4ff", marginBottom: "0.5rem" },
    sectionTitle: { fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, color: "#e8f4ff", marginBottom: "2rem", letterSpacing: "-0.02em" },
    statsRow: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: "2rem" },
    statCard: { background: "rgba(100,180,255,0.05)", border: "1px solid rgba(100,180,255,0.12)", borderRadius: 10, padding: "1.2rem", textAlign: "center" },
    statNum: { fontSize: 28, fontWeight: 700, color: "#64b4ff", marginBottom: 4 },
    statLabel: { fontSize: 11, color: "rgba(200,216,232,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" },
    eduBox: {
      background: "rgba(100,180,255,0.04)",
      border: "1px solid rgba(100,180,255,0.1)",
      borderRadius: 10,
      padding: "1.2rem 1.5rem",
      marginBottom: 12,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: 8,
    },
    eduLeft: {},
    eduInst: { fontSize: 14, fontWeight: 700, color: "#e8f4ff", marginBottom: 3 },
    eduDeg: { fontSize: 12, color: "rgba(200,216,232,0.6)" },
    eduRight: { textAlign: "right" },
    eduYear: { fontSize: 11, color: "#64b4ff", letterSpacing: "0.08em", marginBottom: 3 },
    eduGrade: { fontSize: 12, color: "rgba(200,216,232,0.5)" },
    projectGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 },
    projectCard: (accent) => ({
      background: accent,
      border: "1px solid rgba(100,180,255,0.12)",
      borderRadius: 12,
      overflow: "hidden",
      transition: "transform 0.2s, border-color 0.2s",
      cursor: "default",
    }),
    projectTop: { padding: "1.5rem 1.5rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    projectEmoji: { fontSize: 28 },
    metric: { fontSize: 11, color: "#64b4ff", border: "1px solid rgba(100,180,255,0.3)", borderRadius: 20, padding: "3px 10px", letterSpacing: "0.05em" },
    projectBody: { padding: "0 1.5rem 1.5rem" },
    projectTitle: { fontSize: 15, fontWeight: 700, color: "#e8f4ff", marginBottom: 6 },
    projectDesc: { fontSize: 13, lineHeight: 1.7, color: "rgba(200,216,232,0.6)", marginBottom: 12 },
    tagRow: { display: "flex", gap: 6, flexWrap: "wrap" },
    tag: { fontSize: 10, padding: "3px 8px", borderRadius: 4, background: "rgba(100,180,255,0.1)", color: "#64b4ff", letterSpacing: "0.05em" },
    skillsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 },
    skillGroup: { background: "rgba(100,180,255,0.04)", border: "1px solid rgba(100,180,255,0.1)", borderRadius: 10, padding: "1.2rem" },
    skillCat: { fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "#64b4ff", marginBottom: "0.75rem" },
    skillItem: { fontSize: 13, color: "rgba(200,216,232,0.7)", padding: "4px 0", borderBottom: "1px solid rgba(100,180,255,0.06)", lineHeight: 1.5 },
    contactBox: { background: "rgba(100,180,255,0.04)", border: "1px solid rgba(100,180,255,0.12)", borderRadius: 14, padding: "2.5rem", textAlign: "center" },
    contactTitle: { fontSize: 26, fontWeight: 700, color: "#e8f4ff", marginBottom: 8 },
    contactSub: { fontSize: 14, color: "rgba(200,216,232,0.6)", marginBottom: "2rem", lineHeight: 1.7 },
    linkRow: { display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" },
    clink: (href) => ({
      fontSize: 12,
      padding: "8px 20px",
      borderRadius: 6,
      border: "1px solid rgba(100,180,255,0.25)",
      color: "#64b4ff",
      background: "transparent",
      fontFamily: "inherit",
      cursor: href ? "pointer" : "default",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      textDecoration: "none",
      display: "inline-block",
    }),
    footer: { textAlign: "center", padding: "1.5rem", fontSize: 11, color: "rgba(200,216,232,0.25)", letterSpacing: "0.08em", borderTop: "1px solid rgba(100,180,255,0.06)" },
  };

  return (
    <div style={S.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
      `}</style>

      <nav style={S.nav}>
        <div style={S.logo}>{"<adrish.dev />"}</div>
        <div style={{ display: "flex", gap: 24 }}>
          {NAV_LINKS.map((l) => (
            <button key={l} style={S.navLink(activeSection === l)} onClick={() => {
  setActiveSection(l);
  document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
}}>{l}</button>
          ))}
        </div>
      </nav>

      <div style={S.hero}>
        <NeuralBackground />
        <div style={S.heroContent}>
          <div style={S.badge}>
            <div style={S.dot} />
            Open to internship opportunities
          </div>
          <h1 style={S.h1}>Adrish Sarkar</h1>
          <div style={S.typeRow}>
            {typed}<span style={S.cursor} />
          </div>
          <p style={S.heroPara}>
            Fourth-year CS student at KIIT building end-to-end intelligent systems — from real-time ML pipelines to agentic LLM architectures. Turning research into production-grade impact.
          </p>
          <div style={S.btnRow}>
            <button style={S.btnPrimary} onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}>
              View Projects
            </button>
            <button
              style={S.btnOutline}
              onClick={() => window.open("https://mail.google.com/mail/?view=cm&to=adrishsarkar15@gmail.com", "_blank")}
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* ABOUT */}
        <div id="about" style={S.section}>
          <FadeIn>
            <div style={S.sectionLabel}>01 — About</div>
            <div style={S.sectionTitle}>Who I Am</div>
          </FadeIn>
          <FadeIn delay={0.1}>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: "rgba(200,216,232,0.7)", marginBottom: "2rem", maxWidth: 620, textAlign: "left" }}>
              I'm a fourth-year B.Tech Computer Science student at KIIT with a passion for building and shipping intelligent systems independently. From real-time ML scoring pipelines to agentic RAG chatbots, I bridge the gap between cutting-edge AI research and production-ready engineering.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={S.statsRow}>
              <div style={S.statCard}><div style={S.statNum}>8.65</div><div style={S.statLabel}>CGPA / 10</div></div>
              <div style={S.statCard}><div style={S.statNum}>8+</div><div style={S.statLabel}>Projects Shipped</div></div>
              <div style={S.statCard}><div style={S.statNum}>2027</div><div style={S.statLabel}>Graduation</div></div>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ marginTop: "0.5rem" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#e8f4ff", marginBottom: "1rem", letterSpacing: "0.05em" }}>Education</div>
              <div style={S.eduBox}>
                <div style={S.eduLeft}>
                  <div style={S.eduInst}>Kalinga Institute of Industrial Technology (KIIT)</div>
                  <div style={S.eduDeg}>B.Tech — Computer Science & Engineering</div>
                </div>
                <div style={S.eduRight}>
                  <div style={S.eduYear}>2023 – 2027</div>
                  <div style={S.eduGrade}>CGPA: 8.65 / 10.0</div>
                </div>
              </div>
              <div style={S.eduBox}>
                <div style={S.eduLeft}>
                  <div style={S.eduInst}>South Point High School, Kolkata</div>
                  <div style={S.eduDeg}>Class XII (Higher Secondary)</div>
                  <div style={S.eduDeg}>Class X (Secondary)</div>

                  
                </div>
                <div style={S.eduRight}>
                  <div style={S.eduYear}>2023</div>
                  <div style={S.eduGrade}>85.2% </div>
                   <div style={S.eduGrade}>96.4% </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* PROJECTS */}
        <div id="projects" style={S.section}>
          <FadeIn>
            <div style={S.sectionLabel}>02 — Projects</div>
            <div style={S.sectionTitle}>Selected Work</div>
          </FadeIn>
          <div style={S.projectGrid}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.08}>
                <div style={{ ...S.projectCard(p.accent), cursor: p.link ? "pointer" : "default" }} onClick={() => p.link && window.open(p.link, "_blank")}>
                  <div style={S.projectTop}>
                    <span style={S.projectEmoji}>{p.emoji}</span>
                    <span style={S.metric}>{p.metric}</span>
                  </div>
                  <div style={S.projectBody}>
                    <div style={S.projectTitle}>{p.title}</div>
                    <div style={S.projectDesc}>{p.desc}</div>
                    <div style={S.tagRow}>{p.tags.map((t) => <span key={t} style={S.tag}>{t}</span>)}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* SKILLS */}
        <div id="skills" style={S.section}>
          <FadeIn>
            <div style={S.sectionLabel}>03 — Skills</div>
            <div style={S.sectionTitle}>Tech Stack</div>
          </FadeIn>
          <div style={S.skillsGrid}>
            {SKILLS.map((g, i) => (
              <FadeIn key={g.category} delay={i * 0.06}>
                <div style={S.skillGroup}>
                  <div style={S.skillCat}>{g.category}</div>
                  {g.items.map((item) => <div key={item} style={S.skillItem}>{item}</div>)}
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div style={{ marginTop: "2rem" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#e8f4ff", marginBottom: "1rem", letterSpacing: "0.05em" }}>Certifications</div>
              {[
                "Complete Data Science, Machine Learning, DL & NLP Bootcamp — Krish Naik, KRISHAI Technologies (Udemy)",
                "2D Game Development on Unity2D — Udemy",
              ].map((cert) => (
                <div key={cert} style={{ ...S.eduBox, marginBottom: 8 }}>
                  <div style={{ fontSize: 13, color: "rgba(200,216,232,0.7)" }}>🎓 {cert}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* CONTACT */}
        <div id="contact" style={S.section}>
          <FadeIn>
            <div style={S.sectionLabel}>04 — Contact</div>
            <div style={S.sectionTitle}>Get In Touch</div>
            <div style={S.contactBox}>
              <div style={S.contactTitle}>Let's Build Something Intelligent</div>
              <div style={S.contactSub}>
                Open to AI/ML internships, backend engineering roles,<br />and research collaborations. Let's talk.
              </div>
              <div style={S.linkRow}>
                <button onClick={() => window.open("https://mail.google.com/mail/?view=cm&to=adrishsarkar15@gmail.com", "_blank")} style={S.clink("mailto:adrishsarkar15@gmail.com")}>✉ Email</button>
                <a href="https://linkedin.com/in/adrishsarkar" target="_blank" rel="noreferrer" style={S.clink("https://linkedin.com")}>in LinkedIn</a>
                <a href="https://github.com/H-d12s" target="_blank" rel="noreferrer" style={S.clink("https://github.com")}>⌥ GitHub</a>
                <button onClick={() => window.open("tel:+918777588311", "_self")} style={S.clink("tel:+918777588311")}>📞 Call</button>
              </div>
            </div>
          </FadeIn>
        </div>

      </div>

      <div style={S.footer}>BUILT WITH REACT · © 2026 ADRISH SARKAR · AI/ML ENGINEER</div>
    </div>
  );
}
