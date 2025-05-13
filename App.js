import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Index from './pages/Index';
import EventDetails from './pages/EventDetails';
import Calendar from './pages/Calendar';
import Favorites from './pages/Favorites';
import Map from './pages/Map';
import Menu from './pages/Menu';
import NotFound from './pages/NotFound';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const value = await AsyncStorage.getItem('loggedIn');
      setIsLoggedIn(value === 'true');
      setLoading(false);
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    await AsyncStorage.setItem('loggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
  };

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login">
              {({ navigation }) => <LoginScreen onLogin={handleLogin} navigation={navigation} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {({ navigation }) => <RegisterScreen navigation={navigation} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Index">
              {() => <Index onLogout={handleLogout} />}
            </Stack.Screen>
            <Stack.Screen name="EventDetails" component={EventDetails} />
            <Stack.Screen name="Calendar" component={Calendar} />
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="NotFound" component={NotFound} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;