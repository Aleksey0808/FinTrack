import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import styled, { ThemeProvider } from 'styled-components/native';
import { lightTheme, darkTheme } from './src/styles/theme';
import WelcomeScreen from './src/screens/WelcomeScreen';
import HomeScreen from './src/screens/HomeScreen';
import AddTransactionScreen from './src/screens/AddTransactionScreen';
import StatsScreen from './src/screens/StatsScreen';
import { TransactionsProvider } from './src/hooks/TransactionsContext';

const Stack = createStackNavigator();

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <TransactionsProvider>
      <AppContainer>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Home">
              {(props) => <HomeScreen {...props} toggleTheme={toggleTheme} />}
            </Stack.Screen>
            <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
            <Stack.Screen name="Stats" component={StatsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppContainer>
      </TransactionsProvider>
    </ThemeProvider>
  );
}

const AppContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;
