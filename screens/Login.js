import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Modal,
  Pressable,
} from 'react-native';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasError, setHasError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = () => {
    const ok = username === 'Usuário' && password === 'Senha';
    if (ok) {
      setHasError(false);
      setShowModal(false);
      navigation.navigate('Home');
    } else {
      setHasError(true);
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <View style={loginStyles.loginContainer}>
      <View style={loginStyles.loginIconContainer}>
        <Image
          source={require('../assets/icon-profile.png')}
          style={loginStyles.loginIcon}
        />
      </View>

      <Text style={loginStyles.loginTitle}>Bem-vindo</Text>
      <Text style={loginStyles.loginSubtitle}>Faça login para continuar</Text>

      <TextInput
        style={[loginStyles.loginInput, hasError && loginStyles.loginInputError]}
        placeholder="Usuário"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={(t) => {
          setUsername(t);
          if (hasError) setHasError(false);
        }}
        autoCapitalize="none"
      />

      <TextInput
        style={[loginStyles.loginInput, hasError && loginStyles.loginInputError]}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={(t) => {
          setPassword(t);
          if (hasError) setHasError(false);
        }}
      />

      {hasError && (
        <Text style={loginStyles.loginHelperError}>
          Usuário ou senha inválidos.
        </Text>
      )}

      <View style={loginStyles.loginButtonContainer}>
        <Button title="Entrar" onPress={handleLogin} color="#4A90E2" />
      </View>

      <View style={loginStyles.loginButtonContainer}>
        <Button
          title="Esqueceu sua senha?"
          color="#4A90E2"
          onPress={() => navigation.navigate('EsqueciSenha')}
        />
      </View>

      <View style={loginStyles.loginButtonContainer}>
        <Button
          title="Criar Conta"
          color="#4A90E2"
          onPress={() => navigation.navigate('CriarConta')}
        />
      </View>

      {/* Modal estilizado */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={loginStyles.loginModalBackdrop}>
          <View style={loginStyles.loginModalCard}>
            <View style={loginStyles.loginModalIconWrap}>
              <Text style={loginStyles.loginModalIcon}>!</Text>
            </View>
            <Text style={loginStyles.loginModalTitle}>Falha no login</Text>
            <Text style={loginStyles.loginModalText}>
              Usuário ou senha incorretos. Verifique os dados e tente novamente.
            </Text>

            <Pressable
              style={loginStyles.loginModalButton}
              onPress={closeModal}
            >
              <Text style={loginStyles.loginModalButtonText}>
                Tentar novamente
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const loginStyles = StyleSheet.create({
  loginContainer: {
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
  loginTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
  loginSubtitle: {
    color: '#666',
    marginBottom: 30,
  },
  loginInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    color: '#333', // garante texto escuro
  },
  loginInputError: {
    borderColor: '#E63946',
    backgroundColor: '#fff',
  },
  loginHelperError: {
    width: '100%',
    color: '#E63946',
    marginTop: -6,
    marginBottom: 8,
    fontSize: 13,
  },
  loginButtonContainer: {
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  loginModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loginModalCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  loginModalIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFE5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  loginModalIcon: {
    color: '#E63946',
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 24,
  },
  loginModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
  },
  loginModalText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  loginModalButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 180,
    alignItems: 'center',
  },
  loginModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
