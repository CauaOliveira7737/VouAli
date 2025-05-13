import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
          console.log('Usuário salvo:', newUser);
      
          Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login'),
            },
          ]);
        } catch (error) {
          console.error('Erro ao salvar usuário:', error);
          Alert.alert('Erro', 'Ocorreu um problema ao salvar o cadastro.');
        }
      };
      

    return (
        <View style={styles.container}>
            <Text style={styles.title}>📋 Cadastro</Text>
            <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Senha" value={password} secureTextEntry onChangeText={setPassword} />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F3F4F6',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#10B981',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default RegisterScreen;