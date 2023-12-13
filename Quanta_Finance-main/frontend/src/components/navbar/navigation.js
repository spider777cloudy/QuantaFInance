import React from "react";
import { NavLink } from "react-router-dom";
import "./navigation.css";

const Navigation = () => {

  const initialExpense = 20.37;
  const initializedExpense = initialExpense.toFixed(2);

  return (
    <div className="navigation">
      <div className="expense-container">
        <h1>$<span id="totalExpense">{initializedExpense}</span></h1>
      </div>

      <ul className="navigation-navbar">
        {/* Expenses */}
        <li className="navigation-title">
          <NavLink to="/expenses">
            Expenses
          </NavLink>
        </li>

        {/* Categories */}
        <li className="navigation-title">
        <NavLink to="/dashboard">
          <h2>Dashboard</h2>
          </NavLink>
        </li>

        {/* Charts */}
        <li className="navigation-title">
        <NavLink to="/chart">
          <h2>Charts</h2>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;