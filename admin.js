const ADMIN_PASSCODE = "admin123";
const ADMIN_SESSION_KEY = "creative-portfolio-admin-session";

const adminLock = document.getElementById("adminLock");
const adminPanel = document.getElementById("adminPanel");
const loginForm = document.getElementById("loginForm");
const adminPasscode = document.getElementById("adminPasscode");
const loginError = document.getElementById("loginError");
const logoutButton = document.getElementById("logoutButton");

const projectForm = document.getElementById("projectForm");
const editIndex = document.getElementById("editIndex");
const projectTitle = document.getElementById("projectTitle");
const projectCategory = document.getElementById("projectCategory");
const projectSummary = document.getElementById("projectSummary");
const projectTools = document.getElementById("projectTools");
const cancelEdit = document.getElementById("cancelEdit");
const adminProjectsList = document.getElementById("adminProjectsList");

let projects = window.PortfolioData.getProjects();

function setLockedState(locked) {
  adminLock.hidden = !locked;
  adminPanel.hidden = locked;

  if (locked) {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    adminPasscode.value = "";
  } else {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
  }
}

function resetForm() {
  editIndex.value = "-1";
  projectForm.reset();
}

function saveAndRefresh() {
  window.PortfolioData.saveProjects(projects);
  renderProjectList();
  resetForm();
}

function loadProjectToForm(index) {
  const project = projects[index];
  if (!project) return;
  editIndex.value = String(index);
  projectTitle.value = project.title;
  projectCategory.value = project.category;
  projectSummary.value = project.summary;
  projectTools.value = project.tools.join(", ");
  projectTitle.focus();
}

function createProjectCard(project, index) {
  const card = document.createElement("article");
  card.className = "admin-project-card";

  const title = document.createElement("h3");
  title.textContent = project.title;

  const summary = document.createElement("p");
  summary.textContent = project.summary;

  const meta = document.createElement("p");
  meta.className = "admin-meta";
  meta.textContent = `Category: ${project.category} • Tools: ${project.tools.join(", ") || "N/A"}`;

  const actions = document.createElement("div");
  actions.className = "admin-card-actions";

  const editButton = document.createElement("button");
  editButton.className = "button";
  editButton.type = "button";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => loadProjectToForm(index));

  const deleteButton = document.createElement("button");
  deleteButton.className = "button button-secondary";
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    projects = projects.filter((_, projectIndex) => projectIndex !== index);
    saveAndRefresh();
  });

  actions.append(editButton, deleteButton);
  card.append(title, summary, meta, actions);
  return card;
}

function renderProjectList() {
  adminProjectsList.innerHTML = "";
  if (projects.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No projects yet. Add one using the form above.";
    adminProjectsList.append(empty);
    return;
  }

  for (const [index, project] of projects.entries()) {
    adminProjectsList.append(createProjectCard(project, index));
  }
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const isValid = adminPasscode.value === ADMIN_PASSCODE;
  loginError.hidden = isValid;
  if (isValid) {
    setLockedState(false);
  }
});

logoutButton.addEventListener("click", () => {
  setLockedState(true);
});

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const project = {
    title: projectTitle.value.trim(),
    category: projectCategory.value.trim(),
    summary: projectSummary.value.trim(),
    tools: projectTools.value
      .split(",")
      .map((tool) => tool.trim())
      .filter(Boolean),
  };

  if (!project.title || !project.category || !project.summary) {
    return;
  }

  const index = Number(editIndex.value);
  if (index >= 0 && index < projects.length) {
    projects[index] = project;
  } else {
    projects.unshift(project);
  }

  saveAndRefresh();
});

cancelEdit.addEventListener("click", () => {
  resetForm();
});

if (sessionStorage.getItem(ADMIN_SESSION_KEY) === "true") {
  setLockedState(false);
} else {
  setLockedState(true);
}

renderProjectList();
