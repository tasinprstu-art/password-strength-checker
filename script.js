const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('toggleBtn');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text').querySelector('span');

const requirements = {
    length: document.getElementById('length'),
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    number: document.getElementById('number'),
    special: document.getElementById('special')
};

// পাসওয়ার্ড দেখা বা লুকানোর বাটন
toggleBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
    }
});

// লাইভ পাসওয়ার্ড চেকার
passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let strength = 0;
    
    // লেন্থ চেক
    if (val.length >= 8) {
        requirements.length.classList.replace('invalid', 'valid');
        strength++;
    } else {
        requirements.length.classList.replace('valid', 'invalid');
    }
    
    // আপারকেস চেক
    if (/[A-Z]/.test(val)) {
        requirements.uppercase.classList.replace('invalid', 'valid');
        strength++;
    } else {
        requirements.uppercase.classList.replace('valid', 'invalid');
    }
    
    // লোয়ারকেস চেক
    if (/[a-z]/.test(val)) {
        requirements.lowercase.classList.replace('invalid', 'valid');
        strength++;
    } else {
        requirements.lowercase.classList.replace('valid', 'invalid');
    }
    
    // নাম্বার চেক
    if (/[0-9]/.test(val)) {
        requirements.number.classList.replace('invalid', 'valid');
        strength++;
    } else {
        requirements.number.classList.replace('valid', 'invalid');
    }
    
    // স্পেশাল ক্যারেক্টার চেক
    if (/[^A-Za-z0-9]/.test(val)) {
        requirements.special.classList.replace('invalid', 'valid');
        strength++;
    } else {
        requirements.special.classList.replace('valid', 'invalid');
    }

    // স্ট্রেংথ বার আপডেট
    updateStrengthBar(strength, val.length);
});

function updateStrengthBar(strength, length) {
    if (length === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = 'None';
        strengthText.style.color = '#a0a0a0';
        return;
    }

    let width = (strength / 5) * 100;
    strengthBar.style.width = ${width}%;

    if (strength <= 2) {
        strengthBar.style.backgroundColor = '#ff4d4d'; // লাল
        strengthText.textContent = 'Weak';
        strengthText.style.color = '#ff4d4d';
    } else if (strength === 3 || strength === 4) {
        strengthBar.style.backgroundColor = '#ffcc00'; // হলুদ
        strengthText.textContent = 'Medium';
        strengthText.style.color = '#ffcc00';
    } else if (strength === 5) {
        strengthBar.style.backgroundColor = '#00ff88'; // সবুজ
        strengthText.textContent = 'Strong';
        strengthText.style.color = '#00ff88';
    }
}