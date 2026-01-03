document.addEventListener("DOMContentLoaded", () => {

/* ================= DATA ================= */
const stateCityMap = {
  "Andhra Pradesh":["Visakhapatnam","Vijayawada","Guntur"],
  "Arunachal Pradesh":["Itanagar"],
  "Assam":["Guwahati","Silchar"],
  "Bihar":["Patna","Gaya"],
  "Chhattisgarh":["Raipur","Bilaspur"],
  "Goa":["Panaji","Margao"],
  "Gujarat":["Ahmedabad","Surat","Vadodara"],
  "Haryana":["Gurgaon","Faridabad"],
  "Himachal Pradesh":["Shimla","Solan"],
  "Jharkhand":["Ranchi","Jamshedpur"],
  "Karnataka":["Bengaluru","Mysuru","Mangaluru"],
  "Kerala":["Kochi","Trivandrum","Calicut"],
  "Madhya Pradesh":["Bhopal","Indore"],
  "Maharashtra":["Mumbai","Pune","Nagpur"],
  "Manipur":["Imphal"],
  "Meghalaya":["Shillong"],
  "Mizoram":["Aizawl"],
  "Nagaland":["Kohima"],
  "Odisha":["Bhubaneswar","Cuttack"],
  "Punjab":["Chandigarh","Ludhiana"],
  "Rajasthan":["Jaipur","Udaipur"],
  "Sikkim":["Gangtok"],
  "Tamil Nadu":["Chennai","Coimbatore","Madurai"],
  "Telangana":["Hyderabad","Warangal"],
  "Tripura":["Agartala"],
  "Uttar Pradesh":["Noida","Lucknow","Kanpur"],
  "Uttarakhand":["Dehradun","Haridwar"],
  "West Bengal":["Kolkata","Durgapur"],
  "Delhi":["New Delhi","Dwarka","Saket"],
  "Jammu & Kashmir":["Srinagar","Jammu"],
  "Ladakh":["Leh"],
  "Puducherry":["Puducherry"],
  "Chandigarh":["Chandigarh"],
  "Andaman & Nicobar":["Port Blair"],
  "Dadra & Nagar Haveli":["Silvassa"],
  "Lakshadweep":["Kavaratti"]
};
 /* ================= ELEMENTS ================= */
  const form = document.getElementById("leadForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const otpInput = document.getElementById("otp");
  const otpSection = document.getElementById("otpSection");
  const otpMsg = document.getElementById("otpMsg");

  const stateSelect = document.getElementById("state");
  const citySelect = document.getElementById("city");
  const courseSelect = document.getElementById("course");
  const consent = document.getElementById("consent");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const stateError = document.getElementById("stateError");
  const cityError = document.getElementById("cityError");
  const courseError = document.getElementById("courseError");
  const consentError = document.getElementById("consentError");

  const sendOtpBtn = document.getElementById("sendOtpBtn");

  let generatedOTP = null;
  let otpVerified = false;
  let resendTimer = null;
  let resendSeconds = 30;

  /* ================= HELPERS ================= */
  function showError(input, el, msg) {
    input?.classList.add("border-red-500");
    el.textContent = msg;
    el.classList.remove("hidden");
  }

  function clearError(input, el) {
    input?.classList.remove("border-red-500");
    el.classList.add("hidden");
  }

  /* ================= POPULATE STATES ================= */
  Object.keys(stateCityMap).forEach(state => {
    const opt = document.createElement("option");
    opt.textContent = state;
    stateSelect.appendChild(opt);
  });

  stateSelect.addEventListener("change", () => {
    citySelect.innerHTML = `<option value="">Select City</option>`;
    (stateCityMap[stateSelect.value] || []).forEach(city => {
      const opt = document.createElement("option");
      opt.textContent = city;
      citySelect.appendChild(opt);
    });
    clearError(stateSelect, stateError);
  });

  /* ================= OTP TIMER ================= */
  function startResendTimer() {
    resendSeconds = 30;
    sendOtpBtn.disabled = true;
    sendOtpBtn.classList.add("opacity-50");

    resendTimer = setInterval(() => {
      sendOtpBtn.textContent = `Resend (${resendSeconds}s)`;
      resendSeconds--;

      if (resendSeconds < 0) {
        clearInterval(resendTimer);
        sendOtpBtn.disabled = false;
        sendOtpBtn.classList.remove("opacity-50");
        sendOtpBtn.textContent = "Resend OTP";
      }
    }, 1000);
  }

  /* ================= SEND OTP ================= */
  sendOtpBtn.addEventListener("click", () => {

    if (!/^[0-9]{10}$/.test(phoneInput.value)) {
      showError(phoneInput, phoneError, "Enter valid 10-digit number");
      return;
    }

    clearError(phoneInput, phoneError);

    generatedOTP = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP (demo):", generatedOTP); // 🔴 demo only

    otpVerified = false;
    otpSection.classList.remove("hidden");
    otpMsg.textContent = "OTP sent successfully";
    otpMsg.className = "text-blue-600 text-[10px]";

    startResendTimer();
  });

  /* ================= VERIFY OTP ================= */
  otpInput.addEventListener("input", () => {
    if (otpInput.value.length === 6) {
      if (otpInput.value === String(generatedOTP)) {
        otpVerified = true;
        otpMsg.textContent = "OTP Verified ✔";
        otpMsg.className = "text-green-600 text-[10px]";
      } else {
        otpVerified = false;
        otpMsg.textContent = "Invalid OTP";
        otpMsg.className = "text-red-500 text-[10px]";
      }
    }
  });

  /* ================= FORM SUBMIT ================= */
  form.addEventListener("submit", e => {
    e.preventDefault();

    let valid = true;

    if (!/^[A-Za-z ]{3,}$/.test(nameInput.value)) {
      showError(nameInput, nameError, "Minimum 3 letters required");
      valid = false;
    } else clearError(nameInput, nameError);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
      showError(emailInput, emailError, "Invalid email");
      valid = false;
    } else clearError(emailInput, emailError);

    if (!/^[0-9]{10}$/.test(phoneInput.value)) {
      showError(phoneInput, phoneError, "Invalid phone number");
      valid = false;
    }

    if (!otpVerified) {
      otpMsg.textContent = "Please verify OTP";
      otpMsg.className = "text-red-500 text-[10px]";
      valid = false;
    }

    if (!stateSelect.value) {
      showError(stateSelect, stateError, "Select state");
      valid = false;
    } else clearError(stateSelect, stateError);

    if (!citySelect.value) {
      showError(citySelect, cityError, "Select city");
      valid = false;
    } else clearError(citySelect, cityError);

    if (!courseSelect.value) {
      showError(courseSelect, courseError, "Select course");
      valid = false;
    } else clearError(courseSelect, courseError);

    if (!consent.checked) {
      consentError.textContent = "Consent required";
      consentError.classList.remove("hidden");
      valid = false;
    } else consentError.classList.add("hidden");

    if (!valid) return;

    alert("Form submitted successfully!");

    form.reset();
    otpSection.classList.add("hidden");
    otpVerified = false;
    sendOtpBtn.textContent = "Verify";
  });

});
