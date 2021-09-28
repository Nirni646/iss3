import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import IssLocationScreen from './screens/IssLocationScreen';
import MeteorScreen from './screens/MeteorScreen';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UpdateScreen from './screens/updateScreen';

const stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRootName = 'home' screenOptions={{
        headerShown : false,
      }}>
        <stack.Screen name='home' component={HomeScreen} />
        <stack.Screen name='IssLocation' component={IssLocationScreen} />
        <stack.Screen name='meteor' component={MeteorScreen} />
        <stack.Screen name='update' component={UpdateScreen} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
