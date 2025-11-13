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
