import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OnePlayApp from './src/1p';
import TwoPlayApp from './src/2p';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SplashScreen from 'react-native-splash-screen';

const Tab = createBottomTabNavigator();
const App = () => {

  React.useEffect(()=>{
    setTimeout(()=>{
      SplashScreen.hide();
    }, 1500)
  },[])

  return (
        <>
          <NavigationContainer>
            <Tab.Navigator initialRouteName='1'>
              <Tab.Screen
                name="1"
                component={OnePlayApp}
                options={{
                  title: '1 Player',
                  tabBarIcon: () => <MaterialCommunityIcons name="motion-play" size={20} />,
                }}
              />

              <Tab.Screen
                name="2"
                component={TwoPlayApp}
                options={{
                  title: '2 Player',
                  tabBarIcon: () => <MaterialCommunityIcons name="motion-play-outline" size={20} />,
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </>
  );
}

export default App;