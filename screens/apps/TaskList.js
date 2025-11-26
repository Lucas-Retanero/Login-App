import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, FlatList, StyleSheet, Alert, Platform, Keyboard, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { criarTabelaTarefas, inserirTarefa, listarTarefas, removerTarefaDB } from '../../dataBase/bancoDados';

export default function TaskList({ navigation }) {
  const [tarefa, setTarefa] = useState('');
  const [listaTarefas, setListaTarefas] = useState([]);

  // cria tabela e carrega tarefas ao abrir a tela
  useEffect(() => {
    (async () => {
      await criarTabelaTarefas();
      const tarefasDB = await listarTarefas();

      const formatadas = tarefasDB.map((t) => ({
        key: String(t.id),
        valor: t.descricao,
      }));

      setListaTarefas(formatadas);
    })();
  }, []);

  const adicionarTarefa = async () => {
    if (!tarefa.trim()) return;

    const id = await inserirTarefa(tarefa.trim());

    setListaTarefas([
      ...listaTarefas,
      { key: String(id), valor: tarefa.trim() },
    ]);
    setTarefa('');
    Keyboard.dismiss();
  };

  const removerTarefa = (key, valor) => {
    const excluir = async () => {
      await removerTarefaDB(Number(key));
      setListaTarefas(listaTarefas.filter((t) => t.key !== key));
    };

    if (Platform.OS === 'web') {
      if (window.confirm(`Deseja excluir a tarefa: "${valor}"?`)) {
        excluir();
      }
    } else {
      Alert.alert(
        'Confirmar Exclusão',
        `Deseja excluir a tarefa: "${valor}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Excluir',
            onPress: () => excluir(),
            style: 'destructive',
          },
        ],
        { cancelable: true }
      );
    }
  };

  const mostrarTarefa = ({ item }) => (
    <View style={styles.tarefaContainer}>
      <Text style={styles.tarefaTexto}>{item.valor}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.botaoDeletar,
          pressed && { opacity: 0.7 },
        ]}
        onPress={() => removerTarefa(item.key, item.valor)}
      >
        <MaterialIcons name="delete-outline" size={24} color="#fff" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.app}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f6f9" />

      <Pressable
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
        hitSlop={8}
        android_ripple={{ color: '#27272a' }}
      >
        <Text style={styles.backText}>{'<'} Voltar</Text>
      </Pressable>

      <Text style={styles.titulo}>Minhas Tarefas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua nova tarefa..."
          placeholderTextColor="#9CA3AF"
          value={tarefa}
          onChangeText={setTarefa}
          onSubmitEditing={adicionarTarefa}
          returnKeyType="done"
        />
        <Pressable
          style={({ pressed }) => [
            styles.botaoAdicionar,
            !tarefa.trim() && styles.botaoDesativado,
            pressed && { opacity: 0.7 },
          ]}
          onPress={adicionarTarefa}
          disabled={!tarefa.trim()}
        >
          <MaterialIcons name="add" size={28} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={{ flex: 1 }}>
        {listaTarefas.length > 0 ? (
          <FlatList
            data={listaTarefas}
            renderItem={mostrarTarefa}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
          />
        ) : (
          <View style={styles.listaVaziaContainer}>
            <MaterialIcons
              name="event-note"
              size={50}
              color="#CBD5E1"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.listaVaziaTexto}>
              Não há nenhuma tarefa criada. Comece adicionando uma!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    paddingTop: 100,
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
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 25,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },

  input: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },

  botaoAdicionar: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 5,
  },

  botaoDesativado: {
    backgroundColor: '#dee2e6',
    elevation: 2,
  },

  tarefaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 14,

    borderLeftWidth: 5,
    borderLeftColor: '#4A90E2',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },

  tarefaTexto: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
    marginRight: 12,
  },

  botaoDeletar: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E63946',
  },

  listaVaziaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  listaVaziaTexto: {
    textAlign: 'center',
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
});