document.addEventListener("DOMContentLoaded", () => {
  /* ================= DATA ================= */
  const mbaPrograms = [
    {
      title: "MBA in Finance",
      intro: "Build expertise in financial planning, analysis & markets",
      bullets: [
        "Financial modelling & valuation",
        "Corporate finance strategy",
        "Investment & risk management",
      ],
      about: "The MBA in Finance program equips students with advanced financial knowledge and analytical skills required in today's global business environment.",
      eligibility: "Graduation with minimum 50%",
    },
    {
      title: "MBA in HR Management",
      intro: "People strategy, leadership & organizational excellence",
      bullets: [
        "Talent acquisition & retention",
        "HR analytics & performance",
        "Employee engagement strategies",
      ],
      about: "MBA in HR Management focuses on developing future-ready HR leaders capable of managing talent in dynamic organizations.",
      eligibility: "Any Graduate",
    },
    {
      title: "MBA in Business Analytics",
      intro: "Data-driven decision making for modern enterprises",
      bullets: [
        "Data analysis & visualization",
        "Predictive analytics models",
        "Business intelligence tools",
      ],
      about: "The MBA in Business Analytics program bridges the gap between business strategy and data science.",
      eligibility: "Maths preferred",
    },
    {
      title: "MBA in Marketing",
      intro: "Brand building, digital growth & market leadership",
      bullets: [
        "Digital & social media marketing",
        "Brand strategy & positioning",
        "Consumer behavior analysis",
      ],
      about: "MBA in Marketing is designed to create professionals with a deep understanding of consumer markets.",
      eligibility: "Any Graduate",
    },
  ];

  const track = document.getElementById("scrollTrack");
  const wrapper = document.getElementById("scrollWrapper");
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");

  let scrollIndex = 0;
  let autoScrollTimer = null;
  let inactivityTimer = null;
  let isAutoScrollEnabled = true;

  const CARD_WIDTH = 372; // 340px + 32px gap

  /* ================= RENDER ================= */
  function renderCards(data, isLooping = false) {
    track.innerHTML = "";
    scrollIndex = 0;
    track.style.transition = "none";
    track.style.transform = "translateX(0)";

    // Use Triple-Set for infinite loop to ensure NO GAPS
    const list = isLooping ? [...data, ...data, ...data] : data;

    list.forEach((program) => {
      const card = document.createElement("div");
      card.className = "bg-white rounded-xl p-6 flex flex-col shadow transition-all duration-300 h-fit w-[340px]";

      card.innerHTML = `
        <h3 class="text-xl font-semibold text-blue-700 mb-2">${program.title}</h3>
        <p class="text-sm text-gray-600 mb-4">${program.intro}</p>
        <div class="space-y-2 text-gray-600">
          ${program.bullets.map((b) => `<p>• ${b}</p>`).join("")}
        </div>
        <div class="border-t border-gray-200 my-4"></div>
        <div class="course-content text-gray-600 space-y-3 max-h-0 overflow-hidden transition-all duration-500">
          <p class="text-sm leading-relaxed">${program.about}</p>
          <p class="font-semibold">Eligibility:</p>
          <p>${program.eligibility}</p>
          <button class="apply-btn mt-4 w-full py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-yellow-400">
            Apply Now
          </button>
        </div>
        <button class="mt-4 text-blue-600 font-medium self-start hover:underline read-more-btn">
          Read More ▼
        </button>
      `;
      track.appendChild(card);
    });

    attachHandlers();

    if (isLooping) {
      // Offset to the middle set so scrolling is seamless immediately
      const columnsInOneSet = Math.ceil(data.length / 2);
      scrollIndex = columnsInOneSet;
      track.style.transform = `translateX(-${scrollIndex * CARD_WIDTH}px)`;
    }
  }

  /* ================= HANDLERS ================= */
  function attachHandlers() {
    document.querySelectorAll(".read-more-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        stopAutoScroll();
        isAutoScrollEnabled = false;

        const content = btn.previousElementSibling;
        const expanded = content.style.maxHeight && content.style.maxHeight !== "0px";

        // Close others
        document.querySelectorAll(".read-more-btn").forEach((b) => {
          if (b !== btn) {
            b.previousElementSibling.style.maxHeight = "0px";
            b.textContent = "Read More ▼";
          }
        });

        if (expanded) {
          content.style.maxHeight = "0px";
          btn.textContent = "Read More ▼";
          clearTimeout(inactivityTimer);
          inactivityTimer = setTimeout(startAutoScroll, 3000);
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
          btn.textContent = "Read Less ▲";
        }
      });
    });

    document.querySelectorAll(".apply-btn").forEach((btn) => {
      btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    });
  }

  /* ================= AUTO SCROLL ================= */
  function startAutoScroll() {
    stopAutoScroll();
    isAutoScrollEnabled = true;

    autoScrollTimer = setInterval(() => {
      if (!isAutoScrollEnabled) return;

      scrollIndex++;
      track.style.transition = "transform 0.6s ease-in-out";
      track.style.transform = `translateX(-${scrollIndex * CARD_WIDTH}px)`;

      const columnsInOneSet = Math.ceil(mbaPrograms.length / 2);

      // Reset logic: When reaching end of 2nd set, snap back to start of 2nd set
      if (scrollIndex >= columnsInOneSet * 2) {
        setTimeout(() => {
          track.style.transition = "none";
          scrollIndex = columnsInOneSet;
          track.style.transform = `translateX(-${scrollIndex * CARD_WIDTH}px)`;
        }, 600);
      }
    }, 3000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollTimer);
  }

  /* ================= SEARCH (MODIFIED) ================= */
  function handleSearch() {
    stopAutoScroll();
    isAutoScrollEnabled = false;
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
      renderCards(mbaPrograms, true);
      startAutoScroll();
      return;
    }

    // SEARCH EVERYTHING: Title, Intro, About, Eligibility, and Bullets
    const filtered = mbaPrograms.filter((p) => {
      const bulletText = p.bullets.join(" ");
      const searchableContent = `${p.title} ${p.intro} ${p.about} ${p.eligibility} ${bulletText}`.toLowerCase();
      return searchableContent.includes(query);
    });

    renderCards(filtered, false); // No looping for search results to show exact matches
  }

  searchInput.addEventListener("input", handleSearch);
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    handleSearch();
  });

  /* ================= INIT ================= */
  renderCards(mbaPrograms, true);
  startAutoScroll();
});
