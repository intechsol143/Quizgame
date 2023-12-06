import { StyleSheet, Text, View, Dimensions, ImageBackground, Image, ScrollView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { startScreenstyle } from '../Authstyles'
import Button from '../../../components/Button/Button';
import IconFacebook from 'react-native-vector-icons/EvilIcons'
import IconGoogle from 'react-native-vector-icons/AntDesign'
import { colorsFonts } from '../../../constants/colorsfont';
import { images } from '../../../constants/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import { TextInput } from 'react-native-paper';
import Loader from '../../../components/Loader/Loader';

const Startscreen = ({ navigation }) => {
  const width = Dimensions.get("screen").width;
  const [state, setState] = useState(false)
  const [data, setdata] = useState({
    email: "",
    phone: '',
    loader: false
  });
  const [dataErr, setdataErr] = useState({
    emailErr: "",
    phoneErr: '',
  });

  const _userLogin = () => {
    if (_validator()) {
      setdata({ ...data, loader: true })
      auth()
        .signInWithEmailAndPassword(data.email, data.phone)
        .then(async (userCredential) => {
          setdata({ ...data, loader: false })

          const user = userCredential.user;

       

        })
        .catch(error => {
          setdata({ ...data, loader: false })

          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
    }
    // if (_validator()) {
    //   auth()
    //     .createUserWithEmailAndPassword(data.email, data.phone)
    //     .then((userCredential) => {
    //       const user = userCredential.user;
    //       const userAdditionalData = {
    //         username: data.fullname,
    //         country: data.country,
    //         status: 'offline',
    //         picture: data.picture
    //       };
    //       const userPath = `/users/${user.uid}`;
    //       database().ref(userPath).set(userAdditionalData);
    //       // updateUser(userAdditionalData);

    //       console.log('User signed up successfully!');
    //     })
    //     .catch(error => {
    //       if (error.code === 'auth/email-already-in-use') {
    //         console.log('That email address is already in use!');
    //       }

    //       if (error.code === 'auth/invalid-email') {
    //         console.log('That email address is invalid!');
    //       }

    //       console.error(error);
    //     });
    // }
  };

  const _validator = () => {
    if (!data.email && !data.phone) {
      setdataErr({ ...dataErr, emailErr: 'txt', phoneErr: 'txt', })
      return false;
    } else if (!data.email) {
      setdataErr({ ...dataErr, emailErr: 'txt' })
      return false
    } else if (!data.phone) {
      setdataErr({ ...dataErr, phoneErr: 'txt' })
      return false
    }
    return true
  }



  return (
    <ImageBackground source={images.profilebg} style={startScreenstyle.container}>
      {data.loader && <Loader />}
      <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 40 }}>
        <Image source={images.Logo} style={{ height: 100, width: 100, resizeMode: 'center' }} />
        <Text style={[startScreenstyle.txt, { color: '#fff', bottom: 6 }]}>Queezy</Text>
      </View>
      <View style={startScreenstyle.subcontainer}>

        <View style={[styles.card, { height: hp(53), }]}>
          <ScrollView showsVerticalScrollIndicator={false}>


            <View style={startScreenstyle.textView}>
              <Text style={startScreenstyle.txt}>Login or Signup</Text>
              <Text style={[startScreenstyle.txt, {
                marginTop: 10,
                width: width - 70,
                color: colorsFonts.neutralGrey, fontFamily: colorsFonts.SEMIBOLD, fontSize: 14
              }]}>Login or create an account to take quiz, take part in challenge, and more</Text>
            </View>
            <View style={startScreenstyle.buttonsView}>
              {state ? <View style={{ width: wp(88) }}>
                <TextInput
                  mode="outlined"
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: 'Montserrat-Regular'
                      }
                    },
                    roundness: 15,
                    colors: {
                      primary: colorsFonts.Primarycolor,
                      underlineColor: 'transparent',
                    }
                  }}
                  contentStyle={{ fontFamily: colorsFonts.REGULAR }}
                  outlineStyle={{
                    borderWidth: .5,
                    borderColor: dataErr.emailErr ? "red" : "grey"
                  }}
                  label="Email"
                  style={styles.filedstyle}
                  value={data.email}
                  onChangeText={text => {
                    setdata({ ...data, email: text })
                    setdataErr({ ...dataErr, emailErr: '' })

                  }}
                />
                <TextInput
                  mode="outlined"
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: 'Montserrat-Regular'
                      }
                    },
                    roundness: 15,
                    colors: {
                      primary: colorsFonts.Primarycolor,
                      underlineColor: 'transparent',
                    }
                  }}
                  contentStyle={{ fontFamily: colorsFonts.REGULAR }}
                  outlineStyle={{
                    borderWidth: .5,
                    borderColor: dataErr.phoneErr ? "red" : "grey"
                  }}
                  label="Password"
                  style={styles.filedstyle}
                  value={data.phone}
                  onChangeText={text => {
                    setdata({ ...data, phone: text })
                    setdataErr({ ...dataErr, phoneErr: '' })

                  }}
                />
                <View style={{ width: wp(88) }}>
                  <Text onPress={()=>navigation.navigate("Forgot")} style={[startScreenstyle.txt, { ...styles.emTxt2 }]}>Forgot Password?</Text>
                </View>
                <View style={{ height: hp(0.5) }} />
                <Button title={"Login"}
                  onPress={() => _userLogin()}
                  linear={true}

                />
              </View> :
                <View style={{ width: wp(90) }}>
                  <Button title={"Play As  Guest"}
                    onPress={() => navigation.navigate("Tabs")}
                    linear={true}

                  />
                  <Button
                    titlesView={startScreenstyle.titleView}
                    title={"Continue with facebook"}
                    linear={false}
                    btnstyle={{
                      backgroundColor: colorsFonts.secondarybtn
                    }}
                    buttonTxt={styles.buton}
                    Icon={<Image source={images.facebook} style={{ height: 20, width: 20, resizeMode: 'contain' }} />}
                  />
                  <Button title={"Connect with Google"}
                    buttonTxt={styles.buton}
                    linear={false}
                    btnstyle={{
                      backgroundColor: colorsFonts.secondarybtn
                    }}
                    Icon={<Image source={images.google} style={{ height: 18, width: 18, resizeMode: 'contain', right: 10 }} />}
                    titlesView={startScreenstyle.titleView}
                  />
                </View>
              }


              <View style={startScreenstyle.Rview}>
                <View style={[styles.linesView, { width: width - 100 }]}>
                  <View style={{ height: .5, backgroundColor: 'grey', width: wp(32) }} />
                  <Text style={{ color: colorsFonts.neutralGrey, fontFamily: colorsFonts.SEMIBOLD }}>OR</Text>
                  <View style={{ height: .5, backgroundColor: 'grey', width: wp(32) }} />
                </View>
                <View style={{
                  flexDirection: 'row', justifyContent: 'space-between',
                  alignItems: 'center',
                  width: wp(80),
                  // backgroundColor: 'red'
                }}>
                  <Text onPress={() => setState(!state)} style={[startScreenstyle.txt, { ...styles.emTxt }]}>{state ? "Back" : "LogIn"}</Text>
                  <Text onPress={() => navigation.navigate("Signup")} style={[startScreenstyle.txt, { ...styles.emTxt }]}>Signup with E-mail</Text>

                </View>
              </View>

            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  )
}

export default Startscreen

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 20,
    padding: 10
  },
  linesView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  emTxt2: {
    marginTop: 10,
    textAlign: 'right',
    color: colorsFonts.Primarycolor, 
    fontFamily:colorsFonts.SEMIBOLD,
    fontSize: 14
  },
  emTxt: { marginTop: 10,
    fontFamily:colorsFonts.SEMIBOLD,
    color: colorsFonts.Primarycolor, fontSize: 14 },
  buton: {
    color: '#000'
  }
})