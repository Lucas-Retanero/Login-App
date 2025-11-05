import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    Alert,
    StatusBar,
    Keyboard,
    TouchableOpacity,
  } from 'react-native';
  import { useState } from 'react';
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
  
    const converter = () => {
      const valor = parseFloat(entrada.replace(',', '.').trim());
  
      if (isNaN(valor) || entrada.trim() === '') {
        setSaida('Entrada inválida');
        return;
      }
  
      if (origem === destino) {
        Alert.alert('Erro de conversão', 'Selecione unidades diferentes');
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
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={estilos.container}>
          <StatusBar barStyle="light-content" backgroundColor="#121212" />
  
          {/* botão de voltar */}
          <TouchableOpacity
            style={estilos.botaoVoltar}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={estilos.textoVoltar}>{'<'} Voltar</Text>
          </TouchableOpacity>
  
          <Text style={estilos.titulo}>Conversor de Temperatura</Text>
  
          {/* Seção de entrada */}
          <View style={estilos.secao}>
            <Text style={estilos.rotuloSecao}>Temperatura a Converter:</Text>
            <View style={estilos.linhaEntrada}>
              <TextInput
                style={estilos.entradaTemperatura}
                placeholder="Ex: 25"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={entrada}
                onChangeText={setEntrada}
              />
              <View style={estilos.seletorWrapper}>
                <Picker
                  selectedValue={origem}
                  onValueChange={(valor) => setOrigem(valor)}
                  style={estilos.seletor}
                  dropdownIconColor="#00C851"
                >
                  {OPCOES_TEMPERATURA.map((opcao) => (
                    <Picker.Item
                      key={opcao.value}
                      label={opcao.label}
                      value={opcao.value}
                      color="#f0f0f0"
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
  
          <View style={estilos.divisor} />
  
          {/* Seção de saída */}
          <View style={estilos.secao}>
            <Text style={estilos.rotuloSecao}>Converter para:</Text>
            <View style={estilos.linhaEntrada}>
              <View style={estilos.seletorWrapper}>
                <Picker
                  selectedValue={destino}
                  onValueChange={(valor) => setDestino(valor)}
                  style={estilos.seletor}
                  dropdownIconColor="#00C851"
                >
                  {OPCOES_TEMPERATURA.map((opcao) => (
                    <Picker.Item
                      key={opcao.value}
                      label={opcao.label}
                      value={opcao.value}
                      color="#f0f0f0"
                    />
                  ))}
                </Picker>
              </View>
              <View style={estilos.caixaResultado}>
                <Text style={estilos.textoResultado}>{saida || '—'}</Text>
              </View>
            </View>
          </View>
  
          <Pressable style={estilos.botao} onPress={converter}>
            <Text style={estilos.textoBotao}>Converter Temperatura</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  }
  
  const estilos = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
  
    // mesmo estilo das outras telas escuras
    botaoVoltar: {
      position: 'absolute',
      top: 50,
      left: 20,
      backgroundColor: '#1e1e1e',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      zIndex: 10,
      elevation: 3,
    },
    textoVoltar: {
      color: '#00C851',
      fontWeight: '600',
      fontSize: 14,
    },
  
    titulo: {
      fontSize: 28,
      marginBottom: 40,
      fontWeight: '900',
      color: '#00C851',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 200, 81, 0.4)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
    },
  
    secao: {
      width: '100%',
      maxWidth: 400,
      marginBottom: 30,
      paddingHorizontal: 10,
    },
  
    rotuloSecao: {
      fontSize: 14,
      color: '#999',
      marginBottom: 8,
      fontWeight: '600',
    },
  
    linhaEntrada: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 15,
    },
  
    // esse é o input que você disse que era o certo
    entradaTemperatura: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 10,
      height: 56,
      padding: 10,
      backgroundColor: '#1e1e1e',
      fontSize: 18,
      color: '#f0f0f0',
      minWidth: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  
    seletorWrapper: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 10,
      overflow: 'hidden',
      backgroundColor: '#1e1e1e',
      height: 56,
      minWidth: 60,
      paddingLeft: 1,
      justifyContent: 'center',
    },
  
    seletor: {
      color: '#f0f0f0',
      width: '100%',
      height: '100%',
      padding: 6,
    },
  
    caixaResultado: {
      flex: 1,
      height: 56,
      borderRadius: 10,
      backgroundColor: '#1e1e1e',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: '#00C851',
    },
  
    textoResultado: {
      fontSize: 20,
      color: '#00C851',
      fontWeight: 'bold',
    },
  
    botao: {
      backgroundColor: '#00C851',
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 10,
      marginTop: 20,
    },
  
    textoBotao: {
      color: '#121212',
      fontWeight: 'bold',
      fontSize: 18,
    },
  
    divisor: {
      width: '90%',
      maxWidth: 380,
      height: 1,
      backgroundColor: '#333',
      marginVertical: 10,
    },
  });
  