/* Navbar.css - JAVÍTOTT, STABIL MENÜ */

.navbar {
    background: #ffffff;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 999;
    border-bottom: 1px solid #eee;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.navbar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
}

/* LOGÓ */
.nav-logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: #111;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
}

/* HAMBURGER IKON */
.menu-icon {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;
}

.bar {
    width: 28px;
    height: 3px;
    background-color: #333;
    transition: 0.3s;
}

.cart-icon {
    font-size: 1.4rem;
    cursor: pointer;
}

/* --- OLDALSÓ MENÜ (JAVÍTOTT VERZIÓ) --- */

.sidebar-overlay {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.6); /* Sötétebb háttér */
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: 0.3s;
}
.sidebar-overlay.active { opacity: 1; visibility: visible; }

.sidebar-menu {
    position: fixed;
    top: 0;
    left: -320px; /* Balra elrejtve */
    width: 280px; /* Fix szélesség mobilon */
    height: 100vh;
    background: #ffffff;
    z-index: 1001;
    transition: 0.3s ease-in-out; /* Gyorsabb, határozottabb mozgás */
    box-shadow: 5px 0 15px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    /* KIVETTÜK A ROSSZ IGAZÍTÁST INNEN! */
}

.sidebar-menu.active {
    left: 0; /* Beúszik */
}

/* 1. FEJLÉC - RÉZ SZÍNŰ HÁTTÉRREL */
.sidebar-header {
    background-color: #b87333; /* Ez adja a keretet */
    padding: 20px;
    display: flex;
    justify-content: space-between; /* Cím balra, X jobbra */
    align-items: center;
    color: white;
}

.menu-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
}

.close-btn { 
    font-size: 2rem; 
    cursor: pointer; 
    color: white;
    line-height: 1; /* Hogy ne csússzon el */
}

/* 2. MENÜPONTOK - LISTA */
.sidebar-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: block; /* Sima blokk, nem flexbox, így nem csúszik szét */
}

.sidebar-links li {
    padding: 20px 25px; /* Nagyobb hely az ujjnak */
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    color: #333;
    border-bottom: 1px solid #f0f0f0; /* Elválasztó vonal */
    cursor: pointer;
    text-align: left; /* Balra igazítva! */
    transition: 0.2s;
}

.sidebar-links li:hover {
    background-color: #f9f9f9;
    color: #b87333;
    padding-left: 35px; /* Kicsit elmozdul jobbra hoverkor */
}

/* 3. LÁBLÉC */
.sidebar-footer {
    margin-top: auto; /* Legalulra tolja */
    padding: 20px;
    background: #f5f5f5;
    text-align: center;
    border-top: 1px solid #eee;
}

.sidebar-footer p {
    color: #888;
    font-size: 0.8rem;
    font-family: 'Montserrat', sans-serif;
}