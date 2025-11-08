import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, StatusBar } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f9" />
      {/* Ícone principal */}
      <Image 
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png' }}
        style={styles.icon}
      />

      {/* Títulos */}
      <Text style={styles.title}>Tela Inicial</Text>
      <Text style={styles.subtitle}>Escolha um dos aplicativos abaixo:</Text>

      {/* Grade dos apps */}
      <View style={styles.grid}>
        <TouchableOpacity style={styles.appBox} onPress={() => navigation.navigate('IMC')}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1082/1082313.png' }}
            style={styles.appIcon}
          />
          <Text style={styles.appText}>IMC</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appBox} onPress={() => navigation.navigate('TaskList')}>
          <Text style={styles.appText}>Task List</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appBox} onPress={() => navigation.navigate('Temp')}>
          <Text style={styles.appText}>Conversor de Temperatura</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.appBox} onPress={() => navigation.navigate('App4')}>
          <Text style={styles.appText}>App 4</Text>
        </TouchableOpacity>
      </View>

      {/* Botão de sair */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 25,
    tintColor: '#4A90E2',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    color: '#666',
    marginBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 15,
    marginBottom: 40,
  },
  appBox: {
    width: 120,
    height: 120,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  appText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  appIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    tintColor: '#fff',
  },
  button: {
    width: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
