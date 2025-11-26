import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, StatusBar } from 'react-native';

export default function EscolhaLogin({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f9" />

      <View style={styles.loginIconContainer}>
                  <Image
                    source={require('../assets/icon-profile.png')}
                    style={styles.loginIcon}
                  />
    </View>

      <Text style={styles.title}>Como você quer entrar?</Text>
      <Text style={styles.subtitle}>
        Escolha o tipo de login de acordo com onde o app está rodando.
      </Text>

      <View style={styles.buttonsContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.buttonPrimary,
            pressed && { opacity: 0.8 },
          ]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonPrimaryTitle}>Login com SQLite</Text>
          <Text style={styles.buttonPrimarySubtitle}>
            Ideal para APK / dispositivo físico
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.buttonSecondary,
            pressed && { opacity: 0.8 },
          ]}
          onPress={() => navigation.navigate('LoginLocal')}
        >
          <Text style={styles.buttonSecondaryTitle}>Login com LocalStorage</Text>
          <Text style={styles.buttonSecondarySubtitle}>
            Recomendado para rodar no navegador (web)
          </Text>
        </Pressable>
      </View>
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
  loginIconContainer: {
    width: 145,
    height: 145,
    marginBottom: 25,
    backgroundColor: '#4A90E2',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginIcon: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    color: '#666',
    marginTop: 6,
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    gap: 16,
  },
  buttonPrimary: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    elevation: 3,
  },
  buttonPrimaryTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonPrimarySubtitle: {
    color: '#e2ecff',
    fontSize: 13,
    marginTop: 4,
  },
  buttonSecondary: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    elevation: 2,
  },
  buttonSecondaryTitle: {
    color: '#1f2933',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSecondarySubtitle: {
    color: '#64748b',
    fontSize: 13,
    marginTop: 4,
  },
});