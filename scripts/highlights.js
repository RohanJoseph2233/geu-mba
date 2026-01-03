document.addEventListener("DOMContentLoaded", () => {

  const highlights = [
    {
      image: "images/expert-teachers.jpg",
      title: "Specialized Teaching from Experts",
      description:
        "The academic rigor and the task of the creative transformation of an individual are the centre pieces of this program - both these targets are achievable only by ensuring just the right combination of teaching experts. Graphic Era ensures that students are taught by top faculty members in their respective fields, renowned for their excellence. This is evident across all domains, starting from the Program Head, who is a seasoned management professional holding an undergraduate degree from Graphic Era in engineering and advanced qualifications from a prestigious institution."
    },
    {
      image: "images/top-placement.jpg",
      title: "Top Internships and Placements",
      description:
        "We have held great pride in being one of the first few private Universities in India who took on the task of ensuring Top of the Line placements for our students, and with MBA, we will write a new success story for the world to see. The University is equipped with one of the best placement teams in the country and this has resulted in Top Placements for our Flagship Programs consistently over the year, with the highest package for the year 2023 under Brand Graphic Era currently sits at INR 84.88 Lacs (Domestic Package - CSE)."
    },
    {
      image: "images/nba-accredited.jpg",
      title: "NBA Accredited | AICTE Approved Degree",
      description:
        "Unlike some of the other B-Schools in India, Graphic Era (Deemed to be University) is offering a Full-Time NBA Accredited and AICTE Approved Degree and not a diploma. These accreditations are attained through rigorous compliances of the Academic Processes of the University and carry great relevance for students who visualise a career that spans across geographical boundaries. NBA Accredited and AICTE Approved Degrees enable students to enjoy easy Credit Transfers across Top International Universities, opening up unlimited avenues of Research and Employment Opportunities Globally."
    }
  ];

  const track = document.getElementById("highlightTrack");

  highlights.forEach(item => {
    const card = document.createElement("div");

    // Added h-fit so the card height is defined by its content
    card.className = `
      snap-center
      flex-shrink-0
      w-[85%] sm:w-[65%] md:w-full
      bg-white rounded-xl shadow-md
      overflow-hidden
      flex flex-col
      h-fit
    `;

    // UPDATED IMAGE SECTION:
    // Reverted to using h-auto so the image isn't cropped.
    // It will take up its natural space.
    card.innerHTML = `
      <div class="w-full bg-gray-100">
        <img
          src="${item.image}"
          alt="${item.title}"
          class="w-full h-auto align-middle"
        />
      </div>

      <div class="p-4 flex flex-col flex-grow">
        <h3 class="text-blue-700 text-base font-bold mb-2">
          ${item.title}
        </h3>

        <p
          class="desc text-gray-700 text-sm leading-relaxed overflow-hidden transition-all duration-500 ease-in-out"
          style="max-height: 4.5rem;"
        >
          ${item.description}
        </p>

        <button
          class="read-btn mt-3 text-blue-600 text-sm font-semibold hover:underline w-fit">
          Read More ▼
        </button>
      </div>
    `;

    const btn = card.querySelector(".read-btn");
    const text = card.querySelector(".desc");

    btn.addEventListener("click", () => {
      const expanded = text.classList.contains("expanded");

      // 1. Close all other cards first (accordion effect)
      document.querySelectorAll(".desc").forEach(p => {
        p.classList.remove("expanded");
        p.style.maxHeight = "4.5rem";
      });

      document.querySelectorAll(".read-btn").forEach(b => {
        b.textContent = "Read More ▼";
      });

      // 2. If current card wasn't expanded, expand it now
      if (!expanded) {
        text.classList.add("expanded");
        // scrollHeight gives the exact height of the hidden text
        text.style.maxHeight = text.scrollHeight + "px";
        btn.textContent = "Read Less ▲";
      }
    });

    track.appendChild(card);
  });

  /* ========= AUTO SCROLL (MOBILE ONLY) ========= */
  let index = 0;
  let interval;

  function startAutoScroll() {
    // Clear any existing interval just in case
    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      // Only run on mobile breakpoints
      if (window.innerWidth >= 768) return;

      const cards = track.children;
      if (cards.length === 0) return;

      index = (index + 1) % cards.length;

      // Using scrollLeft instead of scrollTo for better cross-browser compatibility in some cases
      // Adding a small offset (-20) handles padding issues during scroll
      track.scrollTo({
        left: cards[index].offsetLeft - 20,
        behavior: "smooth"
      });
    }, 4000);
  }

  // Start the scroller
  startAutoScroll();

  // Pause on touch, resume on touch end
  track.addEventListener("touchstart", () => clearInterval(interval));
  track.addEventListener("touchend", startAutoScroll);

  // Optional: Pause on mouse hover for desktop users testing responsiveness
  track.addEventListener("mouseenter", () => clearInterval(interval));
  track.addEventListener("mouseleave", startAutoScroll);
});
