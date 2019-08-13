// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';


import Logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');
  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('Main', { user });
      }
    }).catch(err => {
      console.log(err);
    });
  }, []);


  //Function para executar ao inserir o usuário no TextInput
  async function handlerLogin() {
    const requestResponse = await api.get('/devs', {
      username: user
    });

    const { _id } = requestResponse.data;

    await AsyncStorage.setItem('user', _id);

    navigation.navigate('Main', { _id });
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS !== 'android'}
      style={styles.container}
    >

      <Image source={Logo} />

      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        placeholder='Digite seu usuário do Github'
        placeholderTextColor='#999'
        style={styles.input}
        value={user}
        onChangeText={setUser}
      />

      <TouchableOpacity
        onPress={handlerLogin}
        style={styles.button}
      >
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },

  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});