document.addEventListener("DOMContentLoaded", () => {

  /* ================= DATA ================= */
  const mbaPrograms = [
    {
      title: "MBA in Finance",
      intro: "Build expertise in financial planning, analysis & markets",
      bullets: [
        "Financial modelling & valuation",
        "Corporate finance strategy",
        "Investment & risk management"
      ],
      about:
        "The MBA in Finance program equips students with advanced financial knowledge and analytical skills required in today's global business environment.",
      eligibility: "Graduation with minimum 50%"
    },
    {
      title: "MBA in HR Management",
      intro: "People strategy, leadership & organizational excellence",
      bullets: [
        "Talent acquisition & retention",
        "HR analytics & performance",
        "Employee engagement strategies"
      ],
      about:
        "MBA in HR Management focuses on developing future-ready HR leaders capable of managing talent in dynamic organizations.",
      eligibility: "Any Graduate"
    },
    {
      title: "MBA in Business Analytics",
      intro: "Data-driven decision making for modern enterprises",
      bullets: [
        "Data analysis & visualization",
        "Predictive analytics models",
        "Business intelligence tools"
      ],
      about:
        "The MBA in Business Analytics program bridges the gap between business strategy and data science.",
      eligibility: "Maths preferred"
    },
    {
      title: "MBA in Marketing",
      intro: "Brand building, digital growth & market leadership",
      bullets: [
        "Digital & social media marketing",
        "Brand strategy & positioning",
        "Consumer behavior analysis"
      ],
      about:
        "MBA in Marketing is designed to create professionals with a deep understanding of consumer markets.",
      eligibility: "Any Graduate"
    }
  ];

  const track = document.getElementById("scrollTrack");
  const wrapper = document.getElementById("scrollWrapper");
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");

  let scrollIndex = 0;
  let autoScrollTimer = null;
  let inactivityTimer = null;
  let isAutoScrollEnabled = true;

  const CARD_WIDTH = 340 + 32;

  /* ================= RENDER ================= */
  function renderCards(data, duplicate = false) {
    track.innerHTML = "";
    scrollIndex = 0;
    track.style.transform = "translateX(0)";

    const list = duplicate ? [...data, ...data] : data;

    list.forEach(program => {
      const card = document.createElement("div");
      // FIXED: Added 'h-fit' to ensure the card only takes up the height it needs.
      card.className = `
        bg-white rounded-xl p-6 flex flex-col shadow
        transition-all duration-300 h-fit
      `;

      card.innerHTML = `
        <h3 class="text-xl font-semibold text-blue-700 mb-2">
          ${program.title}
        </h3>

        <p class="text-sm text-gray-600 mb-4">
          ${program.intro}
        </p>

        <div class="space-y-2 text-gray-600">
          ${program.bullets.map(b => `<p>• ${b}</p>`).join("")}
        </div>

        <div class="border-t border-gray-200 my-4"></div>

        <div
          class="course-content text-gray-600 space-y-3
                 max-h-0 overflow-hidden transition-all duration-500 ease-in-out">
          <p class="text-sm leading-relaxed">${program.about}</p>
          <p class="font-semibold">Eligibility:</p>
          <p>${program.eligibility}</p>

          <button
            class="apply-btn mt-4 w-full py-2 rounded-lg text-white font-semibold
                   bg-gradient-to-r from-blue-600 to-yellow-400">
            Apply Now
          </button>
        </div>

        <button
          class="mt-4 text-blue-600 font-medium self-start hover:underline read-more-btn">
          Read More ▼
        </button>
      `;

      track.appendChild(card);
    });

    attachHandlers();
  }

  /* ================= HANDLERS ================= */
  function attachHandlers() {
    document.querySelectorAll(".read-more-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        // Stop auto-scroll while reading
        stopAutoScroll();
        isAutoScrollEnabled = false;

        const content = btn.previousElementSibling;
        const expanded = content.style.maxHeight && content.style.maxHeight !== "0px";

        // 1. Close all other cards (Accordion effect)
        document.querySelectorAll(".read-more-btn").forEach(b => {
          if (b !== btn) {
            b.previousElementSibling.style.maxHeight = "0px";
            b.textContent = "Read More ▼";
          }
        });

        // 2. Toggle current card
        if (expanded) {
          content.style.maxHeight = "0px";
          btn.textContent = "Read More ▼";
          // Resume auto-scroll after a delay if closed
          clearTimeout(inactivityTimer);
          inactivityTimer = setTimeout(startAutoScroll, 3000);
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          btn.textContent = "Read Less ▲";
        }
      });
    });

    document.querySelectorAll(".apply-btn").forEach(btn => {
      btn.addEventListener("click", scrollToTop);
    });
  }

  /* ================= AUTO SCROLL ================= */
  function startAutoScroll() {
    stopAutoScroll();
    isAutoScrollEnabled = true;

    autoScrollTimer = setInterval(() => {
      if (!isAutoScrollEnabled) return;

      scrollIndex++;
      track.style.transition = "transform 0.5s ease";
      track.style.transform = `translateX(-${scrollIndex * CARD_WIDTH}px)`;

      // Logic for infinite loop (since list is duplicated)
      if (scrollIndex >= mbaPrograms.length) {
        setTimeout(() => {
          track.style.transition = "none";
          scrollIndex = 0;
          track.style.transform = "translateX(0)";
        }, 500);
      }
    }, 2500);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollTimer);
  }

  /* ================= SEARCH ================= */
  function handleSearch() {
    stopAutoScroll();
    isAutoScrollEnabled = false;

    const query = searchInput.value.toLowerCase().trim();
    clearTimeout(inactivityTimer);

    if (!query) {
      renderCards(mbaPrograms, true);
      inactivityTimer = setTimeout(startAutoScroll, 2000);
      return;
    }

    const filtered = mbaPrograms.filter(p =>
      (`${p.title} ${p.intro} ${p.about} ${p.eligibility}`)
        .toLowerCase()
        .includes(query)
    );

    renderCards(filtered, false);
  }

  function clearSearch() {
    searchInput.value = "";
    renderCards(mbaPrograms, true);
    startAutoScroll();
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ================= EVENTS ================= */
  searchInput.addEventListener("input", handleSearch);
  clearBtn.addEventListener("click", clearSearch);

  wrapper.addEventListener("touchstart", () => {
    stopAutoScroll();
    isAutoScrollEnabled = false;
  });
  
  wrapper.addEventListener("touchend", () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(startAutoScroll, 3000);
  });

  /* ================= INIT ================= */
  renderCards(mbaPrograms, true);
  startAutoScroll();

});
