// Edit this list to update the information shown for each team member.
const teamMembers = [
  {
    name: "Khansa Dayana",
    initials: "KD",
    photo: "",
    studyProgram: "Teknik Informatika",
    introduction: "An Informatics Engineering student exploring ways to build useful things with code.",
    interests: ["Web Development", "Python", "Automation"],
    learning: ["HTML", "CSS", "JavaScript", "Python", "GitHub"],
    project: "Student Portfolio Website",
    projectNote: "A student project showcase.",
    github: "",
    contact: ""
  },
  {
    name: "Naufal Zafhran",
    initials: "NZ",
    photo: "",
    studyProgram: "Teknik Informatika",
    introduction: "An Informatics Engineering student interested in learning how software is designed and built.",
    interests: ["Programming", "Software Development"],
    learning: ["Add technologies being explored"],
    project: "Project title coming soon",
    projectNote: "Replace with a project description when ready.",
    github: "",
    contact: ""
  },
  {
    name: "Ahmad Ghoits",
    initials: "AG",
    photo: "",
    studyProgram: "Teknik Informatika",
    introduction: "An Informatics Engineering student exploring programming and software development.",
    interests: ["Programming", "Software Development"],
    learning: ["Add technologies being explored"],
    project: "Project title coming soon",
    projectNote: "Replace with a project description when ready.",
    github: "",
    contact: ""
  }
];

const profileContent = document.querySelector("#profile-content");
const memberButtons = document.querySelectorAll(".member-tab");
const previousButton = document.querySelector("#previous-profile");
const nextButton = document.querySelector("#next-profile");
let activeMemberIndex = 0;
let profileChangeTimer;

function addProfileLink(container, label, value, isEmail = false) {
  if (!value) return;

  const link = document.createElement("a");
  link.className = "profile-link";
  link.textContent = label;
  link.href = isEmail ? `mailto:${value}` : value;

  if (!isEmail) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }

  container.append(link);
}

function renderProfile(index) {
  const member = teamMembers[index];
  const avatar = document.querySelector("#profile-avatar");

  document.querySelector("#profile-number").textContent = String(index + 1).padStart(2, "0");
  avatar.replaceChildren();
  if (member.photo) {
    const image = document.createElement("img");
    image.className = "profile-photo";
    image.src = member.photo;
    image.alt = `${member.name} profile photo`;
    avatar.append(image);
  } else {
    avatar.textContent = member.initials;
  }
  document.querySelector("#profile-name").textContent = member.name;
  document.querySelector(".profile-study").textContent = member.studyProgram;
  document.querySelector("#profile-bio").textContent = member.introduction;
  document.querySelector("#profile-interests").textContent = member.interests.join(", ");
  document.querySelector("#profile-project").textContent = member.project;
  document.querySelector("#project-note").textContent = member.projectNote;

  const skillsContainer = document.querySelector("#profile-skills");
  skillsContainer.replaceChildren();
  member.learning.forEach((skill) => {
    const tag = document.createElement("span");
    tag.className = "profile-tag";
    tag.textContent = skill;
    skillsContainer.append(tag);
  });

  const linksContainer = document.querySelector("#profile-links");
  linksContainer.replaceChildren();
  addProfileLink(linksContainer, "GitHub profile ↗", member.github);
  addProfileLink(linksContainer, "Contact ↗", member.contact, true);

  memberButtons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === index;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function selectProfile(index) {
  activeMemberIndex = (index + teamMembers.length) % teamMembers.length;
  profileContent.classList.add("is-changing");
  window.clearTimeout(profileChangeTimer);

  profileChangeTimer = window.setTimeout(() => {
    renderProfile(activeMemberIndex);
    profileContent.classList.remove("is-changing");
  }, 160);
}

memberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectProfile(Number(button.dataset.member));
  });
});

previousButton.addEventListener("click", () => {
  selectProfile(activeMemberIndex - 1);
});

nextButton.addEventListener("click", () => {
  selectProfile(activeMemberIndex + 1);
});

renderProfile(activeMemberIndex);
