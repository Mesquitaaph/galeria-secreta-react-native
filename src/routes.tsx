import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Password from './pages/Password/index';
import Home from './pages/Home/index';
import Photo from './pages/Photo/index';
import ImagePicker from './pages/ImagePicker/index';

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator headerMode="none" screenOptions={{ cardStyle: { backgroundColor: '#222' }}} >
        <AppStack.Screen name="Password" component={Password} />
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Photo" component={Photo} />
        <AppStack.Screen name="ImagePicker" component={ImagePicker} />
      </AppStack.Navigator>      
    </NavigationContainer>
  );
};

export default Routes;