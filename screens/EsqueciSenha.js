import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Pressable,
} from 'react-native';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BLUE = '#4A90E2';

export default function EsqueciSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [showModal, setShowModal] = useState(false);

  const isValidEmail = EMAIL_REGEX.test(email);

  const handleRedefinir = () => {
    if (!isValidEmail) {
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

    // Simulação de sucesso
    setErro('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigation.navigate('Login');
  };

  return (
    <View style={redefinirSenhaStyles.redefinirSenhaContainer}>
      {/* Ícone */}
      <View style={redefinirSenhaStyles.redefinirSenhaIconContainer}>
        <Image
          source={require('../assets/icon-profile.png')}
          style={redefinirSenhaStyles.redefinirSenhaIcon}
          resizeMode="contain"
        />
      </View>

      <Text style={redefinirSenhaStyles.redefinirSenhaTitle}>Redefinir Senha</Text>
      <Text style={redefinirSenhaStyles.redefinirSenhaSubtitle}>
        Informe seu e-mail e crie uma nova senha.
      </Text>

      <TextInput
        style={[
          redefinirSenhaStyles.redefinirSenhaInput,
          erro.includes('e-mail') && redefinirSenhaStyles.redefinirSenhaInputError,
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
      />

      <TextInput
        style={[
          redefinirSenhaStyles.redefinirSenhaInput,
          erro.includes('campos') && redefinirSenhaStyles.redefinirSenhaInputError,
        ]}
        placeholder="Nova senha"
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
          redefinirSenhaStyles.redefinirSenhaInput,
          erro.includes('coincidem') && redefinirSenhaStyles.redefinirSenhaInputError,
        ]}
        placeholder="Confirmar nova senha"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={(t) => {
          setConfirmarSenha(t);
          if (erro) setErro('');
        }}
      />

      {erro !== '' && (
        <Text style={redefinirSenhaStyles.redefinirSenhaHelperError}>{erro}</Text>
      )}

      <TouchableOpacity
        style={[redefinirSenhaStyles.redefinirSenhaButton]}
        onPress={handleRedefinir}
        activeOpacity={0.9}
      >
        <Text style={redefinirSenhaStyles.redefinirSenhaButtonText}>Redefinir Senha</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={redefinirSenhaStyles.redefinirSenhaFooterText}>Voltar ao login</Text>
      </TouchableOpacity>

      {/* Modal de sucesso */}
      <Modal visible={showModal} transparent animationType="fade" onRequestClose={closeModal}>
        <View style={redefinirSenhaStyles.redefinirSenhaModalBackdrop}>
          <View style={redefinirSenhaStyles.redefinirSenhaModalCard}>
            <View style={redefinirSenhaStyles.redefinirSenhaModalIconWrap}>
              <Text style={redefinirSenhaStyles.redefinirSenhaModalIcon}>✅</Text>
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
            >
              <Text style={redefinirSenhaStyles.redefinirSenhaModalButtonText}>
                Voltar ao Login
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const redefinirSenhaStyles = StyleSheet.create({
  redefinirSenhaContainer: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
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
    backgroundColor: BLUE,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  redefinirSenhaButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
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
