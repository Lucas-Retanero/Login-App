import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Modal, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { criarTabelaUsuarios, buscarUsuarioPorEmail, inserirUsuario } from '../../dataBase/bancoDados';

export default function CriarConta({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  const emailRef = useRef(null);
  const senhaRef = useRef(null);
  const confirmarRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        await criarTabelaUsuarios();
      } catch (e) {
        console.log('Erro ao criar tabela:', e);
      }
    })();
  }, []);

  const handleCriarConta = async () => {
    if (!email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      setShowErrorModal(true);
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      setShowErrorModal(true);
      return;
    }

    try {
      const jaExiste = await buscarUsuarioPorEmail(email.trim());
      if (jaExiste) {
        setErro('Já existe uma conta com esse e-mail.');
        setShowErrorModal(true);
        return;
      }

      await inserirUsuario(email.trim(), senha);

      setShowSuccessModal(true);
    } catch (e) {
      console.log('Erro ao criar conta:', e);
      setErro('Erro ao criar conta.');
      setShowErrorModal(true);
    }
  };

  const closeErrorModal = () => setShowErrorModal(false);

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f4f6f9' }}
      behavior="padding"
    >
      <ScrollView
        contentContainerStyle={criarContaStyles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={criarContaStyles.criarContaContainer}>
          <View style={criarContaStyles.criarContaIconContainer}>
            <Image
              source={require('../../assets/icon-profile.png')}
              style={criarContaStyles.criarContaIcon}
            />
          </View>

          <Text style={criarContaStyles.criarContaTitle}>Criar Conta</Text>
          <Text style={criarContaStyles.criarContaSubtitle}>
            Preencha os campos abaixo
          </Text>

          <TextInput
            ref={emailRef}
            style={[
              criarContaStyles.criarContaInput,
              erro && criarContaStyles.criarContaInputError,
            ]}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              if (erro) setErro('');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => senhaRef.current?.focus()}
          />

          <View
            style={[
              criarContaStyles.passwordContainer,
              erro && criarContaStyles.criarContaInputError,
            ]}
          >
            <TextInput
              ref={senhaRef}
              style={criarContaStyles.passwordInput}
              placeholder="Senha"
              placeholderTextColor="#aaa"
              secureTextEntry={!showSenha}
              value={senha}
              onChangeText={(t) => {
                setSenha(t);
                if (erro) setErro('');
              }}
              returnKeyType="next"
              onSubmitEditing={() => confirmarRef.current?.focus()}
            />
            <Pressable
              onPress={() => setShowSenha((prev) => !prev)}
              style={criarContaStyles.showPasswordButton}
              hitSlop={10}
            >
              <Ionicons
                name={showSenha ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#4A90E2"
              />
            </Pressable>
          </View>

          <View
            style={[
              criarContaStyles.passwordContainer,
              erro && criarContaStyles.criarContaInputError,
            ]}
          >
            <TextInput
              ref={confirmarRef}
              style={criarContaStyles.passwordInput}
              placeholder="Confirmar Senha"
              placeholderTextColor="#aaa"
              secureTextEntry={!showConfirmSenha}
              value={confirmarSenha}
              onChangeText={(t) => {
                setConfirmarSenha(t);
                if (erro) setErro('');
              }}
              returnKeyType="go"
              onSubmitEditing={handleCriarConta}
            />
            <Pressable
              onPress={() => setShowConfirmSenha((prev) => !prev)}
              style={criarContaStyles.showPasswordButton}
              hitSlop={10}
            >
              <Ionicons
                name={showConfirmSenha ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#4A90E2"
              />
            </Pressable>
          </View>

          <Pressable
            style={criarContaStyles.primaryButton}
            onPress={handleCriarConta}
            android_ripple={{ color: '#397ACC' }}
          >
            <Text style={criarContaStyles.primaryButtonText}>Criar Conta</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Login')} hitSlop={8}>
            <Text style={criarContaStyles.voltarLoginText}>
              Voltar ao login
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal
        visible={showErrorModal}
        transparent
        animationType="fade"
        onRequestClose={closeErrorModal}
      >
        <View style={criarContaStyles.criarContaModalBackdrop}>
          <View style={criarContaStyles.criarContaModalCard}>
            <View style={criarContaStyles.criarContaModalIconWrap}>
              <Text style={criarContaStyles.criarContaModalIcon}>!</Text>
            </View>
            <Text style={criarContaStyles.criarContaModalTitle}>Erro</Text>
            <Text style={criarContaStyles.criarContaModalText}>{erro}</Text>
            <Pressable
              style={criarContaStyles.criarContaModalButton}
              onPress={closeErrorModal}
              android_ripple={{ color: '#397ACC' }}
            >
              <Text style={criarContaStyles.criarContaModalButtonText}>
                Tentar novamente
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={closeSuccessModal}
      >
        <View style={criarContaStyles.criarContaModalBackdrop}>
          <View style={criarContaStyles.criarContaModalCard}>
            <View
              style={[
                criarContaStyles.criarContaModalIconWrap,
                { backgroundColor: '#E6F8EC' },
              ]}
            >
              <Text
                style={[
                  criarContaStyles.criarContaModalIcon,
                  { color: '#1E7E34' },
                ]}
              >
                ✅
              </Text>
            </View>
            <Text style={criarContaStyles.criarContaModalTitle}>
              Conta criada!
            </Text>
            <Text style={criarContaStyles.criarContaModalText}>
              Sua conta foi criada com sucesso. Faça login para continuar.
            </Text>

            <Pressable
              style={criarContaStyles.criarContaModalButton}
              onPress={closeSuccessModal}
              android_ripple={{ color: '#397ACC' }}
            >
              <Text style={criarContaStyles.criarContaModalButtonText}>
                Ir para o Login
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const criarContaStyles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  criarContaContainer: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  criarContaIconContainer: {
    width: 145,
    height: 145,
    marginBottom: 25,
    backgroundColor: '#4A90E2',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  criarContaIcon: {
    width: 100,
    height: 100,
  },
  criarContaTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
  criarContaSubtitle: {
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  criarContaInput: {
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
  criarContaInputError: {
    borderColor: '#E63946',
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
  voltarLoginText: {
    color: '#4A90E2',
    marginTop: 20,
    fontSize: 14,
    textAlign: 'center',
  },
  criarContaModalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  criarContaModalCard: {
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
  criarContaModalIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFE5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  criarContaModalIcon: {
    color: '#E63946',
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 24,
  },
  criarContaModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
    textAlign: 'center',
  },
  criarContaModalText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  criarContaModalButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 180,
    alignItems: 'center',
  },
  criarContaModalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});