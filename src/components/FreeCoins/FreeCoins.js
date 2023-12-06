import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { images } from '../../constants/images'
import { colorsFonts } from '../../constants/colorsfont'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const FreeCoins = ({ index,onPress }) => {
    const width = Dimensions.get("screen").width
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={[styles.box, { width: wp(45) }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={index == 1 ? images.gold : images.surprise} style={styles.icon1} />
                    <View>
                        <Text style={styles.Txt}>Free</Text>
                        <Text style={styles.Txt}>{index == 1 ? "Coins 100" : "Treasure Box"}</Text>
                    </View>
                </View>
                <Image source={images.play} style={styles.icon} />

            </View>
        </TouchableOpacity>
    )
}

export default FreeCoins

const styles = StyleSheet.create({
    container: {
        flex: 1, // This makes the container take the full available height
        flexDirection: 'row', // Arrange the boxes side by side
        justifyContent: 'space-between', // Add space between the boxes
    },
    box: {
        flex: 1, // Each box takes an equal amount of available space
        height: 60, // Set the fixed height of each box to 50 units
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: colorsFonts.Primarycolor,

        paddingHorizontal: 4,
        borderRadius: 10,
        flexDirection: 'row',
        width: 161,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 3
        // Customize the box color
    },
    icon1: {
        height: 40,
        width: 40,
        resizeMode: 'contain'
    },
    icon: {
        height: 25,
        width: 25,
        marginRight: 4,
        resizeMode: 'contain'
    },
    Txt: {
        fontFamily: colorsFonts.SEMIBOLD,
        color: colorsFonts.black,
        fontSize: 12
    }
})