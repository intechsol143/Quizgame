import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colorsFonts } from '../../constants/colorsfont'
import { images } from '../../constants/images'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'

const Refresh = ({ onItemPress, expert, idx, lifelines }) => {
    return (
        <View style={{
            flexDirection: "row", alignItems: 'center',
            height: 60,
            borderRadius: 10,
            width: widthPercentageToDP(90),
            borderColor: colorsFonts.Primarycolor,
            borderWidth: .5
        }}>
            {["1", "2", "3", "4"].map((item, index) => {

                return (
                    <TouchableOpacity
                            disabled={item == 3 &&
                            lifelines?.audience == 0 ? true
                            : item == 4 && lifelines?.expert == 0 ? true
                                : false} onPress={() => {
                                    if (item == "1") {
                                        onItemPress({ exp: "fifty_fifty", idx })
                                    } else if (item == "2") {
                                        onItemPress({ exp: "refresh", idx })
                                    } else if (item == "3") {
                                        onItemPress({ exp: "audience", idx })
                                    } else if (item == "4") {
                                        onItemPress({ exp: "expert", idx })
                                    }
                                }} style={{
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    // backgroundColor:'red',
                                    width: widthPercentageToDP(22)
                                }}>
                        <View style={styles.circleView}>
                            {index == 0 ?
                                <Text style={{ fontFamily: colorsFonts.SEMIBOLD, color: colorsFonts.Primarycolor, fontSize: 10 }}>50/50</Text>
                                : index == 1 ? <Image source={images.refresh} style={styles.icon} />
                                    : index == 2 ? <Image source={images.group} style={styles.icon} />
                                        : index == 3 ? <Image source={images.ppl} style={styles.icon} /> : null}
                        </View>
                        <View style={styles.rankView}>

                            <Text style={{ fontSize: 10, fontFamily: colorsFonts.SEMIBOLD, color: "#fff" }}>{index == 0 ? lifelines?.fifty_fifty : index == 1 ? lifelines?.refresh : index == 2 ? lifelines?.audience : index == 3 ? lifelines?.expert : null}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })}



        </View>
    )
}

export default Refresh

const styles = StyleSheet.create({
    icon: {
        height: 15,
        width: 15,
        resizeMode: 'contain'

    },
    rankView: {
        position: 'absolute',
        borderWidth: 1,
        borderColor: '#fff',
        alignSelf: 'flex-end',
        top: 0,
        right: heightPercentageToDP(1.5),
        backgroundColor: colorsFonts.Primarycolor,
        height: 18,
        width: 18,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    circleView: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 35, backgroundColor: colorsFonts.refreshcolor
    }
})