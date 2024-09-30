const audioPlayer = document.getElementById('audio-player');
const coverImg = document.getElementById('cover-img');
const artistName = document.getElementById('artist-name');
const trackName = document.getElementById('track-name');
const answersContainer = document.getElementById('answers');
const feedbackElement = document.getElementById('feedback');
const scoreElement = document.getElementById('score-value');
const nextButton = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-current');
const playPauseBtn = document.getElementById('play-pause-btn');
const muteToggle = document.getElementById('mute-toggle');
const muteIcon = muteToggle.querySelector('i');
const volumeSlider = document.getElementById('volume-slider');
const playIcon = playPauseBtn.querySelector('.fa-play');
const pauseIcon = playPauseBtn.querySelector('.fa-pause');
const correctSound = new Audio('mp3/right.mp3');
const incorrectSound = new Audio('mp3/wrong.mp3');

let clickSound;
let isMuted = false;
correctSound.volume = 0.4;
incorrectSound.volume = 0.2;

muteToggle.addEventListener('click', () => {
    isMuted = !isMuted;
    audioPlayer.muted = isMuted;
    updateVolumeIcon();
});

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
    isMuted = audioPlayer.volume === 0;
    updateVolumeIcon();
});

function updateVolumeIcon() {
    muteIcon.className = isMuted ? 'fas fa-volume-mute' :
        audioPlayer.volume > 0.5 ? 'fas fa-volume-up' :
        audioPlayer.volume > 0 ? 'fas fa-volume-down' : 'fas fa-volume-off';
}

// Set initial volume and icon
audioPlayer.volume = volumeSlider.value;
updateVolumeIcon();


let currentQuestion = 0;
let score = 0;
let isPlaying = false;

const questions = [
    {
        audio: 'mp3/song_1.mp3',
        cover: 'https://t2.genius.com/unsafe/510x510/https%3A%2F%2Fimages.genius.com%2Fc9f0a61e3ecf4f14bd4ec222aaf102f6.1000x1000x1.png',
        artist: 'AYLIVA',
        track: 'Lilien',
        language: 'Allemand',
        options: ['Allemand', 'Arabe', 'Suédois', 'Vietnamien'],
        anecdote: "Franchement jsavais déjà que y avait des pépites en allemand, du coup j'ai essayé de bien fouiller, j'ai un peu galéré mais faut voir comment il résonne de dingo ce son"
    },
    {
        audio: 'mp3/song_2.mp3',
        cover: 'https://t2.genius.com/unsafe/510x510/https%3A%2F%2Fimages.genius.com%2F174b02294f781460cc00d00e7135d84b.1000x1000x1.png',
        artist: 'Ladaniva',
        track: 'Shakar',
        language: 'Arménien',
        options: ['Arabe Occidental', 'Arménien', 'Malais', 'Thailandais'],
        anecdote: "hehe rempli de malice celui là, jvoulais voir si t'arrivais à l'avoir (je l'aurai pas eu)"
    },
    {
        audio: 'mp3/song_3.mp3',
        cover: 'https://t2.genius.com/unsafe/510x510/https%3A%2F%2Fimages.genius.com%2F4f93727274e96e77add6850492be69f0.1000x1000x1.jpg',
        artist: 'Rose Villain, Guè',
        track: 'COME UN TUONO',
        language: 'Italien',
        options: ['Espagnol', 'Portugais', 'Indonésien', 'Italien'],
        anecdote: "Au début j’étais en mode le mec en feat il gâche un peu le son, mais à la réécoute c’est douuuux"
    },
    {
        audio: 'mp3/song_4.mp3',
        cover: 'https://t2.genius.com/unsafe/510x510/https%3A%2F%2Fimages.genius.com%2Fd7ae872dffe2dda742204c6fd4256e4e.1000x1000x1.png',
        artist: 'Trueno',
        track: 'REAL GANGSTA LOVE',
        language: 'Espagnol',
        options: ['Portugais', 'Français (ptdrr)', 'Espagnol', 'Anglais'],
        anecdote: "Bon il dit pas mal de mots en anglais ce ptit con mais c’est bel et bien de l’espagnol 😭 "
    },
    {
        audio: 'mp3/song_5.mp3',
        cover: 'https://i.scdn.co/image/ab67616d0000b273d1802c814b165bac387b5121',
        artist: 'Molly Sandén',
        track: 'Slutet av sommarn',
        language: 'Suédois',
        options: ['Suédois', 'Danois', 'Norvégien', 'Congolais'],
        anecdote: "Alors celui-là j’étais choqué, pcq les Suédois ils sont tous en dépression ces enculés, mais j’ai réussi à trouver la perle dans le lot 🙏 "
    },
    {
        audio: 'mp3/song_6.mp3',
        cover: 'https://t2.genius.com/unsafe/510x510/https%3A%2F%2Fimages.genius.com%2F6958e5a0c8d045943f5aa4ae2b851b28.1000x1000x1.png',
        artist: 'HYOLYN, GRAY',
        track: 'Dally',
        language: 'Coréen',
        options: ['Japonais', 'Vietnamien', 'Chinois', 'Coréen'],
        anecdote: "Une de mes récentes découvertes fallait que je fasse croquer ! (Hyolyn même si t’as 30 ans viens dans mes dms pitié) "
    },
    {
        audio: 'mp3/song_7.mp3',
        cover: 'https://t2.genius.com/unsafe/510x510/https%3A%2F%2Fimages.genius.com%2Fe6a7b3d6548289f2df87e4dc6e427a85.1000x1000x1.png',
        artist: 'keshi',
        track: 'Say',
        language: 'Anglais',
        options: ['Anglais', 'Polonais', 'Néerlandais', 'Finlandais'],
        anecdote: "Une pépite cet artiste, la relève de The Weeknd jvous le dis moi, faut rester branché sur keshi (oui je suis le maxeur originel)"
    },
    {
        audio: 'mp3/song_8.mp3',
        cover: 'https://t2.genius.com/unsafe/340x340/https%3A%2F%2Fimages.genius.com%2Ff9f59e2f570c8527a8588284dac29888.905x905x1.jpg',
        artist: 'JONY',
        track: 'Love Your Voice',
        language: 'Russe',
        options: ['Ukrainien', 'Suédois', 'Russe', 'Biélorusse'],
        anecdote: "Alors les russes ptdrrr, ça à vraiment était DUR de trouver une bonne musique qui fait pas trop kéké, il est fort possible que t'es déjà entendu le son carrément"
    },
];

function loadQuestion() {
    const question = questions[currentQuestion];
    audioPlayer.src = question.audio;
    artistName.textContent = question.artist;
    trackName.textContent = question.track;

    // Update the player cover with flip card structure
    const playerCover = document.querySelector('.player-cover');
    playerCover.innerHTML = `
        <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${question.cover}" alt="Album cover" class="cover-img">
                </div>
                <div class="flip-card-back">
                    <p>${question.anecdote}</p>
                </div>
            </div>
        </div>
    `;

    answersContainer.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => checkAnswer(option));
        answersContainer.appendChild(button);
    });

    feedbackElement.textContent = '';
    nextButton.style.display = 'none';
    isPlaying = false;
}

function checkAnswer(selectedLanguage) {
    const correctLanguage = questions[currentQuestion].language;
    const quizContainer = document.querySelector('.quiz-container');
    const flipCard = document.querySelector('.flip-card');

    if (selectedLanguage === correctLanguage) {
        feedbackElement.textContent = 'Bien joué !';
        feedbackElement.style.color = '#28a745';
        quizContainer.style.backgroundColor = 'rgba(40, 167, 69, 0.5)';
        score++;
        correctSound.play();
    } else {
        feedbackElement.textContent = `Mais nan tu troooll, c'était ${correctLanguage}.`;
        feedbackElement.style.color = '#dc3545';
        quizContainer.style.backgroundColor = 'rgba(220, 53, 69, 0.5)';
        incorrectSound.play();
    }
    
    scoreElement.textContent = score;
    nextButton.style.display = 'inline-block';
    disableAnswerButtons();

    setTimeout(() => {
        quizContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        // Flip the card to show the anecdote
        flipCard.classList.add('flipped');
    }, 1000);
}

// Add this function to reset the flip card when moving to the next question
function resetFlipCard() {
    const flipCard = document.querySelector('.flip-card');
    if (flipCard) {
        flipCard.classList.remove('flipped');
    }
}

function disableAnswerButtons() {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(button => {
        button.disabled = true;
        button.style.opacity = '0.5';
    });
}

function updateProgressBar() {
    const totalQuestions = questions.length;
    const progressPercentage = (currentQuestion / totalQuestions) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

function endQuiz() {
    // Change the title
    const quizTitle = document.querySelector('.quiz-title');
    quizTitle.textContent = "Tu as terminé le quiz ! GG !";

    // Hide play button, track name, artist name, and the flip card cover
    playPauseBtn.style.display = 'none';
    trackName.style.display = 'none';
    artistName.style.display = 'none';
    
    // Hide the flip card and its contents
    const playerCover = document.querySelector('.player-cover');
    playerCover.innerHTML = '';  // Remove the flip card structure

    // Get the selected avatar ID from localStorage
    const selectedAvatarId = localStorage.getItem('selectedAvatar');

    // Replace the cover with a new image based on the score and avatar
    const score = parseInt(scoreElement.textContent);
    let scoreImageUrl;

    // Define image mappings for each avatar
    const avatarScoreImages = {
        'avatar-1': ['img/score/nezuko_1.gif', 'img/score/nezuko_2.gif', 'img/score/nezuko_3.gif'],
        'avatar-2': ['img/score/hinata_1.gif', 'img/score/hinata_2.gif', 'img/score/hinata_3.gif'],
        'avatar-3': ['img/score/happy_1.gif', 'img/score/happy_2.gif', 'img/score/happy_3.gif'],
        'avatar-4': ['img/score/chiyuki_1.gif', 'img/score/chiyuki_2.gif', 'img/score/chiyuki_3.gif'],
        'avatar-5': ['img/score/ayanokoji_1.gif', 'img/score/ayanokoji_2.gif', 'img/score/ayanokoji_3.gif'],
        'avatar-6': ['img/score/maomao_1.gif', 'img/score/maomao_2.gif', 'img/score/maomao_3    .gif']
    };

    // Select the appropriate image based on score and avatar
    if (selectedAvatarId && avatarScoreImages[selectedAvatarId]) {
        if (score <= 3) {
            scoreImageUrl = avatarScoreImages[selectedAvatarId][0];
        } else if (score <= 7) {
            scoreImageUrl = avatarScoreImages[selectedAvatarId][1];
        } else {
            scoreImageUrl = avatarScoreImages[selectedAvatarId][2];
        }
    } else {
        // Fallback to default images if avatar is not found
        if (score <= 3) {
            scoreImageUrl = 'img/score_1.png';
        } else if (score <= 7) {
            scoreImageUrl = 'img/score_2.png';
        } else {
            scoreImageUrl = 'img/score_3.png';
        }
    }

    // Create a new img element to display the score image
    const resultImage = document.createElement('img');
    resultImage.src = scoreImageUrl;
    resultImage.alt = 'Score image';
    resultImage.classList.add('score-image');
    playerCover.appendChild(resultImage);

    // Remove "Score: " element for the end screen
    const scoreDisplay = document.getElementById('score');
    scoreDisplay.style.display = 'none'; // Hide the "Score: " element

    // Clear the answers container and display the final score
    answersContainer.innerHTML = '';
    feedbackElement.innerHTML = `Ton score final est de ${score}/8.<br>(un chapeau 🤔)`;
    feedbackElement.style.color = '#EDBCF9';

    // Hide next button and audio player
    nextButton.style.display = 'none';
    audioPlayer.style.display = 'none';

    // Ensure progress bar is filled
    progressBar.style.width = '100%';

    const bonusButton = document.createElement('button');
    bonusButton.textContent = 'Aller au Bonus';
    bonusButton.classList.add('bonus-button'); // Optional: Add a class for styling
    bonusButton.onclick = () => {
        window.location.href = 'bonus.html'; // Redirect to the bonus.html page
    };

    // Append the button to the player cover or another container
    playerCover.appendChild(bonusButton);

    // Show the floating hat
    const floatingHat = document.getElementById('floating-hat');
    floatingHat.style.display = 'block';

    // Add click event listener to the floating hat
    floatingHat.addEventListener('click', showPopup);

    // Log to console to verify the function is called
    console.log("Quiz ended, floating hat should be visible and clickable");
}

function showPopup(event) {
    // Prevent the click event from propagating
    event.stopPropagation();

    const popupBox = document.getElementById('popup-box');
    popupBox.style.display = 'block';

    // Add blur effect to the background
    document.body.classList.add('blur-background');

    // Log to console to verify the function is called
    console.log("Popup should be visible now");

    // Close popup when clicking outside
    document.addEventListener('click', function closePopup(e) {
        if (!popupBox.contains(e.target) && e.target !== document.getElementById('floating-hat')) {
            popupBox.style.display = 'none';
            document.body.classList.remove('blur-background');
            document.removeEventListener('click', closePopup);
            console.log("Popup closed");
        }
    });
}

function togglePlayPause() {
    if (isPlaying) {
        // Si la musique est en cours, on la met en pause
        audioPlayer.pause();
        playIcon.style.display = 'inline';  // Affiche l'icône play
        pauseIcon.style.display = 'none';   // Masque l'icône pause
    } else {
        // Si la musique est en pause, on la lance
        audioPlayer.play();
        playIcon.style.display = 'none';    // Masque l'icône play
        pauseIcon.style.display = 'inline'; // Affiche l'icône pause
    }
    isPlaying = !isPlaying;  // Inverse l'état de lecture
}

function showHint() {
    alert("Mon tout est un médicament de la ventoline ou une insulte si mal prononcé");
}

// Function to load and set up the click sound
function setupClickSound() {
    clickSound = new Audio('mp3/button_click.mp3');
    clickSound.volume = 0.2; // Adjust volume as needed

    // Add error handling
    clickSound.addEventListener('error', function(e) {
        console.error('Error loading click sound:', e);
    });

    // Attempt to load the audio
    clickSound.load();
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', setupClickSound);

// Function to play click sound
function playClickSound() {
    if (clickSound && clickSound.readyState === 4) { // 4 means HAVE_ENOUGH_DATA
        clickSound.currentTime = 0; // Reset the audio to the beginning
        let playPromise = clickSound.play();
        
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.error('Error playing click sound:', error);
            });
        }
    } else {
        console.warn('Click sound not ready to play');
    }
}

// Add click event listener to the document
document.addEventListener('click', function(event) {
    // Check if the clicked element or its parent is a button or interactive element
    if (event.target.closest('button, .answer-btn, #play-pause-btn, #mute-toggle, #fullscreen-btn, .hint-button')) {
        playClickSound();
    }
});

// Assure-toi que le bouton est bien cliquable et qu'il appelle la fonction
playPauseBtn.addEventListener('click', togglePlayPause);

nextButton.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
        updateProgressBar();
    } else {
        endQuiz();
    }
});

audioPlayer.addEventListener('ended', () => {
    isPlaying = false;
    playPauseBtn.textContent = '▶';
});

audioPlayer.addEventListener('timeupdate', updateProgressBar);

const fullscreenBtn = document.getElementById('fullscreen-btn');
const fullscreenIcon = fullscreenBtn.querySelector('i');

fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        // Enter fullscreen
        document.documentElement.requestFullscreen().then(() => {
            fullscreenIcon.classList.remove('fa-expand');
            fullscreenIcon.classList.add('fa-compress');
        }).catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        // Exit fullscreen
        document.exitFullscreen().then(() => {
            fullscreenIcon.classList.remove('fa-compress');
            fullscreenIcon.classList.add('fa-expand');
        }).catch(err => {
            console.error(`Error attempting to exit full-screen mode: ${err.message}`);
        });
    }
});

loadQuestion();
document.getElementById('floating-hat').addEventListener('click', showPopup);