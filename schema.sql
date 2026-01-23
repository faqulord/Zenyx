CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    balance DECIMAL(10, 2) DEFAULT 0.00,
    vip_level INT DEFAULT 0,
    clicks_today INT DEFAULT 0,
    last_click_date DATE DEFAULT CURRENT_DATE,
    referrer VARCHAR(50),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);