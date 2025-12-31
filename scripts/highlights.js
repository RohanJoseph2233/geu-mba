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

    card.className = `
      snap-center
      flex-shrink-0
      w-[85%] sm:w-[65%] md:w-auto
      bg-white rounded-xl shadow-md
      overflow-hidden
      flex flex-col
    `;

    card.innerHTML = `
      <div class="w-full bg-gray-100">
        <img
          src="${item.image}"
          alt="${item.title}"
          class="w-full h-auto object-contain"
        />
      </div>

      <div class="p-4">
        <h3 class="text-blue-700 text-base font-bold mb-2">
          ${item.title}
        </h3>

        <p
          class="desc text-gray-700 text-sm leading-relaxed overflow-hidden transition-all duration-300"
          style="max-height: 4rem;"
        >
          ${item.description}
        </p>

        <button
          class="read-btn mt-3 text-blue-600 text-sm font-semibold hover:underline">
          Read More ▼
        </button>
      </div>
    `;

    const btn = card.querySelector(".read-btn");
    const text = card.querySelector(".desc");

    btn.addEventListener("click", () => {
      const expanded = text.classList.contains("expanded");

      document.querySelectorAll(".desc").forEach(p => {
        p.classList.remove("expanded");
        p.style.maxHeight = "4rem";
      });

      document.querySelectorAll(".read-btn").forEach(b => {
        b.textContent = "Read More ▼";
      });

      if (!expanded) {
        text.classList.add("expanded");
        text.style.maxHeight = text.scrollHeight + "px";
        btn.textContent = "Read Less ▲";
      }
    });

    track.appendChild(card);
  });

  /* ========= AUTO SCROLL (MOBILE ONLY) ========= */
  let index = 0;

  function autoScroll() {
    if (window.innerWidth >= 768) return;

    const cards = track.children;
    index = (index + 1) % cards.length;

    track.scrollTo({
      left: cards[index].offsetLeft,
      behavior: "smooth"
    });
  }

  let interval = setInterval(autoScroll, 4000);

  track.addEventListener("touchstart", () => clearInterval(interval));
  track.addEventListener("touchend", () => {
    interval = setInterval(autoScroll, 4000);
  });

});
