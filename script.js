document.addEventListener('DOMContentLoaded', function() {
    const noteForm = document.getElementById('note-form');
    const notesContainer = document.getElementById('notes-container');
    const searchBar = document.getElementById('search-bar');
    let notes = JSON.parse(localStorage.getItem('studyNotes')) || [];

    // Sample notes with local images
    if (notes.length === 0) {
        notes = [
            { title: 'Algebra Basics', category: 'Math', content: 'Key formulas: a^2 + b^2 = c^2. Practice daily!', image: 'math.jpg' },
            { title: 'Photosynthesis', category: 'Science', content: 'Process: Light energy converts CO2 and water into glucose.', image: 'science.jpg' }
        ];
        localStorage.setItem('studyNotes', JSON.stringify(notes));
    }

    // Function to display notes
    function displayNotes(filteredNotes = notes) {
        notesContainer.innerHTML = '';
        filteredNotes.forEach((note) => {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note';
            noteDiv.innerHTML = `
                <h3>${note.title}</h3>
                <p><strong>Category:</strong> ${note.category}</p>
                <p>${note.content}</p>
                ${note.image ? `<img src="${note.image}" alt="${note.title}">` : ''}
            `;
            notesContainer.appendChild(noteDiv);
        });
    }

    // Load notes on page load
    displayNotes();

    // Handle search
    searchBar.addEventListener('input', function() {
        const query = searchBar.value.toLowerCase();
        const filtered = notes.filter(note =>
            note.title.toLowerCase().includes(query) ||
            note.category.toLowerCase().includes(query)
        );
        displayNotes(filtered);
    });

    // Handle form submission
    noteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const category = document.getElementById('category').value;
        const content = document.getElementById('content').value;
        const image = ''; // Optional: Add image URL input if needed

        notes.push({ title, category, content, image });
        localStorage.setItem('studyNotes', JSON.stringify(notes));
        displayNotes();
        noteForm.reset();
    });
});