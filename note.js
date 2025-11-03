window.onload = loadNote;

function editNote() {
  if (document.getElementById("edit").textContent == "Done") {
    const noteInput = document.getElementById("noteInput");
    const noteText = document.getElementById("noteText")
    noteText.innerText = noteInput.value.trim();
    noteInput.hidden = true;
    document.getElementById("edit").textContent = "Edit Note";
    saveNote(noteText.innerText);
  }
  else{
    document.getElementById("noteInput").hidden = false;
    noteInput.value = noteText.innerText;
    document.getElementById("edit").textContent = "Done";
  }
}

function clearNote() {
  document.getElementById("noteText").innerText = "";
  document.getElementById("noteInput").value = "";
  saveNote(document.getElementById("noteText").innerText);
}

function saveNote(note){
  localStorage.setItem("note",note);
}

function loadNote() {
  let note = localStorage.getItem("note") || "";
  document.getElementById("noteText").innerText = note;
}