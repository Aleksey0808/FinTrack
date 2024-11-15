import { useState, useEffect } from 'react';
import { loadTransactions, saveTransactions } from '../utils/storage';

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadTransactions();
      setTransactions(data);
    };
    fetchData();
  }, []);

  const addTransaction = (transaction) => {
    const newTransactions = [transaction, ...transactions];
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
  };

  const deleteTransaction = (id) => {
    const newTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
  };

  return { transactions, addTransaction, deleteTransaction };
};

export default useTransactions;
