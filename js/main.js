const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

function observeAnimations() {
  document.querySelectorAll(".animate:not(.show)").forEach((el) => {
    observer.observe(el);
  });
}

observeAnimations();
window.observeAnimations = observeAnimations;

