// Import the Project class
import { Project } from './project-card.js';

// Form reference
const form = document.querySelector('form');

// Get projects currently in local storage
let storedProjects = JSON.parse(localStorage.getItem('projects')) || [];


// Handle form submission to create a new project on submit
form.addEventListener('submit', (event) => {
    // don't actually submit the form
    event.preventDefault();

    // only proceed if form is valid
    if (!form.checkValidity()) {
        return;
    }

    // gather form data into an object
    const formData = new FormData(form);
    // create a project data object based off the form data
    // order is determined by how many projects are already stored
    let projectData = new Project(
        formData.get('title'),
        formData.get('thumbnailBig'),
        formData.get('thumbnailMed'),
        formData.get('thumbnail'),
        formData.get('description'),
        formData.get('link'),
        storedProjects.length
    );

    // Save to local storage
    storedProjects.push(projectData);
    localStorage.setItem('projects', JSON.stringify(storedProjects));

    // Reset the form after submission for future entries
    form.reset();
});

// Show current project titles in local storage as a list
    // Note: does NOT actually show the project card themselves! Press "load local" to see them.
function showStoredProjects() {
    const projectList = document.querySelector('project-list ol');
    // clear existing list
    projectList.innerHTML = '';
    // get the stored projects from local storage (in case of updates)
    storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    

}