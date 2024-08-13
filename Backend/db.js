const mysql = require('mysql2');
require('dotenv').config();
const password = process.env.DB_PASSWORD;
const user = process.env.USER;

console.log(process.env.DB_PASSWORD);
const db = mysql.createConnection({
    host: 'localhost',
    user: user,
    password: password,
    database: 'FlashQue'
  });

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database.');
  
    const createTable = `
      CREATE TABLE IF NOT EXISTS flashcards (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question VARCHAR(255) NOT NULL,
        answer VARCHAR(255) NOT NULL
      )
    `;
  
    db.query(createTable, (err, result) => {
      if (err) {
        console.error('Error creating flashcards table:', err.stack);
      } else {
        console.log('Flashcards table created or already exists.');
      }
    });
  });
  
module.exports = {
    db
}