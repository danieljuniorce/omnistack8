// @ts-nocheck
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

import Logo from '../assets/logo.png';
import Like from '../assets/like.png';
import Dislike from '../assets/dislike.png';

export default function Main({ navigation }) {

  const id = navigation.getParam('user');

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadDev() {
      const requestResponse = await api.get('/devs', {
        headers: {
          user: id
        }
      });
      setUsers(requestResponse.data);
    }
    loadDev();
  }, [id]);

  async function handlerLike() {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/likes`, null, {
      headers: {
        user: id
      }
    });
    setUsers(rest);
  }

  async function handlerDislike() {
    const [user, ...rest] = users;

    await api.post(`/devs/${user._id}/dislikes`, null, {
      headers: {
        user: id
      }
    });
    setUsers(rest);
  }

  async function handlerLogout() {
    await AsyncStorage.clear();

    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity onPress={handlerLogout}>
        <Image style={styles.logo} source={Logo} />
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        {users.length === 0 ? (
          <View style={styles.card}>
            <Image style={styles.avatar} source={{ uri: 'https://i.pinimg.com/originals/57/91/e9/5791e9d10ccaf00ae5162effc1637dcc.jpg' }} />
            <View style={styles.footer}>
              <Text style={styles.name}>SadBoy</Text>
              <Text style={styles.bio} numberOfLines={3}>Compartilhe a solidão com esse nobre SadBoy.</Text>
            </View>
          </View>
        ) : (
            users.map((user, index) => (
              <View key={user._id} style={[styles.card, { zIndex: users.length - index }]}>
                <Image style={styles.avatar} source={{ uri: user.avatar }} />
                <View style={styles.footer}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.bio} numberOfLines={3}>{user.bio}</Text>
                </View>
              </View>
            ))
          )}
      </View>

      {users.length > 0 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlerDislike}>
            <Image source={Dislike} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handlerLike}>
            <Image source={Like} />
          </TouchableOpacity>
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  logo: {
    marginTop: 30,
  },
  empty: {
    alignSelf: 'center',
    color: '#999',
    fontWeight: 'bold',
    fontSize: 24
  },
  cardsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    maxHeight: 500,
  },

  card: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  avatar: {
    flex: 1,
    height: 300,
  },

  footer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },

  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 18
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 30
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
    elevation: 2
  }
});