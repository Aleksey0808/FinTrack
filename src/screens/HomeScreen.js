import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import TransactionCard from '../components/TransactionCard';
import { useTransactions } from '../hooks/TransactionsContext';
// import Back from '../../assets/icons/Back';

const HomeScreen = ({ navigation, toggleTheme, route }) => {
  const { pay } = route.params;
  const { transactions, deleteTransaction } = useTransactions();
  const theme = useTheme();

  const totalBalance = transactions.reduce(
    (acc, t) => (t.type === 'Income' ? acc + t.amount : acc - t.amount),
    0
  );

  const selectTransactions = transactions.filter((item) => item.type === pay);

  return (
    <GradientContainer colors={theme.gradientColors}>
      <Header>
      {/* <BackButton onPress={() => navigation.goBack()}>
          <Back /> 
        </BackButton> */}
        <Title>Balance: ${totalBalance.toFixed(2)}</Title>
        <TouchableOpacity onPress={toggleTheme}>
          <ThemeToggle>Switch Theme</ThemeToggle>
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
  margin-top: 40px;
  margin-bottom: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const ThemeToggle = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.accent};
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

// const BackButton = styled.TouchableOpacity`
//   align-items: center;
//   justify-content: center;
//   position: absolute;
//   left: 15;
//   background-color: '#FFFFFF1A';
//   border-radius: 25;
//   padding: 5;
//   height: 45;
//   width: 45;
//   z-index: 50;
// `;

export default HomeScreen;
