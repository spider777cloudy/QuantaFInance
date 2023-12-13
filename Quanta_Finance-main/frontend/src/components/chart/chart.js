import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import './chart.css';
const ChartComponent = () => {
  const chartContainer = useRef(null);
  const [expensesData, setExpensesData] = useState({});
  const [chartReady, setChartReady] = useState(false); // Flag for chart rendering

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/expenses');
        setExpensesData(response.data);
        console.log('Fetched expenses:', response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    if (expensesData && expensesData.expenses && expensesData.expenses.length > 0) {
      setChartReady(true); // Update chartReady when expensesData is ready
    }
  }, [expensesData]);

  useEffect(() => {
    if (chartReady) {
      renderChart();
    }
  }, [chartReady]);

  const renderChart = () => {
    const ctx = chartContainer.current;

    const expenses = expensesData.expenses || [];

    if (ctx && expenses.length > 0) {
      const labels = expenses.map(expense => expense.description);
      const data = expenses.map(expense => expense.amount);

      console.log('Labels:', labels);
      console.log('Data:', data);

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Total Expenses',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Total Amount',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Expense Description',
              },
            },
          },
        },
      });
    } else {
      console.log('No valid data for chart rendering.');
    }
  };

  return (
    <div style={{ position: 'relative', maxWidth: '9000px', margin: 'auto' }}>
      <h2>Expenses Chart</h2>
      <canvas ref={chartContainer} width="700" height="700"     style={{
          maxWidth: '100%',
          height: 'auto',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}></canvas>
    </div>
  );
};

export default ChartComponent;
