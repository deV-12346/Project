const express = require('express');
const router = express.Router();
const apiRoutes = require('./api/index');

router.use('/api', apiRoutes); 

router.get('/', (req, res) => {
  res.send('Hello from routes!');
});

module.exports = router;



