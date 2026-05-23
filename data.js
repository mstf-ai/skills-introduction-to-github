const DEFAULT_PROJECTS = [
  {
    title: "E-Commerce Platform Revamp",
    category: "Web Development",
    summary: "Redesigned and optimized a high-traffic online store for better conversion.",
    tools: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Healthcare Mobile App",
    category: "Mobile Apps",
    summary: "Built a cross-platform telehealth app with secure appointment workflows.",
    tools: ["Flutter", "Firebase", "Figma"],
  },
  {
    title: "SaaS Design System",
    category: "UI/UX Design",
    summary: "Created a reusable design system to improve consistency and delivery speed.",
    tools: ["Figma", "Accessibility", "Prototyping"],
  },
  {
    title: "Customer Churn Prediction",
    category: "Data Science",
    summary: "Developed a machine learning model to identify churn risks and retention signals.",
    tools: ["Python", "scikit-learn", "Pandas"],
  },
  {
    title: "AI Support Assistant",
    category: "AI & Automation",
    summary: "Automated support triage and first-response generation with LLM workflows.",
    tools: ["Python", "LLM APIs", "Automation"],
  },
  {
    title: "Cloud Migration Program",
    category: "Cloud & DevOps",
    summary: "Migrated legacy workloads to cloud-native infrastructure with CI/CD.",
    tools: ["AWS", "Terraform", "GitHub Actions"],
  },
  {
    title: "Security Monitoring Dashboard",
    category: "Cybersecurity",
    summary: "Built a dashboard for incident visibility and alert triage across teams.",
    tools: ["SIEM", "Threat Detection", "KQL"],
  },
  {
    title: "Product Discovery Framework",
    category: "Product Strategy",
    summary: "Established a framework for validating ideas with measurable business outcomes.",
    tools: ["Roadmapping", "Analytics", "Experimentation"],
  },
];

const STORAGE_KEY = "creative-portfolio-projects-v1";

function normalizeProject(project) {
  if (!project || typeof project !== "object") {
    return null;
  }

  const title = String(project.title || "").trim();
  const category = String(project.category || "").trim();
  const summary = String(project.summary || "").trim();
  const tools = Array.isArray(project.tools)
    ? project.tools.map((tool) => String(tool).trim()).filter(Boolean)
    : [];

  if (!title || !category || !summary) {
    return null;
  }

  return { title, category, summary, tools };
}

function cloneDefaults() {
  return DEFAULT_PROJECTS.map((project) => ({ ...project, tools: [...project.tools] }));
}

function getProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return cloneDefaults();
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return cloneDefaults();
    }

    const normalized = parsed.map(normalizeProject).filter(Boolean);
    return normalized.length ? normalized : cloneDefaults();
  } catch {
    return cloneDefaults();
  }
}

function saveProjects(projects) {
  const normalized = Array.isArray(projects)
    ? projects.map(normalizeProject).filter(Boolean)
    : [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
}

window.PortfolioData = {
  getProjects,
  saveProjects,
};
