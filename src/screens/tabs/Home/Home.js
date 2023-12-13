import { StyleSheet, Text, View, FlatList, ScrollView, Image, ImageBackground, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { homestyle } from '../tabsscreenStyles'
import Header from '../../../components/Header/Header'
import FreeCoins from '../../../components/FreeCoins/FreeCoins'
import { images } from '../../../constants/images'
import Button from '../../../components/Button/Button'
import { colorsFonts } from '../../../constants/colorsfont'
import LinearGradient from 'react-native-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import Input from '../../../components/InputField/Input'
import messaging from '@react-native-firebase/messaging';
const Home = ({ navigation }) => {

  const paystackWebViewRef = useRef();
  const [pay, setPay] = useState(false);
  const data = [1, 2];
  const [otherUsers, setOtherUsers] = useState([]);
  const currentUserId = auth().currentUser.uid;
  const [user, setUser] = useState(null);
  const [billingName, setbillingName] = useState("")
  const [CurrentUser, setCurrentUser] = useState(null)


  const handleSubmit = () => {
    if (billingName) {
      setPay(true);
    } else {
      Toast.show("Fill in all fields", {
        duration: Toast.durations.LONG,
      });
    }
  };


  useEffect(() => {
    const currentUserId = auth().currentUser.uid;
    const usersRef = database().ref(`/users/${currentUserId}`);
    const onDataChange = (snapshot) => {
      const userData = snapshot.val();
      setCurrentUser(userData);
    };
    usersRef.on('value', onDataChange);
    return () => {
      usersRef.off('value', onDataChange);
    };
  }, [currentUserId,CurrentUser]);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      setUser(authUser);

    });

    return () => unsubscribe();


  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleUpdateData();
      removeQueueReference();
      removePairReference();
      removePlayAgainReference()
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getToken();

  }, [navigation])

  const removeQueueReference = () => {
    const queueRef = database().ref('queue');

    // Remove the 'queue' reference
    queueRef.remove()
      .then(() => {
        console.log("Queue reference removed successfully");
      })
      .catch((error) => {
        console.error("Error removing queue reference:", error);
      });
  };

  const removePairReference = () => {
    const queueRef = database().ref('pairings');

    // Remove the 'queue' reference
    queueRef.remove()
      .then(() => {
        console.log("Queue reference removed successfully");
      })
      .catch((error) => {
        console.error("Error removing queue reference:", error);
      });
  };
  const removePlayAgainReference = () => {
    const queueRef = database().ref('playAgainSignal');

    // Remove the 'queue' reference
    queueRef.remove()
      .then(() => {
        console.log("Queue reference removed successfully");
      })
      .catch((error) => {
        console.error("Error removing queue reference:", error);
      });
  };

  const handleUpdateData = () => {
    const userID = auth().currentUser.uid;
    const updatedData = {
      // coins: "",
      level: "",
      in_game: false,
      status: 'offline',
      expert: 0,
      fifty_fifty: 0,
      refresh: 0,
      audience: 0,
      noti: false,
      rematch:false,
      hideRematch:false,
      isPaired:false,
      // user_game_level:0



    };
    const userRef = database().ref(`/users/${userID}`);
    userRef.update(updatedData)
      .then(() => {
        console.log("data update successfuly!!")
      })
      .catch((error) => {
        console.error('Error updating item:', error.message);
      });
  };


  const getToken = async () => {
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("check Fcm", fcmToken)
      // _updateToken(fcmToken);
    }
    messaging().onTokenRefresh(token => {
      // _updateToken(token);
    });
  };






  return (
    <View style={homestyle.container}>
      <View style={homestyle.subcontainer}>
        <Header navigation={navigation} user={CurrentUser} />
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <ScrollView horizontal={true}>
              {data.map((index) => {
                return (
                  <FreeCoins onPress={() => handleSubmit()} index={index} />
                )
              })}

            </ScrollView>
          </View>
          <ImageBackground
            borderRadius={15}
            source={images.a} style={homestyle.bgImg}>
            <View style={homestyle.cardOver}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={images.comp} style={homestyle.icon} />
                <Text style={homestyle.txt}>Online Quiz Game</Text>
              </View>
              <View style={homestyle.row2}>
                <Image source={images.man} style={homestyle.icon} />
                <Text style={[homestyle.txt, {
                  fontFamily: colorsFonts.SEMIBOLD,
                  fontSize: 12,
                  color: colorsFonts.black
                }]}>Players Online <Text style={{ fontFamily: colorsFonts.BOLD, fontSize: 16 }}>235</Text></Text>
              </View>
              <Button
                title={"Play"}
                linear={true}
                onPress={() => navigation.navigate("PlayerLevel")}
                btnstyle={homestyle.playbutton}
              />
            </View>

          </ImageBackground>
          <ImageBackground
            borderRadius={15}
            source={images.b} style={homestyle.bgImg}>
            <View style={[homestyle.cardOver, { alignItems: 'flex-end' }]}>
              <View style={{
                flexDirection: 'row',
                // backgroundColor:'red',
                bottom: hp(2),
                alignItems: 'center', paddingRight: 10
              }}>
                <Image source={images.comp} style={[homestyle.icon, { left: 14 }]} />
                <Text style={[homestyle.txt, {
                  fontSize: 18,
                  width: 170, textAlign: "center"
                }]}>Online Classic Quiz Game</Text>
              </View>
              <View style={homestyle.crownView}>
                <Image source={images.crown} style={homestyle.crownicon} />
                <Button title={"Play"}
                  linear={true}
                  btnstyle={homestyle.playbutton} />
              </View>

            </View>

          </ImageBackground>
          <View style={{ height: 20 }} />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ width: 120, height: 170 }}>
              <TouchableOpacity style={{ borderRadius: 10, overflow: 'hidden', flex: 1 }}>
                <ImageBackground source={images.tbg} style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                  <View style={{
                    height: 130,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 120
                  }}>
                    <Image source={images.timeIn} style={[homestyle.treasureImg, { height: 80, width: 80, top: 14 }]} />
                  </View>
                  <View style={{ height: 40, width: 120 }}>
                    <LinearGradient
                      colors={[colorsFonts.Primarycolor, '#00214E']}
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Text style={[homestyle.txt, { color: '#fff', paddingLeft: 0 }]}>IN</Text>
                      <Text style={[homestyle.txt, { color: '#fff', bottom: 2, paddingLeft: 0 }]}>3hr 55m</Text>
                    </LinearGradient>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <View style={{ position: 'absolute', top: -10, alignSelf: 'center' }}>
                <ImageBackground resizeMode='contain' source={images.rec} style={homestyle.crownicon1}>
                  <Text style={[homestyle.txt, { color: '#fff', fontSize: 12, right: 4 }]}>Unlock</Text>
                </ImageBackground>
              </View>
            </View>
            {/* second item */}
            <View style={{ width: 120, height: 170, marginLeft: 12 }}>
              <TouchableOpacity onPress={() => navigation.navigate("Ontap")} style={{ borderRadius: 10, overflow: 'hidden', flex: 1 }}>
                <ImageBackground source={images.tbg} style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                  <View style={{
                    height: 130,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 120
                  }}>
                    <Image source={images.timeopen} style={[homestyle.treasureImg, { height: 80, width: 80, top: 14 }]} />
                  </View>
                  <View style={{ height: 40, width: 120 }}>
                    <LinearGradient
                      colors={[colorsFonts.Primarycolor, '#00214E']}
                      style={{
                        justifyContent: 'center',
                        flex: 1,
                        alignItems: 'center'
                      }}
                    >
                      {/* <Text style={[homestyle.txt, { color: '#fff', paddingLeft: 0 }]}>IN</Text> */}
                      <Text style={[homestyle.txt, { color: '#fff', bottom: 2, paddingLeft: 0 }]}>Tap to Open</Text>
                    </LinearGradient>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <View style={{ position: 'absolute', top: -10, alignSelf: 'center' }}>
                <ImageBackground resizeMode='contain' source={images.rec} style={homestyle.crownicon1}>
                  <Text style={[homestyle.txt, { color: '#fff', fontSize: 12, right: 4 }]}>Done</Text>
                </ImageBackground>
              </View>
            </View>
          </View>


          {/* <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={() => navigation.navigate("Ontap")}>
              <LinearGradient
                colors={['#00214E', colorsFonts.Primarycolor,]}
                style={homestyle.linearcard}>
                <View style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={images.timeIn} style={homestyle.treasureImg} />
                </View>
                <LinearGradient
                  colors={[colorsFonts.Primarycolor, '#00214E']}
                  style={homestyle.sublinearcard}>
                  <Text style={[homestyle.txt, { color: '#fff' }]}>IN</Text>
                  <Text style={[homestyle.txt, { color: '#fff', bottom: 2 }]}>3hr 55m</Text>
                </LinearGradient>
              </LinearGradient>
              <View style={{ position: 'absolute', left: 10, top: 10 }}>
                <ImageBackground resizeMode='contain' source={images.rec} style={homestyle.crownicon1}>
                  <Text style={[homestyle.txt, { color: '#fff', fontSize: 12, right: 4 }]}>Unlock</Text>
                </ImageBackground>
              </View>

            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft:10}} onPress={() => navigation.navigate("Ontap")}>
              <LinearGradient
                colors={['#00214E', colorsFonts.Primarycolor,]}
                style={homestyle.linearcard}>
                <View style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={images.timeopen} style={homestyle.treasureImg} />
                </View>
                <LinearGradient
                  colors={[colorsFonts.Primarycolor, '#00214E']}
                  style={[homestyle.sublinearcard,{justifyContent:'center'}]}>
                  <Text style={[homestyle.txt, { color: '#fff',paddingLeft:0 }]}>Tap to open</Text>

                </LinearGradient>
              </LinearGradient>
              <View style={{ position: 'absolute', left: 10, top: 10 }}>
                <ImageBackground resizeMode='contain' source={images.rec} style={homestyle.crownicon1}>
                  <Text style={[homestyle.txt, { color: '#fff', fontSize: 12, right: 4 }]}></Text>
                </ImageBackground>
              </View>

            </TouchableOpacity>
          </View> */}

        </ScrollView>
        {pay && (
          <View style={{ flex: 1 }}>
            <Paystack
              paystackKey="your-public-key-here"
              billingEmail="paystackwebview@something.com"
              amount={'25000.00'}
              onCancel={(e) => {
                setPay(false)
                console.log("check cancel resport", e)
                // handle response here
              }}

              onSuccess={(response) => {
                // handle response here

                const responseObject = response["transactionRef"]["message"];
                if (responseObject === "Approved") {

                  ToastAndroid.show('Transaction Approved!!', ToastAndroid.SHORT);

                }
              }}
              autoStart={pay}
            />
          </View>
        )}


      </View>
    </View>
  )
}

export default Home

