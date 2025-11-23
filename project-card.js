// script to define a custom element <project-card>
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