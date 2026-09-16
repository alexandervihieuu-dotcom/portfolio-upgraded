/* =====================================================================
   ALEXANDER · VIHIEUU — PORTFOLIO SCRIPT
   Rebuilt as a single clean file (old version had duplicate declarations
   that could crash the whole script in some browsers).
===================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------------------------
     TYPING EFFECT
  --------------------------------- */
  const typing = document.getElementById("typing");

  if (typing) {
    const words = [
      "Frontend Developer",
      "Backend Developer",
      "Fullstack Developer",
      "UI/UX Designer",
      "Cybersecurity Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = words[wordIndex];

      if (!isDeleting) {
        typing.textContent = current.substring(0, charIndex++);

        if (charIndex > current.length) {
          isDeleting = true;
          setTimeout(type, 1300);
          return;
        }
      } else {
        typing.textContent = current.substring(0, charIndex--);

        if (charIndex < 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }

      setTimeout(type, isDeleting ? 45 : 90);
    }

    type();
  }

  /* ---------------------------------
     MOBILE NAV TOGGLE
  --------------------------------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("mobile-open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------------------------
     ACTIVE NAV LINK ON SCROLL
  --------------------------------- */
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav-link");

  function setActiveLink() {
    let currentId = "";
    const scrollPos = window.scrollY + window.innerHeight * 0.35;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navAnchors.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  }

  /* ---------------------------------
     SCROLL PROGRESS BAR + BACK TO TOP
  --------------------------------- */
  const progressBar = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = percent + "%";
    if (backToTop) backToTop.classList.toggle("show", scrollTop > 500);

    setActiveLink();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------------------------
     REVEAL ON SCROLL (single observer)
  --------------------------------- */
  const revealTargets = document.querySelectorAll(".reveal");

  if (revealTargets.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: no IntersectionObserver support — just show everything
    revealTargets.forEach(el => el.classList.add("in-view"));
  }

});

/* ---------------------------------
   LOADER (kept outside DOMContentLoaded
   so it waits for full page/assets load)
--------------------------------- */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const percent = document.querySelector(".percent");
  const bar = document.querySelector(".loading-progress");

  if (!loader) return;

  let progress = 0;

  const timer = setInterval(() => {
    progress += 5;

    if (percent) percent.textContent = progress + "%";
    if (bar) bar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(timer);
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";

      setTimeout(() => {
        loader.style.display = "none";
      }, 600);
    }
  }, 40);
});
