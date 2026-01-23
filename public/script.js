// --- NYELVI ADATBÁZIS ---
const translations = {
    hu: {
        slogan: "Automatizált Kripto Bányászat & AI Profit",
        loginBtn: "BELÉPÉS",
        regBtn: "REGISZTRÁCIÓ",
        loginAction: "BELÉPÉS A RENDSZERBE",
        regAction: "FIÓK LÉTREHOZÁSA",
        refLabel: "Meghívó Kód (Kötelező):",
        errorRef: "Meghívó kód nélkül nem regisztrálhatsz!",
        successReg: "Sikeres regisztráció! Most lépj be.",
        welcome: "Üdv",
        logout: "Kilépés"
    },
    en: {
        slogan: "Automated Crypto Mining & AI Profit",
        loginBtn: "LOGIN",
        regBtn: "REGISTER",
        loginAction: "ENTER SYSTEM",
        regAction: "CREATE ACCOUNT",
        refLabel: "Referral Code (Required):",
        errorRef: "Referral code is mandatory!",
        successReg: "Registration successful! Please login.",
        welcome: "Welcome",
        logout: "Logout"
    },
    de: {
        slogan: "Automatisches Krypto-Mining & AI Profit",
        loginBtn: "ANMELDEN",
        regBtn: "REGISTRIEREN",
        loginAction: "SYSTEM BETRETEN",
        regAction: "KONTO ERSTELLEN",
        refLabel: "Einladungscode (Erforderlich):",
        errorRef: "Einladungscode ist erforderlich!",
        successReg: "Registrierung erfolgreich! Bitte anmelden.",
        welcome: "Willkommen",
        logout: "Abmelden"
    }
};

let currentLang = 'hu';

// URL és Nyelv ellenőrzése betöltéskor
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    // Ha van ref link, beírjuk
    if(document.getElementById('r_refCode') && refCode) {
        document.getElementById('r_refCode').value = refCode;
        document.getElementById('r_refCode').readOnly = true; // Ha linken jött, ne írja át
        showRegister();
    }

    // Ha admin vagy user panelen vagyunk
    if(document.getElementById('balanceDisplay')) {
        loadUserData();
    }
};

// NYELV VÁLTÁS
function setLang(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    // Végigmegyünk minden elemen, aminek van data-key attribútuma
    document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.getAttribute('data-key');
        if(t[key]) el.innerText = t[key];
    });

    // Input placeholder csere (opcionális finomítás)
    if(lang === 'en') {
        if(document.getElementById('r_username')) document.getElementById('r_username').placeholder = "Choose Username";
    }
}

// FÜLEK KEZELÉSE
function showLogin() { 
    document.getElementById('loginForm').style.display = 'block'; 
    document.getElementById('regForm').style.display = 'none'; 
}
function showRegister() { 
    document.getElementById('loginForm').style.display = 'none'; 
    document.getElementById('regForm').style.display = 'block'; 
}

// API HÍVÁSOK
async function register() {
    const u = document.getElementById('r_username').value;
    const p = document.getElementById('r_password').value;
    const r = document.getElementById('r_refCode').value; // Itt írod be, hogy START

    if(!r) {
        alert(translations[currentLang].errorRef);
        return;
    }
    
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: u, password: p, refCode: r })
    });
    const data = await res.json();
    if(data.success) {
        alert(translations[currentLang].successReg);
        showLogin();
    } else {
        alert("HIBA: " + data.error);
    }
}

async function login() {
    const u = document.getElementById('l_username').value;
    const p = document.getElementById('l_password').value;
    
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: u, password: p })
    });
    const data = await res.json();
    if(data.success) {
        localStorage.setItem('userId', data.user.id);
        window.location.href = '/dashboard.html';
    } else {
        alert(data.error);
    }
}

async function loadUserData() {
    const id = localStorage.getItem('userId');
    if(!id) window.location.href = '/index.html';
    
    const res = await fetch(`/api/user/${id}`);
    const user = await res.json();
    
    document.getElementById('usernameDisplay').innerText = user.username;
    if(document.getElementById('balanceDisplay')) {
        document.getElementById('balanceDisplay').innerText = parseFloat(user.balance).toFixed(2);
        document.getElementById('vipDisplay').innerText = "v" + user.vip_level;
        
        // ADMIN GOMB
        if (user.username === 'admin') {
            document.getElementById('adminBtn').style.display = 'block';
        }
    }
}

async function buyNode(tier) {
    const userId = localStorage.getItem('userId');
    if(!confirm("Confirm purchase?")) return;
    
    const res = await fetch('/api/buy-node', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId, tier })
    });
    const data = await res.json();
    if(data.success) {
        alert("Success!");
        loadUserData();
    } else { alert(data.error); }
}

function logout() { localStorage.clear(); window.location.href = '/index.html'; }