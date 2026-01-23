// URL paraméterek ellenőrzése
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    if(document.getElementById('r_refCode') && refCode) {
        document.getElementById('r_refCode').value = refCode;
        showRegister();
    }
    if(document.getElementById('balanceDisplay')) {
        loadUserData();
    }
};

function showLogin() { 
    document.getElementById('loginForm').style.display = 'block'; 
    document.getElementById('regForm').style.display = 'none'; 
}
function showRegister() { 
    document.getElementById('loginForm').style.display = 'none'; 
    document.getElementById('regForm').style.display = 'block'; 
}

// LOGIN
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

// REGISZTRÁCIÓ
async function register() {
    const u = document.getElementById('r_username').value;
    const p = document.getElementById('r_password').value;
    const r = document.getElementById('r_refCode').value;
    
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: u, password: p, refCode: r })
    });
    const data = await res.json();
    if(data.success) {
        alert("Sikeres fiók létrehozás! Most lépj be.");
        showLogin();
    } else {
        alert(data.error);
    }
}

// USER ADATOK BETÖLTÉSE + ADMIN GOMB
async function loadUserData() {
    const id = localStorage.getItem('userId');
    if(!id) window.location.href = '/index.html';
    
    const res = await fetch(`/api/user/${id}`);
    const user = await res.json();
    
    document.getElementById('usernameDisplay').innerText = user.username;
    document.getElementById('balanceDisplay').innerText = parseFloat(user.balance).toFixed(2);
    document.getElementById('vipDisplay').innerText = "v" + user.vip_level;

    // --- ITT A VARÁZSLAT ---
    // Ha a felhasználónév "admin", megjelenik a gomb!
    if (user.username === 'admin') {
        document.getElementById('adminBtn').style.display = 'block';
    }
}

async function buyNode(tier) {
    const userId = localStorage.getItem('userId');
    if(!confirm("Megerősíted a vásárlást?")) return;
    
    const res = await fetch('/api/buy-node', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId, tier })
    });
    const data = await res.json();
    if(data.success) {
        alert(data.message);
        loadUserData();
    } else {
        alert(data.error);
    }
}

function logout() { localStorage.clear(); window.location.href = '/index.html'; }