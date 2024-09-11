/*
    NOTE: ChatGPT was utilized to generate most of the code. 
    some modifications were made by myself, it's been a long while
    since I've used Javascript, html, and css so I'm a bit rusty, and used my own
    comments to help me understand the code better.
*/

class NoteManager {
    constructor() {
        // Get notes from localStorage (without adding new empty notes)
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.notesContainer = document.getElementById('notesContainer');
        this.lastSavedTime = document.getElementById('lastSavedTime');
        this.noteObjects = [];  // Array to hold instances of Note
        
        // Load notes first, then render them
        this.loadNotes();
        this.renderNotes();
        this.autoSave();
    }

    // Add a new note
    addNote() {
        const note = new Note('', this.noteObjects.length);
        this.noteObjects.push(note);
        this.notes.push('');  // Add an empty note to localStorage array
        this.renderNotes();
        this.saveNotes();  // Save after adding a new note
    }

    // Remove a note
    removeNote(index) {
        this.notes.splice(index, 1);  // Remove the note from the storage array
        this.noteObjects.splice(index, 1);  // Remove the note object from the array

        // Re-index the remaining notes
        this.noteObjects.forEach((note, i) => note.setIndex(i));

        this.renderNotes();
        this.saveNotes();  // Save after removing a note
    }

    // Render all notes
    renderNotes() {
        this.notesContainer.innerHTML = '';  // Clear previous content
        this.noteObjects.forEach((note, index) => {
            const noteElement = note.getElement();  // Get the note element

            // Create the remove button
            const removeButton = document.createElement('button');
            removeButton.innerText = UserStrings.REMOVE_BUTTON;  // Fetch string from UserStrings
            removeButton.classList.add('remove-button');  // Use the CSS class for styling
            removeButton.addEventListener('click', () => this.removeNote(index));

            // Append the remove button to the note container (only once)
            if (!noteElement.querySelector('.remove-button')) {
                noteElement.appendChild(removeButton);
            }

            // Append the note element (with the remove button) to the container
            this.notesContainer.appendChild(noteElement);
        });
    }

    // Save notes to localStorage
    saveNotes() {
        const noteContents = this.noteObjects.map((note) => note.getContent());
        localStorage.setItem('notes', JSON.stringify(noteContents));
        const now = new Date();
        this.lastSavedTime.innerText = `${UserStrings.LAST_SAVED_TEXT} ${now.toLocaleTimeString()}`;
    }

    // Load existing notes from localStorage without adding new ones
    loadNotes() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.noteObjects = []; // Clear previous noteObjects
        this.notes.forEach((content, index) => {
            const note = new Note(content, index);
            this.noteObjects.push(note);
        });
        this.renderNotes();
    }

    // Auto-save notes every 2 seconds
    autoSave() {
        setInterval(() => this.saveNotes(), 2000);
    }
}

// Initialize the note manager
document.addEventListener('DOMContentLoaded', () => {
    const noteManager = new NoteManager();

    // Add note button handler, now using UserStrings
    document.getElementById('addNoteButton').innerText = UserStrings.ADD_NOTE_BUTTON;
    document.getElementById('addNoteButton').addEventListener('click', () => {
        noteManager.addNote();
    });

    // Load notes from localStorage
    noteManager.loadNotes();
});
