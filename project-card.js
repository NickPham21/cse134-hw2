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
                border-radius: 1rem;   
                padding: 1rem;
                margin: 1rem;
                background-color: white;
                width: var(--media-width, 80dvw);
                animation: fromRight var(--from-right-animation-time, 0.5s) forwards;
                animation-delay: ${animDelay}s;
                opacity: 0;
                h2 {
                    color: red;
                }
                p {
                    color: blue;
                }
            }
        `;

        // Append elements to the shadow root
        shadow.append(title, description, style);
        

    }
}

customElements.define('project-card', ProjectCard);