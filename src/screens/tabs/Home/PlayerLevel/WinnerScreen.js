import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, Animated, BackHandler, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { images } from '../../../../constants/images'
import { colorsFonts } from '../../../../constants/colorsfont'
import Icon from 'react-native-vector-icons/Feather'
import Entypo from "react-native-vector-icons/Entypo"
import { selectcoinToplay } from '../../tabsscreenStyles'
import Button from '../../../../components/Button/Button'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
const WinnerScreen = ({ route,navigation }) => {
    const { winnerUID, playerUID } = route.params;
    console.log("check Ids{{{{{{{{{{{{{{{",winnerUID)
    const [currentUser, setCurrentUser] = useState(null);
    const [oponetUser, setoponentUser] = useState(null)

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const translateXAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(
                fadeAnim,
                {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }
            ),
            Animated.spring(
                scaleAnim,
                {
                    toValue: 1,
                    friction: 1,
                    useNativeDriver: true,
                }
            ),
            Animated.timing(
                translateXAnim,
                {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }
            ),
        ]).start();
    }, [fadeAnim, scaleAnim, translateXAnim]);

    useEffect(() => {
        // const currentUserId = auth().currentUser.uid;
        const usersRef = database().ref(`/users/${winnerUID}`);
        const onDataChange = (snapshot) => {
            const userData = snapshot.val();
            setCurrentUser(userData);
        };
        usersRef.on('value', onDataChange);
        return () => {
            usersRef.off('value', onDataChange);
        };
    }, [winnerUID]);
    //Opoent User
    useEffect(() => {
        // const currentUserId = auth().currentUser.uid;
        const usersRef = database().ref(`/users/${playerUID}`);
        const onDataChange = (snapshot) => {
            const userData = snapshot.val();
            setoponentUser(userData)
        };
        usersRef.on('value', onDataChange);
        return () => {
            usersRef.off('value', onDataChange);
        };
    }, [playerUID]);

    const coinsString = currentUser?.coins.replace(/,/g, '');
    const coins = parseFloat(coinsString);
    const result = !isNaN(coins) ? coins * 2 : 0


    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () =>navigation.navigate("Tabs")  },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                flex: 1,
                transform: [
                    { scale: scaleAnim },
                    { translateX: translateXAnim },
                ],
            }}
        >
            <ImageBackground source={images.congrates} style={styles.winerBg}>
                <View style={styles.container}>
                    <View style={styles.subcontainer}>
                        <View style={{
                            height: heightPercentageToDP(40),

                            marginTop: '10%',
                            flexDirection: 'row', alignItems: 'center', justifyContent: "space-between"
                        }}>
                            <View style={{
                                height: heightPercentageToDP(40),
                                width: widthPercentageToDP(45)
                            }}>
                                <Image source={currentUser?.picture ? { uri: currentUser?.picture } : images.player2} style={[selectcoinToplay.playerStyle, { right: heightPercentageToDP(2) }]} />

                                {/* <Image source={images.player2} style={[selectcoinToplay.playerStyle, { right: heightPercentageToDP(2) }]} /> */}
                                <View>
                                    <View style={{
                                        paddingTop: 4,
                                        alignItems: 'center',
                                        width: widthPercentageToDP(35), justifyContent: 'center'
                                    }}>
                                        <Text style={{ fontFamily: colorsFonts.SEMIBOLD, color: '#fff', fontSize: 16 }}>Winner</Text>
                                        <Text style={{ fontFamily: colorsFonts.REGULAR, color: '#fff', fontSize: 16 }}>{currentUser?.username}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.playbuton}>
                                        <Text style={{ fontFamily: colorsFonts.SEMIBOLD, color: '#fff' }}>Play Again</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <Text style={[selectcoinToplay.vsTxt, { marginTop: 0, right: heightPercentageToDP(1) }]}>VS</Text>
                            <View style={{
                                height: 270,
                                alignItems: 'flex-end',
                                width: widthPercentageToDP(45)
                            }}>
                                <Image source={oponetUser?.picture ? { uri: oponetUser?.picture } : images.player1} style={[selectcoinToplay.playerStyle, { left: heightPercentageToDP(1) }]} />

                                {/* <Image source={images.player1} style={[selectcoinToplay.playerStyle, { left: heightPercentageToDP(1) }]} /> */}
                                <View>
                                    <Text style={{ fontFamily: colorsFonts.REGULAR, color: '#fff', fontSize: 16, textAlign: 'center', paddingTop: 4 }}>{oponetUser?.username}</Text>
                                    <View style={styles.play2}>
                                        <Text style={{ fontFamily: colorsFonts.SEMIBOLD, color: '#000' }}>********</Text>
                                    </View>
                                </View>
                            </View>


                        </View>
                    </View>
                    <View style={styles.end1container}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={[styles.congTxt, { top: heightPercentageToDP(5) }]}>Congratulation</Text>
                            <View style={styles.amount}>
                                <Image source={images.coin} style={[styles.coinstyle, { top: 4 }]} />
                                <Text style={[styles.txt, { marginLeft: 6, fontSize: 50, fontFamily: colorsFonts.BOLD }]}>{result}</Text>
                            </View>
                            <Text style={[styles.congTxt, {
                                fontSize: 16,
                                textAlign: 'center',
                                fontFamily: colorsFonts.REGULAR,
                                marginTop: '10%',
                                paddingHorizontal: 12,
                            }]}>Lorem ipsum dolor sit elit adipiscing consectetur adipiscing elit.</Text>
                            <View style={styles.correcIncView}>
                                <View style={styles.inc}>
                                    <Icon name={"check"} size={12} color={"#fff"} />
                                    <Text style={styles.txt}> {"6"} Correct</Text>
                                </View>
                                <View style={[styles.inc, { backgroundColor: colorsFonts.incorrectAnscolor }]}>
                                    <Entypo name={"cross"} size={12} color={"#fff"} />
                                    <Text style={styles.txt}> {"4"} Incorrect</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                </View>

            </ImageBackground>
        </Animated.View>

    )
}

export default WinnerScreen

const styles = StyleSheet.create({
    container: { flex: 1 },
    subcontainer: {
        flex: 2,
        paddingTop: 20
    },
    end1container: {
        flex: 2.5,
    },
    end2container: { flex: 1, paddingHorizontal: 12, justifyContent: 'center' },
    congTxt: {
        fontSize: 30,
        fontFamily: colorsFonts.SEMIBOLD,
        color: '#fff'
    },
    playbuton: {
        height: 40,
        marginTop: 20,
        alignItems: 'center',
        width: 120,
        justifyContent: 'center',
        backgroundColor: colorsFonts.playbutton, borderTopRightRadius: 40, borderBottomRightRadius: 40
    },
    Names: {
        height: 50,
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    txt: {
        fontSize: 14,
        fontFamily: colorsFonts.SEMIBOLD,
        color: '#fff'
    },
    play2: {
        height: 40,
        marginTop: 40,
        justifyContent: 'center',
        alignSelf: "flex-end",
        alignItems: 'center',
        width: 120,
        backgroundColor: "lightgrey", borderTopLeftRadius: 40, borderBottomLeftRadius: 40
    },
    namesView: {
        height: 50,
        width: null,
        // backgroundColor:'green',
        alignItems: 'center'
    },
    coinstyle: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },
    croneView: {
        height: 100, width: "45%",
        // backgroundColor: 'black',
        alignItems: 'center', justifyContent: 'center'
    },
    playersView: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 24,
        justifyContent: 'space-around'
    },
    winerPrize: {
        height: 100,
        // backgroundColor: 'grey',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    inc: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: "40%",
        borderRadius: 20,
        flexDirection: 'row',

        backgroundColor: colorsFonts.correctAnscolor
    },
    amount: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: '10%',
        alignItems: 'center'
    },
    correcIncView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: "10%",
        width: '100%',

        justifyContent: 'space-around'
    },
    winerBg: {
        height: "100%",
        width: '100%'
    }
})