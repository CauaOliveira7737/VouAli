import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ onLogin, navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }
  
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];
  
      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );
  
      if (!matchedUser) {
        return Alert.alert('Erro', 'Email ou senha inválidos.');
      }
  
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      await AsyncStorage.setItem('loggedIn', 'true');
  
      onLogin(); 
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      Alert.alert('Erro', 'Ocorreu um erro ao fazer login.');
    }
  };


  return (
    <>
      <View style={styles.container}>
        <Image source={require('../assets/logobranca.png')} style={styles.image} />
        <Text style={styles.title}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>
        <TextInput
          style={[
            styles.input,
            focusedField === 'email' && styles.inputFocused
          ]}
          placeholder="Email"
          placeholderTextColor={focusedField === 'email' ? '#fff' : '#DCDCDC'}
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          underlineColorAndroid="transparent"
          color={focusedField === 'email' ? '#fff' : '#DCDCDC'}
        />

        <TextInput
          style={[
            styles.input,
            focusedField === 'password' && styles.inputFocused
          ]}
          placeholder="Senha"
          placeholderTextColor={focusedField === 'password' ? '#fff' : '#DCDCDC'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
          underlineColorAndroid="transparent"
          color={focusedField === 'password' ? '#fff' : '#DCDCDC'}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>
      </View>

      { }
      <View style={styles.footerCircle} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4D7E53',
    justifyContent: 'center',
    paddingHorizontal: 60,
    borderBottomLeftRadius: 300,
    marginBottom: 80,
    paddingBottom: 100,
  },
  input: {
    width: '100%',
    backgroundColor: 'transparent',
    borderBottomWidth: 2,
    borderColor: '#DCDCDC',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    height: 40,
    outlineStyle: 'none',
    borderRadius: 4,
    color: '#fff',
    marginTop: 10,
  },
  inputFocused: {
    borderColor: '#fff',
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginTop: 40,
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#4D7E53',
    fontWeight: 'bold',
    fontFamily: 'poppins',
    fontSize: 16,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 30,
  },
  link: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 8,
    marginRight: 8,
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    margin: -20,
    alignSelf: 'center',
  },
  footerCircle: {
    position: 'absolute',
    bottom: -100,
    alignSelf: 'left',
    width: 240,
    height: 220,
    borderTopRightRadius: 280,
    backgroundColor: '#E0E0E0',
    zIndex: -1,
  },
});

export default LoginScreen;
