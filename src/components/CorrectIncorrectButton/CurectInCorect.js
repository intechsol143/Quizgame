import { Image, StyleSheet, Text, View, ImageBackground, Dimensions, BackHandler, Alert, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import Entypo from "react-native-vector-icons/Entypo"
import { colorsFonts } from '../../constants/colorsfont'
import { images } from '../../constants/images'
import { selectcoinToplay } from '../../screens/tabs/tabsscreenStyles'
import Button from '../Button/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import messaging from '@react-native-firebase/messaging'

import database from '@react-native-firebase/database'
import Loader from '../Loader/Loader'
const CurectInCorect = ({ navigation, opponentUserId, curentUser }) => {

    const height = Dimensions.get("screen").height
    const [loading, setloading] = useState(false)
    const [oponentUser, setoponentUser] = useState(null)
    const [gameResult, setGameResult] = useState('');
    const [gameEnded, setGameEnded] = useState(false);
    useEffect(() => {
        const usersRef = database().ref(`/users/${opponentUserId}`);
        const onDataChange = (snapshot) => {
            const userData = snapshot.val();
            setoponentUser(userData)
        };
        usersRef.on('value', onDataChange);
        return () => {
            usersRef.off('value', onDataChange);
        };
    }, [opponentUserId]);


    useEffect(() => {
        if (curentUser && oponentUser && !gameEnded) {
            if (
                curentUser.correctCount > oponentUser.correctCount &&
                curentUser.completedQuestion &&
                oponentUser.completedQuestion
            ) {
                const currentUserId = curentUser.userId;
                const currentUserRef = database().ref(`/users/${currentUserId}`);
                currentUserRef.transaction((user) => {
                    if (user && user.user_game_level !== undefined) {
                        user.user_game_level += 1; // Increment user_game_level for the current user
                    }
                    return user;
                });
                setGameEnded(true)
                setGameResult('Winner');
            } else if (
                oponentUser.correctCount > curentUser.correctCount &&
                curentUser.completedQuestion &&
                oponentUser.completedQuestion
            ) {
                // Update opponent's user_game_level if the opponent wins
                const opponentUserId = oponentUser.userId;
                const opponentUserRef = database().ref(`/users/${opponentUserId}`);
                opponentUserRef.transaction((user) => {
                    if (user && user.user_game_level !== undefined) {
                        user.user_game_level += 1; // Increment user_game_level for the opponent
                    }
                    return user;
                });
                setGameResult('Loser');
            } else {
                setGameResult('Waiting');
            }
        } else {
            setGameResult('Waiting');
        }
    }, [curentUser, oponentUser,gameEnded]);



    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => navigation.navigate("Tabs") },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    async function getOpponentFCMToken(opponentUID) {
        try {
            const snapshot = await database().ref(`users/${opponentUID}/fcmToken`).once('value');
            const opponentFCMToken = snapshot.val();
            return opponentFCMToken;
        } catch (error) {
            console.error('Error fetching opponent\'s FCM token:', error);
            throw error;
        }
    }

    async function notifyOpponent(opponentUID) {
        try {
            const opponentFCMToken = await getOpponentFCMToken(opponentUID);
            const notificationData = {
                title: 'Working!',
                body: 'Good working Fine',
            };
            if (curentUser.completedQuestion == true && oponentUser.completedQuestion && curentUser.noti && oponentUser.noti == true) {
                sendNotificationToOpponent(opponentFCMToken, notificationData);
            } else {
                ToastAndroid.show('Sorry your oponent has leave the game !', ToastAndroid.SHORT)

            }

        } catch (error) {
            console.error('Error notifying opponent:', error);
        }
    }
    async function sendNotificationToOpponent(opponentFCMToken, notificationData) {
        setloading(true)
        try {
            const message = {
                to: opponentFCMToken,
                notification: {
                    title: notificationData?.title,
                },


            };
            const response = await fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'key=AAAASBfoE98:APA91bG5ePFWosLnkaMO-JBXocWxLhf7k12IvjFgt_wVqzxReRys6RQke2bK0pliUmvB-VYgfyMT1u0pxKAB6xahNI64XbaAIAKHhpUrfaBiQv1gEvyNWsXtQwVcu7hVS9N3RkZ0lx4X'
                },
                body: JSON.stringify(message),
            });
            if (response.ok) {
                setloading(false)
                ToastAndroid.show('Notification sent successfully !', ToastAndroid.SHORT)
                // navigation.navigate("Tabs")
            } else {
                console.error('Failed to send notification:', response);
            }
        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    }


    return (
        <ImageBackground source={images.congrates} style={styles.winerBg}>
            {loading && <Loader />}
            <View style={{ height: height }}>
                <View style={{ height: hp(30) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <View style={{
                            height: 240, width: 150,
                        }}>
                            <View style={{ height: 80, alignItems: 'center', width: 150 }}>
                                <Image source={images.crown} style={{ height: 80, width: 80, resizeMode: 'contain' }} />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.playerStyle}>
                                    <Image source={{ uri: curentUser?.picture }} style={[selectcoinToplay.playerStyle, { height: 110, width: 110 }]} />
                                </View>

                                <Text style={[selectcoinToplay.userNameTxt, { color: '#fff', marginTop: 10, }]}>
                                    {gameResult}</Text>
                                <Text style={[selectcoinToplay.userNameTxt, {
                                    color: '#fff', marginTop: 0,
                                    fontFamily: colorsFonts.SEMIBOLD, fontSize: 14
                                }]}>{curentUser?.username}</Text>
                            </View>

                        </View>
                        <Text style={selectcoinToplay.vsTxt}>VS</Text>
                        <View style={{ height: 240, width: 150, }}>
                            <View style={{ height: 80, width: 150 }}>

                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={{ uri: oponentUser?.picture }} style={[selectcoinToplay.playerStyle, { height: 110, width: 110 }]} />
                                <Text style={[selectcoinToplay.userNameTxt, {
                                    color: '#fff', fontFamily: colorsFonts.SEMIBOLD,
                                    marginTop: 4,
                                    fontSize: 14
                                }]}>{oponentUser?.username}</Text>
                            </View>


                        </View>
                    </View>
                </View>
                <View style={{ height: hp(50), paddingTop: hp(7) }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.congTxt, { textAlign: 'center' }]}>{gameResult}</Text>
                        <Text style={[styles.congTxt, {
                            fontSize: 14,
                            textAlign: 'center',
                            fontFamily: colorsFonts.REGULAR,
                            marginTop: '10%',
                            paddingHorizontal: 12,
                        }]}>Lorem ipsum dolor sit elit adipiscing consectetur adipiscing elit.</Text>
                        {curentUser?.completedQuestion == true && oponentUser?.completedQuestion == true ?
                            <View>
                                <View style={styles.correcIncView}>
                                    <View style={styles.inc}>
                                        <Icon name={"check"} size={12} color={"#fff"} />
                                        <Text style={styles.txt}> {curentUser?.correctCount} Correct</Text>
                                    </View>
                                    <View style={[styles.inc, { backgroundColor: colorsFonts.incorrectAnscolor }]}>
                                        <Entypo name={"cross"} size={12} color={"#fff"} />
                                        <Text style={styles.txt}> {oponentUser?.correctCount} Incorrect</Text>
                                    </View>
                                </View>
                                <View style={styles.amount}>
                                    <Image source={images.coin} style={[styles.coinstyle, { top: 4 }]} />
                                    <Text style={[styles.txt, { marginLeft: 6, fontSize: 50, fontFamily: colorsFonts.BOLD }]}>25,000</Text>
                                </View>
                            </View> : null}

                    </View>
                </View>
                <View style={{ height: hp(20), justifyContent: 'center' }}>
                    {curentUser?.completedQuestion == true && oponentUser?.completedQuestion == true ?
                        <View style={styles.end2container}>
                            <Button title={"Rematch The Game"}
                                linear={false}
                                btnstyle={{
                                    width: "80%",
                                    alignSelf: 'center',
                                    borderColor: colorsFonts.goldencolor,
                                    borderWidth: 1,
                                    backgroundColor: null
                                }}
                                onPress={() => notifyOpponent(opponentUserId)}
                            />
                        </View> : null

                    }
                </View>

            </View>
            {/* <View style={styles.container}>
                <View style={styles.subcontainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <View style={{
                            height: 240, width: 150,
                        }}>
                            <View style={{ height: 80, alignItems: 'center', width: 150 }}>
                                <Image source={images.crown} style={{ height: 80, width: 80, resizeMode: 'contain' }} />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.playerStyle}>
                                    <Image source={{ uri: curentUser?.picture }} style={[selectcoinToplay.playerStyle, { height: 110, width: 110 }]} />
                                </View>

                                <Text style={[selectcoinToplay.userNameTxt, { color: '#fff', marginTop: 10, }]}>
                                    {gameResult}</Text>
                                <Text style={[selectcoinToplay.userNameTxt, {
                                    color: '#fff', marginTop: 0,
                                    fontFamily: colorsFonts.SEMIBOLD, fontSize: 14
                                }]}>{curentUser?.username}</Text>
                            </View>

                        </View>
                        <Text style={selectcoinToplay.vsTxt}>VS</Text>
                        <View style={{ height: 240, width: 150, }}>
                            <View style={{ height: 80, width: 150 }}>

                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <Image source={{ uri: oponentUser?.picture }} style={[selectcoinToplay.playerStyle, { height: 110, width: 110 }]} />
                                <Text style={[selectcoinToplay.userNameTxt, {
                                    color: '#fff', fontFamily: colorsFonts.SEMIBOLD,
                                    marginTop: 4,
                                    fontSize: 14
                                }]}>{oponentUser?.username}</Text>
                            </View>


                        </View>
                    </View>


                </View>
                <View style={{ height: height }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.congTxt, { textAlign: 'center' }]}>{curentUser?.completedQuestion == true && oponentUser?.completedQuestion == true ? "Congratulation" : "Your Oponet is still playing..."}</Text>
                        <Text style={[styles.congTxt, {
                            fontSize: 14,
                            textAlign: 'center',
                            fontFamily: colorsFonts.REGULAR,
                            marginTop: '10%',
                            paddingHorizontal: 12,
                        }]}>Lorem ipsum dolor sit elit adipiscing consectetur adipiscing elit.</Text>
                        {curentUser?.completedQuestion == true && oponentUser?.completedQuestion == true ?
                            <View>
                                <View style={styles.correcIncView}>
                                    <View style={styles.inc}>
                                        <Icon name={"check"} size={12} color={"#fff"} />
                                        <Text style={styles.txt}> {curentUser?.correctCount} Correct</Text>
                                    </View>
                                    <View style={[styles.inc, { backgroundColor: colorsFonts.incorrectAnscolor }]}>
                                        <Entypo name={"cross"} size={12} color={"#fff"} />
                                        <Text style={styles.txt}> {oponentUser?.correctCount} Incorrect</Text>
                                    </View>
                                </View>
                                <View style={styles.amount}>
                                    <Image source={images.coin} style={[styles.coinstyle, { top: 4 }]} />
                                    <Text style={[styles.txt, { marginLeft: 6, fontSize: 50, fontFamily: colorsFonts.BOLD }]}>25,000</Text>
                                </View>
                            </View> : null}

                    </View>
                    {curentUser?.completedQuestion == true && oponentUser?.completedQuestion == true ?
                        <View style={styles.end2container}>
                            <Button title={"Rematch The Game"}
                                linear={true}
                                onPress={() => navigation.navigate("WinnerScreen")}
                            />
                        </View> : null

                    }
                </View>
             
            </View> */}

        </ImageBackground>



    )
}

export default CurectInCorect

const styles = StyleSheet.create({
    container: { flex: 1 },
    subcontainer: {
        height: hp(40),
        backgroundColor: 'red',
        paddingTop: 20
    },
    // end1container: { height:, backgroundColor: 'green' },
    end2container: {

        paddingHorizontal: 12,

    },
    congTxt: {
        fontSize: 30,
        fontFamily: colorsFonts.SEMIBOLD,
        color: '#fff'
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
    playerStyle: {
        height: 100, width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff", borderRadius: 50, elevation: 5
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
        marginTop: '5%',
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