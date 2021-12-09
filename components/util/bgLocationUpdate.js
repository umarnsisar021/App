import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as TaskManager from 'expo-task-manager';
import useJwt from './util';
import firebase from 'firebase/app';
import configureStore from '../../store';
const { store, persistor } = configureStore();
store.subscribe(bgLocationUpdate)

const firebaseConfig = {
    apiKey: "AIzaSyA7p2PgnCk0bOM0q_nnnO-4Yfnq5VTn-KA",
    authDomain: "piklo-f696e.firebaseapp.com",
    projectId: "piklo-f696e",
    storageBucket: "piklo-f696e.appspot.com",
    messagingSenderId: "574930189697",
    appId: "1:574930189697:web:780b1ccedc46908b21bc80",
    measurementId: "G-NXQ19CZELL",
    databaseURL: "https://piklo-f696e.firebaseio.com"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

async function updateFirebaseLocation(id, locations, long) {
    await firebase.database().ref().update({ ['drivers/' + id + '/location']: locations })
}



function bgLocationUpdate(props){

    const user = store.getState().user
    let location = props ? props.coords : null
    if (user.isLogin) {
        if (location) {
            ///updateFirebaseLocation(user.userDetails.id, props.coords);


                useJwt.post("/Common/location_update", {
                    ...props.coords
                }).then((res) => {

                }).catch((error)=>{

                })


        }

    }
    // useJwt.post("/Common/location_update",{
    //     ...locations[0].coords
    // }).then((res)=>{
    //         console.log(res.data.message)
    // })
    //console.log(props)
   //
}


export default bgLocationUpdate
