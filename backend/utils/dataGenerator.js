const Threat = require('../models/Threat');
const User = require('../models/User');

const severities = ['Critical', 'High', 'Medium', 'Low'];
const threatTypes = ['DDoS', 'Brute Force', 'Port Scan', 'SQL Injection', 'Malware', 'Suspicious Login'];
const ips = ['192.168.1.105', '45.12.34.88', '210.5.67.12', '103.44.12.5', '8.8.8.8', '172.16.0.45'];

exports.seedDatabase = async () => {
  try {
    // Sync models
    await Threat.sync({ force: true });
    // await User.sync(); // Be careful with force: true on Users
    
    // Check if admin exists
    const admin = await User.findOne({ where: { email: 'admin@cybershield.ai' } });
    if (!admin) {
      await User.create({
        name: 'System Administrator',
        email: 'admin@cybershield.ai',
        password: 'adminpassword',
        role: 'admin'
      });
      console.log('Admin user created');
    }

    // Create 20 mock threats
    const mockThreats = [];
    for (let i = 0; i < 20; i++) {
      mockThreats.push({
        type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        sourceIP: ips[Math.floor(Math.random() * ips.length)],
        targetIP: '10.0.0.15',
        location: 'United States',
        aiScore: Math.floor(Math.random() * 60) + 40,
        status: ['Active', 'Investigating', 'Mitigated', 'Resolved'][Math.floor(Math.random() * 4)],
        description: 'Suspicious activity detected on port ' + (Math.floor(Math.random() * 1000) + 80),
        timestamp: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 7)
      });
    }

    await Threat.bulkCreate(mockThreats);
    console.log('Database seeded with mock threats');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};
