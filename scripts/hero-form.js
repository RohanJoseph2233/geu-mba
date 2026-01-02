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
  "Delhi":["New Delhi","Dwarka","Saket"]
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

/* ================= STATE ================= */
let generatedOTP = null;
let otpVerified = false;

/* ================= HELPERS ================= */
function showError(input, errorEl, message) {
  input?.classList.add("border-red-500");
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}

function clearError(input, errorEl) {
  input?.classList.remove("border-red-500");
  errorEl.classList.add("hidden");
}

/* ================= NAME ================= */
nameInput.addEventListener("input", e => {
  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
  /^[A-Za-z ]{3,}$/.test(e.target.value)
    ? clearError(nameInput, nameError)
    : showError(nameInput, nameError, "Minimum 3 letters required");
});

/* ================= EMAIL ================= */
emailInput.addEventListener("input", () => {
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)
    ? clearError(emailInput, emailError)
    : showError(emailInput, emailError, "Invalid email address");
});

/* ================= PHONE ================= */
phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneInput.value.replace(/\D/g, "");
  /^[0-9]{10}$/.test(phoneInput.value)
    ? clearError(phoneInput, phoneError)
    : showError(phoneInput, phoneError, "Enter 10-digit number");
});

/* ================= OTP ================= */
document.getElementById("sendOtpBtn").addEventListener("click", () => {
  if (!/^[0-9]{10}$/.test(phoneInput.value)) {
    showError(phoneInput, phoneError, "Enter valid phone number first");
    return;
  }

  generatedOTP = Math.floor(100000 + Math.random() * 900000);
  console.log("OTP (demo):", generatedOTP);

  otpSection.classList.remove("hidden");
  otpMsg.textContent = "OTP sent successfully";
  otpMsg.className = "text-blue-600 text-xs";

  otpVerified = false;
});

otpInput.addEventListener("input", () => {
  if (otpInput.value === String(generatedOTP)) {
    otpVerified = true;
    otpMsg.textContent = "OTP Verified ✔";
    otpMsg.className = "text-green-600 text-xs";
  } else {
    otpVerified = false;
  }
});

/* ================= STATE → CITY ================= */
Object.keys(stateCityMap).forEach(state => {
  const opt = document.createElement("option");
  opt.value = state;
  opt.textContent = state;
  stateSelect.appendChild(opt);
});

stateSelect.addEventListener("change", () => {
  citySelect.innerHTML = `<option value="">Select City</option>`;

  (stateCityMap[stateSelect.value] || []).forEach(city => {
    const opt = document.createElement("option");
    opt.value = city;
    opt.textContent = city;
    citySelect.appendChild(opt);
  });

  clearError(stateSelect, stateError);
});

/* ================= SUBMIT ================= */
form.addEventListener("submit", e => {
  e.preventDefault();
  let valid = true;

  if (!stateSelect.value) {
    showError(stateSelect, stateError, "Please select a state");
    valid = false;
  } else clearError(stateSelect, stateError);

  if (!citySelect.value) {
    showError(citySelect, cityError, "Please select a city");
    valid = false;
  } else clearError(citySelect, cityError);

  if (!courseSelect.value) {
    showError(courseSelect, courseError, "Please select a course");
    valid = false;
  } else clearError(courseSelect, courseError);

  if (!otpVerified) {
    otpMsg.textContent = "Please verify OTP";
    otpMsg.className = "text-red-500 text-xs";
    valid = false;
  }

  if (!consent.checked) {
    consentError.textContent = "Consent is required";
    consentError.classList.remove("hidden");
    valid = false;
  } else {
    consentError.classList.add("hidden");
  }

  if (!valid) return;

  alert("Form submitted successfully!");

  form.reset();
  otpSection.classList.add("hidden");
  otpVerified = false;
});




