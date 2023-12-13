import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './viewexpenses.css';
import Logo from '../logo/Quanta_Finance.jpg';
import Delete from '../logo/delete.png';

const AllExpenses = () => {
    const [expenses, setExpenses] = useState([]);
   

    useEffect(() => {
        // Fetch expenses when the component mounts
        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/expenses');
                if (response.data && Array.isArray(response.data.expenses)) {
                    setExpenses(response.data.expenses);// Update expenses state with fetched data
                } else {
                    console.error('Response is not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchExpenses();
    }, []);

    const PEXELS_API_KEY = 'AHzsLTUjZPBcvqRkHM1cwZMUqxWAYjl0OC6llpAVjP1IOQtUzOgCoNa2';
    const DEFAULT_IMAGE = Logo;

    useEffect(() => {
        // Function to fetch images based on description
        const fetchImages = async (description, index) => {
            try {
                if (description.trim() === '') {
                    // Set default image if description is empty
                    const updatedExpenses = [...expenses];
                    updatedExpenses[index].aiImage = DEFAULT_IMAGE;
                    setExpenses(updatedExpenses);
                    return;
                }

                const response = await axios.get(
                    `https://api.pexels.com/v1/search?query=${description}`,
                    {
                        headers: {
                            Authorization: PEXELS_API_KEY,
                        },
                    }
                );
                const imageUrl = response.data.photos[0]?.src.medium; // Get the URL of the first image
                const updatedExpenses = [...expenses];
                updatedExpenses[index].aiImage = imageUrl || DEFAULT_IMAGE;
                setExpenses(updatedExpenses);
            } catch (error) {
                console.error('Error fetching images:', error);
                const updatedExpenses = [...expenses];
                updatedExpenses[index].aiImage = DEFAULT_IMAGE;
                setExpenses(updatedExpenses);
            }
        };

        // Fetch images for each expense
        expenses.forEach((expense, index) => {
            if (!expense.aiImage) {
                fetchImages(expense.description, index);
            }
        });
    }, [expenses]);

    const handleDeleteExpense = async (expenseId) => {
        try {
            await axios.delete(`http://localhost:5000/api/expenses/${expenseId}`);
            // After deleting, update the expenses state to re-fetch the updated list
            const updatedExpenses = expenses.filter((expense) => expense._id !== expenseId);
            setExpenses(updatedExpenses);
        } catch (error) {
            console.error('Error deleting expense:', error);
            // Handle error
        }
    };




     return (
        <div>
            <h2>All Expenses</h2>
            <ul>
                {expenses.map((expense, index) => (
                  <li className='lilu' key={expense._id}>
                        {/* Display expense details */}
                      <div className='Photu'>      <div className='AIIMAGE'><img src={expense.aiImage || DEFAULT_IMAGE} alt="AI Image" /> </div> 
                        <div className='Textu'>    {expense.description} - {'$' + expense.amount} 
                        
                        <div className='dlb'>   <button className='delete' onClick={() => handleDeleteExpense(expense._id)}><img src={Delete}/></button>  </div> 
                 
                    
                        
                           </div> </div> 
                           
                          
                    </li> 
                ))}
            </ul>
        </div>
    );
};

export default AllExpenses;
