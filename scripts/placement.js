const students = [
  { name: "Diksha Sobti", package: "₹10.89 LPA", image: "images/diksha-sobti.png", logo: "images/dhanguard.png" },
  { name: "Dikshant Sharma", package: "₹15.40 LPA", image: "images/dikshant-sharma.png", logo: "images/gmr.png" },
  { name: "Vaibhav Negi", package: "₹7.8 LPA", image: "images/vaibhav-negi.png", logo: "images/bny-mellon.png" }
];

const img = document.getElementById("studentImage");
const nameEl = document.getElementById("studentName");
const pkgEl = document.getElementById("studentPackage");
const logoEl = document.getElementById("companyLogo");

const nameMobile = document.getElementById("studentNameMobile");
const pkgMobile = document.getElementById("studentPackageMobile");
const logoMobile = document.getElementById("companyLogoMobile");

const dots = document.getElementById("dots");
let index = 0;

function render(i) {
  img.style.opacity = 0;
  if (logoEl) logoEl.style.opacity = 0;

  setTimeout(() => {
    img.src = students[i].image;

    nameEl.textContent = students[i].name;
    pkgEl.textContent = students[i].package;
    logoEl.src = students[i].logo;

    nameMobile.textContent = students[i].name;
    pkgMobile.textContent = students[i].package;
    logoMobile.src = students[i].logo;

    img.style.opacity = 1;
    if (logoEl) logoEl.style.opacity = 1;
    updateDots();
  }, 300);
}

function createDots() {
  dots.innerHTML = "";
  students.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "w-2.5 h-2.5 rounded-full bg-gray-300 cursor-pointer";
    dot.onclick = () => {
      index = i;
      render(index);
    };
    dots.appendChild(dot);
  });
}

function updateDots() {
  [...dots.children].forEach((dot, i) => {
    dot.className =
      i === index
        ? "w-2.5 h-2.5 rounded-full bg-blue-900"
        : "w-2.5 h-2.5 rounded-full bg-gray-300";
  });
}

setInterval(() => {
  index = (index + 1) % students.length;
  render(index);
}, 4500);

createDots();
render(index);