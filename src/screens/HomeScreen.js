import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import TransactionCard from '../components/TransactionCard';
import { useTransactions } from '../hooks/TransactionsContext';
import Back from '../../assets/icons/Back';
import Moon from '../../assets/icons/Moon';
import MoonDark from '../../assets/icons/MoonDark';

const HomeScreen = ({ navigation, toggleTheme, route }) => {
  const { pay } = route.params;
  const { transactions, deleteTransaction } = useTransactions();
  const theme = useTheme();

  const selectTransactions = transactions.filter((item) => item.type === pay);

  const totalBalance = selectTransactions.reduce(
    (acc, t) => (pay === 'Income' ? acc + t.amount : pay === 'Expense' ? acc - t.amount : acc),
    0
  );
  

  return (
    <GradientContainer colors={theme.gradientColors}>
      <BackButton onPress={() => navigation.goBack()}>
        <Back width={30} height={30} />
      </BackButton>
      <Header>
      <Title>
        {pay === 'Income' 
          ? `Income: $${totalBalance.toFixed(2)}` 
          : pay === 'Expense' 
          ? `Expense: $${totalBalance.toFixed(2)}` 
          : `Balance: $${totalBalance.toFixed(2)}`}
      </Title>
        <TouchableOpacity onPress={toggleTheme}>
          {theme.mode === 'light' ? (
            <MoonDark width={30} height={30} />
          ) : (
            <Moon width={30} height={30} />
          )}
        </TouchableOpacity>
      </Header>
      <FlatList
        data={selectTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            onDelete={() => deleteTransaction(item.id)}
            onEdit={() =>
              navigation.navigate('AddTransaction', { transaction: item })
            }
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <AddButton onPress={() => navigation.navigate('AddTransaction')}>
        <AddButtonText>+ Add Transaction</AddButtonText>
      </AddButton>
    </GradientContainer>
  );
};

const GradientContainer = styled(LinearGradient)`
  flex: 1;
  padding: 20px;
  justify-content: flex-start;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 80px;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const AddButton = styled.TouchableOpacity`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 25px;
  align-items: center;
  margin-top: 20px;
`;

const AddButtonText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 18px;
`;

const BackButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 15px;
  top: 40px;  
  border-radius: 25px;
  padding: 5px;
  height: 45px;
  width: 45px;
  z-index: 9999;  
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default HomeScreen;
