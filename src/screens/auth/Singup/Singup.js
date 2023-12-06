import { Image, ScrollView, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput, configureFonts, DefaultTheme, } from 'react-native-paper';
import { images } from '../../../constants/images';
import { colorsFonts } from '../../../constants/colorsfont';
import Button from '../../../components/Button/Button';
import BackButton from '../../../components/BackButton/BackButton';
import { startScreenstyle } from '../Authstyles';
import CountryPick from '../../../components/CountryPick/Countrypicker'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useAuth } from '../Context/Authcontxt';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const SignUp = ({ navigation }) => {
  const { updateUser } = useAuth();
  const [data, setdata] = useState({
    email: "",
    phone: '',
    fullname: '',
    country: '',
    status: "online",
    picture: ''
  });
  const [dataErr, setdataErr] = useState({
    emailErr: "",
    phoneErr: '',
    fullnameErr: '',
    countryErr: ''
  });

  const onSelectCountry = (country) => {
    setdataErr({ ...dataErr, countryErr: '' })
    setdata({ ...data, country: country?.name })
  };

  const _addPhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      setdata({ ...data, picture: image.path })
    });
  }


  const addUser = () => {
    if (_validator()) {
      auth()
        .createUserWithEmailAndPassword(data.email, data.phone)
        .then(async (userCredential) => {
          const user = userCredential.user;
          // submitUserdata(user)
          const picturePath = `profile_pictures/${user.uid}.jpg`;
          const pictureRef = storage().ref(picturePath);
          try {
            await pictureRef.putFile(data.picture);
            const pictureURL = await pictureRef.getDownloadURL();
            const userAdditionalData = {
              username: data.fullname,
              country: data.country,
              status: 'offline',
              in_game: false,
              picture: pictureURL,
              userId: user.uid,
              level: "",
              coins: "",
              correctCount: 0,
              incorrectCount: 0,
              completedQuestion:false,
              noti:false

            };
            const userPath = `/users/${user.uid}`;
            database().ref(userPath).set(userAdditionalData);
          } catch (error) {
            console.error('Error uploading profile picture:', error);
          }
        })
        .catch(error => {
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
    if (!data.fullname && !data.email && !data.phone && !data.country) {
      setdataErr({ ...dataErr, fullnameErr: 'txt', emailErr: 'txt', phoneErr: 'txt', countryErr: 'txt' })
      return false;
    }
    else if (!data.fullname) {
      setdataErr({ ...dataErr, fullnameErr: 'txt' })
      return false
    } else if (!data.email) {
      setdataErr({ ...dataErr, emailErr: 'txt' })
      return false
    } else if (!data.country) {
      setdataErr({ ...dataErr, countryErr: 'txt' })
      return false
    } else if (!data.phone) {
      setdataErr({ ...dataErr, phoneErr: 'txt' })
      return false
    }
    return true
  }

  return (
    <ImageBackground source={images.profilebg} style={startScreenstyle.container}>
      <View style={startScreenstyle.subcontainer}>
        <View style={styles.subcontainer2}>
          <Text style={styles.prfileTxt}>Create Profile</Text>
          <TouchableOpacity onPress={() => _addPhoto()}>
            <Image source={data.picture ? { uri: data.picture } : images.user} style={styles.img} />
          </TouchableOpacity>
        </View>
        <View style={{ height: 20 }} />
        <View style={[styles.card, { height: hp(55), justifyContent: 'center' }]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
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
                  borderColor: dataErr.fullnameErr ? "red" : "grey"
                }}
                label="Full name"
                style={styles.filedstyle}
                value={data.fullname}
                onChangeText={text => {
                  setdata({ ...data, fullname: text })
                  setdataErr({ ...dataErr, fullnameErr: '' })

                }}
              />
              <View style={{ height: 20 }} />
              <TextInput
                theme={{
                  roundness: 15,
                  colors: { primary: colorsFonts.Primarycolor, underlineColor: 'transparent', },
                  fonts: {
                    regular: {
                      fontFamily: 'Montserrat-Regular',

                    },
                  },
                }}
                mode="outlined"
                label="Email"
                contentStyle={{ fontFamily: colorsFonts.REGULAR }}

                outlineStyle={{ borderWidth: .5, borderColor: dataErr.emailErr ? "red" : "grey" }}
                style={styles.filedstyle}
                value={data.email}
                onChangeText={text => {
                  setdata({ ...data, email: text })
                  setdataErr({ ...dataErr, emailErr: '' })
                }}
              />
              <View style={{ height: 20 }} />
              <TextInput
                theme={{
                  roundness: 15,
                  colors: {
                    primary: colorsFonts.Primarycolor,
                    underlineColor: 'transparent',
                  },
                  fonts: {
                    regular: {
                      fontFamily: 'Montserrat-Regular',
                    },
                  },

                }}
                mode="outlined"
                outlineStyle={{
                  borderWidth: .5,
                  borderColor: dataErr.phoneErr ? "red" : "grey"
                }}
                label="Phone number"
                contentStyle={{ fontFamily: colorsFonts.REGULAR }}

                style={styles.filedstyle}
                value={data.phone}
                onChangeText={text => {
                  setdata({ ...data, phone: text })
                  setdataErr({ ...dataErr, phoneErr: '' })
                }}
              />

              <View style={{ height: 20 }} />
              <CountryPick
                st={dataErr.countryErr ? "asd" : null}
                Getcountry={(a) => onSelectCountry(a)}
              />
              <Button
                linear={true}
                btnstyle={{
                  marginTop: 30
                }}
                onPress={() => addUser()}
                title={"Save"}
              />
              <Text onPress={() => navigation.goBack()} style={styles.alreadyTxt}>Already have an account ? LOGIN</Text>
            </View>
          </ScrollView>


        </View>
      </View>
    </ImageBackground>

  )
}

export default SignUp

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
  buton: {
    color: '#000'
  },
  alreadyTxt: {
    textAlign: 'center',
    fontFamily: colorsFonts.SEMIBOLD,
    color: "#000",
    marginTop: 20
  },
  prfileTxt: {
    fontSize: 16,
    color: "#fff",
    fontFamily: colorsFonts.SEMIBOLD
  },
  img: {
    height: 120,
    marginTop: 10,
    borderRadius: 60,
    width: 120
  },
  subcontainer2: {
    alignItems: 'center'
  }
})