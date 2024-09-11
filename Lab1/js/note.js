/*
    NOTE: ChatGPT was utilized to generate most of the code. 
    some modifications were made by myself, it's been a long while
    since I've used Javascript, html, and css so I'm a bit rusty, and used my own
    comments to help me understand the code better.
*/

class Note {
    constructor(content = '', index) {
        this.content = content;
        this.index = index;
        this.element = this.createNoteElement();
    }

    // Create the DOM structure for the note content
    createNoteElement() {
        const noteContainer = document.createElement('div');
        noteContainer.classList.add('note-container');  // Add a CSS class for styling

        // Create a textarea for the note content
        this.textarea = document.createElement('textarea');
        this.textarea.value = this.content;  // Set the textarea value to the content
        this.textarea.classList.add('note-textarea');  // Use the CSS class for styling

        // Update the content property whenever the user types
        this.textarea.addEventListener('input', (event) => {
            this.content = event.target.value;  // Update content as the user types
        });

        noteContainer.appendChild(this.textarea);
        return noteContainer;
    }

    // Get the content of the note
    getContent() {
        return this.content;
    }

    // Set the index (in case notes are removed and reordered)
    setIndex(index) {
        this.index = index;
    }

    // Get the note element for rendering
    getElement() {
        return this.element;
    }
}

