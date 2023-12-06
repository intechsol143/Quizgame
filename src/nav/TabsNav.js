import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image } from 'react-native'
import Home from '../screens/tabs/Home/Home';
import Friends from '../screens/tabs/Friends/Friends';
import Leaderboard from '../screens/tabs/Leaderboard/Leaderboard';
import Profile from '../screens/tabs/Profile/Profile';
import { colorsFonts } from '../constants/colorsfont';
import { widthPercentageToDP } from 'react-native-responsive-screen';
const Tab = createBottomTabNavigator();

export default function TabsNav() {

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    const icons = {
      Home: require("../assets/home.png"),
      Leaderboard: require("../assets/graph.png"),
      Friends: require("../assets/groupicon.png"),
      Profile: require("../assets/person.png"),
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          margin: 10,
          borderRadius: 20,
          borderWidth: 1, // Add border width to the entire tab bar
          borderColor: colorsFonts.Primarycolor, // Set border color for the tab bar
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel || route.name;
          const icon = icons[route.name];

          return (
            <View
              key={index}
              style={{
                alignItems: 'center',
                paddingVertical:10,
                // padding: 16,
                width:widthPercentageToDP(24),
                backgroundColor: 'transparent', // Set a transparent background
              }}
              onTouchEnd={() => {
                navigation.navigate(route.name);
              }}
            >
              {icon && (
                <Image source={icon}
                  style={{
                    height: 20, width: 20,
                    resizeMode: 'contain',
                    tintColor: state.index === index ? colorsFonts.Primarycolor : colorsFonts.inactiveTab
                  }}
                // size={24}
                //  color={state.index === index ? colorsFonts.Primarycolor : colorsFonts.inactiveTab} 
                />
              )}
              <Text
                style={{
                  fontFamily: colorsFonts.SEMIBOLD,
                  fontSize: 12,
                  color: state.index === index ? colorsFonts.Primarycolor : colorsFonts.inactiveTab,
                }}
              >
                {label}
              </Text>
              {state.index === index && (
                <View
                  style={{
                    width: 5,
                    height: 5,
                    backgroundColor: colorsFonts.Primarycolor, // Set the color of the indicator dot
                    borderRadius: 4,
                    marginTop: 4,
                  }}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <Tab.Navigator  tabBar={CustomTabBar} >
      <Tab.Screen name="Home" component={Home}
        options={{ headerShown: false }} />
      <Tab.Screen name="Leaderboard" component={Leaderboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Friends" component={Friends}
        options={{ headerShown: false }}
      />

      <Tab.Screen name="Profile" component={Profile}
      options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}