/* ================= MENU BURGER ================= */

const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

burger.addEventListener("click", () => {
    nav.classList.toggle("active");
});


/* ================= SCROLL SMOOTH ================= */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll("section:not(#hero)").forEach(section => {
    section.classList.add("hidden");
    observer.observe(section);
});


/* ================= FORMULAIRE ================= */

const form = document.getElementById("contact-form");
const message = document.getElementById("form-message");
const btn = document.getElementById("submit-btn");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const messageInput = document.getElementById("message").value.trim();

    if (name === "" || email === "" || messageInput === "") {
        message.style.color = "red";
        message.textContent = "Veuillez remplir tous les champs obligatoires.";
        return;
    }

    if (!validateEmail(email)) {
        message.style.color = "red";
        message.textContent = "Email invalide.";
        return;
    }

    // 🔥 ACTIVER LOADER
    btn.classList.add("loading");
    btn.disabled = true;

    emailjs.sendForm("service_xuv728n", "template_kaztr1k", this) //👈 remplace ici ta clé de service et template EmailUS
    .then(() => {
        message.style.color = "green";
        message.textContent = "Message envoyé avec succès !";

        // ✅ Succès visuel
        btn.classList.remove("loading");
        btn.classList.add("success");
        btn.querySelector(".btn-text").textContent = "Envoyé ✔";

        form.reset();

        // 🎉 CONFETTI EFFECT
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Reset bouton après 2s
        setTimeout(() => {
            btn.classList.remove("success");
            btn.querySelector(".btn-text").textContent = "Envoyer";
            btn.disabled = false;
        }, 2000);
    })
    .catch(() => {
        message.style.color = "red";
        message.textContent = "Erreur lors de l'envoi.";

        // ❌ Erreur visuelle
        btn.classList.remove("loading");
        btn.classList.add("error");
        btn.querySelector(".btn-text").textContent = "Erreur ❌";

        setTimeout(() => {
            btn.classList.remove("error");
            btn.querySelector(".btn-text").textContent = "Envoyer";
            btn.disabled = false;
        }, 2000);
    });
});


/* ================= VALIDATION EMAIL ================= */

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* ================= ANIMATION AU SCROLL (OPTIONNEL) ================= */

const elements = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach(el => {
        const boxTop = el.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        } else {
            el.style.opacity = "0";
            el.style.transform = "translateY(30px)";
        }
    });
});


/* Initialiser les sections cachées au départ */
elements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
});

/* HEADER SCROLL */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
    }
});

// 1. Au départ du champ
el.addEventListener('blur', () => {
  if (el.value === '') { clearState(el, wrap); return; }
  fn(el.value) ? setValid(el, wrap) : setError(el, wrap);
});

// 2. Pendant la frappe (correction en temps réel)
/*el.addEventListener('input', () => {
  if (el.classList.contains('error') && fn(el.value)) setValid(el, wrap);
  if (el.value === '') clearState(el, wrap);
});*/
