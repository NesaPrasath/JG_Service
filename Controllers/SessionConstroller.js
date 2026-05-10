const Session = require("../models/Session.js");

exports.createSession = async (req, res) => {
  try {
    const session = await Session.create(req.body);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({ meeting_period: 1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTodaySession = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const session = await Session.findOne({
      meeting_period: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      status: "A"
    }).sort({ meeting_period: 1 }); // earliest session today

    if (!session) {
      return res.json({
        success: false,
        message: "No session scheduled for today"
      });
    }

    res.json({
      success: true,
      data: session
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};