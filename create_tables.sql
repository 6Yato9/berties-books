-- ==================== Database Setup for Bertie's Books ====================
-- This script creates the necessary tables for user authentication and audit logging
--
-- Tables created:
-- 1. users - Stores user account information with hashed passwords
-- 2. audit_log - Tracks login attempts (successful and failed)
--
-- Usage: Run this script in MySQL before starting the application
-- mysql -u berties_books_app -p myBookshop < create_tables.sql

-- ==================== Users Table ====================
-- Stores registered user accounts with secure password hashing
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hashedPassword VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username)
);

-- ==================== Audit Log Table ====================
-- Tracks all login attempts for security auditing
CREATE TABLE IF NOT EXISTS audit_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    success BOOLEAN NOT NULL,
    message VARCHAR(255),
    timestamp DATETIME NOT NULL,
    INDEX idx_username (username),
    INDEX idx_timestamp (timestamp)
);

-- Display confirmation message
SELECT 'Tables created successfully!' AS status;
