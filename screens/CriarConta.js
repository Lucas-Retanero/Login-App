import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Modal, Pressable, TouchableOpacity } from 'react-native';

export default function CriarConta({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleCriarConta = () => {
    if (!email || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos.');
      setShowModal(true);
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      setShowModal(true);
      return;
    }

    setErro('');
    setShowModal(false);
    navigation.navigate('Login');
  };

  const closeModal = () => setShowModal(false);

  return (
    <View style={criarContaStyles.criarContaContainer}>
      <View style={criarContaStyles.criarContaIconContainer}>
        <Image
          source={require('../assets/icon-profile.png')}
          style={criarContaStyles.criarContaIcon}
        />
      </View>

      <Text style={criarContaStyles.criarContaTitle}>Criar Conta</Text>
      <Text style={criarContaStyles.criarContaSubtitle}>Preencha os campos abaixo</Text>

      <TextInput
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
      />

      <TextInput
        style={[
          criarContaStyles.criarContaInput,
          erro && criarContaStyles.criarContaInputError,
        ]}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={senha}
        onChangeText={(t) => {
          setSenha(t);
          if (erro) setErro('');
        }}
      />

      <TextInput
        style={[
          criarContaStyles.criarContaInput,
          erro && criarContaStyles.criarContaInputError,
        ]}
        placeholder="Confirmar Senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={(t) => {
          setConfirmarSenha(t);
          if (erro) setErro('');
        }}
      />

      <View style={criarContaStyles.criarContaButtonContainer}>
        <Button title="Criar Conta" onPress={handleCriarConta} color="#4A90E2" />
      </View>

      {/* Texto clicável */}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={criarContaStyles.voltarLoginText}>Voltar ao login</Text>
      </TouchableOpacity>

      {/* Modal de erro */}
      <Modal visible={showModal} transparent animationType="fade" onRequestClose={closeModal}>
        <View style={criarContaStyles.criarContaModalBackdrop}>
          <View style={criarContaStyles.criarContaModalCard}>
            <View style={criarContaStyles.criarContaModalIconWrap}>
              <Text style={criarContaStyles.criarContaModalIcon}>!</Text>
            </View>
            <Text style={criarContaStyles.criarContaModalTitle}>Erro</Text>
            <Text style={criarContaStyles.criarContaModalText}>{erro}</Text>
            <Pressable style={criarContaStyles.criarContaModalButton} onPress={closeModal}>
              <Text style={criarContaStyles.criarContaModalButtonText}>Tentar novamente</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const criarContaStyles = StyleSheet.create({
  criarContaContainer: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
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
  criarContaButtonContainer: {
    width: '100%',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
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
