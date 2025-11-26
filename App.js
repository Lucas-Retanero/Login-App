import * as React from 'react';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import EscolhaLogin from './screens/EscolhaLogin';
// Telas de login
import Login from './screens/LoginSQLite/Login';     
import CriarConta from './screens/LoginSQLite/CriarConta';
import EsqueciSenha from './screens/LoginSQLite/EsqueciSenha';
// Telas de login com LocalStorage
import LoginLocal from './screens/LoginLocal/LoginLocal'; 
import CriarContaLocal from './screens/LoginLocal/CriarContaLocal';
import EsqueciSenhaLocal from './screens/LoginLocal/EsqueciSenhaLocal';
// Demais telas
import Home from './screens/Home';
import IMC from './screens/apps/IMC';
import TaskList from './screens/apps/TaskList';
import Temp from './screens/apps/Temp';
import Frases from './screens/apps/Frases';
import Sobre from './screens/Sobre';
// Banco de dados
import { criarTabelaUsuarios } from './dataBase/bancoDados';

export default function App() {
  useEffect(() => {
    // Evita tentar usar SQLite na Web (onde não funciona bem)
    if (Platform.OS === 'web') return;

    (async () => {
      try {
        await criarTabelaUsuarios();
      } catch (e) {
        console.log('Erro ao criar tabela de usuários:', e);
      }
    })();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="EscolhaLogin"
      >
        <Stack.Screen
          name="EscolhaLogin"
          component={EscolhaLogin}
        />
        <Stack.Screen
          name="Login"
          component={Login}        
        />
        <Stack.Screen
          name="LoginLocal"
          component={LoginLocal}     
        />
        <Stack.Screen
          name="CriarContaLocal"
          component={CriarContaLocal}  
        />
        <Stack.Screen
          name="EsqueciSenhaLocal"
          component={EsqueciSenhaLocal}  
        />
        <Stack.Screen
          name="CriarConta"
          component={CriarConta}
        />
        <Stack.Screen
          name="EsqueciSenha"
          component={EsqueciSenha}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="IMC"
          component={IMC}
        />
        <Stack.Screen
          name="TaskList"
          component={TaskList}
        />
        <Stack.Screen
          name="Temp"
          component={Temp}
        />
        <Stack.Screen
          name="Frases"
          component={Frases}
        />
        <Stack.Screen
          name="Sobre"
          component={Sobre}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}