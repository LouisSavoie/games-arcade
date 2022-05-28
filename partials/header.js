const headerDOM = document.querySelector('header')
const header = () => {
    return `
    <a href="/"><h1>HiddenArcade</h1></a>
    <nav>
        <a href="/">Games</a>
        <a href="/minecart">New!</a>
        <a href="/devlog">Devlog</a>
        <a id="feedback" href="javascript:void(0)">Feedback</a>
    </nav>

    <div id="feedbackModal" class="modal">

        <div class="modal-content">
            <form action="https://formsubmit.co/75c08e43238bf34e28f52065f44fe959" method="post">
                <label for="name">Name:</label><br>
                <input type="text" name="name"><br>
                <label for="email">E-mail:</label><br>
                <input type="email" name="email"><br>
                <label for="feedback">*Feedback:</label><br>
                <textarea name="feedback" rows="5" cols="50" required></textarea><br>
                <span>If giving feedback on a specific game, please mention it.</span><br>
                <input type="hidden" name="_subject" value="HiddenArcade feedback">
                <input type="hidden" name="_autoresponse" value="Thank you for your feedback on HiddenArcade, I will read it ASAP! -Louis, Creator of HiddenArcade.net">
                <input type="hidden" name="_template" value="table">
                <button type="submit" class="modal-button">Send</button>
                <button type="reset" class="modal-button">Reset</button>
                <button id="close" class="modal-button">Close</button>
            </form>
        </div>

    </div>
    `
}
headerDOM.innerHTML = header()

// Modal
// Get the modal
var modal = document.getElementById("feedbackModal");

// Get the button that opens the modal
var btn = document.getElementById("feedback");

// Get the <span> element that closes the modal
var span = document.getElementById("close");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
