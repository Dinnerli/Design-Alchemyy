let currentSlide = 0;
let currentThumbnail = 0;
const slides = document.querySelectorAll('.carousel-item');
const dots = document.querySelectorAll('.dot'); // Assume these dots represent thumbnail indicators
let startX = 0;
let endX = 0;

// Function to show the active slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
            currentThumbnail = 0; // Reset thumbnail index when switching slides
            showThumbnail(currentThumbnail); // Update thumbnails for the new slide
        }
    });
    updateDots(index); // Update the dot for the active slide
}

// Function to show the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Function to show the previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Function to display the current thumbnail for the active slide
function showThumbnail(index) {
    const activeSlide = slides[currentSlide]; // Get the current active slide
    const activeWrapper = activeSlide.querySelector('.wrapper'); // Get the wrapper within the active slide
    const sliderWidth = activeSlide.querySelector('.wrapper-holder').offsetWidth; // Get the width of the wrapper-holder
    
    if (activeWrapper) {
        activeWrapper.style.transform = `translateX(-${index * sliderWidth}px)`; // Apply the transform to move thumbnails
    }
    updateThumbnailDots(index); // Update thumbnail indicator dots
}

// Function to update the slide indicator dots
function updateDots(slideIndex) {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === slideIndex); // Toggle the active class on the correct dot
    });
}

// Function to update the thumbnail indicator dots within each slide
function updateThumbnailDots(thumbnailIndex) {
    const activeSlide = slides[currentSlide]; // Get the current active slide
    const thumbnailDots = activeSlide.querySelectorAll('.thumbnail-dot'); // Get the dots for thumbnails in the active slide

    thumbnailDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === thumbnailIndex); // Toggle active class for the current thumbnail dot
    });
}

// Handle Touch Events for Swiping
function handleTouchStart(e) {
    startX = e.touches[0].clientX; // Get the initial touch position
}

function handleTouchMove(e) {
    endX = e.touches[0].clientX; // Update the touch position as you move
}

function handleTouchEnd() {
    const threshold = 50; // Minimum swipe distance to trigger the swipe
    if (startX - endX > threshold) {
        nextImg(); // Swipe left: next thumbnail
    } else if (endX - startX > threshold) {
        prevImg(); // Swipe right: previous thumbnail
    }
}

// Add event listeners for touch events to the wrapper-holder of each slide
function addTouchEvents() {
    slides.forEach(slide => {
        const sliderContainer = slide.querySelector('.wrapper-holder');
        if (sliderContainer) {
            sliderContainer.addEventListener('touchstart', handleTouchStart);
            sliderContainer.addEventListener('touchmove', handleTouchMove);
            sliderContainer.addEventListener('touchend', handleTouchEnd);
        }
    });
}

// Thumbnail Navigation Functions for touch swiping
function nextImg() {
    const activeSlide = slides[currentSlide]; // Get the current active slide
    const activeThumbnails = activeSlide.querySelectorAll('.thumbnail-slide'); // Get the thumbnails for the current slide

    if (activeThumbnails.length > 0) {
        currentThumbnail = (currentThumbnail + 1) % activeThumbnails.length;
        showThumbnail(currentThumbnail); // Show the next thumbnail
    }
}

function prevImg() {
    const activeSlide = slides[currentSlide]; // Get the current active slide
    const activeThumbnails = activeSlide.querySelectorAll('.thumbnail-slide'); // Get the thumbnails for the current slide

    if (activeThumbnails.length > 0) {
        currentThumbnail = (currentThumbnail - 1 + activeThumbnails.length) % activeThumbnails.length;
        showThumbnail(currentThumbnail); // Show the previous thumbnail
    }
}

// Initialize first slide and add touch events
showSlide(currentSlide); // Show the first slide
addTouchEvents(); // Add touch event listeners to each slide
