import { useState, useEffect } from 'react';
import { loadTransactions, saveTransactions } from '../utils/storage';

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadTransactions();
      setTransactions(data || []); // Подстраховка, если нет данных
    };
    fetchData();
  }, []);

  const saveAndSetTransactions = (newTransactions) => {
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
  };

  const addTransaction = (transaction) => {
    const newTransactions = [transaction, ...transactions];
    saveAndSetTransactions(newTransactions);
  };

  const updateTransaction = (updatedTransaction) => {
    const newTransactions = transactions.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    saveAndSetTransactions(newTransactions);
  };

  const deleteTransaction = (id) => {
    const newTransactions = transactions.filter((t) => t.id !== id);
    saveAndSetTransactions(newTransactions);
  };

  return { transactions, addTransaction, updateTransaction, deleteTransaction };
};

export default useTransactions;
