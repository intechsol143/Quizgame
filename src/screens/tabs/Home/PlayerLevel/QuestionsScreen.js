import { Alert, Image, StyleSheet, Text, View, Modal, TouchableOpacity, Animated, Easing, ScrollView, ToastAndroid } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import BackButton from '../../../../components/BackButton/BackButton'
import Button from '../../../../components/Button/Button'
import { images } from '../../../../constants/images'
import { selectcoinToplay } from '../../tabsscreenStyles'
import { colorsFonts } from '../../../../constants/colorsfont'
import Players from '../../../../components/Players/Players'
import Question from '../../../../components/Question/Question'
import Quesioncounter from '../../../../components/Questioncounter/Quesioncounter'
import CurectInCorect from '../../../../components/CorrectIncorrectButton/CurectInCorect'
import Refresh from '../../../../components/RefreshControl/Refresh'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import messaging from '@react-native-firebase/messaging'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const QuestionsScreen = ({ navigation, route }) => {
    const { pair } = route.params;
    // console.log("check Userss",user1,user2)
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [refreshModal, setrefreshModal] = useState(false);
    const [presedItem, setpressedItem] = useState("")
    const [timer, setTimer] = useState(30);
    const [otherUsers, setOtherUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [state, setstate] = useState(false)
    const [winnerUID, setWinnerUID] = useState(null);
    const [playerUID, setPlayerUID] = useState(null);
    const [questionsList, setQuestions] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questionNo, setquestionNo] = useState("")
    const [saveIdx, setsaveIdx] = useState(0)
    const [expertResult, setexpertResult] = useState()
    const currentUserId = auth().currentUser.uid;
    const fetchQuestions = async () => {
        try {
            const questionsSnapshot = await database().ref('questions').once('value');
            const questionsData = questionsSnapshot.val();
            const questionsArray = Object.keys(questionsData).map((key) => {
                return {
                    id: key,
                    ...questionsData[key],
                };
            });

            setQuestions(questionsArray);
        } catch (error) {
            console.error('Error fetching questions:', error.message);
        }
    };

    useEffect(() => {
        fetchQuestions();
        AddNewKey();
    }, []);

    const handleReloadQuestions = () => {
        // Call the fetchQuestions function to reload questions
        fetchQuestions();
        setCurrentQuestion(0)
        setquestionNo("")
        handleUpdateData();
    };

    const handleUpdateData = () => {
        const userID = auth().currentUser.uid;
        const updatedData = {
            correctCount: 0,
            newKey: 'newValue',

        };
        const userRef = database().ref(`/users/${userID}`);
        userRef.update(updatedData)
            .then(() => {
                Alert.alert("Goood")
                // console.log("data update successfuly!!")
            })
            .catch((error) => {
                console.error('Error updating item:', error.message);
            });
    };
    const AddNewKey = () => {
        const userID = auth().currentUser.uid;
        const updatedData = {
            expert: 3,
            refresh: 3,
            fifty_fifty: 3,
            audience: 3

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

    const decreaseRefresh = (item) => {
        const userID = auth().currentUser.uid;
        const userRef = database().ref(`/users/${userID}/${item}`);
        userRef.once('value', (snapshot) => {
            const currentRefreshValue = snapshot.val();

            if (currentRefreshValue > 0) {
                const updatedRefreshValue = currentRefreshValue - 1;
                userRef.set(updatedRefreshValue)
                    .then(() => {
                        console.log('Refresh decreased successfully!');
                    })
                    .catch((error) => {
                        console.error('Error decreasing refresh:', error.message);
                    });
            } else {
                console.log('Refresh value is already zero!');
            }
        });
    };

    // Function to fetch opponent's FCM token by UID
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
    async function notifyOpponentOnPlayerLeave(playerUID, opponentUID) {
        try {
            const opponentFCMToken = await getOpponentFCMToken(opponentUID);
            const notificationData = {
                title: 'Congratulation!',
                body: 'Your opponent has left and you won.',
                oponentId: opponentUID,
                playerUid: playerUID
            };
            sendNotificationToOpponent(opponentFCMToken, notificationData);
        } catch (error) {
            console.error('Error notifying opponent:', error);
        }
    }
    function handlePlayerLeaveGame(playerUID, opponentUID) {
        notifyOpponentOnPlayerLeave(playerUID, opponentUID);
    }

    const currentPlayerUID = currentUserId;
    const opponentUID = pair?.userId;
    async function sendNotificationToOpponent(opponentFCMToken, notificationData) {
        try {
            const message = {
                to: opponentFCMToken,
                notification: {
                    title: notificationData.title,
                    body: notificationData.body,
                },
                data: {
                    winnerUID: notificationData.oponentId,
                    playerUid: notificationData.playerUid

                }

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
                ToastAndroid.show('Notification sent successfully !', ToastAndroid.SHORT)
                setModalVisible(false)
                navigation.navigate("Tabs")
            } else {
                console.error('Failed to send notification:', response);
            }
        } catch (error) {
            console.error('Error sending notification:', error);
            throw error;
        }
    }

    useEffect(() => {
        const usersRef = database().ref(`/users/${currentUserId}`);
        const onDataChange = (snapshot) => {
            const userData = snapshot.val();
            setCurrentUser(userData);
        };
        usersRef.on('value', onDataChange);
        return () => {
            usersRef.off('value', onDataChange);
        };
    }, [currentUserId]);

    useEffect(() => {
        const usersRef = database().ref('/users');
        const otherUsersRef = usersRef.child(currentUserId);

        const handleDataChange = (snapshot) => {
            const { userId, status } = snapshot.val();

            setOtherUsers((prevOtherUsers) => {
                if (status === 'online' && userId !== currentUserId) {
                    if (!prevOtherUsers.some((user) => user.userId === userId)) {
                        return [...prevOtherUsers, { userId, ...snapshot.val() }];
                    } else {
                        return prevOtherUsers;
                    }
                } else {
                    return prevOtherUsers.filter((user) => user.userId !== userId);
                }
            });

            if (status === 'online' && userId !== currentUserId) {
                usersRef
                    .child(userId)
                    .child('in_game')
                    .set(true)
                    .then(() => {
                        console.log(`User ${userId} in_game status updated to true`);
                    })
                    .catch((error) => {
                        console.error('Error updating in_game status:', error.message);
                    });
            } else {
                // setDesiredUserId(null);
            }
        };

        usersRef
            .once('value')
            .then((snapshot) => {
                const allUsersData = snapshot.val();

                if (allUsersData) {
                    const filteredUsers = Object.entries(allUsersData)
                        .filter(([userId, userData]) => userId !== currentUserId)
                        .map(([userId, userData]) => ({ userId, status: userData.status, ...userData }));

                    // Update the status to "online" for the current user
                    usersRef
                        .child(currentUserId)
                        .child('status')
                        .set('online')
                        .then(() => {
                            console.log('Current user status updated to online successfully');
                        })
                        .catch((error) => {
                            console.error('Error updating status for the current user:', error.message);
                        });

                    // Set up listeners for real-time updates for other users
                    filteredUsers?.forEach(({ userId }) => {
                        const otherUserRef = usersRef.child(userId);
                        otherUserRef.on('value', handleDataChange);
                    });
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error.message);
            });

        // Clean up listeners when the component unmounts
        return () => {
            // Set the status to "offline" for the current user
            usersRef
                .child(currentUserId)
                .child('status')
                .set('offline')
                .then(() => {
                    console.log('Current user status updated to offline successfully');
                })
                .catch((error) => {
                    console.error('Error updating status for the current user:', error.message);
                });

            // Clean up listeners for other users
            // filteredUsers.forEach(({ userId }) => {
            //     const otherUserRef = usersRef.child(userId);
            //     otherUserRef.off('value', handleDataChange);
            // });
        };
        // ... (rest of your existing code)

    }, []);


    useEffect(() => {
        updateFCMTokenForCurrentUser();
    }, [])

    const updateFCMTokenForCurrentUser = async () => {
        try {
            const fcmToken = await messaging().getToken(); // Retrieve FCM token
            if (fcmToken) {
                const currentUser = auth().currentUser;
                if (currentUser) {
                    const currentUserId = currentUser.uid;
                    const usersRef = database().ref(`/users/${currentUserId}`);
                    usersRef.update({ fcmToken }); // Assuming the field in the database is named 'fcmToken'
                } else {
                    console.error('No authenticated user found.');
                }
            } else {
                console.error('Failed to get FCM token.');
            }
        } catch (error) {
            console.error('Error updating FCM token:', error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            if (
                remoteMessage.notification.title === 'Congratulation!' &&
                remoteMessage.notification.body === 'Your opponent has left and you won.'
            ) {
                const receivedWinnerUID = remoteMessage.data?.winnerUID;
                const receivedPlayerUID = remoteMessage.data?.playerUid;

                if (receivedWinnerUID) {
                    setWinnerUID(receivedWinnerUID);
                    setPlayerUID(receivedPlayerUID);
                } else {
                    console.error('Winner UID not found in notification data.');
                }
            }
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        handleWinnerScreenNavigation()
    }, [winnerUID, playerUID])


    const handleWinnerScreenNavigation = () => {
        if (winnerUID && playerUID) {
            navigation.navigate('WinnerScreen', { winnerUID, playerUID });
        } else {
        }
    };



    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {

        }
    }, [timer]);

    const modal = useRef(new Animated.Value(0)).current;
    const modalRotation = useRef(new Animated.Value(0)).current;
    const openModal = () => {
        setModalVisible(true);
        Animated.parallel([
            Animated.timing(modal, {
                toValue: 1,
                duration: 1000, // Animation duration in milliseconds
                easing: Easing.bounce,
                useNativeDriver: false, // Set to true if you want to use the native driver
            }),
            Animated.timing(modalRotation, {
                toValue: 0,
                duration: 1000, // Animation duration in milliseconds
                easing: Easing.bounce,
                useNativeDriver: false,
            }),
        ]).start(() => {

        });


    };
    const closeModal = () => {
        setpressedItem("")
        setrefreshModal(false)
        setModalVisible(false);
        Animated.parallel([
            Animated.timing(modal, {
                toValue: 1,
                duration: 500, // Animation duration in milliseconds
                easing: Easing.bounce,
                useNativeDriver: false, // Set to true if you want to use the native driver
            }),
            Animated.timing(modalRotation, {
                toValue: 0,
                duration: 1000, // Animation duration in milliseconds
                easing: Easing.bounce,
                useNativeDriver: false,
            }),
        ]).start();
    }

    const handleNextQuestion = (selectedOption, userUid) => {
        if (questionsList.length - 1 == saveIdx) {
            setQuizCompleted(true)
            updateProgress(userUid);
            checkCompletion(winnerUID,userUid);
            updateNotificationProgress(userUid)
        } else {
            const currentQuestionIndex = currentQuestion;
            setsaveIdx(currentQuestionIndex + 1)

            setSelectedAnswer(selectedOption);
            if (selectedOption == questionsList[currentQuestionIndex].answer) {
                setTimeout(() => {
                    setCurrentQuestion(currentQuestionIndex + 1);
                    setquestionNo(currentQuestionIndex + 1)
                    setSelectedAnswer("");
                    const userRef = database().ref(`users/${userUid}`);
                    userRef.transaction((userData) => {
                        if (userData) {
                            if (userData.correctCount) {
                                userData.correctCount += 1;

                            } else {
                                userData.correctCount = 1;
                            }
                        }
                        return userData;
                    });
                }, 1000);

            } else {
                setTimeout(() => {
                    setCurrentQuestion(currentQuestionIndex + 1);
                    setquestionNo(currentQuestionIndex + 1)
                    setSelectedAnswer("");
                }, 1000);
            }
        }

  

    };

    const showModal = () => {
        return (
            <View>
                {presedItem.exp == "audience" ?
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={refreshModal}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                            setrefreshModal(!refreshModal);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modaView}>
                                <View style={styles.polView}>
                                    <TouchableOpacity onPress={() => closeModal()}>
                                        <Image source={images.cross} style={styles.removeIcon} />
                                    </TouchableOpacity>
                                    <Text style={styles.oponentTxt}>Audience Poll</Text>
                                </View>
                                <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Image source={images.audience} style={styles.audienceIcon} />
                                    </View>

                                    <View style={{ paddingHorizontal: 12 }}>
                                        <View style={styles.percentView}>
                                            <View style={styles.blueView}>
                                                <Text style={styles.txt}>1:- 80%</Text>
                                            </View>
                                        </View>
                                        <View style={styles.space} />
                                        <View style={styles.percentView}>
                                            <View style={styles.blueView}>
                                                <Text style={styles.txt}>2:- 45%</Text>
                                            </View>
                                        </View>
                                        <View style={styles.space} />
                                        <View style={styles.percentView}>
                                            <View style={styles.blueView}>
                                                <Text style={styles.txt}>3:- 30%</Text>
                                            </View>
                                        </View>
                                        <View style={styles.space} />
                                        <View style={styles.percentView}>
                                            <View style={styles.blueView}>
                                                <Text style={styles.txt}>4:-25%</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal> : presedItem?.exp == "expert" ?
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={refreshModal}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setrefreshModal(!refreshModal);
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modaView}>
                                    <View style={styles.polView}>
                                        <TouchableOpacity onPress={() => closeModal()}>
                                            <Image source={images.cross} style={styles.removeIcon} />
                                        </TouchableOpacity>
                                        <Text style={styles.oponentTxt}>Expert Opinions</Text>
                                    </View>
                                    <View style={{ paddingTop: 40, paddingBottom: 20 }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <Text style={[styles.oponentTxt, { color: colorsFonts.Primarycolor }]}>Expert</Text>
                                            <Image source={{ uri: expertResult[0]?.expert_img }} style={[styles.audienceIcon, { marginTop: 10 }]} />
                                            <Text style={[styles.oponentTxt, { marginTop: 10, marginBottom: 10 }]}>{expertResult[0]?.expert_name}</Text>
                                            <Button linear={true}
                                                // title={'3:- Harry Kane'}
                                                title={`${expertResult[0]?.answer} :- ${expertResult[0]?.A}`}

                                                btnstyle={{
                                                    width: "90%"
                                                }}
                                            />
                                        </View>

                                    </View>
                                </View>
                            </View>
                        </Modal>
                        : null
                }

            </View>

        )
    }



    if (quizCompleted) {
        return (
            <View>
                <CurectInCorect
                    opponentUserId={opponentUID}
                    curentUser={currentUser}
                    navigation={navigation}
                />

            </View>
        );

    }

    const modalStyle = {
        opacity: modal,
        transform: [
            {
                scale: modal.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                }),
            },
            {
                rotate: modalRotation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: ['0deg', '90deg', '0deg'],
                }),
            },
        ],
    };
    const showAlert = () => {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <Animated.View style={[styles.centeredView, { ...modalStyle }]}>

                        {/* <Animated.View style={[styles.centeredView,{opacity: fadeAnim}
                    
                    // { transform: [{ translateY: customEasing(translateY) * translateY }] },
                    ]}> */}
                        <View style={styles.modalStyle}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.oponentTxt}>Your oponent will win</Text>
                                <Text style={styles.oponentTxt}>if you leave.</Text>
                                <Image source={images.userLeave} style={{
                                    height: 200, width: 200,
                                    resizeMode: 'contain',
                                    marginTop: 20
                                }} />
                                <View style={styles.modalbuttonContainer}>

                                    <Button
                                        title={"Keep Playing"}
                                        onPress={() => setModalVisible(false)}
                                        linear={false}
                                        buttonTxt={{
                                            color: '#000'
                                        }}
                                        btnstyle={styles.buttonstyle}
                                    />
                                    <Button
                                        title={"Leave"}
                                        onPress={() => {
                                            handlePlayerLeaveGame(currentPlayerUID, opponentUID)

                                        }}
                                        linear={true}
                                        btnstyle={{
                                            width: 100
                                        }}
                                    />
                                </View>

                            </View>
                        </View>

                    </Animated.View>
                </Modal>
            </View>
        )
    }

    const handleItemPress = (item) => {
        if (item === "refresh") {
            handleReloadQuestions()
        } else if (item.exp == "expert") {
            _checkExpertOpinion(item.idx)
            decreaseRefresh(item.exp);
        } else if (item.exp == "audience") {
            _checkExpertOpinion(item.idx)
            decreaseRefresh(item.exp);
        }
        setpressedItem(item)
        setrefreshModal(true)
    };

    const _checkExpertOpinion = (id) => {
        const filterItem = questionsList.filter((item) => item.id == id)
        setexpertResult(filterItem)
    }




    //Will try on Monday

    // Assuming you have user1Uid and user2Uid as identifiers for both users

    // Update user's progress in the database when a question is completed
    const updateProgress = (userUid) => {
        const userRef = database().ref(`users/${userUid}`);
        userRef.update({ completedQuestion: true });
    };

    const updateNotificationProgress = (userUid) => {
        const userRef = database().ref(`users/${userUid}`);
        userRef.update({ noti: true });
    };

    // Function to check if both users have completed their questions
    const checkCompletion = (user1Uid,user2Uid) => {
        const user1Ref = database().ref(`users/${user1Uid}/completedQuestion`);
        const user2Ref = database().ref(`users/${user2Uid}/completedQuestion`);

        // Listen for changes in both users' completion status
        user1Ref.once('value', (snapshot1) => {
            user2Ref.once('value', (snapshot2) => {
                const user1Completed = snapshot1.val();
                const user2Completed = snapshot2.val();

                if (user1Completed && user2Completed) {
                    // Both users have completed their questions, proceed further
                    console.log('Both users have completed their questions!');
                    // Proceed with the next steps here...
                }
            });
        });
    };






    return (
        <View style={selectcoinToplay.container}>
            <BackButton title={""}
                onPress={() => openModal()} />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={selectcoinToplay.subContainer}>
                    <View style={selectcoinToplay.subContainer2}>
                        <View style={[selectcoinToplay.buttonsContainer, { paddingTop: '10%' }]} >
                            <Players
                                pair={pair}
                                curentuser={currentUser}
                            />
                            <View style={selectcoinToplay.Spacer} />
                            <Quesioncounter
                                qNo={questionNo}
                                time={timer} />
                            <View style={selectcoinToplay.Spacer} />
                            <Question
                                ques={questionsList[currentQuestion]?.question}

                            />
                            <View style={selectcoinToplay.Spacer} />
                            {questionsList[currentQuestion] && (
                                <View>
                                    {['A', 'B', 'C', 'D'].map((option, i) => (
                                        <Button
                                            key={i}
                                            onPress={() => {

                                                handleNextQuestion(option, currentUserId, i)


                                            }}
                                            linear={false}
                                            btnstyle={{
                                                borderWidth: .5,
                                                borderColor: selectedAnswer === option && option === questionsList[currentQuestion].answer ? colorsFonts.Primarycolor : selectedAnswer === option && option !== questionsList[currentQuestion].answer ? "red" : colorsFonts.Primarycolor,
                                                backgroundColor: (selectedAnswer === option && option === questionsList[currentQuestion].answer) ? colorsFonts.Primarycolor :
                                                    (selectedAnswer === option && option !== questionsList[currentQuestion].answer) ? 'red' :
                                                        'white'

                                            }}
                                            title={`${option}: ${questionsList[currentQuestion][option]}`}
                                            buttonTxt={{ color: selectedAnswer === option && option === questionsList[currentQuestion].answer ? 'white' : selectedAnswer === option && option !== questionsList[currentQuestion].answer ? "white" : colorsFonts.black }}
                                        />
                                    ))}
                                </View>
                            )}
                        </View>

                    </View>
                    {showAlert()}
                    <View style={selectcoinToplay.logoView}>
                        <Refresh
                            lifelines={currentUser}
                            idx={saveIdx}
                            onItemPress={handleItemPress}
                        />

                    </View>

                </View>
            </ScrollView>
            {refreshModal ? showModal() : null}


        </View>
    )
}

export default QuestionsScreen

const styles = StyleSheet.create({
    container: { flex: 1 },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    space: {
        height: 15
    },
    txt: {
        fontSize: 14,
        fontFamily: colorsFonts.SEMIBOLD,
        color: '#000',
        paddingLeft: 12
    },
    percentView: {
        height: 35,
        width: "100%",
        borderRadius: 20,
        borderWidth: .5,
        borderColor: colorsFonts.Primarycolor,
        backgroundColor: "#fff"
    },
    blueView: {
        height: 34,
        borderRadius: 20,
        width: "70%",
        justifyContent: 'center',
        backgroundColor: "#ECE9FF"
    },
    modaView: {
        backgroundColor: '#fff',
        paddingTop: 10,
        borderRadius: 10
    },
    polView: {
        flexDirection: 'row', alignItems: 'center', width: '70%',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingTop: 10,
        // backgroundColor:'green' 
    },
    buttonstyle: {
        width: widthPercentageToDP(40),
        borderWidth: 1,
        borderColor: 'red'
    },
    audienceIcon: {
        height: 150,
        width: 150,
        borderRadius: 80,
        // resizeMode: 'contain'
    },
    removeIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
    oponentTxt: {
        fontSize: 16,
        color: '#000',
        fontFamily: colorsFonts.SEMIBOLD
    },
    modalStyle: {
        paddingVertical: 20,
        // height: 200,
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#fff'
    },
    modalbuttonContainer: {
        flexDirection: 'row',
        marginTop: 20, justifyContent: 'space-around',
        // backgroundColor:'red',
        width: '100%'
    },
    winerBg: {
        height: "100%",
        width: '100%'
    }
})