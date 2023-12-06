import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useEffect } from 'react'
import MainNav from './src/nav/MainNav'
import { AuthProvider } from './src/screens/auth/Context/Authcontxt';
import PushNotification from "react-native-push-notification";
import messaging from '@react-native-firebase/messaging';

const App = () => {

  useEffect(() => {
    Platform.OS == "android" && _createChannel();
    const unsubscribe = messaging().onMessage(remoteMessage => {
      // Platform.OS == "ios" &&
      //   PushNotificationIOS.addNotificationRequest({
      //     id: new Date().toString(),
      //     title: remoteMessage.notification?.title,
      //     body: remoteMessage.notification?.body,
      //     category: 'userAction',
      //     userInfo: remoteMessage.data,
      //   });


      // permissions
      // PushNotificationIOS.requestPermissions([permissions]);

    });
    return unsubscribe;
  }, []);

  const _createChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'fcm_fallback_notification_channel',
        channelName: 'fcm_fallback_notification_channel',
        channelDescription: 'A channel to categorise your notifications',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      () => { },
    );
  };
  return (
    <AuthProvider>
      <MainNav />
    </AuthProvider>

  )
}

export default App

const styles = StyleSheet.create({})