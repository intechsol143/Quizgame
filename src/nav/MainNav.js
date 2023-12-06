
import React, { useState, useEffect, Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNav from './AuthNav';
import TabsNav from './TabsNav';
import PlayerLevel from '../screens/tabs/Home/PlayerLevel/PlayerLevel';
import SelectCoin from '../screens/tabs/Home/PlayerLevel/SelectCoin';
import Waiting from '../screens/tabs/Home/PlayerLevel/Waiting';
import QuestionsScreen from '../screens/tabs/Home/PlayerLevel/QuestionsScreen';
import Joinfriends from '../screens/tabs/Friends/JoinFriends/Joinfriends';
import Editprofile from '../screens/tabs/Profile/EditProfile/Editprofile';
import Settings from '../screens/tabs/Home/Settings/Settings';
import Terms from '../screens/tabs/Home/Settings/Terms';
import Privacy from '../screens/tabs/Home/Settings/Privacy';
import Ontap from '../screens/tabs/Home/OnTap/Ontap';
import WinnerScreen from '../screens/tabs/Home/PlayerLevel/WinnerScreen';
import CongLeader from '../screens/tabs/Leaderboard/CongLeader';
import auth from '@react-native-firebase/auth';


const Stack = createNativeStackNavigator();

function MainNav() {

  const [user, setUser] = useState(null);


  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Fragment>
          {!user ? 
          <Stack.Screen name="Authscreens" component={AuthNav} options={{ headerShown: false }} /> :
            <Fragment>
              <Stack.Screen name="Tabs" component={TabsNav} options={{ headerShown: false }} />
              <Stack.Screen name="PlayerLevel" component={PlayerLevel} options={{ headerShown: false }} />
              <Stack.Screen name="SelectCoin" component={SelectCoin} options={{ headerShown: false }} />
              <Stack.Screen name="Waiting" component={Waiting} options={{ headerShown: false }} />
              <Stack.Screen name="QuestionsScreen" component={QuestionsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Joinfriends" component={Joinfriends} options={{ headerShown: false }} />
              <Stack.Screen name="Editprofile" component={Editprofile} options={{ headerShown: false }} />
              <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
              <Stack.Screen name="Terms" component={Terms} options={{ headerShown: false }} />
              <Stack.Screen name="Privacy" component={Privacy} options={{ headerShown: false }} />
              <Stack.Screen name="Ontap" component={Ontap} options={{ headerShown: false }} />
              <Stack.Screen name="WinnerScreen" component={WinnerScreen} options={{ headerShown: false }} />
              <Stack.Screen name="CongLeader" component={CongLeader} options={{ headerShown: false }} />
            </Fragment>

          }


        </Fragment>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNav;