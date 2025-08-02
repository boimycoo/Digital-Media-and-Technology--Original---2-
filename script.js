// Toggle mobile navigation menu
const hamburger = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".nav-links");
const counters = document.querySelectorAll(".counter");
let scrollStarted = false;

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinksContainer.classList.toggle("active");
});

// Close the mobile menu when clicking outside of it
document.addEventListener("click", (event) => {
  const isClickInside = navLinksContainer.contains(event.target) || hamburger.contains(event.target);
  if (!isClickInside) {
    hamburger.classList.remove("active");
    navLinksContainer.classList.remove("active");
  }
});

// Close the mobile menu when a link is clicked
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinksContainer.classList.remove("active");
  });
});

// Counter animation

document.addEventListener("scroll", scrollPage);

function scrollPage() {
  const scrollPos = window.scrollY;
  // console.log("Scroll position (Y):" + window.scrollY);

  if (scrollPos > 400 && !scrollStarted) {
    countUp();
    scrollStarted = true;
  } else if (scrollPos < 400 && scrollStarted) {
    reset();
    scrollStarted = false;
  }
}

function countUp() {
  counters.forEach((counter) => {
    counter.innerText = "0";

    const updateCounter = () => {
      // Get counter target
      const target = +counter.getAttribute("data-target");
      //Get current counter value
      const c = +counter.innerText;

      //Create an increment
      const increment = target / 100;

      //If counter is less than  target, add increment
      if (c < target) {
        // Round up and set counter value
        counter.innerText = `${Math.ceil(c + increment)}`;

        setTimeout(updateCounter, 100);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

function reset() {
  counters.forEach((counter) => (counter.innerHTML = "0"));
}

// Smooth scroll for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Email Activation

function sendMessage(){
    (function (){
        emailjs.init("p75x9dtjSxlA3GUgu"); // Account public key
    })();

    let serviceID = "service_hnfsjt7"; // Email service ID 
    let templateID = "template_6f5i1be"; // Email template ID

    const btn = document.querySelector("button");
    btn.disabled = true;
    btn.innerText = "Sending...";

    const params = {
        sendername: document.querySelector("#name").value,
        senderemail: document.querySelector("#email").value,
        message: document.querySelector("#message").value
    };

    emailjs.send(serviceID, templateID, params)
    .then( res =>{

        // Show the custom popup instead of alert

       document.getElementById("popup").style.display = "flex";

       // Auto-close after 3.5 seconds (3500ms)

       setTimeout(() => {
       closePopup();
       }, 5000);

        // Reset form
        document.querySelector("#name").value = "";
        document.querySelector("#email").value = "";
        document.querySelector("#message").value = "";

        //restore button
        btn.disabled = false;
        btn.innerText = "Send Message";

    })
    .catch( err=> {
        console.error("EmialJS Error:", err);
        alert("Oops! Something went wrong. Please try again later.")
        
    });

    
}

function closePopup() {
document.getElementById("popup").style.display = "none";
}
