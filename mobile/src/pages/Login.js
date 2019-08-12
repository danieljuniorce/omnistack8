// @ts-nocheck
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

import Logo from '../assets/logo.png';

export default function Login({ navigation }) {
  const [user, setUser] = useState('');

  function handlerLogin() {
    navigation.navigate('Main');
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS !== 'android'}
      style={styles.container}
    >

      <Image source={Logo}/>
      
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        placeholder='Digite seu usuário do Github'
        placeholderTextColor='#999'
        style={styles.input}
        value={user}
        onChange={setUser}
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