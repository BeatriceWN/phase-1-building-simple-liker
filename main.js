document.addEventListener('DOMContentLoaded', () => {
  // Defining text characters for the empty and full hearts for you to use later.
  const EMPTY_HEART = '♡'
  const FULL_HEART = '♥'

  // On page load, hide the modal
  const modal = document.getElementById('modal');
  modal.classList.add('hidden');

  // Get all heart elements
  const hearts = document.querySelectorAll('.like-glyph');

  // Loop over each heart and add a click listener
  hearts.forEach(heart => {
    heart.addEventListener('click', () => {
      // Simulate server call
      mimicServerCall()
        .then(() => {
          // If the heart is empty, fill it and activate
          if (heart.textContent === EMPTY_HEART) {
            heart.textContent = FULL_HEART;
            heart.classList.add('activated-heart');
          } else {
            // If full, reset to empty
            heart.textContent = EMPTY_HEART;
            heart.classList.remove('activated-heart');
          }
        })
        .catch(error => {
          // Show modal on error
          const modalMessage = document.getElementById('modal-message');
          modalMessage.textContent = error;
          modal.classList.remove('hidden');

          // Hide after 3 seconds
          setTimeout(() => {
            modal.classList.add('hidden');
          }, 3000);
        });
    });
  });

  //------------------------------------------------------------------------------
  // Don't change the code below: this function mocks the server response
  //------------------------------------------------------------------------------

  function mimicServerCall(url="http://mimicServer.example.com", config={}) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        let isRandomFailure = Math.random() < .2
        if (isRandomFailure) {
          reject("Random server error. Try again.");
        } else {
          resolve("Pretend remote server notified of action!");
        }
      }, 300);
    });
  }
});
