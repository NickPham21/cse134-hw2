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

        // Create elements for the project card
        const title = document.createElement('h2');
        title.textContent = this.getAttribute('title') || 'Project Title';
        const description = document.createElement('p');
        description.textContent = this.getAttribute('description') || 'Project Description';
        
        // Apply external styles to the shadow dom
        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'styles.css');

        // Append elements to the shadow root
        shadow.append(title, description, linkElem);
        // Apply external styles to the shadow dom
    
    }
}

customElements.define('project-card', ProjectCard);