/*
    NOTE: ChatGPT was utilized to generate most of the code. 
    some modifications were made by myself, it's been a long while
    since I've used Javascript, html, and css so I'm a bit rusty, and used my own
    comments to help me understand the code better.
*/

class Reader {
    constructor() {
        this.notesDisplay = document.getElementById('notesDisplay');
        this.lastRetrievedTime = document.getElementById('lastRetrievedTime');
        this.autoRetrieve();
    }

    // Retrieve notes from localStorage
    retrieveNotes() {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.notesDisplay.innerHTML = '';  // Clear previous content

        // Loop through each note and display it in a formatted way
        notes.forEach((content, index) => {
            const note = new Note(content, index, () => {}); // No remove action needed
            note.textarea.readOnly = true;  // Make the textarea read-only in the reader
            this.notesDisplay.appendChild(note.getElement());
        });

        // Update the "last retrieved" time
        const now = new Date();
        this.lastRetrievedTime.innerText = `Last retrieved: ${now.toLocaleTimeString()}`;
    }

    // Auto-retrieve notes every 2 seconds
    autoRetrieve() {
        this.retrieveNotes(); // Fetch immediately on load
        setInterval(() => this.retrieveNotes(), 2000);
    }
}

// Initialize the reader
document.addEventListener('DOMContentLoaded', () => {
    const reader = new Reader();
});
