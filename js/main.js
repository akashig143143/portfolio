// Main JavaScript file for Akash's Portfolio

// DOM Elements
const body = document.body;
const navbar = document.getElementById('navbar');
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
const navLinks = document.querySelectorAll('.navbar-link');
const mobileNavLinks = document.querySelectorAll('.navbar-mobile-link');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const loadingScreen = document.getElementById('loading-screen');
const customCursor = document.getElementById('custom-cursor');
const typewriterElement = document.getElementById('typewriter');

const updateThemeAssets = (isDark) => {
  const leetcodeGraph = document.querySelector('.leetcode-container .graph');
  if (!leetcodeGraph) return;

  const graphUrl = new URL(leetcodeGraph.src);
  graphUrl.searchParams.set('theme', isDark ? 'dark' : 'light');
  leetcodeGraph.src = graphUrl.toString();
};

// Theme Management
const initTheme = () => {
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme ? savedTheme === 'dark' : systemPrefersDark;
  
  // Apply theme
  if (isDark) {
    document.documentElement.classList.add('dark');
    themeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
  } else {
    document.documentElement.classList.remove('dark');
    themeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-500"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
  }
  updateThemeAssets(isDark);
};

const toggleTheme = () => {
  const isDark = document.documentElement.classList.contains('dark');
  
  if (isDark) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
    themeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-500"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    themeIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';
  }
  updateThemeAssets(!isDark);
};

// Navbar Scroll Effect
const handleScroll = () => {
  if (window.scrollY > 20) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
};

// Mobile Menu Toggle
const setMobileMenuOpen = (isOpen) => {
  navbarMenu.classList.toggle('open', isOpen);
  navbarToggle.setAttribute('aria-expanded', String(isOpen));
  navbarToggle.innerHTML = isOpen
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>';
};

const toggleMobileMenu = () => {
  setMobileMenuOpen(!navbarMenu.classList.contains('open'));
};

// Active Section Tracking
const observeSections = () => {
  const sections = document.querySelectorAll('section');
  const navbarHeight = navbar.offsetHeight;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          
          // Update desktop nav links
          navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
          
          // Update mobile nav links
          mobileNavLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    },
    { 
      rootMargin: `-${navbarHeight}px 0px -50% 0px`,
      threshold: 0.1
    }
  );
  
  sections.forEach((section) => {
    observer.observe(section);
  });
};

// Loading Screen
const hideLoadingScreen = () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500); // Match the fade-out animation duration
  }, 3500); // Match the loading duration from the original
};

// Custom Cursor
const updateCustomCursor = (e) => {
  if (customCursor) {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
  }
};

const handleMouseDown = () => {
  if (customCursor) {
    customCursor.classList.add('active');
  }
};

const handleMouseUp = () => {
  if (customCursor) {
    customCursor.classList.remove('active');
  }
};

// TypeWriter Effect
class TypeWriter {
  constructor(element, words, delay = 100) {
    this.element = element;
    this.words = words;
    this.delay = delay;
    this.currentWordIndex = 0;
    this.currentText = '';
    this.isDeleting = false;
    this.type();
  }
  
  type() {
    const word = this.words[this.currentWordIndex];
    
    if (this.isDeleting) {
      // Deleting effect
      this.currentText = word.substring(0, this.currentText.length - 1);
    } else {
      // Typing effect
      this.currentText = word.substring(0, this.currentText.length + 1);
    }
    
    this.element.textContent = this.currentText;
    
    // Add blinking cursor
    const cursor = document.querySelector('.typewriter-cursor');
    if (!cursor) {
      const cursorElement = document.createElement('span');
      cursorElement.className = 'typewriter-cursor';
      this.element.parentNode.appendChild(cursorElement);
    }
    
    // Typing speed
    let typeSpeed = this.isDeleting ? this.delay / 1.5 : this.delay;
    
    // If complete word
    if (!this.isDeleting && this.currentText === word) {
      // Pause before deleting
      typeSpeed = 1000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentText === '') {
      this.isDeleting = false;
      // Move to next word
      this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
      // Pause before typing next word
      typeSpeed = 500;
    }
    
    setTimeout(() => this.type(), typeSpeed);
  }
}



// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme
  initTheme();
  
  // Add event listeners
  window.addEventListener('scroll', handleScroll);
  themeToggle.addEventListener('click', toggleTheme);
  navbarToggle.addEventListener('click', toggleMobileMenu);
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.navbar-mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      setMobileMenuOpen(false);
    });
  });
  
  // Initialize section observer
  observeSections();
  
  // Initialize loading screen
  hideLoadingScreen();
  
  // Initialize custom cursor (Merged Logic)
  const cursor = document.querySelector(".cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      const cursorEdge = 20;
      const isAwayFromViewportEdges =
        e.clientX >= cursorEdge &&
        e.clientY >= cursorEdge &&
        e.clientX <= window.innerWidth - cursorEdge &&
        e.clientY <= window.innerHeight - cursorEdge;

      if (!isAwayFromViewportEdges) {
        cursor.classList.remove("is-visible");
        return;
      }

      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      cursor.classList.add("is-visible");
    });
    
    // Add hover effect for text elements
    document.querySelectorAll("p, span, a, strong, h1, h2, h3, h4, h5, h6, button, input, textarea").forEach(el => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("text-hover");
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("text-hover");
      });
    });
  }
  
  // Initialize typewriter effect
  if (typewriterElement) {
    const roles = [
      "Java Developer",
      "DSA Enthusiast",
      "Problem Solver",
      "Lifelong Learner",
      "Skill Accelerator",
      "Tech Explorer"
    ];
    new TypeWriter(typewriterElement, roles, 100);
  }
  
  // Trigger initial scroll event to set navbar state
  handleScroll();

  // Initialize Project Filter
  initProjectFilter();

  // Initialize Scroll to Top
  initScrollToTop();

  // Initialize Certifications Carousel
  initCertCarousel();

  // Initialize Timeline Observer
  initTimelineObserver();
});

// Animated Logo
const handleLogoClick = () => {
  loadingScreen.style.display = 'flex';
  loadingScreen.classList.remove('hidden');
  
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 2000);
  }, 500);
};

// Initialize logo click handler
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.getElementById('navbar-logo');
  if (logo) {
    logo.addEventListener('click', handleLogoClick);
  }
});

// Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('animate-fade-in');
      }
    });
  };
  
  // Run once on load
  animateOnScroll();
  
  // Run on scroll
  window.addEventListener('scroll', animateOnScroll);
});

/* =========================================
   MOVED INLINE SCRIPTS & NEW FEATURES
   ========================================= */

// Project Filter Logic
const initProjectFilter = () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active to clicked
      btn.classList.add('active');

      const category = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('hidden');
          // Add fade in animation
          card.style.animation = 'fade-in 0.5s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
};

// Scroll to Top Logic
const initScrollToTop = () => {
  const scrollBtn = document.getElementById('scroll-to-top');
  
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

// Certifications Carousel Logic
const initCertCarousel = () => {
  const track = document.querySelector('.cert-track');
  const cards = Array.from(document.querySelectorAll('.cert-card'));
  
  if (!track || cards.length === 0) return;

  // Calculate original number of unique cards (before duplicate for looping)
  const cardCount = cards.length / 2; 
  let index = 0;

  // Get the gap dynamically from CSS
  const trackStyle = getComputedStyle(track);
  const gap = parseInt(trackStyle.gap) || 20;

  // Function to slide certificates
  function slideCerts(direction = 1) {
    index += direction;
    const cardWidth = cards[0].offsetWidth + gap;

    // Apply transform with transition
    track.style.transition = 'transform 0.5s linear';
    track.style.transform = `translateX(-${index * cardWidth}px)`;

    // Forward infinite loop
    if (index >= cardCount) {
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = `translateX(0px)`;
        index = 0;
      }, 500);
    }

    // Backward infinite loop
    if (index < 0) {
      track.style.transition = 'none';
      index = cardCount - 1;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    }
  }

  // Automatic slide every 2 seconds
  let autoSlide = setInterval(() => slideCerts(1), 2000);

  // Manual buttons
  const leftBtn = document.querySelector('.left-btn');
  const rightBtn = document.querySelector('.right-btn');

  if (leftBtn) {
    leftBtn.addEventListener('click', () => {
      clearInterval(autoSlide);
      slideCerts(-1);
      autoSlide = setInterval(() => slideCerts(1), 2000);
    });
  }

  if (rightBtn) {
    rightBtn.addEventListener('click', () => {
      clearInterval(autoSlide);
      slideCerts(1);
      autoSlide = setInterval(() => slideCerts(1), 2000);
    });
  }
};

// Timeline Observer
const initTimelineObserver = () => {
  const items = document.querySelectorAll(".timeline-content");
  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => {
    observer.observe(item);
  });
};

// GitHub Calendar Cleanup (Self-executing)
(() => {
  // 🔒 Fallback killer (if CDN cached older build)
  const killUnwanted = () => {
    const killTexts = ["Contributions in the last year", "Longest streak", "Current streak"];
    document.querySelectorAll(".calendar *").forEach(el => {
      const t = (el.textContent || "").trim();
      if (killTexts.some(k => t.includes(k))) el.remove();
    });
  };
  
  // run once after load + observe future injections
  window.addEventListener('load', () => {
    const calendar = document.querySelector(".calendar");
    if (calendar) {
      killUnwanted();
      new MutationObserver(killUnwanted).observe(
        calendar,
        { childList: true, subtree: true }
      );
    }
  });
})();
