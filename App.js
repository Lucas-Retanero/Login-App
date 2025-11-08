import * as React from 'react';
import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from './screens/Login';
import CriarConta from './screens/CriarConta';
import Home from './screens/Home';
import EsqueciSenha from './screens/EsqueciSenha';
import IMC from './screens/IMC';
import TaskList from './screens/TaskList';
import Temp from './screens/Temp';

import { criarTabelaUsuarios } from './database/bancoDados';

export default function App() {
  useEffect(() => {
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="EsqueciSenha"
          component={EsqueciSenha}
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
          name="CriarConta"
          component={CriarConta}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}