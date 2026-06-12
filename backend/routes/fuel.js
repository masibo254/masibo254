const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Fuel management endpoint' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Fuel record created' });
});

module.exports = router;
