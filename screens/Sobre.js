import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Pressable, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Sobre({ navigation }) {
  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };

  const handleEmail = () => {
    Linking.openURL('mailto:lucas.retanero@gmail.com');
  };

  return (
    <View style={styles.app}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f9" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
          hitSlop={8}
        >
          <Text style={styles.backText}>{'<'} Voltar</Text>
        </Pressable>

        <View style={styles.card}>
          <Text style={styles.titulo}>Sobre o Aplicativo</Text>
          <Text style={styles.texto}>
            Este aplicativo foi desenvolvido como parte da atividade de
            Desenvolvimento de Aplicações Mobile. Ele reúne funcionalidades
            básicas de um app real, como autenticação, uso de banco de dados e
            múltiplas telas com experiências diferentes para o usuário.
          </Text>

          <Text style={styles.subtitulo}>Funcionalidades</Text>
          <View style={styles.lista}>
            <Text style={styles.itemLista}>
              • Tela de Login integrada ao SQLite para cadastro, login e
              recuperação de senha.
            </Text>
            <Text style={styles.itemLista}>
              • Calculadora de IMC com classificação do resultado.
            </Text>
            <Text style={styles.itemLista}>
              • Lista de tarefas (To-Do) com armazenamento no banco de dados.
            </Text>
            <Text style={styles.itemLista}>
              • Tela de frases aleatórias para mostrar mensagens motivacionais e
              divertidas.
            </Text>
          </View>

          <Text style={styles.subtitulo}>Sobre o Desenvolvedor</Text>

          <View style={styles.devContainer}>
            <Image
              source={require('../assets/Image-Profile.jpg')}
              style={styles.profileImage}
            />
            <Text style={styles.devNome}>
              Lucas Retanero Almeida Rodrigues de Oliveira
            </Text>
            <Text style={styles.devInfo}>
              Estudante de Desenvolvimento de Software Multiplataforma na FATEC
              Itaquera, focado em desenvolvimento web e mobile, com interesse em
              back-end, banco de dados e boas práticas de UI/UX.
            </Text>
            <Text style={styles.devInfo}>
              Este app foi desenvolvido como parte das atividades da disciplina
              de Desenvolvimento de Aplicações Mobile.
            </Text>
          </View>

          <Text style={styles.subtitulo}>Contato</Text>
          <Text style={styles.textoCentral}>
            Fique à vontade para conhecer mais do meu trabalho ou entrar em
            contato:
          </Text>

          <View style={styles.socialContainer}>
            <Pressable
              style={styles.socialButton}
              onPress={handleEmail}
            >
              <Ionicons name="mail-outline" size={20} color="#4A90E2" />
              <Text style={styles.socialText}>E-mail</Text>
            </Pressable>

            <Pressable
              style={styles.socialButton}
              onPress={() =>
                handleOpenLink('https://www.linkedin.com/in/lucasretanero/')
              }
            >
              <Ionicons name="logo-linkedin" size={20} color="#0A66C2" />
              <Text style={styles.socialText}>LinkedIn</Text>
            </Pressable>

            <Pressable
              style={styles.socialButton}
              onPress={() =>
                handleOpenLink('https://github.com/Lucas-Retanero')
              }
            >
              <Ionicons name="logo-github" size={20} color="#111827" />
              <Text style={styles.socialText}>GitHub</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    paddingTop: 28,
  },

  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#242424ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  backText: {
    color: '#4A90E2',
    fontWeight: '600',
    fontSize: 14,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    elevation: 5,
        shadowColor: '#242424ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: '#4A90E2',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 18,
    marginBottom: 6,
  },
  texto: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  lista: {
    marginTop: 4,
  },
  itemLista: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginBottom: 4,
  },

  devContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  devNome: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
  },
  devInfo: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 4,
  },

  textoCentral: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 10,
  },

  socialContainer: {
    marginTop: 8,
    gap: 8,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#f1f3f5',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 6,
    shadowColor: '#242424ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  socialText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '600',
  }
});