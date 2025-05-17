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

const RegisterScreen = ({ navigation, onLogin }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return Alert.alert('Erro', 'Preencha todos os campos.');
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userExists = users.find((u) => u.email === email);
      if (userExists) {
        return Alert.alert('Erro', 'Este email já está cadastrado.');
      }

      const newUser = { nome: name, email, password }; 
      const updatedUsers = [...users, newUser];

      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));


      await AsyncStorage.setItem('loggedInUser', JSON.stringify(newUser));
      await AsyncStorage.setItem('loggedIn', 'true');
      onLogin(); 

    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar.');
    }
  };



  return (
    <>
      <View style={styles.container}>
        <Image source={require('../assets/logobranca.png')} style={styles.image} />
        <Text style={styles.title}>Cadastro</Text>



        <TextInput
          style={[styles.input,
          focusedField === 'nome' && styles.inputFocused]}
          placeholder="Nome"
          placeholderTextColor={focusedField === 'nome' ? '#fff' : '#DCDCDC'}
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedField('nome')}
          onBlur={() => setFocusedField(null)}
          underlineColorAndroid="transparent"
          color={focusedField === 'nome' ? '#fff' : '#DCDCDC'}
        />

        <TextInput
          style={[styles.input,
          focusedField === 'email' && styles.inputFocused]}
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
          style={[styles.input,
          focusedField === 'password' && styles.inputFocused]}
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

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Faça Login</Text>
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
    paddingHorizontal: 80,
    borderBottomRightRadius: 300,
    marginBottom: 80,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
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
  link: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
    marginTop: 8,
    marginRight: 12,
  },
  image: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    margin: -10,
    alignSelf: 'center',
  },
  footerCircle: {
    position: 'absolute',
    bottom: -100,
    width: 240,
    height: 220,
    borderTopLeftRadius: 280,
    backgroundColor: '#E0E0E0',
    zIndex: -1,
    right: 0,
  },
});

export default RegisterScreen;