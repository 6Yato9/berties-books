/**
 * Test Data Insertion Script
 * 
 * This script populates the books table with sample data for testing.
 * Run this after create_db.sql to add initial inventory.
 * 
 * To run: mysql -u root -p myBookshop < insert_test_data.sql
 */

-- Switch to the myBookshop database
USE myBookshop;

/**
 * Insert sample books into the inventory
 * 
 * Sample data includes:
 * - Brighton Rock (£20.25) - Just above bargain threshold
 * - Brave New World (£25.00) - Regular priced book
 * - Animal Farm (£12.99) - Bargain book (under £20)
 */
INSERT INTO books (name, price) 
VALUES
    ('Brighton Rock', 20.25),      -- Classic novel by Graham Greene
    ('Brave New World', 25.00),    -- Dystopian novel by Aldous Huxley
    ('Animal Farm', 12.99),        -- Allegory by George Orwell
    ('Trees of Great Britain', 42.00),  -- Reference book
    ('Atlas of the World', 25.00);      -- Geography reference