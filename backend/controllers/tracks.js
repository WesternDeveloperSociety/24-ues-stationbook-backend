const db = require('../db');

exports.getAllTracks = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM track');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB fetch error'});
  }
};

exports.createTrack = async (req, res) => {
    const { track_name } = req.body;
    try {
        const [result] = await db.execute(
            `INSERT INTO track (track_name) VALUES (?)`,
            [track_name]
        );
        res.status(201).json({ message: 'Track created', track_name });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating track.', error: err});
    }
};

exports.updateTrack = async (req, res) => {
    const { old_track_name, new_track_name } = req.body;

    if (!old_track_name || !new_track_name) {
        return res.status(400).json({ message: 'Both old_track_name and new_track_name are required' });
    }

    try {
        const [result] = await db.execute(
            `UPDATE track SET track_name = ? WHERE track_name = ?`,
            [new_track_name, old_track_name]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Track not found' });
        }

        return res.json({ message: 'Track updated successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error updating track', error: err });
    }
};

exports.deleteTrack = async (req, res) => {
    const { track_name } = req.body;

    if (!track_name) {
        return res.status(400).json({ message: 'track_name is required' });
    }

    try {
        const [result] = await db.execute(
            `DELETE FROM track WHERE track_name = ?`,
            [track_name]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Track not found' });
        }

        return res.json({ message: 'Track deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error deleting track', error: err });
    }
};

