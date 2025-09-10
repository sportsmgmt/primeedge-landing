// ================= FAQ toggle =================
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

// ================= Burger menu toggle =================
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

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

// ================= Contact Form Handling =================
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get form inputs
  const name = form.querySelector('input[name="name"]').value.trim();
  const age = form.querySelector('input[name="age"]').value.trim();
  const sport = form.querySelector('input[name="sport"]').value.trim();
  const email = form.querySelector('input[name="email"]').value.trim();

  // Validation rules
  const nameRegex = /^[A-Za-z\s]+$/;
  const ageRegex = /^[0-9]{1,2}$/;
  const sportRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!nameRegex.test(name)) {
    formMessage.style.display = 'block';
    formMessage.style.color = 'red';
    formMessage.textContent = '❌ Name must contain only alphabets.';
    return;
  }

  if (!ageRegex.test(age)) {
    formMessage.style.display = 'block';
    formMessage.style.color = 'red';
    formMessage.textContent = '❌ Age must be 1 or 2 digits only.';
    return;
  }

  if (!sportRegex.test(sport)) {
    formMessage.style.display = 'block';
    formMessage.style.color = 'red';
    formMessage.textContent = '❌ Sport must contain only alphabets.';
    return;
  }

  if (!emailRegex.test(email)) {
    formMessage.style.display = 'block';
    formMessage.style.color = 'red';
    formMessage.textContent = '❌ Email must be a valid Gmail address.';
    return;
  }

  // Submit form to Formspree
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
