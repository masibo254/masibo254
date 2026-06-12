const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Trips endpoint' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Trip created' });
});

module.exports = router;
