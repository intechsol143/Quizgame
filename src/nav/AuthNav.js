
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/auth/Login/Login';
import Singup from '../screens/auth/Singup/Singup';
import Startscreen from '../screens/auth/Startscreen/Startscreen';
import ForgotPass from '../screens/auth/Forgot/Forgetpass';
import Newpass from '../screens/auth/Newpass/Newpass';
const Stack = createNativeStackNavigator();

function AuthNav() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Startscreen" component={Startscreen} options={{headerShown:false}}/>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Singup} options={{headerShown:false}}/>
            <Stack.Screen name="Forgot" component={ForgotPass} options={{headerShown:false}}/>
            <Stack.Screen name="Newpass" component={Newpass} options={{headerShown:false}}/>
        </Stack.Navigator>
    );
}

export default AuthNav;