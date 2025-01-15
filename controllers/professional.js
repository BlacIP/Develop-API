const mongodb = require('../db/connect');

const getData = async (req, res, next) => {
  try {
    const db = mongodb.getDb();
    const result = await db.collection('user').find().toArray();
    
    if (!result || result.length === 0) {
      return res.status(404).json({ message: 'No professional data found' });
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]); 

  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ 
      message: 'Error retrieving professional data',
      error: error.message 
    });
  }
};

module.exports = { getData };
