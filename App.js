import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider,useDispatch,useSelector} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';
const {store, persistor} = configureStore();
import { RootSiblingParent } from 'react-native-root-siblings';
import Theme from './components/index';
import * as Font from 'expo-font';
import LocationUpdate from './components/util/LocationUpdate';
import SplashScreen from './components/screens/SplashScreen';
import { StatusBar } from 'expo-status-bar';
/// Notification Library

export default function App() {

  const [loaded,setLoaded] = React.useState(false)


  const loadFonts = async () =>{
    await Font.loadAsync({
      // Load a fonts from a static resource
      AntDesign: require('./assets/fonts/AntDesign.ttf'),
      Entypo: require('./assets/fonts/Entypo.ttf'),
      EvilIcons: require('./assets/fonts/EvilIcons.ttf'),
      Feather: require('./assets/fonts/Feather.ttf'),
      FontAwesome: require('./assets/fonts/FontAwesome.ttf'),
      FontAwesome5_Brands: require('./assets/fonts/FontAwesome5_Brands.ttf'),
      FontAwesome5_Regular: require('./assets/fonts/FontAwesome5_Regular.ttf'),
      FontAwesome5_Solid: require('./assets/fonts/FontAwesome5_Solid.ttf'),
      Fontisto: require('./assets/fonts/Fontisto.ttf'),
      Foundation: require('./assets/fonts/Foundation.ttf'),
      Ionicons: require('./assets/fonts/Ionicons.ttf'),
      MaterialCommunityIcons: require('./assets/fonts/MaterialCommunityIcons.ttf'),
      MaterialIcons: require('./assets/fonts/MaterialIcons.ttf'),
      Octicons: require('./assets/fonts/Octicons.ttf'),
      SimpleLineIcons: require('./assets/fonts/SimpleLineIcons.ttf'),
      Zocial: require('./assets/fonts/Zocial.ttf'),
      FredokaOne: require('./assets/fonts/FredokaOne/FredokaOne-Regular.ttf'),
      // Barlow
      Barlow_Medium: require('./assets/fonts/barlow/Barlow-Medium.ttf'),
      Barlow_Regular: require('./assets/fonts/barlow/Barlow-Regular.ttf'),
      Barlow_SemiBold: require('./assets/fonts/barlow/Barlow-SemiBold.ttf'),
      Barlow_Bold: require('./assets/fonts/barlow/Barlow-Bold.ttf'),
      Barlow_ExtraBold: require('./assets/fonts/barlow/Barlow-ExtraBold.ttf')
    });
     setTimeout(()=>{
      setLoaded(true);
    },3000)

  }
  useEffect(()=>{




  },[])
  loadFonts();
  if (loaded) {
    return (
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
          <RootSiblingParent>
            <StatusBar backgroundColor="transparent" />
            <Theme />
            <LocationUpdate />
          </RootSiblingParent>
        </PersistGate>
      </Provider>

    );
  }else{
    return <SplashScreen></SplashScreen>
  }

}



