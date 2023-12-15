import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import BackButton from '../../../../components/BackButton/BackButton'
import Button from '../../../../components/Button/Button'
import { images } from '../../../../constants/images'
import { playerscreen, selectcoinToplay } from '../../tabsscreenStyles'
import { colorsFonts } from '../../../../constants/colorsfont'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth'
import Lock from "react-native-vector-icons/AntDesign"

const SelectCoin = ({ navigation, route }) => {
    const { classic, sItem } = route.params;
    const [isPressedid, setIsPressedid] = useState(-1);
    const [selectedItem, seselectedItem] = useState("")
    const [selectedItemErr, setselectedItemErr] = useState("")
    const [currentUser, setCurrentUser] = useState(null)
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

    return (
        <ImageBackground source={images.waitngbg} style={selectcoinToplay.container}>
            <BackButton title={"Select coin to play"} onPress={() => navigation.goBack()} />
            <View style={selectcoinToplay.subContainer}>
                <View style={selectcoinToplay.subContainer2}>
                    {classic != "Classic" ? <View style={selectcoinToplay.buttonsContainer}>
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

                    </View> :

                        classic == "Classic" && sItem == "Beginner" ?
                            <View style={selectcoinToplay.buttonsContainer} >
                                {["10", "20", "50", "100", "200"].map((item, index) => {
                                    const shouldDisableButton = currentUser?.amount < parseInt(item);
                                    return (
                                        <Button
                                            disabled={shouldDisableButton}
                                            // Icon={shouldDisableButton ? <Lock name="lock" color="black" size={20} /> : null}

                                            title={item}
                                            onPress={() => {
                                                setIsPressedid(index)
                                                seselectedItem(item)
                                                setselectedItemErr("")
                                            }}
                                            linear={false}
                                            btnstyle={{
                                                borderWidth: .5,
                                                borderColor:shouldDisableButton ? "#CCCCCC" : colorsFonts.Primarycolor,
                                                backgroundColor: shouldDisableButton ? '#CCCCCC' : isPressedid === index ? colorsFonts.Primarycolor : "#fff",

                                                // elevation:2,
                                                // backgroundColor: isPressedid == index ? colorsFonts.Primarycolor : "#fff"
                                            }}
                                            Icon={<Image source={images.coin} style={[selectcoinToplay.coinstyle,{left:4}]} />}
                                            buttonTxt={{ color: isPressedid == index ? "#fff" : colorsFonts.black }}
                                        />
                                    )
                                })}
                                {selectedItemErr ? <Text style={{ color: 'red', textAlign: 'center', fontFamily: colorsFonts.REGULAR }}>Select Coin</Text> : null}

                            </View> :
                            classic == "Classic" && sItem == "Intermediate" ?
                                <View style={selectcoinToplay.buttonsContainer} >
                                    {["100", "200", "500", "1000", "1500"].map((item, index) => {
                                        const shouldDisableButton = currentUser?.amount < parseInt(item);
                                        return (
                                            <Button
                                                disabled={shouldDisableButton}
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

                                </View> :
                                classic == "Classic" && sItem == "Expert" ?
                                    <View style={selectcoinToplay.buttonsContainer} >
                                        {["1000", "1500", "2000", "2500", "3000"].map((item, index) => {
                                            const shouldDisableButton = currentUser?.amount < parseInt(item);

                                            return (
                                                <Button
                                                    disabled={shouldDisableButton}
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

                                    </View> : null
                    }

                </View>
                <View style={selectcoinToplay.logoView}>
                    <Button title={"Start The Game"}
                        linear={true}
                        onPress={() => {
                            if (classic == "Classic") {
                                navigation.navigate("Waiting", { classic, selectedItem })
                            } else {
                                moveForward()
                            }
                        }}
                    />
                </View>

            </View>

        </ImageBackground>
    )
}

export default SelectCoin

const styles = StyleSheet.create({})