// FAQ toggle
document.querySelectorAll(".faq-question").forEach(button => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const span = button.querySelector("span");

    if (answer.classList.contains("show")) {
      answer.classList.remove("show");
      span.textContent = "+";
    } else {
      // Close all open answers
      document.querySelectorAll(".faq-answer").forEach(ans => ans.classList.remove("show"));
      document.querySelectorAll(".faq-question span").forEach(s => s.textContent = "+");

      answer.classList.add("show");
      span.textContent = "–";
    }
  });
});
// Burger menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('nav ul');

// toggle menu when burger icon clicked
menuToggle.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent closing immediately
  navLinks.classList.toggle('show');
});

// Close menu if clicked outside
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('show') &&
      !navLinks.contains(e.target) &&
      !menuToggle.contains(e.target)) {
    navLinks.classList.remove('show');
  }
});
// Close menu on scroll
window.addEventListener('scroll', () => {
  navLinks.classList.remove('show');
});
//  Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});
// Contact Form Handling
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      formMessage.style.display = 'block';
      formMessage.style.color = 'green';
      formMessage.textContent = '✅ Your message has been sent!';
      form.reset();
    } else {
      formMessage.style.display = 'block';
      formMessage.style.color = 'red';
      formMessage.textContent = '❌ Oops! Something went wrong.';
    }
  } catch (error) {
    formMessage.style.display = 'block';
    formMessage.style.color = 'red';
    formMessage.textContent = '⚠️ Network error. Try again later.';
  }
});
