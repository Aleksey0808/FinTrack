import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import Delete from '../../assets/icons/Delete';
import Edit from '../../assets/icons/Edit';

const TransactionCard = ({ transaction, onDelete, onEdit }) => {
  const theme = useTheme();

  return (
    <Card>
      <Content>
        <TextContainer>
          <CategoryText>{transaction.category}</CategoryText>
          <DateText>{transaction.date}</DateText>
        </TextContainer>
        <AmountText
          style={transaction.type === 'Income' ? styles.income : styles.expense}
        >
          ${transaction.amount}
        </AmountText>
      </Content>
      <ActionsContainer>
        <IconButton onPress={onDelete}>
          <DeleteIcon />
        </IconButton>
        <IconButton onPress={onEdit}>
          <EditIcon />
        </IconButton>
      </ActionsContainer>
    </Card>
  );
};

const Card = styled.View`
  background-color: ${({ theme }) => theme.card};
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const Content = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const TextContainer = styled.View`
  flex: 1;
`;

const CategoryText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const DateText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 4px;
`;

const AmountText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const ActionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

const IconButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.iconBackground};
  border-radius: 20px;
`;

const DeleteIcon = styled(Delete)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.danger};
`;

const EditIcon = styled(Edit)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.accent};
`;

const styles = {
  income: { color: 'green' },
  expense: { color: 'red' },
};

export default TransactionCard;
