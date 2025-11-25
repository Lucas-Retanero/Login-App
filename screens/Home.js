import React from 'react';
import { View, Text, Pressable, StyleSheet, Image, StatusBar } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f9" />

      <Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/25/25694.png' }}
        style={styles.icon}
      />

      <Text style={styles.title}>Tela Inicial</Text>
      <Text style={styles.subtitle}>Escolha um dos aplicativos abaixo:</Text>

      <View style={styles.grid}>
        {/* IMC */}
        <Pressable style={styles.appBox} onPress={() => navigation.navigate('IMC')}>
          <Image
            source={require('../assets/Icon-IMC.png')}
            style={styles.appIcon}
            resizeMode="cover"
          />
        </Pressable>

        <Pressable style={styles.appBox} onPress={() => navigation.navigate('TaskList')}>
          <Image
            source={require('../assets/Icon-Task-List.png')}
            style={styles.appIcon}
            resizeMode="cover"
          />
        </Pressable>

        <Pressable style={styles.appBox} onPress={() => navigation.navigate('Temp')}>
          <Image
            source={require('../assets/Icon-Scale.png')}
            style={styles.appIcon}
            resizeMode="cover"
          />
        </Pressable>

        <Pressable style={styles.appBox} onPress={() => navigation.navigate('Frases')}>
          <Image
            source={require('../assets/Icon-Phrasy.png')}
            style={styles.appIcon}
            resizeMode="cover"
          />
        </Pressable>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </Pressable>
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
    overflow: 'hidden', 
  },
  appIcon: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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
