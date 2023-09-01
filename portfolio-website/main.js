// Existing code
console.log("JavaScript is connected!");

// Mockup data for projects
const projects = [
    { title: "Project 1", description: "This is project 1." },
    { title: "Project 2", description: "This is project 2." },
    // Add as many projects as you like
];

// Function to add projects to the Portfolio section
function addProjects() {
    const projectList = document.getElementById('project-list');
    projects.forEach((project) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const projectTitle = document.createElement('h3');
        projectTitle.innerText = project.title;

        const projectDescription = document.createElement('p');
        projectDescription.innerText = project.description;

        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectDescription);
        projectList.appendChild(projectCard);
    });
}

// Function to toggle the visibility of sections
function toggleSectionVisibility(sectionId) {
    // Get all sections and hide them
    const sections = document.querySelectorAll('main > section');
    sections.forEach((section) => {
      section.style.display = 'none';
    });
  
    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block';
}
  
// Fetch repositories for an individual user
async function fetchUserRepos() {
    const response1 = await fetch('https://api.github.com/users/Kevinm27/repos');
    const data1 = await response1.json();
    
    const response2 = await fetch('https://api.github.com/repos/comp195/senior-project-spring-2023-interactive-banking');
    const data2 = await response2.json();
    
    if (response1.ok && response2.ok) {
        const combinedData = [...data1, data2];
        populateRepos(combinedData);
    } else {
        console.error('Failed to fetch repositories.');
    }
}

// Function to populate repositories on the page
function populateRepos(repositories) {
    const projectList = document.getElementById('project-list');
    repositories.forEach((repo) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        const projectTitle = document.createElement('h3');
        projectTitle.innerText = repo.name;

        const projectDescription = document.createElement('p');
        projectDescription.innerText = repo.description || 'No description provided.';
        
        const projectLink = document.createElement('a');
        projectLink.href = repo.html_url;
        projectLink.target = '_blank';
        projectLink.innerText = 'View on GitHub';

        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectDescription);
        projectCard.appendChild(projectLink);
        projectList.appendChild(projectCard);
    });
}
  
// Fetch and populate all repositories
document.addEventListener('DOMContentLoaded', () => {
    // Initially hide all sections except 'home'
    toggleSectionVisibility('home');
  
    // Event listeners for the navigation links
    const navLinks = document.querySelectorAll('#navbar ul li a');
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const sectionId = event.target.getAttribute('href').substring(1);
        toggleSectionVisibility(sectionId);
      });
    });
  
    // Fetch repositories
    fetchUserRepos();
});

// Call the function to add projects
addProjects();
