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

// =========================
// University tabs
// =========================
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  if (!tabButtons.length || !tabPanels.length) return; // only runs on pages with tabs

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab");
      const targetPanel = document.getElementById(targetId);

      if (!targetPanel) return;

      // Remove active state from all
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));

      // Add active state to selected
      btn.classList.add("active");
      targetPanel.classList.add("active");

      // If you ever load panels dynamically, re-run animations
      if (window.observeAnimations) window.observeAnimations();
    });
  });
});
