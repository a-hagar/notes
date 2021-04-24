var noteInfo = {
    title: "",
    bodyText: "",
    date: 0
}; 

window.onload = function(){
    
    //load splash screen animation for 2s
    window.setTimeout(loadPage, 2000)
    function loadPage (){
        document.querySelector(".loader").style.display = "none";
        document.querySelector("#load-logo").style.display = "none";
    }

    //add date to published note
    var postDate = document.querySelector("#date");

    //date format for published notes
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute:'2-digit',
        second:'2-digit'
     };
    
    postDate.innerHTML = " " + new Date().toLocaleDateString(undefined, options);

    
    var NewNoteTitle = document.querySelector('#new-title-box');
    var NewNoteBody = document.querySelector('#new-note-box');
    var postBtn = document.querySelector("#post-btn");
    var noteStorage = document.querySelector(".note-container");

    //cloning sample note for future published notes
    var noNote =  noteStorage.cloneNode("true");

    var errorTitle =  document.querySelector("#errorNote");
    var errorMsg =  document.querySelector("#errorBody");
    
    //error messages for empty text boxes
    postBtn.onclick = function postNote(){
        if (NewNoteTitle.value == ""){
            errorTitle.style.display = "inline-block";
            errorTitle.innerHTML = "Please write a nice title for your note";
            errorTitle.style.transition = "opacity 1s ease-in-out";
        } else if (NewNoteBody.value == "") {
            errorTitle.style.display = "none";
            errorMsg.style.display = "inline-block";
            errorMsg.innerHTML = "Please write some text for your note. It can be about anything!";

        } else{
            errorMsg.style.display = "none";

            //cloning the sample text adding notes with user input
            var newNote = noNote.cloneNode("true");
            var addedTitle = newNote.querySelector('#note-title').innerHTML = NewNoteTitle.value;
            var addedBody = newNote.querySelector('#note-body').innerHTML = NewNoteBody.value.replace(/\r\n|\r|\n/g,"</br>"); //adds spacing from text box when published
            var addedDate = newNote.querySelector("#date").innerHTML = new Date().toLocaleDateString(undefined, options);

            //creates new note on screen
            document.querySelector(".posted-note").appendChild(newNote);

            //add info into object and log into console
            noteInfo.title = addedTitle;
            noteInfo.bodyText = addedBody;
            noteInfo.date = addedDate;
            console.log(noteInfo)

            //deletes cloned note element
            newNote.querySelector('#delete').onclick = function(){
            this.parentNode.remove();
            console.log("A note has been deleted!");
            };

        }
    }

    //delete notes
    var deleteBtn = document.querySelector('#delete');

    deleteBtn.onclick = function deleteNote(){
        this.parentNode.remove();
        console.log("A note has been deleted!")
    }

    //functions to animate sidebar menu
    var menuBtn = document.querySelector("#menuBtn");
    var closeMenu = document.querySelector("#closeBtn");
    var mobileView = window.matchMedia("(max-width: 700px)");

    menuBtn.onclick = function openNav() {
        document.querySelector(".sideMenu").style.width = "350px";
        if (mobileView.matches){
            document.querySelector(".sideMenu").style.width = "100%";
        }
    }

    closeMenu.onclick = function closeNav() {
        document.querySelector(".sideMenu").style.width = "0";
    }

}
