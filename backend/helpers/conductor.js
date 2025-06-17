const db = require('../db');

const checkConductorAccess = async (req, res, next) => {
    const student_id = req.userID; // assumes JWT middleware has already set this

    try {
        const [rows] = await db.execute(
            `SELECT 1 FROM conductor_access
             WHERE student_id = ? AND CURRENT_TIMESTAMP BETWEEN granted_at AND expires_at`,
            [student_id]
        );

        if (rows.length === 0) {
            return res.status(403).json({ message: 'Conductor access required' });
        }

        next(); // user has access
    } catch (err) {
        console.error('Error checking conductor access:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { checkConductorAccess };
