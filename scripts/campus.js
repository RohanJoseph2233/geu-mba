const campusHighlights = [
  {
    name: "Admin Block",
    image: "images/Admin-Block1.webp"
  },
  {
    name: "Guest House",
    image: "images/guest-house.jpg"
  },
  {
    name: "Hostel",
    image: "images/Hostel3.webp"
  },
  {
    name: "KP Nautiyal Block",
    image: "images/Prof-KP-Nautiyal-Block4.webp"
  },
  {
    name: "Library",
    image: "images/Library7.webp"
  },
  {
    name: "Chanakya Block",
    image: "images/Chanakya-Block5.webp"
  },
  {
    name: "CSIT Block",
    image: "images/CSIT-Block6.webp"
  }
];

const grid = document.getElementById("campusGrid");

campusHighlights.forEach(item => {
  const card = document.createElement("div");

  card.className = `
    group relative overflow-hidden rounded-2xl
    shadow-lg hover:shadow-xl transition duration-300
  `;

  card.innerHTML = `
    <img
      src="${item.image}"
      alt="${item.name}"
      class="w-full h-56 object-cover
             transition duration-500
             group-hover:scale-105"
    />

    <!-- HOVER OVERLAY -->
    <div
      class="absolute inset-0 bg-black/40
             opacity-0 group-hover:opacity-100
             transition duration-300
             flex items-center justify-center"
    >
      <span class="text-white text-lg font-semibold tracking-wide">
        ${item.name}
      </span>
    </div>
  `;

  grid.appendChild(card);
});
