// Existing code
console.log("JavaScript is connected!");
console.log(marked.version);
// Mockup data for projects
const projects = [];

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
    const sections = document.querySelectorAll('main > section');
    sections.forEach((section) => {
        section.style.display = 'none';
    });
    const selectedSection = document.getElementById(sectionId);
    selectedSection.style.display = 'block';
}
async function fetchUserRepos() {
    const response1 = await fetch('https://api.github.com/users/Kevinm27/repos');
    const data1 = await response1.json();
    const filteredRepos = data1.filter(repo => repo.name !== 'COMP55Project' && ['InteractiveBanking', 'JobAppFiller', 'StarShiftRepo'].includes(repo.name));
    populateRepos(filteredRepos);
}

// Function to populate repositories on the page
function populateRepos(repositories) {
    const projectList = document.getElementById('project-list');
    repositories.forEach(async (repo) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        const leftDiv = document.createElement('div');
        leftDiv.className = 'left-div';

        const rightDiv = document.createElement('div');
        rightDiv.className = 'right-div';

        const projectTitle = document.createElement('h3');
        projectTitle.innerText = repo.name;

        const readmeBox = document.createElement('div');
        readmeBox.className = 'readme-box';

        const projectLink = document.createElement('a');
        projectLink.href = repo.html_url;
        projectLink.target = '_blank';
        projectLink.innerText = 'View on GitHub';

        // Fetch README content
        const readmeUrl = `https://api.github.com/repos/${repo.full_name}/readme`;
        const readmeResponse = await fetch(readmeUrl, { headers: { 'Accept': 'application/vnd.github.VERSION.raw' } });
        if (readmeResponse.ok) {
            const readmeData = await readmeResponse.text();
            readmeBox.innerHTML = marked(readmeData);
        }

        leftDiv.appendChild(projectTitle);
        leftDiv.appendChild(projectLink);
        leftDiv.appendChild(readmeBox);

        const videoDemo = document.createElement('video');
        videoDemo.setAttribute('controls', true);
        videoDemo.width = 300;

        if(repo.name == "StarShiftRepo") {
            const videoSource = document.createElement('source');
            videoSource.setAttribute('src', './demos/StarshiftDemo.mp4');
            videoSource.setAttribute('type', 'video/mp4');
            videoDemo.appendChild(videoSource);
        } else {
            const videoPlaceholder = document.createElement('p');
            videoPlaceholder.innerText = 'Video demo coming soon!';
            videoDemo.appendChild(videoPlaceholder);
        }
        rightDiv.appendChild(videoDemo);
        projectCard.appendChild(leftDiv);
        projectCard.appendChild(rightDiv);
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

const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});


// Call the function to add projects
addProjects();
