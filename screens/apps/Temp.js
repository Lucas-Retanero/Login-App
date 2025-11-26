import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, StatusBar, Keyboard, Modal, KeyboardAvoidingView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const OPCOES_TEMPERATURA = [
  { label: 'Celsius (ºC)', value: 'Celsius' },
  { label: 'Fahrenheit (°F)', value: 'Fahrenheit' },
  { label: 'Kelvin (K)', value: 'Kelvin' },
];

export default function Temp({ navigation }) {
  const [origem, setOrigem] = useState('Celsius');
  const [destino, setDestino] = useState('Fahrenheit');
  const [entrada, setEntrada] = useState('');
  const [saida, setSaida] = useState('');
  const [erro, setErro] = useState('');
  const [showModal, setShowModal] = useState(false);

  const abrirErro = (mensagem) => {
    setErro(mensagem);
    setShowModal(true);
  };

  const fecharErro = () => {
    setShowModal(false);
  };

  const converter = () => {
    const valor = parseFloat(entrada.replace(',', '.').trim());

    if (entrada.trim() === '' || isNaN(valor)) {
      setSaida('—');
      abrirErro('Digite um valor numérico válido para converter.');
      return;
    }

    if (origem === destino) {
      abrirErro('Selecione unidades diferentes para origem e destino.');
      return;
    }

    let resultado = valor;

    if (origem === 'Celsius') {
      if (destino === 'Fahrenheit') {
        resultado = (valor * 9) / 5 + 32;
      } else if (destino === 'Kelvin') {
        resultado = valor + 273.15;
      }
    } else if (origem === 'Fahrenheit') {
      if (destino === 'Celsius') {
        resultado = ((valor - 32) * 5) / 9;
      } else if (destino === 'Kelvin') {
        resultado = ((valor - 32) * 5) / 9 + 273.15;
      }
    } else if (origem === 'Kelvin') {
      if (destino === 'Celsius') {
        resultado = valor - 273.15;
      } else if (destino === 'Fahrenheit') {
        resultado = ((valor - 273.15) * 9) / 5 + 32;
      }
    }

    const unidade =
      destino === 'Celsius' ? '°C' : destino === 'Fahrenheit' ? '°F' : 'K';

    setSaida(`${resultado.toFixed(2)} ${unidade}`);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f4f6f9' }}
      behavior="padding"
    >
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={estilos.container}>
          <StatusBar barStyle="dark-content" backgroundColor="#f4f6f9" />

          {/* Botão Voltar fixo no topo */}
          <Pressable
            style={estilos.backButton}
            onPress={() => navigation.navigate('Home')}
            hitSlop={8}
            android_ripple={{ color: '#d0d7e2' }}
          >
            <Text style={estilos.backText}>{'<'} Voltar</Text>
          </Pressable>

          <View style={estilos.card}>
            <Text style={estilos.titulo}>Conversor de Temperatura</Text>

            <View style={estilos.secao}>
              <Text style={estilos.rotuloSecao}>Temperatura de origem</Text>
              <View style={estilos.linhaEntrada}>
                <TextInput
                  style={estilos.entradaTemperatura}
                  placeholder="Ex: 25"
                  placeholderTextColor="#adb5bd"
                  keyboardType="numeric"
                  value={entrada}
                  onChangeText={setEntrada}
                />
                <View style={estilos.seletorWrapper}>
                  <Picker
                    selectedValue={origem}
                    onValueChange={(valor) => setOrigem(valor)}
                    style={estilos.seletor}
                    dropdownIconColor="#4A90E2"
                  >
                    {OPCOES_TEMPERATURA.map((opcao) => (
                      <Picker.Item
                        key={opcao.value}
                        label={opcao.label}
                        value={opcao.value}
                        color="#333"
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>

            <View style={estilos.divisor} />

            <View style={estilos.secao}>
              <Text style={estilos.rotuloSecao}>Converter para</Text>
              <View style={estilos.linhaEntrada}>
                <View style={estilos.seletorWrapper}>
                  <Picker
                    selectedValue={destino}
                    onValueChange={(valor) => setDestino(valor)}
                    style={estilos.seletor}
                    dropdownIconColor="#4A90E2"
                  >
                    {OPCOES_TEMPERATURA.map((opcao) => (
                      <Picker.Item
                        key={opcao.value}
                        label={opcao.label}
                        value={opcao.value}
                        color="#ffffffff"
                      />
                    ))}
                  </Picker>
                </View>
                <View style={estilos.caixaResultado}>
                  <Text style={estilos.textoResultado}>{saida || '—'}</Text>
                </View>
              </View>
            </View>

            <Pressable
              style={({ pressed }) => [
                estilos.botao,
                pressed && { opacity: 0.9 },
              ]}
              onPress={converter}
            >
              <Text style={estilos.textoBotao}>Converter Temperatura</Text>
            </Pressable>
          </View>

          <Modal
            visible={showModal}
            transparent
            animationType="fade"
            onRequestClose={fecharErro}
          >
            <View style={estilos.modalBackdrop}>
              <View style={estilos.modalCard}>
                <View style={estilos.modalIconWrap}>
                  <Text style={estilos.modalIcon}>!</Text>
                </View>
                <Text style={estilos.modalTitulo}>
                  Não foi possível converter
                </Text>
                <Text style={estilos.modalTexto}>{erro}</Text>

                <Pressable
                  style={estilos.modalBotao}
                  onPress={fecharErro}
                  android_ripple={{ color: '#397ACC' }}
                >
                  <Text style={estilos.modalBotaoTexto}>Entendi</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },

  backText: {
    color: '#4A90E2',
    fontWeight: '600',
    fontSize: 14,
  },

  card: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
  },

  titulo: {
    fontSize: 24,
    marginBottom: 18,
    fontWeight: '700',
    color: '#4A90E2',
    textAlign: 'center',
  },

  subtitulo: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 20,
  },

  secao: {
    width: '100%',
    marginBottom: 20,
  },

  rotuloSecao: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
  },

  linhaEntrada: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  entradaTemperatura: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 10,
    height: 52,
    paddingHorizontal: 12,
    backgroundColor: '#f8f9fa',
    fontSize: 18,
    color: '#333',
    minWidth: 30,
  },

  seletorWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    height: 52,
    minWidth: 60,
    justifyContent: 'center',
  },

  seletor: {
    color: '#333',
    width: '100%',
    height: '100%',
  },

  caixaResultado: {
    flex: 1,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#4A90E2',
    paddingHorizontal: 8,
  },

  labelResultado: {
    fontSize: 11,
    color: '#6c757d',
    marginBottom: 2,
  },

  textoResultado: {
    fontSize: 20,
    color: '#4A90E2',
    fontWeight: '700',
  },

  botao: {
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 4,
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  divisor: {
    width: '100%',
    height: 1,
    backgroundColor: '#dee2e6',
    marginVertical: 8,
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
    backgroundColor: '#FFE5E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalIcon: {
    color: '#E63946',
    fontWeight: '700',
    fontSize: 26,
    lineHeight: 24,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
    marginBottom: 6,
    textAlign: 'center',
  },
  modalTexto: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalBotao: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    minWidth: 180,
    alignItems: 'center',
  },
  modalBotaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});