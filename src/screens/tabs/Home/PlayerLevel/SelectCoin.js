import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../../../components/BackButton/BackButton'
import Button from '../../../../components/Button/Button'
import { images } from '../../../../constants/images'
import { playerscreen, selectcoinToplay } from '../../tabsscreenStyles'
import { colorsFonts } from '../../../../constants/colorsfont'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
const SelectCoin = ({ navigation }) => {
    const [isPressedid, setIsPressedid] = useState(-1);
    const [selectedItem, seselectedItem] = useState("")
    const [selectedItemErr, setselectedItemErr] = useState("")

    const moveForward = () => {
        if (!selectedItem) {
            setselectedItemErr("asd")
        } else {
            // navigation.navigate("Waiting",{selectedItem})
            handleUpdateData(selectedItem)
        }
    }


    const handleUpdateData = (item) => {
        const userID = auth().currentUser.uid;
        const updatedData = {
            coins: item,
        };

        const userRef = database().ref(`/users/${userID}`);
        userRef.update(updatedData)
            .then(() => {
                navigation.navigate("Waiting", { selectedItem })
            })
            .catch((error) => {
                console.error('Error updating item:', error.message);
            });
    };

    return (
        <ImageBackground source={images.waitngbg} style={selectcoinToplay.container}>
            <BackButton title={"Select coin to play"} onPress={() => navigation.goBack()} />
            <View style={selectcoinToplay.subContainer}>
                <View style={selectcoinToplay.subContainer2}>
                    <View style={selectcoinToplay.buttonsContainer} >
                        {["1000", "10000", "15,000", "20,000", "25,000"].map((item, index) => {
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
                                        // elevation:2,
                                        backgroundColor: isPressedid == index ? colorsFonts.Primarycolor : "#fff"
                                    }}
                                    Icon={<Image source={images.coin} style={selectcoinToplay.coinstyle} />}
                                    buttonTxt={{ color: isPressedid == index ? "#fff" : colorsFonts.black }}
                                />
                            )
                        })}
                        {selectedItemErr ? <Text style={{ color: 'red', textAlign: 'center', fontFamily: colorsFonts.REGULAR }}>Select Coin</Text> : null}

                    </View>

                </View>
                <View style={selectcoinToplay.logoView}>
                    <Button title={"Start The Game"}
                        linear={true}
                        onPress={() => moveForward()}
                    />
                </View>

            </View>

        </ImageBackground>
    )
}

export default SelectCoin

const styles = StyleSheet.create({})