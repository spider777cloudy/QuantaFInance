const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category, date, participants } = req.body;

    const newExpense = new Expense({
      amount,
      description,
      category,
      date,
      participants,
    });

    await newExpense.save();

    res.status(201).json({ message: 'Expense added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
};

// Get all expenses
exports.getAllExpenses = async (req, res) => {
    try {
      const expenses = await Expense.find();
      res.status(200).json({ expenses });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch expenses' });
    }
  };
  
  // Get a specific expense by ID
  exports.getExpenseById = async (req, res) => {
    try {
      const { id } = req.params;
      const expense = await Expense.findById(id);
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
      res.status(200).json({ expense });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch expense' });
    }
  };
  
  // Update a specific expense by ID
  exports.updateExpense = async (req, res) => {
    try {
      const { id } = req.params;
      const { amount, description, category, date, participants } = req.body;
  
      const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        { amount, description, category, date, participants },
        { new: true }
      );
  
      if (!updatedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update expense' });
    }
  };
  
  // Delete a specific expense by ID
  exports.deleteExpense = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedExpense = await Expense.findByIdAndDelete(id);
  
      if (!deletedExpense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      res.status(200).json({ message: 'Expense deleted successfully', expense: deletedExpense });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete expense' });
    }
  };