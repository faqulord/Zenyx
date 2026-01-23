CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    telegram_id VARCHAR(255) UNIQUE,
    username VARCHAR(255),
    balance DECIMAL(10, 2) DEFAULT 0.00,
    vip_level INT DEFAULT 0, -- 0: Inaktív, 1-5: Zenyx Node szintek
    clicks_today INT DEFAULT 0,
    last_click_date DATE DEFAULT CURRENT_DATE,
    wallet_address VARCHAR(255),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    type VARCHAR(50), -- 'deposit', 'withdraw', 'mining_profit'
    amount DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'rejected'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ZENYX NODE SZINTEK (A te profit logikád alapján)
-- v1: $50 -> $1.66/nap
-- v2: $100 -> $3.33/nap
-- v3: $500 -> $16.65/nap
-- v4: $1000 -> $33.30/nap
-- v5: $5000 -> $166.50/nap