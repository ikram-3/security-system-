const Threat = require('../models/Threat');
const { Sequelize } = require('sequelize');

exports.getAllThreats = async (req, res) => {
  try {
    const threats = await Threat.findAll({ order: [['timestamp', 'DESC']] });
    res.status(200).json({
      status: 'success',
      results: threats.length,
      data: { threats }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getThreat = async (req, res) => {
  try {
    const threat = await Threat.findByPk(req.params.id);
    if (!threat) {
      return res.status(404).json({ message: 'Threat not found' });
    }
    res.status(200).json({
      status: 'success',
      data: { threat }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createThreat = async (req, res) => {
  try {
    const newThreat = await Threat.create(req.body);
    
    // Emit websocket event
    const io = req.app.get('socketio');
    io.emit('newThreat', newThreat);

    res.status(201).json({
      status: 'success',
      data: { threat: newThreat }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.updateThreat = async (req, res) => {
  try {
    const [updated] = await Threat.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (!updated) {
      return res.status(404).json({ message: 'Threat not found' });
    }

    const updatedThreat = await Threat.findByPk(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { threat: updatedThreat }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const severityStats = await Threat.findAll({
      attributes: ['severity', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
      group: ['severity']
    });

    const typeStats = await Threat.findAll({
      attributes: ['type', [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']],
      group: ['type']
    });

    res.status(200).json({
      status: 'success',
      data: { severityStats, typeStats }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
