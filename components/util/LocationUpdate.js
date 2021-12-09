import * as React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import useJwt from './util';
import firebase from 'firebase/app';
import bgLocationUpdate from './bgLocationUpdate';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { Platform, View } from 'react-native';
import Constants from 'expo-constants';
import * as BackgroundFetch from 'expo-background-fetch';
import BGComponent from "./BGComponent";

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
// firebase.initializeApp(firebaseConfig);
// Initialize Firebase

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}


const LOCATION_TASK_NAME = "background-location-task";
const BACKGROUND_FETCH_TASK = 'background-fetch';

// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//     try {
//         const receivedNewData = await Location.watchPositionAsync({
//             distanceInterval: 5,
//             timeInterval: 3000,
//         }, (loc) => {

//             bgLocationUpdate(loc)
//         })
//         return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
//     } catch (error) {

//         return BackgroundFetch.Result.Failed;
//     }

// });


async function updateFirebaseLocation(id, locations, long) {
    await firebase.database().ref().update({ ['drivers/' + id + '/location']: locations })
}


function LocationUpdate(props){
        const [Update,setUpdate] =React.useState(true)


        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }


            Location.watchPositionAsync({
                distanceInterval: 5,
                timeInterval: 3000,
            },async (loc) => {
                bgLocationUpdate(loc)
            })
        }

        //         let { status } = await Location.requestForegroundPermissionsAsync();
        //         if (status !== 'granted') {
        //             setErrorMsg('Permission to access location was denied');
        //             return;
        //         }
        //         /// If app is not running through expo client
        //         /// Then the background location permission proceed
        //         /// Otherwise Keep updating location on foreground
        //         if (Constants.appOwnership == "standalone"){
        //             let bgPermission =   await Location.requestBackgroundPermissionsAsync();
        //             /// If permission granted
        //             /// Then start background service
        //             /// Otherwise Keep updating location on foreground
        //             if (bgPermission.status == 'granted') {
        //                 let location = await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        //                     accuracy: Location.Accuracy.BestForNavigation,
        //                     enableHighAccuracy: true,
        //                     distanceInterval: 1,
        //                     timeInterval: 10000,
        //                     activityType: Location.ActivityType.AutomotiveNavigation,
        //                     showsBackgroundLocationIndicator: true
        //                 });
        //             }
        //             else{
        //                 await Location.watchPositionAsync({
        //                     distanceInterval: 5,
        //                     timeInterval: 3000,
        //                 }, (loc) => {

        //                     bgLocationUpdate(loc)
        //                 })
        //             }

        //         }
        //         else{
        //             await Location.watchPositionAsync({
        //                 distanceInterval: 5,
        //                 timeInterval: 3000,
        //             }, (loc) => {
        //                 console.log('')
        //                 bgLocationUpdate(loc)
        //             })
        //         }
        //         // if(Platform.OS === "ios"){
        //         //     await Location.watchPositionAsync({
        //         //         distanceInterval: 5,
        //         //         timeInterval: 3000,
        //         //     }, (loc) => {
        //         //         console.log(loc);
        //         //         bgLocationUpdate(loc)
        //         //     })
        //         // }


        //         let data = {};


        //         return true;

        // }


        React.useEffect( ()=>{

            //registerBackgroundFetchAsync()
            getLocation()
            // BackgroundTimer.runBackgroundTimer(() => {
            //     //code that will be called every 3 seconds
            //     console.log("hello")
            // },
            //     3000);
            // //rest of code will be performing for iOS on background too

            // BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run

        }, [Update])





    return(
        <View style={{ height: 0 }}>
                {/* <BGComponent
                    interval={10000}
                    function={async () => {
                        console.log('YEs')
                        let bgPermission =   await Location.requestForegroundPermissionsAsync();
                       let loc = await Location.getCurrentPositionAsync({
                            distanceInterval: 10,
                            timeInterval: 3000,
                        })
                        console.log(loc)

                    }}
                /> */}
        </View>

      )

  }

//   TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
//     if (error) {
//         return;
//     }
//     if (data) {
//         const { locations } = data;
//         bgLocationUpdate(data.locations)

//     }
// });





const mapDispatchToProps = (dispatch) => {
    return {
        // dispatching plain actions
        setLocation: (data) => dispatch({ type: 'SET_LOCATION', payload: data }),
        setHeading: (data) => dispatch({ type: 'SET_HEADING', payload: data }),
    }
}
const mapStateToProps = (state) => {
    const { user } = state
    return { user: user }
}
export default connect(mapStateToProps, mapDispatchToProps)(LocationUpdate)