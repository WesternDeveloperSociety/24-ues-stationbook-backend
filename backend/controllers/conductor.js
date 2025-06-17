const db = require('../db');

exports.grantConductorAccess = async (req, res) => {
    const { student_id, duration_hours } = req.body;
    const granter_id = req.userID; // set by verifyJWT

    if (!student_id || !duration_hours) {
        return res.status(400).json({ message: 'student_id and duration_hours are required' });
    }

    try {
        const [existing] = await db.execute(
            `SELECT 1 FROM conductor_access
             WHERE student_id = ? AND CURRENT_TIMESTAMP BETWEEN granted_at AND expires_at`,
            [student_id]
        );

        if (existing.length > 0) {
            return res.status(409).json({ message: 'Student already has active conductor access' });
        }

        const now = new Date();
        const expires = new Date(now.getTime() + duration_hours * 60 * 60 * 1000); 


        await db.execute(
            'INSERT INTO conductor_access (student_id, granted_at, expires_at) VALUES (?, ?, ?)',
            [student_id, now, expires]
        );
        return res.status(201).json({ message: 'Conductor access granted', expires_at: expires });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error granting conductor access', error: err });
    }
};

exports.removeConductorAccess = async (req, res) => {
    const { student_id } = req.body;

    if (!student_id) {
        return res.status(400).json({ message: 'student_id is required' });
    }

    try {
        const [result] = await db.execute(
            `DELETE FROM conductor_access
             WHERE student_id = ? AND CURRENT_TIMESTAMP BETWEEN granted_at AND expires_at`,
            [student_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No active conductor access found for this student.' });
        }

        return res.status(200).json({ message: 'Conductor access removed.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error removing conductor access', error: err });
    }
};


exports.checkConductorAccessStatus = async (req, res) => {
    const student_id = req.userID;

    try {
        const [rows] = await db.execute(
            `SELECT expires_at FROM conductor_access
             WHERE student_id = ? AND CURRENT_TIMESTAMP BETWEEN granted_at AND expires_at`,
            [student_id]
        );

        if (rows.length === 0) {
            return res.status(200).json({ hasAccess: false });
        }

        return res.status(200).json({ hasAccess: true, expires_at: rows[0].expires_at });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error checking conductor access', error: err });
    }
};
