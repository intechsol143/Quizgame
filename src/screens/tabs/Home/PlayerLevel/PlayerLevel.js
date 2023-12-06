import { Image, StyleSheet, Text, TouchableOpacity, ImageBackground, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackButton from '../../../../components/BackButton/BackButton'
import Button from '../../../../components/Button/Button'
import { images } from '../../../../constants/images'
import { playerscreen, selectcoinToplay } from '../../tabsscreenStyles'
import { colorsFonts } from '../../../../constants/colorsfont'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'

const PlayerLevel = ({ navigation }) => {
    const [isPressedid, setIsPressedid] = useState(-1);
    const [selectedItem, seselectedItem] = useState("")
    const [selectedItemErr, setselectedItemErr] = useState("")
    const pairsRef = database().ref('Pairs');
    const moveForward = () => {
        if (!selectedItem) {
            setselectedItemErr("asd")
        } else {
            handleUpdateData(selectedItem)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // Do something when the screen blurs
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
                navigation.navigate("SelectCoin")
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
                        {["Begginer", "intermediate", "Expert"].map((item, index) => {
                            return (
                                <Button
                                    title={item}
                                    onPress={() => {
                                        setIsPressedid(index)
                                        seselectedItem(item)
                                        setselectedItemErr("")

                                    }}
                                    linear={false}
                                    btnstyle={{
                                        borderWidth: .5,
                                        borderColor: colorsFonts.Primarycolor,
                                        backgroundColor: isPressedid == index ? colorsFonts.Primarycolor : null
                                    }}
                                    buttonTxt={{ color: isPressedid == index ? "#fff" : colorsFonts.black }}
                                />
                            )
                        })}
                        {selectedItemErr ? <Text style={{ color: 'red', textAlign: 'center', fontFamily: colorsFonts.REGULAR }}>Select Your Level</Text> : null}

                    </View>
                    <View style={playerscreen.subContainer}>
                        <View>
                            <Button title={"Continue"}
                                linear={true}
                                onPress={() => moveForward()
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