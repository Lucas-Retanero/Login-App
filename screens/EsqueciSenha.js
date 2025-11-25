import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, Pressable, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { criarTabelaUsuarios, atualizarSenhaPorEmail, buscarUsuarioPorEmail } from '../dataBase/bancoDados';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BLUE = '#4A90E2';

export default function EsqueciSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [showModal, setShowModal] = useState(false);

  // novos: mostrar/ocultar
  const [showNovaSenha, setShowNovaSenha] = useState(false);
  const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

  // refs pros campos
  const emailRef = useRef(null);
  const senhaRef = useRef(null);
  const confirmarRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        await criarTabelaUsuarios();
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const handleRedefinir = async () => {
    if (!EMAIL_REGEX.test(email)) {
      setErro('Digite um e-mail válido.');
      return;
    }
    if (!senha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      const usuario = await buscarUsuarioPorEmail(email.trim());
      if (!usuario) {
        setErro('Não existe usuário com esse e-mail.');
        return;
      }

      const linhas = await atualizarSenhaPorEmail(email.trim(), senha);
      if (linhas > 0) {
        setErro('');
        setShowModal(true);
      } else {
        setErro('Não foi possível atualizar a senha.');
      }
    } catch (e) {
      console.log('Erro ao redefinir senha:', e);
      setErro('Erro ao redefinir senha.');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f4f6f9' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f9" />
      <ScrollView
        contentContainerStyle={redefinirSenhaStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={redefinirSenhaStyles.redefinirSenhaContainer}>
          {/* Ícone */}
          <View style={redefinirSenhaStyles.redefinirSenhaIconContainer}>
            <Image
              source={require('../assets/icon-profile.png')}
              style={redefinirSenhaStyles.redefinirSenhaIcon}
              resizeMode="contain"
            />
          </View>

          <Text style={redefinirSenhaStyles.redefinirSenhaTitle}>
            Redefinir Senha
          </Text>
          <Text style={redefinirSenhaStyles.redefinirSenhaSubtitle}>
            Informe seu e-mail e crie uma nova senha.
          </Text>

          <TextInput
            ref={emailRef}
            style={[
              redefinirSenhaStyles.redefinirSenhaInput,
              erro.includes('e-mail') &&
                redefinirSenhaStyles.redefinirSenhaInputError,
            ]}
            placeholder="E-mail cadastrado"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={(t) => {
              setEmail(t.trim());
              if (erro) setErro('');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => senhaRef.current?.focus()}
          />

          <View
            style={[
              redefinirSenhaStyles.passwordContainer,
              erro.includes('campos') &&
                redefinirSenhaStyles.redefinirSenhaInputError,
            ]}
          >
            <TextInput
              ref={senhaRef}
              style={redefinirSenhaStyles.passwordInput}
              placeholder="Nova senha"
              placeholderTextColor="#aaa"
              secureTextEntry={!showNovaSenha}
              value={senha}
              onChangeText={(t) => {
                setSenha(t);
                if (erro) setErro('');
              }}
              returnKeyType="next"
              onSubmitEditing={() => confirmarRef.current?.focus()}
            />
            <Pressable
              onPress={() => setShowNovaSenha((prev) => !prev)}
              style={redefinirSenhaStyles.showPasswordButton}
              hitSlop={10}
            >
              <Ionicons
                name={showNovaSenha ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={BLUE}
              />
            </Pressable>
          </View>

          <View
            style={[
              redefinirSenhaStyles.passwordContainer,
              erro.includes('coincidem') &&
                redefinirSenhaStyles.redefinirSenhaInputError,
            ]}
          >
            <TextInput
              ref={confirmarRef}
              style={redefinirSenhaStyles.passwordInput}
              placeholder="Confirmar nova senha"
              placeholderTextColor="#aaa"
              secureTextEntry={!showConfirmarSenha}
              value={confirmarSenha}
              onChangeText={(t) => {
                setConfirmarSenha(t);
                if (erro) setErro('');
              }}
              returnKeyType="go"
              onSubmitEditing={handleRedefinir}
            />
            <Pressable
              onPress={() => setShowConfirmarSenha((prev) => !prev)}
              style={redefinirSenhaStyles.showPasswordButton}
              hitSlop={10}
            >
              <Ionicons
                name={showConfirmarSenha ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color={BLUE}
              />
            </Pressable>
          </View>

          {erro !== '' && (
            <Text style={redefinirSenhaStyles.redefinirSenhaHelperError}>
              {erro}
            </Text>
          )}

          <Pressable
            style={redefinirSenhaStyles.redefinirSenhaButton}
            onPress={handleRedefinir}
            android_ripple={{ color: '#397ACC' }}
          >
            <Text style={redefinirSenhaStyles.redefinirSenhaButtonText}>
              Redefinir Senha
            </Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Login')} hitSlop={8}>
            <Text style={redefinirSenhaStyles.redefinirSenhaFooterText}>
              Voltar ao login
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={redefinirSenhaStyles.redefinirSenhaModalBackdrop}>
          <View style={redefinirSenhaStyles.redefinirSenhaModalCard}>
            <View style={redefinirSenhaStyles.redefinirSenhaModalIconWrap}>
              <Text style={redefinirSenhaStyles.redefinirSenhaModalIcon}>
                ✅
              </Text>
            </View>
            <Text style={redefinirSenhaStyles.redefinirSenhaModalTitle}>
              Senha redefinida!
            </Text>
            <Text style={redefinirSenhaStyles.redefinirSenhaModalText}>
              Sua senha foi redefinida com sucesso. Faça login novamente.
            </Text>

            <Pressable
              style={redefinirSenhaStyles.redefinirSenhaModalButton}
              onPress={closeModal}
              android_ripple={{ color: '#397ACC' }}
            >
              <Text style={redefinirSenhaStyles.redefinirSenhaModalButtonText}>
                Voltar ao Login
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const redefinirSenhaStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  redefinirSenhaContainer: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  redefinirSenhaIconContainer: {
    width: 145,
    height: 145,
    marginBottom: 25,
    backgroundColor: BLUE,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  redefinirSenhaIcon: { width: 100, height: 100 },
  redefinirSenhaTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
  redefinirSenhaSubtitle: {
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  redefinirSenhaInput: {
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
  redefinirSenhaInputError: {
    borderColor: '#E63946',
  },
  redefinirSenhaHelperError: {
    width: '100%',
    color: '#E63946',
    marginTop: -6,
    marginBottom: 8,
    fontSize: 13,
  },
  redefinirSenhaButton: {
    width: '100%',
    height: 50,
    backgroundColor: BLUE,
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
  redefinirSenhaButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  redefinirSenhaFooterText: {
    color: BLUE,
    marginTop: 20,
    fontSize: 14,
  },
  redefinirSenhaModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  redefinirSenhaModalCard: {
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
  redefinirSenhaModalIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E6F0FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  redefinirSenhaModalIcon: {
    fontSize: 24,
    lineHeight: 24,
  },
  redefinirSenhaModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
  },
  redefinirSenhaModalText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  redefinirSenhaModalButton: {
    backgroundColor: BLUE,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 180,
    alignItems: 'center',
  },
  redefinirSenhaModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
