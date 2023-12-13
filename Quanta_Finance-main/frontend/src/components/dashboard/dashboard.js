
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import Logo from '../logo/Quanta_Finance.jpg';
import { Link } from 'react-router-dom';



const ExpenseForm = () => {
  
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [aiImage, setAIImage] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paidByYou, setPaidByYou] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [splitAmounts, setSplitAmounts] = useState([]);
 


 

  const PEXELS_API_KEY = 'AHzsLTUjZPBcvqRkHM1cwZMUqxWAYjl0OC6llpAVjP1IOQtUzOgCoNa2';
  const DEFAULT_IMAGE = Logo;

  useEffect(() => {
    // Function to fetch images based on description
    const fetchImages = async () => {
      try {

        if (description.trim() === '') {
          setAIImage(DEFAULT_IMAGE); // Set default image if description is empty
          return;
        }

        const response = await axios.get(`https://api.pexels.com/v1/search?query=${description}`, {
          headers: {
            Authorization: PEXELS_API_KEY,
      },     });
      const imageUrl = response.data.photos[0]?.src.medium; // Get the URL of the first image
      setAIImage(imageUrl || DEFAULT_IMAGE);}
      
      catch (error) {
        console.error('Error fetching images:', error);
        setAIImage(DEFAULT_IMAGE); 
      }
    };
     fetchImages();
    
  }, [description]);

 

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };


  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleYouButtonClick = () => {
    setPaidByYou(true);
  };

  const handleSplitButtonClick = () => {
    const totalParticipants = participants.length;
    const perPersonAmount = parseFloat(amount) / totalParticipants;
    const split = Array(totalParticipants).fill(perPersonAmount);
    setSplitAmounts(split);
    
  };

  const handleAddPersonButtonClick = () => {
    if (name.trim() === '' || email.trim() === '') {
      // Add validation to ensure name and email are not empty
      // You can display an error message or handle this situation accordingly
      return;
    }
  
    const newPerson = {
      name: name,
      email: email,
    };
  
    setParticipants([...participants, newPerson]);
    setName(''); // Clear the input fields after adding a person
    setEmail('');
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    // Here, you can perform actions like sending this data to your backend
    const expenseData = {
      amount,
      description,
      category,
      date,
      participants,
     
    };
    
    try {
      const response = await axios.post('http://localhost:5000/api/expenses', expenseData);
      console.log('Expense added:', response.data);
      // Add logic here to handle successful addition
    } catch (error) {
      console.error('Error adding expense:', error);
      // Add logic here to handle error
    }

    // Reset form values after submitting
    setAmount('');
    setDescription('');
    setCategory('');
    setDate('');
    setParticipants([]);
    
  };

  return (
    <form className='dashform'  onSubmit={handleAddExpense}>
      <div className="exp"><h2>Add an Expense</h2></div>
      {/* <div className="participants">
       <div className="WYA"><span>With You And</span> 
        <button className="add-person" onClick={handleAddPersonButtonClick}>+ Add Person</button></div>
        <div className="add-person-fields">
          <input type="text" placeholder="Name"  value={name} onChange={handleNameChange} />
          <input type="email" placeholder="Email"  value={email} onChange={handleEmailChange} />
          <button onClick={handleAddPersonButtonClick}>Add</button>
        </div>
      </div> */}
      <div className="ai-image">
      {aiImage && <img src={aiImage} alt="AI Image" />}

      

      </div>
      <div className="description">
        <label htmlFor="expense-desc">Enter a description</label>
        <input id="expense-desc" type="text" placeholder="Description"  value={description}
          onChange={handleDescriptionChange}/>
      </div>
      <div className="amount">
        <label htmlFor="expense-amount">Amount</label>
        <input id="expense-amount" type="number" placeholder="$0.00" value={amount}
          onChange={handleAmountChange}/>
        {/* <div className="paid-by">
          <button onClick={handleYouButtonClick}>You</button>
          <button onClick={handleSplitButtonClick}>Split</button>
        </div>
        <p>($0.00/person)</p> */}
      </div>
      <div className="date">
        <label htmlFor="expense-date">Date</label>
        <input id="expense-date" type="date" value={date} onChange={handleDateChange} />
        <input type="file" accept="image/*" className="image-notes" />
      </div>
      <div className="buttons">
        <button className="cancel">Cancel</button>
        <button className="save" onClick={handleAddExpense}>Save</button>
        </div>

        <div className="ABC">   <Link to="/expenses">
      <button className="VAE" >View All Expenses</button> </Link> </div>
    </form>
  );
};

export default ExpenseForm;
// AHzsLTUjZPBcvqRkHM1cwZMUqxWAYjl0OC6llpAVjP1IOQtUzOgCoNa2