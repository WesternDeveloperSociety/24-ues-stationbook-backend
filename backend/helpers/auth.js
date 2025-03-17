const pool = require('../db');
const jwt = require('jsonwebtoken')

const queryDBCredentials = async (studentID, email) => {
    try {
        query = 'SELECT * FROM students WHERE student_id = ? or email = "?"', [studentID, email]
        const [rows] = await pool.execute(
            'SELECT * FROM students WHERE student_id = ? or email = ?',
            [studentID, email]
        );
        return rows.length > 0;
    } catch (err) {
        console.error('Error querying credentials:', err);
        throw err;
    }
};

const addDBCredentials = async (studentID, email, fName, lName, nickname, password, points, isAdmin, currentDate) => {
    try {
        await pool.execute(
            'INSERT INTO students (student_id, email, first_name, last_name, nickname, password_hash, points, is_admin, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [studentID, email, fName, lName, nickname, password, points, isAdmin, currentDate, currentDate]
        );

    } catch (err) {
        console.error('Error adding credentials:', err);
    }
};

const generateRefreshToken = (student_id) => {
    return jwt.sign({ student_id }, 'jwtSecret', { expiresIn: '3d' }); 
}

const generateAccessToken = (student_id) => {
    return jwt.sign({ student_id }, 'jwtSecret', { expiresIn: '30m' }); //We need to define this secret as something else usually a 64 hex code or smth
}

module.exports = {queryDBCredentials, addDBCredentials, generateRefreshToken, generateAccessToken}