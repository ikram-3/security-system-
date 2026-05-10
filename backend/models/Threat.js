const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Threat = sequelize.define('Threat', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('DDoS', 'Brute Force', 'Port Scan', 'SQL Injection', 'Malware', 'Suspicious Login', 'Unknown'),
    allowNull: false
  },
  severity: {
    type: DataTypes.ENUM('Critical', 'High', 'Medium', 'Low'),
    defaultValue: 'Low'
  },
  sourceIP: {
    type: DataTypes.STRING
  },
  targetIP: {
    type: DataTypes.STRING
  },
  location: {
    type: DataTypes.STRING
  },
  aiScore: {
    type: DataTypes.FLOAT,
    validate: {
      min: 0,
      max: 100
    }
  },
  status: {
    type: DataTypes.ENUM('Active', 'Investigating', 'Mitigated', 'Resolved', 'False Positive'),
    defaultValue: 'Active'
  },
  description: {
    type: DataTypes.TEXT
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Threat;
