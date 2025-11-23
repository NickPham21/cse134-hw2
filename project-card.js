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
        this.attachShadow({ mode: 'open' });

        // Create elements for the project card
        const title = document.createElement('h2');
        title.textContent = this.getAttribute('title') || 'Project Title';
        const description = document.createElement('p');
        description.textContent = this.getAttribute('description') || 'Project Description';

        // Append elements to the shadow root
        this.shadowRoot.append(title, description);
    }
}

customElements.define('project-card', ProjectCard);