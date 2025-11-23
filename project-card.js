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
        
        // Style the component
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
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