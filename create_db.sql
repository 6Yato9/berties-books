/**
 * Database Creation Script for Bertie's Books
 * 
 * This script sets up the complete database infrastructure including:
 * - Database creation
 * - Table structure
 * - User account with appropriate permissions
 * 
 * To run: mysql -u root -p < create_db.sql
 */

-- ==================== Database Setup ====================

-- Create the myBookshop database if it doesn't already exist
-- IF NOT EXISTS prevents errors if database already exists
CREATE DATABASE IF NOT EXISTS myBookshop;

-- Switch to using the myBookshop database for subsequent commands
USE myBookshop;

-- ==================== Table Creation ====================

/**
 * Books Table
 * Stores information about all books in the shop's inventory
 * 
 * Columns:
 * - id: Unique identifier for each book (auto-incremented)
 * - name: Title of the book (up to 50 characters)
 * - price: Book price in GBP (max 999.99)
 */
CREATE TABLE IF NOT EXISTS books (
    id     INT AUTO_INCREMENT,           -- Unique book ID, automatically incremented
    name   VARCHAR(50),                  -- Book title (max 50 characters)
    price  DECIMAL(5, 2),                -- Book price (format: XXX.XX)
    PRIMARY KEY(id)                      -- Set id as the primary key
);

-- ==================== User & Permissions Setup ====================

/**
 * Create application database user
 * This user is used by the Node.js application to connect to the database
 * 
 * Security Note: In production, use a stronger password and environment variables
 */
CREATE USER IF NOT EXISTS 'berties_books_app'@'localhost' IDENTIFIED BY 'qwertyuiop';

/**
 * Grant all privileges on myBookshop database to the application user
 * This allows the app to SELECT, INSERT, UPDATE, DELETE data
 */
GRANT ALL PRIVILEGES ON myBookshop.* TO 'berties_books_app'@'localhost';


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