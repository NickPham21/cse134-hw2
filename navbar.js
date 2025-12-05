// defines the navbar component
class NavBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <nav>
                <strong>Navigation</strong>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contacts.html">Contacts</a></li>
                    <li><a href="projects.html">Projects</a></li>
                    <li><a href="involvements.html">Involvements</a></li>
                </ul>
            </nav>
        `;
    }

}

customElements.define('nav-bar', NavBar);