import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Modal,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  criarTabelaUsuarios,
  autenticarUsuario,
} from '../database/bancoDados';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        await criarTabelaUsuarios();
      } catch (e) {
        console.log('Erro ao criar tabela:', e);
      }
    })();
  }, []);

  const handleLogin = async () => {
    try {
      const usuario = await autenticarUsuario(email.trim(), password);
      if (usuario) {
        setHasError(false);
        setShowModal(false);
        navigation.navigate('Home');
      } else {
        setHasError(true);
        setShowModal(true);
      }
    } catch (e) {
      console.log('Erro ao autenticar:', e);
      setHasError(true);
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f4f6f9' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f9" />
      <ScrollView
        contentContainerStyle={loginStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={loginStyles.loginContainer}>
          <View style={loginStyles.loginIconContainer}>
            <Image
              source={require('../assets/icon-profile.png')}
              style={loginStyles.loginIcon}
            />
          </View>

          <Text style={loginStyles.loginTitle}>Bem-vindo</Text>
          <Text style={loginStyles.loginSubtitle}>
            Faça login para continuar
          </Text>

          {/* E-mail */}
          <TextInput
            ref={emailRef}
            style={[
              loginStyles.loginInput,
              hasError && loginStyles.loginInputError,
            ]}
            placeholder="E-mail"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              if (hasError) setHasError(false);
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordRef.current?.focus();
            }}
          />

          {/* Senha */}
          <View
            style={[
              loginStyles.passwordContainer,
              hasError && loginStyles.loginInputError,
            ]}
          >
            <TextInput
              ref={passwordRef}
              style={loginStyles.passwordInput}
              placeholder="Senha"
              placeholderTextColor="#aaa"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                if (hasError) setHasError(false);
              }}
              returnKeyType="go"
              onSubmitEditing={handleLogin}
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={loginStyles.showPasswordButton}
              hitSlop={10}
            >
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#4A90E2"
              />
            </Pressable>
          </View>

          {hasError && (
            <Text style={loginStyles.loginHelperError}>
              E-mail ou senha inválidos.
            </Text>
          )}

          {/* Esqueceu a senha */}
          <View style={loginStyles.forgotWrapper}>
            <Pressable
              onPress={() => navigation.navigate('EsqueciSenha')}
              hitSlop={8}
            >
              <Text style={loginStyles.forgotText}>Esqueceu sua senha?</Text>
            </Pressable>
          </View>

          {/* Botão principal */}
          <Pressable
            style={loginStyles.primaryButton}
            onPress={handleLogin}
            android_ripple={{ color: '#397ACC' }}
          >
            <Text style={loginStyles.primaryButtonText}>Entrar</Text>
          </Pressable>

          {/* Texto "Crie uma conta" */}
          <View style={loginStyles.registerTextWrapper}>
            <Text style={loginStyles.registerText}>
              Não tem uma conta?{'  '}
            </Text>
            <Pressable onPress={() => navigation.navigate('CriarConta')}>
              <Text style={loginStyles.registerLink}>Crie uma agora!</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Modal de erro */}
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
              E-mail ou senha incorretos. Verifique os dados e tente novamente.
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
    </KeyboardAvoidingView>
  );
}

const loginStyles = StyleSheet.create({
  // agora o ScrollView ocupa tudo, mas quem centraliza é o filho
  scrollContent: {
    flexGrow: 1,
  },
  // esse fica centralizado na tela
  loginContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f4f6f9',
    alignItems: 'center',
    justifyContent: 'center', // centraliza vertical
    paddingHorizontal: 30,
    paddingVertical: 40,
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
    color: '#333',
  },
  passwordContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
    justifyContent: 'center',
  },
  passwordInput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 15,
    paddingRight: 45,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
  },
  showPasswordButton: {
    position: 'absolute',
    right: 12,
    padding: 5,
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
  forgotWrapper: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  forgotText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '400',
  },
  primaryButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  registerTextWrapper: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  registerText: {
    color: '#444',
    fontSize: 14,
  },
  registerLink: {
    color: '#4A90E2',
    fontWeight: '700',
    fontSize: 14,
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
