import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { images } from '../../../../constants/images'
import { colorsFonts } from '../../../../constants/colorsfont'
import SoundPlayer from 'react-native-sound-player'
import { heightPercentageToDP } from 'react-native-responsive-screen'
const Ontap = ({ navigation }) => {
    const [state, setstate] = useState("1")
    const [defimage, setdefimage] = useState(false);
    const fadeAnim = useRef(new Animated.Value(1)).current;// Initialize the opacity value

    const handleButtonPress = (val) => {
        if (val == "x") {
            navigation.goBack()
        } else {
            setdefimage(true)
            Animated.timing(fadeAnim, {
                toValue: 0, // Set to 0 for full transparency (fully faded)
                duration: 1000, // Animation duration in milliseconds
                useNativeDriver: true, // Use the native driver for performance
            }).start((res) => {
                setdefimage(false)
                fadeAnim.setValue(1)
                console.log("--===========", res)
                setstate(val)
                // playSound();
            });
        }

    };


    const rotate = fadeAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });


    const playSound = () => {
        try {
            // play the file tone.mp3
            // SoundPlayer.playSoundFile('tone', 'mp3')
            // or play from url
            SoundPlayer.playUrl('https://www.videvo.net/sound-effect/alarm-two-tone-siren/395682/#rs=audio-title')
        } catch (e) {
            console.log(`cannot play the sound file`, e)
        }
    }

    console.log("defimagedefimage", defimage)

    return (
        <>
            {state == "1" ?
                <ImageBackground source={images.tap} style={styles.img}>
                    <TouchableOpacity onPress={() => handleButtonPress("2")} style={styles.container}>
                        <Animated.View style={[styles.subcontainer, {
                            // backgroundColor:'red',
                            transform: [{ rotate }],
                        }]}>
                            <Text style={[styles.txt, { marginTop: heightPercentageToDP(12) }]}>Tap To Open</Text>
                        </Animated.View>
                        <View style={styles.endView}>
                            {defimage ? <Image source={images.TreasureGif} style={styles.imgchest} /> :
                                <Animated.Image source={images.TreasureSimple} style={[styles.imgchest, {

                                    opacity: fadeAnim,
                                }]} />
                            }

                            {/*  */}
                        </View>
                    </TouchableOpacity>
                </ImageBackground> : state == "2" ?
                    <ImageBackground source={images.tap} style={styles.img}>
                        <TouchableOpacity onPress={() => handleButtonPress("3")} style={styles.container}>
                            <Animated.View style={[styles.subcontainer, {
                                ...styles.newsub,
                                top: 30,

                                transform: [{ rotate }] 
                            }
                            ]}
                            >
                                <Image source={images.gCard} style={styles.card} />
                                <View style={{ top: -10, alignItems: 'center', }}>
                                    <Image source={images.goldcoin} style={styles.goldoinstyle} />
                                    <Text style={[styles.txt, {
                                        bottom: "18%",
                                        fontSize: 40,
                                        fontFamily: colorsFonts.BOLD,
                                        color: colorsFonts.goldencolor
                                    }]}>10,000</Text>

                                </View>
                                <Text style={[styles.txt, { top: 0, fontSize: 20, }]}>Tap For More</Text>

                            </Animated.View>
                            <View style={[styles.endView, { flex: 2.5 }]}>
                                {defimage ? <Image source={images.TreasureGif} style={styles.imgchest} /> :
                                    <Animated.Image source={images.TreasureSimple} style={[styles.imgchest, { opacity: fadeAnim, }]} />
                                }
                                {/* <Animated.Image source={images.box} style={[styles.imgchest2, { opacity: fadeAnim }]} /> */}
                            </View>
                        </TouchableOpacity>
                    </ImageBackground> :
                    state == "3" ?
                        <ImageBackground source={images.tap} style={styles.img}>
                            <TouchableOpacity onPress={() => handleButtonPress("4")} style={styles.container}>
                                <Animated.View style={[styles.subcontainer,{
                                     transform: [{ rotate }] 
                                }]}>
                                    <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                        <Image source={images.group2} style={{ height: 150, width: 150, resizeMode: 'contain' }} />
                                        <Image source={images.gCard2} style={styles.card} />

                                    </View>
                                    <Text style={[styles.txt, { color: colorsFonts.goldencolor, fontSize: 32 }]}>X3</Text>
                                    <Text style={styles.txt}>Poll Of Audience</Text>
                                </Animated.View>
                                <View style={[styles.endView, { paddingTop: '10%' }]}>
                                    <Text style={[styles.txt, { fontSize: 20, }]}>Tap For More</Text>
                                    {/* <Animated.Image source={images.box} style={[styles.imgchest2, { opacity: fadeAnim }]} /> */}
                                    {defimage ? <Image source={images.TreasureGif} style={styles.imgchest} /> :
                                        <Animated.Image source={images.TreasureSimple} style={[styles.imgchest, { opacity: fadeAnim, }]} />
                                    }
                                </View>
                            </TouchableOpacity>
                        </ImageBackground>
                        : state == "4" ?
                            <ImageBackground source={images.tap} style={styles.img}>
                                <TouchableOpacity onPress={() => handleButtonPress("x")} style={styles.container}>
                                    <Animated.View style={[styles.subcontainer, { transform: [{ rotate }] }]}>
                                        <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                            <Image source={images.group1} style={{ height: 150, width: 150, resizeMode: 'contain' }} />
                                            <Image source={images.gCard1} style={styles.card} />
                                        </View>
                                        <Text style={[styles.txt, { color: colorsFonts.goldencolor, fontSize: 32 }]}>X1</Text>
                                        <Text style={styles.txt}>Box Of Treasure</Text>
                                    </Animated.View>
                                    <View style={[styles.endView, { paddingTop: '10%' }]}>
                                        <Text style={[styles.txt, { fontSize: 20 }]}>Tap For More</Text>
                                        {defimage ? <Image source={images.TreasureGif} style={styles.imgchest} /> :
                                            <Animated.Image source={images.TreasureSimple} style={[styles.imgchest, { opacity: fadeAnim, }]} />
                                        }
                                    </View>
                                </TouchableOpacity>
                            </ImageBackground>
                            : null}
        </>

    )
}

export default Ontap

const styles = StyleSheet.create({
    container: { flex: 1, },
    subcontainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txt: {
        fontSize: 30,
        color: '#fff',
        fontFamily: colorsFonts.BOLD
    },
    endView: {
        flex: 3,
        alignItems: 'center'
    },
    imgchest: {
        height: 400,
        width: 400,
        resizeMode: 'contain'
    },
    imgchest2: {
        height: 300,
        width: 300,
        marginTop: 20,
        resizeMode: 'contain'
    },
    newsub: {
        flex: 2.5,
        paddingTop: "10%",
        // backgroundColor:'red',
        justifyContent: 'flex-end'
    },
    card: {
        height: 100,
        width: 100,
        resizeMode: 'contain'
    },
    goldoinstyle: {
        height: 200,
        width: 200,
        resizeMode: 'contain'
    },
    img: {
        flex: 1
    }
})