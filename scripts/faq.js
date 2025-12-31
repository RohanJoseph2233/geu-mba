
  const faqButtons = document.querySelectorAll(".faq-btn");

  faqButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector(".faq-icon");

      // Close other FAQs
      document.querySelectorAll(".faq-content").forEach(item => {
        if (item !== content) {
          item.style.maxHeight = null;
          item.previousElementSibling.querySelector(".faq-icon").textContent = "+";
        }
      });

      // Toggle current
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        icon.textContent = "+";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.textContent = "–";
      }
    });
  });

