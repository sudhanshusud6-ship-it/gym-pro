const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Reveal sections on scroll
const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach(item => observer.observe(item));

// Animated statistics
const counters = document.querySelectorAll('[data-count]');
let countersStarted = false;
const counterObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    counters.forEach(counter => {
      const target = Number(counter.dataset.count);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 50));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = current + '+';
      }, 25);
    });
  }
}, { threshold: 0.5 });
if (counters.length) counterObserver.observe(counters[0]);

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let slide = 0;

function showSlide(index) {
  slide = (index + testimonials.length) % testimonials.length;
  testimonials.forEach((item, i) => item.classList.toggle('active', i === slide));
  dots.forEach((dot, i) => dot.classList.toggle('active', i === slide));
}
document.querySelector('.prev').addEventListener('click', () => showSlide(slide - 1));
document.querySelector('.next').addEventListener('click', () => showSlide(slide + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
setInterval(() => showSlide(slide + 1), 6000);

// Contact form validation
const form = document.getElementById('contactForm');
const formMessage = document.querySelector('.form-message');

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const message = document.getElementById('message');

  if (name.value.trim().length < 2) {
    formMessage.textContent = 'Please enter your name.';
    name.focus();
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    formMessage.textContent = 'Please enter a valid email address.';
    email.focus();
    return;
  }
  if (phone.value.trim().length < 7) {
    formMessage.textContent = 'Please enter a valid phone number.';
    phone.focus();
    return;
  }
  if (message.value.trim().length < 10) {
    formMessage.textContent = 'Please write a short message.';
    message.focus();
    return;
  }

  formMessage.textContent = 'Thanks! Your message has been validated successfully.';
  form.reset();
});

// Current year
document.getElementById('year').textContent = new Date().getFullYear();
