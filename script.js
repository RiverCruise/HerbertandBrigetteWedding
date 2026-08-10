/* ==========================================
   BACKGROUND IMAGE SLIDER
========================================== */
const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");

let currentSlide = 0;

function changeSlide(){

    slides[currentSlide].classList.remove("active");
    indicators[currentSlide].classList.remove("active");

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    slides[currentSlide].classList.add("active");
    indicators[currentSlide].classList.add("active");

}

setInterval(changeSlide, 5000);


/* ==========================================
   ELEMENTS
========================================== */

const menuToggle = document.getElementById("menu-toggle");
const menuWrapper = document.querySelector(".menu-wrapper");
const contentPanel = document.querySelector(".content");

const menuLinks = document.querySelectorAll(".menu a");
const heroButton = document.querySelector(".hero-btn");


/* ==========================================
   SMOOTH SCROLL FUNCTION
========================================== */

function scrollToSection(targetID) {

    const target = document.querySelector(targetID);

    if (!target) return;

    // Desktop
    if (window.innerWidth > 992) {

        contentPanel.scrollTo({

            top: target.offsetTop,
            behavior: "smooth"

        });

    }

    // Tablet & Mobile
    else {

        target.scrollIntoView({

            behavior: "smooth"

        });

    }

}


/* ==========================================
   MENU LINKS
========================================== */

menuLinks.forEach(link => {

    link.addEventListener("click", function(e) {

        e.preventDefault();

        const targetID = this.getAttribute("href");

        scrollToSection(targetID);

        // Close menu automatically
        menuToggle.checked = false;

    });

});


/* ==========================================
   RSVP BUTTON
========================================== */

if (heroButton) {

    heroButton.addEventListener("click", function(e) {

        e.preventDefault();

        scrollToSection("#rsvp");

    });

}


/* ==========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================== */

document.addEventListener("click", function(e) {

    if (!menuWrapper.contains(e.target)) {

        menuToggle.checked = false;

    }

});


/* ==========================================
   CLOSE MENU WHEN WINDOW RESIZES
========================================== */

window.addEventListener("resize", function() {

    menuToggle.checked = false;

});


/* ==========================================
   WEDDING GALLERY LIGHTBOX
========================================== */

const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.querySelector(".lightbox-image");

const closeBtn = document.querySelector(".close-lightbox");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const currentImage = document.getElementById("current-image");
const totalImages = document.getElementById("total-images");

let currentIndex = 0;

/* Total Images */

totalImages.textContent = galleryImages.length;

/* Open Lightbox */

galleryImages.forEach((image, index) => {

    image.addEventListener("click", () => {

        currentIndex = index;

        showImage();

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});

/* Display Image */

function showImage(){

    lightboxImage.src = galleryImages[currentIndex].src;

    currentImage.textContent = currentIndex + 1;

}

/* Next Image */

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if(currentIndex >= galleryImages.length){

        currentIndex = 0;

    }

    showImage();

});

/* Previous Image */

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = galleryImages.length - 1;

    }

    showImage();

});

/* Close */

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";

}

closeBtn.addEventListener("click", closeLightbox);

/* Close when clicking outside image */

lightbox.addEventListener("click", (e)=>{

    if(e.target === lightbox){

        closeLightbox();

    }

});

/* ESC Key */

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key === "Escape"){

        closeLightbox();

    }

    if(e.key === "ArrowRight"){

        nextBtn.click();

    }

    if(e.key === "ArrowLeft"){

        prevBtn.click();

    }

});


/* ==========================================
   MOBILE SWIPE SUPPORT
========================================== */

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart",(e)=>{

    touchStartX = e.changedTouches[0].screenX;

});

lightbox.addEventListener("touchend",(e)=>{

    touchEndX = e.changedTouches[0].screenX;

    handleSwipe();

});

function handleSwipe(){

    if(touchEndX < touchStartX - 50){

        nextBtn.click();

    }

    if(touchEndX > touchStartX + 50){

        prevBtn.click();

    }

}


/* ==========================================
            RSVP CONFIGURATION
========================================== */


const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyDlcuSFKeK2b427S1pTWUgqLt-Bk69yk8YQ78isIQCr-NPvsgbKYjmCRDWHRslHBCTFg/exec";

/* ==========================================
            HTML ELEMENTS
========================================== */

const fullnameInput = document.getElementById("fullname");

const yesButton = document.getElementById("yesBtn");

const noButton = document.getElementById("noBtn");

const popupOverlay = document.getElementById("popupOverlay");

const popupIcon = document.getElementById("popupIcon");

const popupTitle = document.getElementById("popupTitle");

const popupMessage = document.getElementById("popupMessage");


/* ==========================================
            BUTTON EVENTS
========================================== */

yesButton.addEventListener("click", function(){

    submitRSVP("Yes, I'll be there!");

});

noButton.addEventListener("click", function(){

    submitRSVP("Can't make it");

});


/* ==========================================
            SUBMIT RSVP
========================================== */

function submitRSVP(attendance){

    const fullname = fullnameInput.value.trim();

    if(fullname === ""){

        alert("Please enter your full name.");

        fullnameInput.focus();

        return;

    }

    /* Disable Buttons */

    yesButton.disabled = true;
    noButton.disabled = true;

    /* Save Original Button Text */

    const originalYes = yesButton.innerHTML;
    const originalNo = noButton.innerHTML;

    /* Show Sending Text */

    if(attendance === "Yes, I'll be there!"){

        yesButton.innerHTML = "Sending RSVP...";

    }else{

        noButton.innerHTML = "Sending RSVP...";

    }

    /* Send Data */

    fetch(WEB_APP_URL, {

        method: "POST",

        headers: {
            "Content-Type":"text/plain;charset=utf-8"
        },

        body: JSON.stringify({

            fullname: fullname,
            attendance: attendance

        })

    })

    .then(response => response.json())

    .then(data => {

        /* Restore Buttons */

        yesButton.disabled = false;
        noButton.disabled = false;

        yesButton.innerHTML = originalYes;
        noButton.innerHTML = originalNo;

        /* Clear Textbox */

        fullnameInput.value = "";

        /* Configure Popup */

        popupTitle.innerHTML = "Thank You!";

        if(attendance === "Yes, I'll be there!"){

            popupIcon.innerHTML = "😍";

            popupMessage.innerHTML =
            "Great! We're so excited to see you there!";

        }

        else{

            popupIcon.innerHTML = "🤍";

            popupMessage.innerHTML =
            "We'll miss celebrating with you, but we completely understand.";

        }

        /* Show Popup */

        popupOverlay.classList.add("show");

        /* Hide Popup after 5 seconds */

        setTimeout(function(){

            popupOverlay.classList.remove("show");

        },5000);

    })

    .catch(function(error){

        console.error(error);

        alert("Unable to submit RSVP. Please try again.");

        yesButton.disabled = false;
        noButton.disabled = false;

        yesButton.innerHTML = originalYes;
        noButton.innerHTML = originalNo;

    });

}