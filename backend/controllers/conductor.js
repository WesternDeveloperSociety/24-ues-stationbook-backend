const db = require('../db'); 

exports.createConductorRequest = async (req, res) => {
    const { student_id, start_time, end_time, event_no } = req.body;

     if (!student_id || !event_no || !start_time || !end_time) {
        return res.status(400).json({ message: 'student_id, event_no, start_time, and end_time are required' });
    }

    if (new Date(start_time) >= new Date(end_time)) {
        return res.status(400).json({ message: 'start_time must be before end_time.' });
    }

    try {
        const [result] = await db.execute(
            `INSERT INTO conductor_request (student_id, start_time, end_time, event_no)
            VALUES (? ,? ,? ,?)`,
            [student_id, start_time, end_time, event_no]
        );

        return res.status(201).json({
            message: 'Conductor request made.',
            request_id: result.insertId
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error creating conductor request.', error: err });
    }
};

exports.getAllConductorRequests = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT cr.*, s.first_name, s.last_name, e.name AS event_name
            FROM conductor_request cr
            JOIN student s ON cr.student_id = s.student_id
            JOIN event e ON cr.event_no = e.event_no
            ORDER BY cr.requested_at DESC
        `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching conductor requests.', error: err });
    }
};

exports.getMyActiveRequests = async (req, res) => {
    const student_id = req.userID;

    try {
        const [rows] = await db.execute(
            `SELECT * FROM conductor_request
             WHERE student_id = ? AND CURRENT_TIMESTAMP BETWEEN start_time AND end_time
             ORDER BY requested_at DESC`,
            [student_id]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching your active requests.', error: err });
    }
};

exports.grantConductorAccess = async (req, res) => {
    const { request_id, student_id, event_no } = req.body;
    const granter_id = req.userID; // set by verifyJWT

    if (!request_id || !student_id || !event_no) {
        return res.status(400).json({ message: 'request_id, student_id, and event_no are required' });
    }

    try {
        const [existing] = await db.execute( // checks for pre-exisiting access
            `SELECT 1 FROM conductor_access
             WHERE student_id = ? AND event_no = ? AND CURRENT_TIMESTAMP BETWEEN granted_at AND expires_at`,
            [student_id, event_no]
        );

        if (existing.length > 0) {
            return res.status(409).json({ message: 'Student already has conductor access for this event.' });
        }

        const [requestRows] = await db.execute( // gets request times
            `SELECT start_time, end_time FROM conductor_request WHERE request_id = ?`,
            [request_id]
        );

        if (requestRows.length === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }

         const { start_time, end_time } = requestRows[0];


        await db.execute(
            `INSERT INTO conductor_access (request_id, student_id, event_no, granted_at, expires_at)
             VALUES (?, ?, ?, ?, ?)`,
            [request_id, student_id, event_no, start_time, end_time]
        );

        await db.execute(
            `DELETE FROM conductor_request WHERE request_id = ?`,
            [request_id]
        );

        return res.status(201).json({ message: 'Conductor access granted', expires_at: end_time });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error granting conductor access', error: err });
    }
};

exports.denyConductorRequest = async (req, res) => {
    const { request_id } = req.body;

    if (!request_id) {
        return res.status(400).json({ message: 'request_id is required' });
    }

    try {
        const [result] = await db.execute(
            `DELETE FROM conductor_request WHERE request_id = ?`,
            [request_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Request not found or already processed.' });
        }

        return res.status(200).json({ message: 'Conductor request denied and deleted.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error denying conductor request.', error: err });
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

exports.getActiveConductors = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT ca.*, s.first_name, s.last_name, e.name AS event_name
            FROM conductor_access ca
            JOIN student s ON ca.student_id = s.student_id
            JOIN event e ON ca.event_no = e.event_no
            ORDER BY ca.expires_at DESC
        `);
        res.json(rows);
    } catch (err) {
        console.error('Error fetching active conductors: ',err);
    }
}
