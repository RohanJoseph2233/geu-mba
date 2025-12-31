document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     ONLY DATA YOU PROVIDE
  =============================== */
  const images = [
    "images/Adarsh-Bharti-Musa-Amazon.jpg",
    "images/Anushka-Agarwal-Amazon.jpg",
    "images/Ashutosh-K-Pandey-Microsoft.jpg",
    "images/Aradhaya-Bahuguna-Amazon.jpg",
    "images/Priyanshi-Bhadoria-Atlassian.jpg"
  ];

  const carousel = document.getElementById("carousel");

  /* Duplicate images for infinite loop */
  const slides = [...images, ...images];

  slides.forEach(src => {
    const item = document.createElement("div");
    item.className = `
      carousel-item
      flex-shrink-0
      w-full
      md:w-full
      lg:w-1/3
    `;

    item.innerHTML = `
      <div class="bg-[#f5f9ff] rounded-none md:rounded-2xl shadow-lg overflow-hidden">
        <img
          src="${src}"
          draggable="false"
          class="
            w-full
            h-auto
            max-h-[340px]
            sm:max-h-[380px]
            lg:h-[420px]
            object-contain
            lg:object-cover
          "
        />
      </div>
    `;

    carousel.appendChild(item);
  });

  /* ===============================
     AUTO SCROLL LOGIC
  =============================== */
  let autoScroll;
  const scrollAmount = () => carousel.clientWidth;

  function startAutoScroll() {
    autoScroll = setInterval(() => {
      carousel.scrollBy({
        left: scrollAmount(),
        behavior: "smooth"
      });

      if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
        setTimeout(() => {
          carousel.scrollLeft = 0;
        }, 600);
      }
    }, 3000);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  startAutoScroll();

  /* Pause on hover / touch */
  carousel.addEventListener("mouseenter", stopAutoScroll);
  carousel.addEventListener("mouseleave", startAutoScroll);
  carousel.addEventListener("touchstart", stopAutoScroll);
  carousel.addEventListener("touchend", startAutoScroll);

});
