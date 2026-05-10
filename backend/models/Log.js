const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Log = sequelize.define('Log', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  raw: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  parsedTimestamp: {
    type: DataTypes.DATE
  },
  hostname: {
    type: DataTypes.STRING
  },
  service: {
    type: DataTypes.STRING
  },
  level: {
    type: DataTypes.STRING
  },
  message: {
    type: DataTypes.TEXT
  },
  anomalyScore: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  isAnomaly: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  metadata: {
    type: DataTypes.JSON
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Log;
