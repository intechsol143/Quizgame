import { Image, StyleSheet, Text, View, ImageBackground, Dimensions, BackHandler, Alert, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import Entypo from "react-native-vector-icons/Entypo"
import { colorsFonts } from '../../constants/colorsfont'
import { images } from '../../constants/images'
import { selectcoinToplay } from '../../screens/tabs/tabsscreenStyles'
import Button from '../Button/Button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import messaging from '@react-native-firebase/messaging'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import Loader from '../Loader/Loader'
const CurectInCorect = ({ navigation, opponentUserId, curentUser }) => {

    const height = Dimensions.get("screen").height
    const [loading, setloading] = useState(false)
    const [oponentUser, setoponentUser] = useState(null)
    const [gameResult, setGameResult] = useState('');
    const [gameEnded, setGameEnded] = useState(true);
    const [userData, setuserData] = useState(null)
    const [winnerId, setwinnerId] = useState("")


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
        if (curentUser && oponentUser) {
            if (
                curentUser.correctCount > oponentUser.correctCount &&
                curentUser.completedQuestion &&
                oponentUser.completedQuestion
            ) {
                setGameResult('Winner');
                setwinnerId(curentUser?.userId)

            }
            else if (
                oponentUser.correctCount > curentUser.correctCount &&
                curentUser.completedQuestion &&
                oponentUser.completedQuestion
            ) {
                setGameResult('Loser');
            }
            else {
                setGameResult('Waiting');
            }
        } else {
            setGameResult('Waiting');
        }
    }, [curentUser, oponentUser]);


    useEffect(() => {
        if (gameResult == "Winner") {
            handleUpdateLevel(winnerId)
            createPairReference(curentUser?.userId, opponentUserId)
        }

    }, [gameResult])


    const handleUpdateLevel = (winnerId) => {
        const userID = winnerId;
        const userRef = database().ref(`/users/${userID}/user_game_level`);

        userRef.transaction((currentLevel) => {
            currentLevel = currentLevel || 0;
            return currentLevel + 1;
        })
            .then(() => {
                console.log("User game level updated successfully!");
            })
            .catch((error) => {
                console.error('Error updating user game level:', error.message);
            });
    };


    const createPairReference = (user1_Id, user2_Id) => {
        const pairsRef = database().ref('pairs');
        const newPairRef = pairsRef.push(); // Generates a new unique ID for the pair

        newPairRef
            .set({
                player1: user1_Id,
                player2: user2_Id,
                // Other details you want to include
            })
            .then(() => {
                const pairID = newPairRef.key;

                getPairUsers(pairID); // Call getPairUsers with the pair ID

                console.log('Pair reference created successfully!');
                // getPairUsers(user1_Id,user2_Id)
            })
            .catch((error) => {
                console.error('Error creating pair reference:', error.message);
            });
    }


    const getPairUsers = (pairID) => {
        const pairsRef = database().ref(`pairs/${pairID}`);
        pairsRef.once('value')
            .then((snapshot) => {
                const pairData = snapshot.val();
                if (pairData) {
                    const { player1, player2 } = pairData;
                    const usersRef = database().ref('users');
                    usersRef.child(player1).once('value')
                        .then((player1Snapshot) => {
                            const player1Data = player1Snapshot.val();

                            // Fetch data for player2
                            usersRef.child(player2).once('value')
                                .then((player2Snapshot) => {
                                    const player2Data = player2Snapshot.val();
                                    console.log('Player 2 Data:', player2Data);

                                    // Compare user_game_level values
                                    const player1Level = player1Data ? player1Data.user_game_level || 0 : 0;
                                    const player2Level = player2Data ? player2Data.user_game_level || 0 : 0;

                                    if (player1Level > player2Level) {
                                        console.log('Player with higher level:', player1Data);
                                    } else if (player2Level > player1Level) {
                                        console.log('Player with higher level:', player2Data);
                                    } else {
                                        console.log('Both players have the same user_game_level');
                                    }
                                })
                                .catch((error) => {
                                    console.error('Error getting player2 data:', error.message);
                                });
                        })
                        .catch((error) => {
                            console.error('Error getting player1 data:', error.message);
                        });
                } else {
                    console.log('Pair reference not found');
                }
            })
            .catch((error) => {
                console.error('Error getting pair reference:', error.message);
            });
    };





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
            console.log("cehck Notidata", notificationData)
            if (curentUser.completedQuestion == true && oponentUser.completedQuestion && curentUser.noti && oponentUser.noti == true) {
                // setGameEnded(true)
                sendNotificationToOpponent(opponentFCMToken, notificationData,opponentUID);
            } else {
                ToastAndroid.show('Sorry your oponent has leave the game !', ToastAndroid.SHORT)

            }

        } catch (error) {
            console.error('Error notifying opponent:', error);
        }
    }
    async function sendNotificationToOpponent(opponentFCMToken, notificationData,opponentUID) {
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
                _updaterematchinFB(opponentUID)

            } else {
                console.error('Failed to send notification:', response);
            }
        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    }

    useEffect(() => {
        const playAgainRef = database().ref('playAgainSignal');
        const handlePlayAgainSignal = (snapshot) => {
            const signal = snapshot.val()?.signal;
            if (signal == true) {
                const targetUserId = auth().currentUser.uid === curentUser?.userId ? opponentUserId : curentUser?.userId;
                const usersRef = database().ref(`/users/${targetUserId}`);
                usersRef.once('value')
                    .then((snapshot) => {
                        playAgainRef.set({
                            signal: false
                        })
                            .then(() => {
                                console.log("congrate!!!!")
                                setGameResult("")
                                // navigation.navigate('QuestionsScreen', { pair: "Welcom" });

                                // Continue with navigation to Question screen for Device A
                            })
                            .catch((error) => {
                                console.error('Error signaling PlayAgain:', error.message);
                            });
                        const otherUserData = snapshot.val();
                        navigation.replace('QuestionsScreen', { pair: otherUserData });

                    })
                    .catch((error) => {
                        console.error('Error fetching other user data:', error.message);
                    });

            }
        };

        playAgainRef.on('value', handlePlayAgainSignal);

        return () => {
            // Remove the listener when component unmounts
            playAgainRef.off('value', handlePlayAgainSignal);
        };
    }, [navigation]);

    const handleUpdateData = () => {
        const userID = auth().currentUser.uid;
        const updatedData = {
        //   coins: "",
        //   level: "",
        //   expert: 0,
        //   fifty_fifty: 0,
        //   refresh: 0,
        //   audience: 0,
          noti: false,
          rematch:false,
          hideRematch:false,
          isPaired:false,
          correctCount:0
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

    const PlayAgain = () => {
        // Update Firebase Realtime Database to signal PlayAgain
        const playAgainRef = database().ref('playAgainSignal');
        playAgainRef.set({
            signal: true,
            [curentUser?.userId]: true,
            [opponentUserId]: true

        })
            .then(() => {
                console.log("congrate!!!!")
                handleUpdateData();
                // navigation.navigate('QuestionsScreen', { pair: "Welcom" });

                // Continue with navigation to Question screen for Device A
            })
            .catch((error) => {
                console.error('Error signaling PlayAgain:', error.message);
            });
    }



    const _updaterematchinFB = (opponentUID) => {
        const updatedData = {
            rematch: true,
            hideRematch: true
        };

        // Update opponent's data
        const opponentRef = database().ref(`/users/${opponentUID}`);
        opponentRef.update(updatedData)
            .then(() => {
                // Update current user's data
                const currentUserRef = database().ref(`/users/${curentUser.userId}`);
                currentUserRef.update(updatedData)
                    .then(() => {
                        const pairingData = {
                            users: {
                                [curentUser.userId]: true,
                                [opponentUID]: true
                            },
                        };
                        const pairingsRef = database().ref('pairings');
                        const newPairingRef = pairingsRef.push();
                        newPairingRef.set(pairingData)
                            .then(() => {
                                const usersInPairing = pairingData.users;
                                Object.keys(usersInPairing).forEach((userID) => {
                                    const userRef = database().ref(`users/${userID}`);
                                    const updatedUserData = {
                                        isPaired: true,
                                    };
                                    userRef.update(updatedUserData)
                                        .then(() => {
                                            console.log("Great!!!!")
                                        })
                                        .catch((error) => {
                                            console.error(`Error updating user ${userID}:`, error.message);
                                        });
                                });
                            })
                            .catch((error) => {
                                console.error('Error adding new pairing:', error.message);
                            });

                        opponentRef.once('value')
                            .then((opponentSnapshot) => {
                                const opponentData = opponentSnapshot.val();
                                setuserData(opponentData)
                                if (curentUser?.userId === opponentUID) {
                                    setGameEnded(false);
                                }
                                // Use opponentData as needed (display in UI, process, etc.)
                            })
                            .catch((error) => {
                                console.error('Error fetching opponent data:', error.message);
                            });
                    })
                    .catch((error) => {
                        console.error('Error updating current user item:', error.message);
                    });
            })
            .catch((error) => {
                console.error('Error updating opponent item:', error.message);
            });
    };




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
                                {curentUser?.correctCount > oponentUser?.correctCount ? <Image source={images.crown} style={{ height: 80, width: 80, resizeMode: 'contain' }} /> : null}
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
                                {oponentUser?.correctCount > curentUser?.correctCount ? <Image source={images.crown} style={{
                                    height: 80, width: 80,
                                    marginLeft: 35,
                                    resizeMode: 'contain'
                                }} /> : null}

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
                    {curentUser?.rematch == true ? <TouchableOpacity
                        onPress={() => PlayAgain()}
                        style={styles.playbuton}>
                        <Text style={{ fontFamily: colorsFonts.SEMIBOLD, color: '#fff' }}>Play Again</Text>
                    </TouchableOpacity> : null}
                </View>
                <View style={{ height: hp(50), paddingTop: hp(7) }}>
                    <View style={{ alignItems: 'center', marginTop: 40 }}>
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
                                    <Text style={[styles.txt, { marginLeft: 6, fontSize: 30, fontFamily: colorsFonts.BOLD }]}>25,000</Text>
                                </View>
                            </View> : null}

                    </View>
                </View>
                {oponentUser?.hideRematch != true ? <View style={{ height: hp(20), justifyContent: 'center' }}>

                    {
                        curentUser?.completedQuestion == true
                            && oponentUser?.completedQuestion == true ?
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
                </View> : null}


            </View>


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
    },
    playbuton: {
        height: 40,
        marginTop: 20,
        alignItems: 'center',
        width: 120,
        justifyContent: 'center',
        backgroundColor: colorsFonts.playbutton, borderTopRightRadius: 40, borderBottomRightRadius: 40
    },
})