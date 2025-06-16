const db = require('../db');

exports.getEventScans = async (req, res) =>{
    const { event_no } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM scan WHERE event_no = ? ', [event_no]);
            res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'DB fetch error' });
    }
}

exports.getStudentScans = async (req, res) =>{
    const { student_id } = req.params;
    try {
        const [rows] = await db.execute('SELECT * FROM scan WHERE student_id = ?', [student_id]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'DB fetch error' });
    }
}

exports.createScan = async (req, res) =>{
    const { student_id, event_no } = req.body;

    if (!student_id || !event_no) {
        return res.status(400).json({ message: 'Both student_id and event_no are required.' });
    }

    try {
        await db.execute('INSERT INTO scan (student_id, event_no) VALUES (?,?)', [student_id, event_no]);
        res.status(201).json({ message: 'Scan recorded successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error: ", err });
    }
}