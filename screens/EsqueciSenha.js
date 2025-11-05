// screens/ForgotPassword.js
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

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EsqueciSenha ({ navigation }) {
  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isValid = EMAIL_REGEX.test(email);

  const handleSend = () => {
    if (!isValid) {
      setHasError(true);
      return;
    }
    setHasError(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Ícone (envelope) */}
      <View style={styles.iconContainer}>
        <Image
          source={require('../assets/icon-profile.png')} // usando ícone existente no projeto
          style={styles.icon}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Recuperar senha</Text>
      <Text style={styles.subtitle}>
        Informe seu e-mail para enviarmos o link de redefinição.
      </Text>

      <TextInput
        style={[styles.input, (hasError || (email && !isValid)) && styles.inputError]}
        placeholder="Seu e-mail"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={(t) => {
          setEmail(t.trim());
          if (hasError) setHasError(false);
        }}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {(hasError || (email && !isValid)) && (
        <Text style={styles.helperError}>
          Digite um e-mail válido.
        </Text>
      )}

      <TouchableOpacity
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={handleSend}
        activeOpacity={0.9}
      >
        <Text style={styles.buttonText}>Enviar link</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.footerText}>Voltar ao login</Text>
      </TouchableOpacity>

      {/* Modal de confirmação */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalIconWrap}>
              <Text style={styles.modalIcon}>✉️</Text>
            </View>
            <Text style={styles.modalTitle}>E-mail enviado</Text>
            <Text style={styles.modalText}>
              Se {email || 'o e-mail informado'} estiver cadastrado, você receberá um link para redefinir sua senha.
            </Text>

            <Pressable style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Ok, voltar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const BLUE = '#4A90E2';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconContainer: {
    width: 145,
    height: 145,
    marginBottom: 25,
    backgroundColor: BLUE,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { width: 100, height: 100 },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#E63946',
  },
  helperError: {
    width: '100%',
    color: '#E63946',
    marginTop: -6,
    marginBottom: 8,
    fontSize: 13,
  },
  button: {
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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  footerText: {
    color: BLUE,
    marginTop: 20,
    fontSize: 14,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
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
  modalIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E6F0FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalIcon: {
    fontSize: 24,
    lineHeight: 24,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
  },
  modalText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: BLUE,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 180,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
