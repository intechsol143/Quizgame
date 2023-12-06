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
import BackIcon from 'react-native-vector-icons/AntDesign'
const ForgotPass = ({ navigation }) => {
    const width = Dimensions.get("screen").width;
    const [state, setState] = useState("0")
    const [data, setdata] = useState({
        email: "",
        loader: false
    });
    const [dataErr, setdataErr] = useState({
        emailErr: "",
    });

    const _userForgot = () => {
        if (_validator()) {
            navigation.navigate("Newpass")
        }

    };

    const _validator = () => {
        if (!data.email) {
            setdataErr({ ...dataErr, emailErr: 'txt', phoneErr: 'txt', })
            return false;
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
                <View style={[styles.card, { height: hp(40), }]}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View>
                            <View>
                                <BackIcon onPress={() => navigation.goBack()} name={"arrowleft"} size={24} color={"#000"} />
                            </View>
                            <View style={startScreenstyle.textView}>
                                <Text style={startScreenstyle.txt}>Forgot Password</Text>
                                <Text style={[startScreenstyle.txt, {
                                    marginTop: 10,
                                    width: width - 70,
                                    color: colorsFonts.neutralGrey, fontFamily: colorsFonts.SEMIBOLD, fontSize: 14
                                }]}>Enter your e-mail to set your password.</Text>
                            </View>
                            <View style={startScreenstyle.buttonsView}>
                                <View style={{ width: wp(88) }}>
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


                                    <View style={{ height: hp(1) }} />
                                    <Button title={"Send"}
                                        onPress={() => _userForgot()}
                                        linear={true}

                                    />
                                </View>





                            </View>
                        </View>

                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    )
}

export default ForgotPass

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
        color: colorsFonts.Primarycolor, fontSize: 14
    },
    emTxt: { marginTop: 10, color: colorsFonts.Primarycolor, fontSize: 14 },
    buton: {
        color: '#000'
    }
})