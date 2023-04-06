import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/Login_Screen';
import { createStackNavigator } from '@react-navigation/stack';
import SignupScreen from './src/screens/Signup_Screen';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import EditProfile from './src/screens/EditProfile';

const Stack = createStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Login' component={LoginScreen}/>
      <Stack.Screen name='Signup'  component={SignupScreen}/>
      <Stack.Screen name='Home' component={Home}/>
      <Stack.Screen name='EditProfile'  component={EditProfile}/>
    </Stack.Navigator>
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
