const projects = [
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

const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const projectsGrid = document.getElementById("projectsGrid");
const emptyState = document.getElementById("emptyState");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

const categories = [...new Set(projects.map((project) => project.category))].sort();
for (const category of categories) {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categoryFilter.append(option);
}

function matchesSearch(project, query) {
  const text = `${project.title} ${project.category} ${project.summary} ${project.tools.join(" ")}`.toLowerCase();
  return text.includes(query.toLowerCase());
}

function renderProjects() {
  const activeCategory = categoryFilter.value;
  const query = searchInput.value.trim();

  const filtered = projects.filter((project) => {
    const byCategory = activeCategory === "all" || project.category === activeCategory;
    const bySearch = query === "" || matchesSearch(project, query);
    return byCategory && bySearch;
  });

  projectsGrid.innerHTML = "";
  emptyState.hidden = filtered.length !== 0;

  for (const project of filtered) {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <ul class="project-meta">
        <li>${project.category}</li>
        ${project.tools.map((tool) => `<li>${tool}</li>`).join("")}
      </ul>
    `;
    projectsGrid.append(card);
  }
}

categoryFilter.addEventListener("change", renderProjects);
searchInput.addEventListener("input", renderProjects);

renderProjects();
