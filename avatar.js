let currentAvatarIndex = 0;
    const avatars = [
        'img/pfp/nezuko.jpg',
        'img/pfp/hinata.jpg',
        'img/pfp/happy.jpg',
        'img/pfp/chiyuki.jpg',
        'img/pfp/ayanokoji.jpg',
        'img/pfp/maomao.jpg'
    ]; // Make sure these paths are correct

    let selectedAvatar = null;

    function selectAvatar(avatarId) {
        // Remove selected class from all avatars
        document.querySelectorAll('.avatar').forEach((avatar) => {
            avatar.classList.remove('selected-avatar');
        });
    
        // Add selected class to the clicked avatar
        const avatarElement = document.getElementById(avatarId);
        avatarElement.classList.add('selected-avatar');
    
        // Store selected avatar
        selectedAvatar = avatarId;
    
        // Hide error message and show start button once an avatar is selected
        document.getElementById('avatar-error').style.display = 'none';
        document.getElementById('start-game-btn').style.display = 'block';
    }
    
  

    function updateAvatars(direction) {
        const avatarWrapper = document.querySelector('.avatar-wrapper');
        const totalAvatars = avatars.length;

        // Update the index based on the direction
        if (direction === 'next' && currentAvatarIndex < totalAvatars - 3) {
            currentAvatarIndex++;
        } else if (direction === 'prev' && currentAvatarIndex > 0) {
            currentAvatarIndex--;
        }

        // Calculate the new translateX value
        const translateX = -(currentAvatarIndex * (100 + 20)); // 100 (avatar width) + 20 (margin)
        avatarWrapper.style.transform = `translateX(${translateX}px)`; // Slide to show the current avatar

        // Disable buttons if at boundaries
        document.getElementById('prev-avatar').disabled = currentAvatarIndex === 0;
        document.getElementById('next-avatar').disabled = currentAvatarIndex >= totalAvatars - 3;
    }

    document.getElementById('prev-avatar').addEventListener('click', () => {
        updateAvatars('prev');
    });

    document.getElementById('next-avatar').addEventListener('click', () => {
        updateAvatars('next');
    });

    // Initial display (start at the first avatar)
    updateAvatars(); // Remove the 'next' argument here

        document.getElementById('start-game-btn').addEventListener('click', function() {
        window.location.href = 'index.html';
    });

/*******************************************************************************************/ 

function selectAvatar(avatarId) {
  console.log(`Avatar sélectionné: ${avatarId}`);

  // Remove selected class from all avatars
  document.querySelectorAll('.avatar').forEach((avatar) => {
      avatar.classList.remove('selected-avatar');
  });

  // Add selected class to the clicked avatar
  const avatarElement = document.getElementById(avatarId);
  avatarElement.classList.add('selected-avatar');

  // Store selected avatar in localStorage
  selectedAvatar = avatarId;
  localStorage.setItem('selectedAvatar', avatarId); // Store in localStorage
  console.log(`Avatar stocké dans localStorage: ${avatarId}`);

  // Hide error message and show start button once an avatar is selected
  document.getElementById('avatar-error').style.display = 'none';
  document.getElementById('start-game-btn').style.display = 'block';
}

  