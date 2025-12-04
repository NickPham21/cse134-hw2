// Import the Project class
import { Project } from './project-card.js';

// Form reference
const form = document.querySelector('form');

// initial stored projects from local storage
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
    // Convert file inputs to URLs for storage
    const thumbnailBigURL = formData.get('thumbnailBig').size > 0 ? URL.createObjectURL(formData.get('thumbnailBig')) : '';
    const thumbnailMedURL = formData.get('thumbnailMed').size > 0 ? URL.createObjectURL(formData.get('thumbnailMed')) : '';
    const thumbnailURL = formData.get('thumbnail').size > 0 ? URL.createObjectURL(formData.get('thumbnail')) : '';
    // create a project data object based off the form data
    let projectData = new Project(
        formData.get('title'),
        thumbnailBigURL,
        thumbnailMedURL,
        thumbnailURL,
        formData.get('description'),
        formData.get('link'),
    );

    // Get projects currently in local storage (in case of updates)
    storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    // Save to local storage
    storedProjects.push(projectData);
    localStorage.setItem('projects', JSON.stringify(storedProjects));

    // Reset the form after submission for future entries
    form.reset();

    // if in edit mode, reset the button text
    const submitBttn = document.getElementById('project-manager-bttn');
    submitBttn.textContent = 'Create Project';

    // Update the displayed list of stored projects
    showStoredProjects();
});

// Show current project titles in local storage as a list
    // Note: does NOT actually show the project card themselves! Press "load local" to see them.
function showStoredProjects() {
    const projectList = document.querySelector('project-list ol');
    // clear existing list
    projectList.innerHTML = '';
    // get the stored projects from local storage (in case of updates)
    storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    // append each project title as a list item with buttons for edit/delete
    storedProjects.forEach((projectData, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = projectData.title;
        const editBttn = document.createElement('button');
        editBttn.textContent = 'Edit';
        editBttn.setAttribute('id', `edit-${index}`);
        editBttn.addEventListener('click', () => editProject(index));
        const deleteBttn = document.createElement('button');
        deleteBttn.setAttribute('id', `delete-${index}`);
        deleteBttn.addEventListener('click', () => deleteProject(index));
        deleteBttn.textContent = 'Delete';
        listItem.append(editBttn, deleteBttn);
        projectList.appendChild(listItem);
    });
}

// function to remove this project from storage
function deleteProject(index) {
    // get the stored projects from local storage (in case of updates)
    storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    // remove the project at the given index
    storedProjects.splice(index, 1);
    // put the updated projects back in local storage
    localStorage.setItem('projects', JSON.stringify(storedProjects));
    // update the displayed list of stored projects
    showStoredProjects();
}

// function to edit this project in storage using the form
function editProject(index) {
    // get the stored projects from local storage (in case of updates)
    storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    // get the specific project data to edit
    const projectData = storedProjects[index];
    // populate the form with the existing project data
    // Note: image file inputs cannot be pre-populated for security reasons
    form.elements['title'].value = projectData.title;
    form.elements['description'].value = projectData.description;
    form.elements['link'].value = projectData.link;
    // update project submission button to indicate edit mode
    const submitBttn = document.getElementById('project-manager-bttn');
    submitBttn.textContent = 'Update Project';
    // remove the project at the given index (re-add it on form submission)
    deleteProject(index);
    // no need to update the displayed list, as it will be updated on form submission
}

// show the stored projects on initial load
showStoredProjects();