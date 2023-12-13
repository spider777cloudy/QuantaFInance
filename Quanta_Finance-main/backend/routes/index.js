// routes/index.js
const express = require('express');
const router = express.Router();
const expenseRoutes = require('./expenseRoutes');

router.use('/expenses', expenseRoutes);

module.exports = router;
