const translations = {
    hu: { slogan: "Automatizált Bányászat", loginBtn: "BELÉPÉS", regBtn: "REGISZTRÁCIÓ", loginAction: "BELÉPÉS", regAction: "FIÓK LÉTREHOZÁSA" },
    en: { slogan: "Automated Mining", loginBtn: "LOGIN", regBtn: "REGISTER", loginAction: "LOGIN", regAction: "CREATE ACCOUNT" },
    de: { slogan: "Automatisches Mining", loginBtn: "ANMELDEN", regBtn: "REGISTRIEREN", loginAction: "EINLOGGEN", regAction: "ERSTELLEN" }
};

let currentLang = 'hu';

function setLang(lang) {
    currentLang = lang;
    const t = translations[lang];
    document.querySelectorAll('[data-key]').forEach(el => {
        el.innerText = t[el.getAttribute('data-key')];
    });
}

function showLogin() { document.getElementById('loginForm').style.display = 'block'; document.getElementById('regForm').style.display = 'none'; }
function showRegister() { document.getElementById('loginForm').style.display = 'none'; document.getElementById('regForm').style.display = 'block'; }

// LOGIN
async function login() {
    const phone = document.getElementById('l_phone').value;
    const pass = document.getElementById('l_pass').value;

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ phone: phone, password: pass })
    });
    const data = await res.json();
    
    if(data.success) {
        localStorage.setItem('userId', data.user.id);
        window.location.href = '/dashboard.html';
    } else {
        alert("Hiba: " + data.error);
    }
}

// REGISZTRÁCIÓ
async function register() {
    const phone = document.getElementById('r_phone').value;
    const pass = document.getElementById('r_pass').value;
    const ref = document.getElementById('r_ref').value;

    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ phone: phone, password: pass, refCode: ref })
    });
    const data = await res.json();

    if(data.success) {
        alert("Siker! Most lépj be.");
        showLogin();
    } else {
        alert("Hiba: " + data.error);
    }
}