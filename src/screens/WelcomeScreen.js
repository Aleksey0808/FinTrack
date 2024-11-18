import React from 'react';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';
import useTransactions from '../hooks/useTransactions';

const WelcomeScreen = ({ navigation, toggleTheme }) => {
  const { transactions } = useTransactions();
  const totalBalance = transactions.reduce(
    (acc, t) => (t.type === 'Income' ? acc + t.amount : acc - t.amount),
    0
  );

  return (
    <GradientContainer colors={['#4e3e8c', '#b08fcf']}>
      <Title>Balance: ${totalBalance.toFixed(2)}</Title>
      <ButtonContainer>
        <ActionButton onPress={() => navigation.navigate('Home', { pay: 'Income' })}>
          <ButtonText>+ Income</ButtonText>
        </ActionButton>
        <ActionButton onPress={() => navigation.navigate('Home', { pay: 'Expense' })}>
          <ButtonText>+ Expense</ButtonText>
        </ActionButton>
      </ButtonContainer>
    </GradientContainer>
  );
};

const GradientContainer = styled(LinearGradient)`
  flex: 1;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 40px;
`;

const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ActionButton = styled.TouchableOpacity`
  flex: 1;
  margin: 0 10px;
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: white;
  font-size: 16px;
`;

export default WelcomeScreen;
