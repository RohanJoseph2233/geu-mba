document.addEventListener("DOMContentLoaded", () => {
  const accreditations = [
    {
      logo: "images/nirf.svg",
      title: "NIRF Rankings",
      description:
        "Recognised among India’s top universities under the National Institutional Ranking Framework for academic excellence and research impact."
    },
    {
      logo: "images/nba.svg",
      title: "NBA Accredited Programs",
      description:
        "NBA accreditation ensures outcome-based education, industry relevance, and global quality standards across key academic programs."
    },
    {
      logo: "images/naac.svg",
      title: "NAAC A+ Accredited",
      description:
        "NAAC A+ accreditation reflects strong institutional governance, academic processes, infrastructure, and student outcomes."
    },
    {
      logo: "images/aicte.svg",
      title: "AICTE Approval",
      description:
        "Approved by AICTE, Graphic Era ensures academic excellence across all technical courses. UGC recognized with Regularized Status by the Ministry of Education."
    },
    {
      logo: "images/ugc.svg",
      title: "UGC Recognition",
      description:
        "Approved by UGC and accorded the coveted Regularized Status by the Ministry of Education, Government of India."
    }
  ];

  const grid = document.getElementById("accreditationGrid");
  if (!grid) return;

  accreditations.forEach(item => {
    const card = document.createElement("div");

    card.className = `
      bg-white rounded-2xl shadow-md hover:shadow-xl transition
      p-7 text-center
    `;

    card.innerHTML = `
      <img
        src="${item.logo}"
        alt="${item.title}"
        class="h-14 mx-auto mb-5 object-contain"
      />

      <h3 class="text-lg font-bold text-gray-900 mb-3">
        ${item.title}
      </h3>

      <p class="text-sm text-gray-600 leading-relaxed">
        ${item.description}
      </p>
    `;

    grid.appendChild(card);
  });
});
