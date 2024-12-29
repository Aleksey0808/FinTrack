import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadTransactions, saveTransactions } from '../utils/storage';

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadTransactions();
        if (!data || data.length === 0) {
          console.warn('No transactions found. Initializing with an empty array.');
          setTransactions([]); 
        } else {
          setTransactions(data); 
        }
      } catch (error) {
        console.error('Error loading transactions:', error);
        setTransactions([]); 
      }
    };

    fetchData();
  }, []);
  const addTransaction = (transaction) => {
    const newTransactions = [transaction, ...transactions];
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
  };

  const updateTransaction = (updatedTransaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t))
    );
    saveTransactions(transactions);
  };

  const deleteTransaction = (id) => {
    const newTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
  };

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, updateTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
};
