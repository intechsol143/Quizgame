import { Image, StyleSheet, Text, TouchableOpacity, ImageBackground, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackButton from '../../../../components/BackButton/BackButton'
import Button from '../../../../components/Button/Button'
import { images } from '../../../../constants/images'
import { playerscreen, selectcoinToplay } from '../../tabsscreenStyles'
import { colorsFonts } from '../../../../constants/colorsfont'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import Lock from "react-native-vector-icons/AntDesign"
const PlayerLevel = ({ navigation, route }) => {
    const { classic } = route?.params
    const [isPressedid, setIsPressedid] = useState(-1);
    const [selectedItem, seselectedItem] = useState("")
    const [selectedItemErr, setselectedItemErr] = useState("")
    const [currentUser, setCurrentUser] = useState(null)
    const pairsRef = database().ref('Pairs');
    const moveForward = () => {
        if (!selectedItem) {
            setselectedItemErr("asd")
        } else {
            handleUpdateData(selectedItem)
        }
    }
    //Get user
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
    }, [currentUser]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            removePairCreatedListener();
        });

        return unsubscribe;
    }, [navigation]);

    const removePairCreatedListener = () => {
        pairsRef.child('pairCreated').off('value'); // Detach the listener for 'pairCreated'
    };


    const handleUpdateData = (item) => {
        const userID = auth().currentUser.uid;
        const updatedData = {
            level: item,
        };

        const userRef = database().ref(`/users/${userID}`);
        userRef.update(updatedData)
            .then(() => {
                navigation.navigate("SelectCoin", { classic, sItem: selectedItem })
            })
            .catch((error) => {
                console.error('Error updating item:', error.message);
            });
    };

    return (
        <ImageBackground source={images.waitngbg} style={selectcoinToplay.container}>

            <BackButton title={"Dificulty"} onPress={() => navigation.goBack()} />
            <View style={playerscreen.subContainer}>
                <View style={playerscreen.subContainer2}>
                    <View style={playerscreen.buttonsContainer} >
                        {["Beginner", "Intermediate", "Expert"].map((item, index) => {
                            let isDisabled = false;
                            let backgroundColor = null;
                            let buttonTextColor = colorsFonts.black;
                            if (currentUser) {
                                if (currentUser.amount <= 30 && item !== "Beginner") {
                                    isDisabled = true;
                                    backgroundColor = "#CCCCCC";
                                    buttonTextColor = "#999999";
                                }
                                if (currentUser.amount < 100 && item === "Expert") {
                                    isDisabled = true;
                                    backgroundColor = "#CCCCCC";
                                    buttonTextColor = "#999999";
                                }
                            }
                            return (
                                <Button
                                    Icon={isDisabled ? <Lock name="lock" color="black" size={20} style={{ left: index == 2 ? 34 : index == 0 ? 10 : 10 }} /> : null}
                                    disabled={isDisabled}
                                    title={item}

                                    onPress={() => {
                                        setIsPressedid(index);
                                        seselectedItem(item);
                                        setselectedItemErr("");
                                    }}
                                    linear={false}
                                    btnstyle={{
                                        borderWidth: 0.5,
                                        borderColor: isDisabled ? backgroundColor : colorsFonts.Primarycolor,
                                        backgroundColor: isPressedid === index ? colorsFonts.Primarycolor : backgroundColor, // Use backgroundColor variable
                                    }}
                                    buttonTxt={{ color: isPressedid === index ? "#fff" : buttonTextColor }} // Use buttonTextColor variable

                                />

                            )
                        })}
                        {selectedItemErr ? <Text style={{ color: 'red', textAlign: 'center', fontFamily: colorsFonts.REGULAR }}>Select Your Level</Text> : null}

                    </View>
                    <View style={playerscreen.subContainer}>
                        <View>
                            <Button title={"Continue"}
                                linear={true}
                                onPress={() => {
                                    // if (classic == "Classic") {
                                    //     navigation.navigate("SelectCoin", { classic })
                                    // } else {
                                    moveForward()
                                    // }

                                }
                                }
                            />
                        </View>
                    </View>
                </View>
                <View style={playerscreen.logoView}>
                    <Image source={images.game} style={playerscreen.logo} />
                </View>

            </View>

        </ImageBackground>
    )
}

export default PlayerLevel

const styles = StyleSheet.create({})