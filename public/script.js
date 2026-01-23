// URL paraméterek ellenőrzése (REF LINK)
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    // Ha van ref kód, beírjuk a regisztrációs mezőbe
    if(document.getElementById('r_refCode') && refCode) {
        document.getElementById('r_refCode').value = refCode;
        showRegister(); // Azonnal a regisztrációra váltunk
    }
    
    // Ha Dashboardon vagyunk, betöltjük az adatokat
    if(document.getElementById('balanceDisplay')) {
        loadUserData();
    }
};

// TAB VÁLTÁS
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
    const r = document.getElementById('r_refCode').value;
    
    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: u, password: p, refCode: r })
    });
    const data = await res.json();
    if(data.success) {
        alert("Sikeres regisztráció! Most lépj be.");
        showLogin();
    } else {
        document.getElementById('statusMsg').innerText = data.error;
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
        document.getElementById('statusMsg').innerText = data.error;
    }
}

async function loadUserData() {
    const id = localStorage.getItem('userId');
    if(!id) window.location.href = '/index.html';
    
    const res = await fetch(`/api/user/${id}`);
    const user = await res.json();
    
    document.getElementById('usernameDisplay').innerText = user.username;
    document.getElementById('balanceDisplay').innerText = user.balance;
    document.getElementById('vipDisplay').innerText = "v" + user.vip_level;
}

function copyRef() {
    const u = document.getElementById('usernameDisplay').innerText;
    const link = window.location.origin + "/?ref=" + u;
    navigator.clipboard.writeText(link);
    alert("Linked másolva: " + link);
}

function logout() { localStorage.clear(); window.location.href = '/index.html'; }