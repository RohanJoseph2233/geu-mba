document.addEventListener("DOMContentLoaded", () => {
  /* ================= DATA ================= */
  const stateCityMap = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
    "Arunachal Pradesh": ["Itanagar"],
    "Assam": ["Guwahati", "Silchar"],
    "Bihar": ["Patna", "Gaya"],
    "Chhattisgarh": ["Raipur", "Bilaspur"],
    "Goa": ["Panaji", "Margao"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara"],
    "Haryana": ["Gurgaon", "Faridabad"],
    "Himachal Pradesh": ["Shimla", "Solan"],
    "Jharkhand": ["Ranchi", "Jamshedpur"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru"],
    "Kerala": ["Kochi", "Trivandrum", "Calicut"],
    "Madhya Pradesh": ["Bhopal", "Indore"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Manipur": ["Imphal"],
    "Meghalaya": ["Shillong"],
    "Mizoram": ["Aizawl"],
    "Nagaland": ["Kohima"],
    "Odisha": ["Bhubaneswar", "Cuttack"],
    "Punjab": ["Chandigarh", "Ludhiana"],
    "Rajasthan": ["Jaipur", "Udaipur"],
    "Sikkim": ["Gangtok"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Telangana": ["Hyderabad", "Warangal"],
    "Tripura": ["Agartala"],
    "Uttar Pradesh": ["Noida", "Lucknow", "Kanpur"],
    "Uttarakhand": ["Dehradun", "Haridwar"],
    "West Bengal": ["Kolkata", "Durgapur"],
    "Delhi": ["New Delhi", "Dwarka", "Saket"],
    "Jammu & Kashmir": ["Srinagar", "Jammu"],
    "Ladakh": ["Leh"],
    "Puducherry": ["Puducherry"],
    "Chandigarh": ["Chandigarh"],
    "Andaman & Nicobar": ["Port Blair"],
    "Dadra & Nagar Haveli": ["Silvassa"],
    "Lakshadweep": ["Kavaratti"]
  };

  const form = document.getElementById("leadForm");
  const phoneInput = document.getElementById("phone");
  const otpModal = document.getElementById("otpModal");
  const resendBtn = document.getElementById("resendBtn");
  const resendTimer = document.getElementById("resendTimer");
  
  let generatedOTP = null;
  let otpVerified = false;
  let timerInterval;

  // --- Resend Timer Logic ---
  const startTimer = () => {
    let timeLeft = 30;
    resendBtn.disabled = true;
    resendTimer.textContent = `(in ${timeLeft}s)`;
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        resendBtn.disabled = false;
        resendTimer.textContent = "";
      } else {
        resendTimer.textContent = `(in ${timeLeft}s)`;
      }
    }, 1000);
  };

  // --- OTP Flow ---
  const sendOTP = () => {
    const phoneVal = phoneInput.value.trim();
    const phoneError = document.getElementById("phoneError");
    
    if (phoneVal.length !== 10) {
      phoneError.textContent = "Enter a valid 10-digit number";
      phoneError.classList.remove("hidden");
      return;
    }
    
    phoneError.classList.add("hidden");
    generatedOTP = Math.floor(100000 + Math.random() * 900000);
    console.log("OTP:", generatedOTP); // For testing
    
    document.getElementById("displayPhone").textContent = phoneVal;
    otpModal.classList.replace("hidden", "flex");
    startTimer();
  };

  document.getElementById("sendOtpBtn").addEventListener("click", sendOTP);
  resendBtn.addEventListener("click", () => {
    const msg = document.getElementById("modalOtpMsg");
    msg.textContent = "New OTP Sent!";
    msg.className = "text-[10px] mt-2 text-blue-600 block";
    msg.classList.remove("hidden");
    sendOTP();
  });

  document.getElementById("verifyOtpBtn").addEventListener("click", () => {
    const inputOtp = document.getElementById("modalOtpInput").value;
    const msg = document.getElementById("modalOtpMsg");

    if (inputOtp === String(generatedOTP)) {
      otpVerified = true;
      document.getElementById("mainOtpStatus").innerHTML = '<span class="text-green-600 font-bold">Verified ✔</span>';
      document.getElementById("mainOtpStatus").classList.remove("hidden");
      
      const btn = document.getElementById("sendOtpBtn");
      btn.textContent = "Verified";
      btn.disabled = true;
      btn.classList.add("opacity-50");
      phoneInput.readOnly = true;

      otpModal.classList.replace("flex", "hidden");
    } else {
      msg.textContent = "Invalid OTP code. Please try again.";
      msg.className = "text-[10px] mt-2 text-red-500 block";
      msg.classList.remove("hidden");
    }
  });

  // --- Form Validation ---
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    document.querySelectorAll(".text-red-500").forEach(el => el.classList.add("hidden"));

    const config = [
      { id: "name", error: "nameError", msg: "Name required (no numbers)", min: 3 },
      { id: "email", error: "emailError", msg: "Enter a valid email", reg: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      { id: "state", error: "stateError" },
      { id: "city", error: "cityError" },
      { id: "course", error: "courseError" }
    ];

    config.forEach(f => {
      const el = document.getElementById(f.id);
      const err = document.getElementById(f.error);
      if (!el.value || (f.min && el.value.length < f.min) || (f.reg && !f.reg.test(el.value))) {
        if(f.msg) err.textContent = f.msg;
        err.classList.remove("hidden");
        isValid = false;
      }
    });

    if (!otpVerified) {
      const pErr = document.getElementById("phoneError");
      pErr.textContent = "Verify your phone number to continue";
      pErr.classList.remove("hidden");
      isValid = false;
    }

    if (!document.getElementById("consent").checked) {
      document.getElementById("consentError").textContent = "Please agree to the terms";
      document.getElementById("consentError").classList.remove("hidden");
      isValid = false;
    }

    if (isValid) {
      alert("Application successfully submitted!");
      form.reset();
      window.location.reload();
    }
  });

  // --- Helpers ---
  const stateSelect = document.getElementById("state");
  Object.keys(stateCityMap).sort().forEach(s => {
    const opt = document.createElement("option");
    opt.value = s; opt.textContent = s;
    stateSelect.appendChild(opt);
  });

  stateSelect.onchange = () => {
    const citySelect = document.getElementById("city");
    citySelect.innerHTML = '<option value="">Select City</option>';
    (stateCityMap[stateSelect.value] || []).sort().forEach(c => {
      const opt = document.createElement("option");
      opt.value = c; opt.textContent = c;
      citySelect.appendChild(opt);
    });
  };

  const close = () => otpModal.classList.replace("flex", "hidden");
  document.getElementById("closeOtp").onclick = close;
  document.getElementById("cancelOtpBtn").onclick = close;
});
