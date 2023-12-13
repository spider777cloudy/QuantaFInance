const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const crypto = require('crypto');
const expenseRoutes = require('./routes/expenseRoutes');
const { verifyToken } = require('./middleware/authMiddleware');
const { secretKey } = require('./middleware/authMiddleware');
const { register, login, verify } = require('./controllers/authController'); // Import functions from authController


console.log(secretKey);

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://pariket2003:family77@cluster0.h2ho4gx.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log('Connected to MongoDB');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

app.post('/register', require('./controllers/authController').register);
app.post('/login', require('./controllers/authController').login);
app.post('/verify', require('./controllers/authController').verify);
app.get('/protected', verifyToken, (req, res) => {
  res.send('Protected route accessed successfully!');
});

app.use('/api/expenses', expenseRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Expense Management App');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

