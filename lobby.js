$(document).ready(function() {
    // Hide instructions initially
    $('#game-instructions').hide();
    
    // Show instructions when clicked
    $('#instructions').click(function(e) {
      e.preventDefault();
      $('#game-menu').hide();
      $('#game-instructions').show();
    });
    
    // Return to main menu
    $('#main-menu').click(function(e) {
      e.preventDefault();
      $('#game-instructions').hide();
      $('#game-menu').show();
    });
    
    // Start game (this will redirect to index.html)
    $('#start-game').click(function(e) {
      // The href attribute in the HTML will handle the redirection
    });
  });