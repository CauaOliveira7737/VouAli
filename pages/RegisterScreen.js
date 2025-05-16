import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
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

      const newUser = { name, email, password };
      const updatedUsers = [...users, newUser];
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login');
    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <View style={styles.nomeinput}>

        <Text>nome</Text>
        <TextInput
          style={[styles.input, 
          focusedField === 'nome' && styles.inputFocused]}
          placeholder="Nome"
          placeholderTextColor="#A6A6A6"
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedField('nome')}
          onBlur={() => setFocusedField(null)}
          underlineColorAndroid="transparent"
        />

      </View>
      <TextInput
        style={[styles.input, 
        focusedField === 'email' && styles.inputFocused]}
        placeholder="Email"
        placeholderTextColor="#A6A6A6"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        onFocus={() => setFocusedField('email')}
        onBlur={() => setFocusedField(null)}
        underlineColorAndroid="transparent"
      />
      <TextInput
        style={[styles.input, 
        focusedField === 'password' && styles.inputFocused]}
        placeholder="Senha"
        placeholderTextColor="#A6A6A6"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        onFocus={() => setFocusedField('password')}
        onBlur={() => setFocusedField(null)}
        underlineColorAndroid="transparent"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Faça Login</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEF6F1',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 4,
    outlineStyle: 'none',
    
  },
   inputFocused: {
    borderColor: '#4D7E53',
    borderWidth: 1,
   },
  button: {
    backgroundColor: '#4D7E53',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 4,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  link: {
    color: '#4D7E53',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'right',
  },
});

export default RegisterScreen;