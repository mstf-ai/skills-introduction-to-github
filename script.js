const projects = window.PortfolioData.getProjects();
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const projectsGrid = document.getElementById("projectsGrid");
const emptyState = document.getElementById("emptyState");
const year = document.getElementById("year");
const insightsGrid = document.getElementById("insightsGrid");
const categoryChart = document.getElementById("categoryChart");

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

function renderInsights(sourceProjects, filteredProjects) {
  const totalProjects = sourceProjects.length;
  const totalCategories = new Set(sourceProjects.map((project) => project.category)).size;
  const totalTools = new Set(sourceProjects.flatMap((project) => project.tools)).size;

  const cards = [
    { label: "Total Projects", value: String(totalProjects) },
    { label: "Career Fields", value: String(totalCategories) },
    { label: "Tools & Technologies", value: String(totalTools) },
    { label: "Filtered Results", value: String(filteredProjects.length) },
  ];

  insightsGrid.innerHTML = "";
  for (const card of cards) {
    const article = document.createElement("article");
    article.className = "insight-card";

    const value = document.createElement("p");
    value.className = "insight-value";
    value.textContent = card.value;

    const label = document.createElement("p");
    label.className = "insight-label";
    label.textContent = card.label;

    article.append(value, label);
    insightsGrid.append(article);
  }
}

function renderCategoryChart(sourceProjects) {
  const counts = new Map();
  for (const project of sourceProjects) {
    counts.set(project.category, (counts.get(project.category) || 0) + 1);
  }

  const maxCount = Math.max(...counts.values(), 1);
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);

  categoryChart.innerHTML = "";
  for (const [category, count] of sorted) {
    const row = document.createElement("div");
    row.className = "chart-row";

    const label = document.createElement("span");
    label.className = "chart-label";
    label.textContent = category;

    const barWrap = document.createElement("div");
    barWrap.className = "chart-bar-wrap";

    const bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.style.width = `${(count / maxCount) * 100}%`;

    const countText = document.createElement("span");
    countText.className = "chart-count";
    countText.textContent = String(count);

    barWrap.append(bar);
    row.append(label, barWrap, countText);
    categoryChart.append(row);
  }
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

  renderInsights(projects, filtered);
  renderCategoryChart(projects);

  for (const project of filtered) {
    const card = document.createElement("article");
    card.className = "project-card";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const summary = document.createElement("p");
    summary.textContent = project.summary;

    const metaList = document.createElement("ul");
    metaList.className = "project-meta";

    const categoryItem = document.createElement("li");
    categoryItem.textContent = project.category;
    metaList.append(categoryItem);

    for (const tool of project.tools) {
      const toolItem = document.createElement("li");
      toolItem.textContent = tool;
      metaList.append(toolItem);
    }

    card.append(title, summary, metaList);
    projectsGrid.append(card);
  }
}

categoryFilter.addEventListener("change", renderProjects);
searchInput.addEventListener("input", renderProjects);

renderProjects();
