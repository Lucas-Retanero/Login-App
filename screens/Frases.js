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
    "Seja forte como o código do Lucas (ou tente).",
    "Se nada der certo, reinicia o app.",
    "O importante é não desistir… ou é?",
    "Quem cedo madruga… provavelmente está com sono.",
    "Confia, o pai tá on.",
    "O mundo é dos persistentes.",
    "Vitória exige esforço. E café.",
    "Seu potencial é maior do que você imagina.",
    "Cada erro é um bug que te deixa melhor.",
    "Só vai!"
  ];

  const gerarFrases = () => {
    const indice = Math.floor(Math.random() * frases.length);
    setFrase(frases[indice]);
  };

  const limparFrases = () => {
    setFrase("Limpado");
  };

  return (
    <View style={styles.app}>
      <StatusBar barStyle="light-content" backgroundColor="#181818ff" />

      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
        hitSlop={8}
      >
        <Text style={styles.backText}>{'<'} Voltar</Text>
      </Pressable>

      <Text style={styles.titulo}>Frases</Text>

      <View style={styles.fraseContainer}>
        <Text style={styles.fraseText}>{frase}</Text>
      </View>

      <View style={styles.botaoContainer}>
        <Pressable
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressionado]}
          onPress={gerarFrases}
        >
          <Text style={styles.botaoText}>Gerar</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.btnLimpar, pressed && styles.btnPressionadoLimpar]}
          onPress={limparFrases}
        >
          <Text style={styles.botaoText}>Limpar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#181818ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#1E1E1E',  
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    elevation: 5,         
  },

  backText: {
    color: '#E63946', 
    fontWeight: '600',
    fontSize: 14,
  },

  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E63946',
    marginBottom: 20,
  },

  fraseContainer: {
    backgroundColor: '#333',
    padding: 20,
    marginBottom: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
  },

  fraseText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },

  botaoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 350,
  },

  btn: {
    backgroundColor: '#E63946',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  btnPressionado: {
    backgroundColor: '#e1535fff',
  },

  btnLimpar: {
    backgroundColor: '#727272ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },

  btnPressionadoLimpar: {
    backgroundColor: '#555',
  },

  botaoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
