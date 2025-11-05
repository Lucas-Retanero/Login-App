import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from './screens/Login';
import Home from './screens/Home';
import EsqueciSenha from './screens/EsqueciSenha';
import IMC from './screens/IMC';
import TaskList from './screens/TaskList';
import Temp from './screens/Temp';

export default function App(){
  return(
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}