// Class to define a custom element <project-card>
// PASS IN ATTRIBUTES: 
    // title: the title of the project
    // thumbnail-big: thumbnail for large screens
    // thumbnail-med: thumbnail for medium screens
    // thumbnail-small: thumbnail for small screens
    // description: description of the project
    // link: URL to the project
    // order: order for animation delay
class ProjectCard extends HTMLElement {
    constructor() {
        super();
        
    }
    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
        // Cleanup 
    }
    render() {
        // Attach a shadow DOM tree to this element
        const shadow = this.attachShadow({ mode: 'open' });
        

        // Create elements for the project card (title, thumbnail, description, link)
        // Title as <h2>
        const title = document.createElement('h2');
        title.textContent = this.getAttribute('title') || 'Project Title';
        // Thumbnail as <picture>
        const thumbnail = document.createElement('picture');
        const imgBig = document.createElement('source');
        imgBig.setAttribute('media', '(min-width: 769px)');
        imgBig.setAttribute('srcset', this.getAttribute('thumbnail-big') || '');
        const imgMed = document.createElement('source');
        imgMed.setAttribute('media', '(min-width: 480px)');
        imgMed.setAttribute('srcset', this.getAttribute('thumbnail-med') || '');
        const imgSmall = document.createElement('img');
        imgSmall.setAttribute('src', this.getAttribute('thumbnail-small') || '');
        imgSmall.setAttribute('alt', this.getAttribute('title') || 'Project Thumbnail');
        thumbnail.append(imgBig, imgMed, imgSmall);
        // Description as <p>
        const description = document.createElement('p');
        description.textContent = this.getAttribute('description') || 'Project Description';
        // Link as <a>
        const link = document.createElement('a');
        link.setAttribute('href', this.getAttribute('link') || '#');
        link.textContent = 'View Project';
        
        // Style the component
        const style = document.createElement('style');
        const order = parseInt(this.getAttribute('order')) || 0;
        const animDelay = order * parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--from-right-animation-time').trim().replace('s', ''));
        style.textContent = `

            :host {
                display: block;
                border: 0.5rem solid var(--main-border-color, darkblue);
                background-color: white;
                width: fit-content;
                height: auto;
                animation: fromRight var(--from-right-animation-time, 0.5s) forwards;
                animation-delay: ${animDelay}s;
                opacity: 0;
                text-align: center;
                picture img {
                    padding: var(--media-padding, 0);
                    width: var(--media-width, 80dvw);
                    max-width: 80dvw;
                    height: var(--media-height, auto);
                }
                h2 {
                    margin: 0rem auto;
                    padding: 0rem auto;
                }
                p {
                    margin: 0rem auto;
                    padding: 0rem auto;
                    background-color: lightgray;
                }
                a {
                    display: block;
                    padding: 0rem auto;
                    margin: 0rem auto;
                    color: white;
                    text-decoration: none;
                    background-color: teal; 
                }
                a:hover {
                    background-color: darkcyan;
                }
                
            }
            
            :host(:hover) {
                box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
            }
        `;

        // Append elements to the shadow root
        shadow.append(style,thumbnail, title, description, link);
        

    }
}
customElements.define('project-card', ProjectCard);

// Class containing details about a specific project
class Project {
    constructor(title, thumbnailBig, thumbnailMed, thumbnailSmall, description, link, order) {
        this.title = title || 'Project Title';
        this.thumbnailBig = thumbnailBig;
        this.thumbnailMed = thumbnailMed;
        this.thumbnailSmall = thumbnailSmall;
        this.description = description || 'Project Description';
        this.link = link;
        this.order = order || 0;
    }
}

// Array to store project instances
const projects = [];

// Current projects
let project1 = new Project('Last Stand', 
    'images/game_thumbnail_big.png', 
    'images/game_thumbnail_medium.png', 
    'images/game_thumbnail_small.png', 
    'One of my first game projects made using Unity.  It is a top-down shooter where you fend off waves of enemies.', 
    'projects/games.html', 0);
let project2 = new Project('Personal Website',
    'images/website_thumbnail_big.png',
    'images/website_thumbnail_medium.png',
    'images/website_thumbnail_small.png',
    'And this would be where I put my other websites... IF I HAD ANY',
    'projects/website.html', 1);

projects.push(project1, project2);

// save all projects to local storage
localStorage.setItem('projects', JSON.stringify(projects));
// save all projects to remote storage (fetch API)
const url = 'https://api.jsonbin.io/v3/qs/692e7ca9d0ea881f400d248f';
async function saveProjectsRemote() {
    try {
        const postResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(projects)
        });
        if (!postResponse.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Failed to save projects to remote storage:', error);
    }
}
saveProjectsRemote();

const main = document.querySelector('main');

// Script for button to load project card contents
const loadLocalBtn = document.getElementById('load-local');
const loadRemoteBtn = document.getElementById('load-remote');
loadLocalBtn.addEventListener('click', loadProjectsLocal);
loadRemoteBtn.addEventListener('click', loadProjectsRemote);

function loadProjectsLocal() {
    // load all projects from local storage
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    
    // Clear existing project cards
    main.innerHTML = '<h2>Here are some of my projects:</h2>';

    // Create and append project-card elements for each stored project
    storedProjects.forEach(projectData => {
        const projectCard = document.createElement('project-card');
        projectCard.setAttribute('title', projectData.title);
        projectCard.setAttribute('thumbnail-big', projectData.thumbnailBig);
        projectCard.setAttribute('thumbnail-med', projectData.thumbnailMed);
        projectCard.setAttribute('thumbnail-small', projectData.thumbnailSmall);
        projectCard.setAttribute('description', projectData.description);
        projectCard.setAttribute('link', projectData.link);
        projectCard.setAttribute('order', projectData.order);
        main.appendChild(projectCard);
    });
}

async function loadProjectsRemote() {
    try {
        // load all projects from remote storage
        const getResponse = await fetch(url);
        if (!getResponse.ok) {
            throw new Error('Network response was not ok');
        }
        const projectsString = await getResponse.json();
        const storedProjects = JSON.parse(projectsString);

        // clear existing project cards
        main.innerHTML = '<h2>Here are some of my projects:</h2>';

        // create and append project-card elements for each stored project
        storedProjects.forEach(projectData => {
            const projectCard = document.createElement('project-card');
            projectCard.setAttribute('title', projectData.title);
            projectCard.setAttribute('thumbnail-big', projectData.thumbnailBig);
            projectCard.setAttribute('thumbnail-med', projectData.thumbnailMed);
            projectCard.setAttribute('thumbnail-small', projectData.thumbnailSmall);
            projectCard.setAttribute('description', projectData.description);
            projectCard.setAttribute('link', projectData.link);
            projectCard.setAttribute('order', projectData.order);
            main.appendChild(projectCard);
        });

    } catch (error) {
        console.error('failed to load projects from remote storage:', error);
    }
}
