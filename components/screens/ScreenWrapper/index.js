
import * as React from 'react';
import { connect } from 'react-redux';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import configureStore from '../../../store';
const { store, persistor } = configureStore();
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


const  ScreenWrapper = (props) =>{
    const [expoPushToken, setExpoPushToken] = React.useState('');
    const [notification, setNotification] = React.useState(false);
    const notificationListener = React.useRef();
    const responseListener = React.useRef();
    React.useEffect(() => {
        const handleNotification = ({ origin, data }) => {
            // console.log(
            //     `Push notification ${origin} with data: ${JSON.stringify(data)}`,
            // );
        };
        const subscription = Notifications.addPushTokenListener(handleNotification);

        registerForPushNotificationsAsync().then(token => {
            token = token.replace("ExponentPushToken[", "");
            token = token.replace("]", "");
            store.dispatch({ type: 'SET_DEVICE_ID', payload: token })
            //props.setDeviceId(token);
            //setExpoPushToken(token)
        }
        );

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {

            let { data } = response.notification.request.content;
            // New Job Notification
            if (data.to_screen == "JobInformation") {

                props.navigation.navigate(data.to_screen, { id: data.primary_id })
            }

        });
        return () => {

            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])

    return ( props.children )
}
const mapDispatchToProps = (dispatch) => {
    return {
        // dispatching plain actions
        //setDeviceId: (data) => dispatch({ type: 'SET_DEVICE_ID', payload: data }),
    }
}
const mapStateToProps = (state) => {
    const { user } = state
    return { user: user, userData: user.userDetails}
}
export default connect(mapStateToProps, mapDispatchToProps)(ScreenWrapper)


async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
            sound: '../../../assets/sounds/notification.mp3'
        },
        trigger: { seconds: 2 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}