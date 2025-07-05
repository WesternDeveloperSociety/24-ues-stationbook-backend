const db = require('../db');

function generateEventNo() {
  return Math.floor(100000000 + Math.random() * 900000000);
}

async function getUniqueEventNo() {
  let event_no;
  let exists = true;

  while (exists) {
    event_no = generateEventNo();
    const [rows] = await db.execute('SELECT event_no FROM event WHERE event_no = ?', [event_no]);
    exists = rows.length > 0;
  }

  return event_no;
}

exports.getAllEvents = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM event');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB fetch error' });
  }
};  

exports.getUpcomingEvents = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM event WHERE date >= CURDATE()')
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB fetch error'});
  }
}

exports.getPastEvents = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM event WHERE date < CURDATE()')
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB fetch error'});
  }
}

exports.createEvent = async (req, res) => {
  const { name, date, description, image, points, track } = req.body;
  console.log(req.body);

  if (!name) return res.status(400).json({ message: 'Event name is required' });

  try {
    const event_no = await getUniqueEventNo();

    const [result] = await db.execute(
      `INSERT INTO event (event_no, name, date, description, image, points, track_name)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        event_no,
        name,
        date || null,
        description || null,
        image ? Buffer.from(image, 'base64') : null, // if sending base64 from frontend
        points || null,
        track || null,
      ]
    );

    res.status(201).json({ message: 'Event created', event_no });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB error', error: err });
  }
};

exports.editEvent = async (req, res) => {
  const { event_no } = req.params;
  const { name, date, description, image, points, track } = req.body;

  if (!event_no) {
    return res.status(400).json({ message: 'Event ID (event_no) is required in the URL' });
  }

  try {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    const [result] = await db.execute(
      `UPDATE event
       SET name = ?, date = ?, description = ?, image = ?, points = ?, track = ?
       WHERE event_no = ?`,
      [
        name || null,
        formattedDate || null,
        description || null,
        image ? Buffer.from(image, 'base64') : null,
        points || null,
        track || null,
        event_no
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'DB update error', error: err });
  }
};

exports.getEventsByTrack = async (req, res) => {
  const { track_name } = req.params;

    try {
        const [rows] = await db.execute(
            'SELECT * FROM event WHERE track_name = ?',
            [track_name]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching events for track', error: err });
    }
};

exports.getEventInfo = async (req, res) => {
  const { event_no } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT * FROM event WHERE event_no = ?`,
      [event_no]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching event information', error: err });
  }
};
