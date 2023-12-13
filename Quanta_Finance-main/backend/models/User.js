const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }],
});

module.exports = mongoose.model('User', userSchema);
