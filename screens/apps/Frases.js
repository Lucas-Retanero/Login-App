import { Pressable, StyleSheet, Text, View, StatusBar } from 'react-native';
import { useState } from 'react';

export default function Frases({ navigation }) {
  const [frase, setFrase] = useState('Toque no botão para gerar');

  const frases = [
    "Overwatch é muito bom",
    "Bilibrejo é horrível!",
    "O Lucas é bonito",
    "Se der certo, deu. Se não der… também deu.",
    "Às vezes o caminho é longo, mas a vitória é certa.",
    "O impossível é só questão de opinião.",
    "Hoje vai dar bom.",
    "O futuro é construído no presente.",
    "Respira… e tenta de novo.",
    "Um passo de cada vez é o suficiente.",
    "Se nada der certo, reinicia o app.",
    "Vitória exige esforço. E café.",
    "Cada erro é um bug que te deixa melhor.",
    "Só vai!",
  ];

  const gerarFrases = () => {
    const indice = Math.floor(Math.random() * frases.length);
    setFrase(frases[indice]);
  };

  const limparFrases = () => {
    setFrase('...');
  };

  return (
    <View style={styles.app}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f9" />

      {/* Botão voltar */}
      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
        hitSlop={8}
      >
        <Text style={styles.backText}>{'<'} Voltar</Text>
      </Pressable>

      <Text style={styles.titulo}>Frases do Dia</Text>

      <View style={styles.fraseContainer}>
        <Text style={styles.fraseText}>{frase}</Text>
      </View>

      <View style={styles.botaoContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.btnPrimario,
            pressed && { opacity: 0.85 },
          ]}
          onPress={gerarFrases}
        >
          <Text style={styles.botaoText}>Gerar</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.btnSecundario,
            pressed && { opacity: 0.85 },
          ]}
          onPress={limparFrases}
        >
          <Text style={styles.botaoText2}>Limpar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  backText: {
    color: '#4A90E2',
    fontWeight: '600',
    fontSize: 14,
  },

  titulo: {
    fontSize: 30,
    fontWeight: '700',
    color: '#4A90E2',
    marginBottom: 22,
  },

  fraseContainer: {
    backgroundColor: '#ffffff',
    padding: 22,
    marginBottom: 32,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#dee2e6',
    elevation: 4,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
  },

  fraseText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },

  botaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 360,
  },

  btnPrimario: {
    flex: 1,
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    elevation: 3,
  },

  btnSecundario: {
    flex: 1,
    backgroundColor: '#dee2e6',
    paddingVertical: 14,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
    elevation: 2,
  },

  botaoText: {
    color: '#ffff',
    fontSize: 16,
    fontWeight: '600',
  },

  botaoText2: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600',
  },
});