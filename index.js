let words = [];
let currentWord = null;
let showingGreek = true;

function loadWords() {
    fetch("words.json")
        .then(response => response.json())
        .then(data => {
            words = data.words;
            showRandomWord();
        })
        .catch(error => {
            console.error("Error loading words:", error);
        });
}

function showRandomWord() {
    if (words.length === 0) return;

    currentWord = words[Math.floor(Math.random() * words.length)];
    showingGreek = true;

    const box = document.getElementById("greek-word");
    box.innerText = currentWord.greek;

    box.onclick = () => {
        if (showingGreek) {
            box.innerText = currentWord.english;
        } else {
            box.innerText = currentWord.greek;
        }
        showingGreek = !showingGreek;
    };
}

window.onload = loadWords;
