const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: Number,
  description: String,
  category: String,
  date: Date,
   participants: [String],
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Expense', expenseSchema);
