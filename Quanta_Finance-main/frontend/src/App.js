import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import Dashboard from './components/dashboard/dashboard';
import Navigation from './components/navbar/navigation';
import './App.css';
import Logo from './components/logo/Quanta_Finance-removebg-preview.png';
import AllExpenses from './components/dashboard/viewexpenses';
import Charts from './components/chart/chart';
import { Link } from 'react-router-dom';
import logut from './components/logo/Logut.png';



const App = () => {
  return (
    <BrowserRouter>
    
    <Navbar />
      <div className="App">
      
      
     
      
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/expenses" element={<AllExpenses/>} />
          <Route path="/chart" element={<Charts/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

const Navbar = () => {
  const location = useLocation();
  const [totalAmount, setTotalAmount] = useState(0);

   // Function to check if the current route is the login page
   const isLoginPage = location.pathname === '/login';
   const isSignUpPage = location.pathname === '/signup';
   const isHomePage = location.pathname === '/';

  useEffect(() => {
    // Fetch expenses data from your backend using Axios
    axios.get('http://localhost:5000/api/expenses')
      .then(response => {
        // Assuming your data is in response.data
        const expenses = response.data.expenses;
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalAmount(total);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <nav className="navbar">
   <div className='appu'>   <div className="logo">
        <img src={Logo} alt="My Logo" />
      </div>
      <div style={{ fontSize: '30px' }}>Welcome to Quanta Finance!</div> </div>
      
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/chart">Charts</Link>
      </div>
      {!isLoginPage &&  !isSignUpPage &&  !isHomePage && (
        <div className='paisa'>
          <div className='amt'>Amount: ${totalAmount}</div>
        </div>
      )}

      <div className='logut'>
        <Link to="/login">
          <img src={logut} alt="Logout" />
        </Link>
      </div>
    </nav>
  );
};



export default App;




