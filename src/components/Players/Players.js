import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colorsFonts } from '../../constants/colorsfont'
import { images } from '../../constants/images'

const Players = ({ pair,curentuser }) => {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <View style={styles.user}>
                    <Image source={{uri:curentuser?.picture}} style={styles.players} />
                </View>
                <View style={{ paddingLeft: 4 }}>
                    <Text style={styles.userTxt}>{curentuser?.username}</Text>
                    <Text style={styles.pointsTxt}>175 points</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
                <View style={{ paddingRight: 4 }}>
                    <Text style={[styles.userTxt, { textAlign: 'right' }]}>{pair?.username}</Text>
                    <Text style={styles.pointsTxt}>225 points</Text>
                </View>
                <View>
                    <View style={styles.user}>
                        <Image source={{uri:pair?.picture}} style={styles.players} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Players

const styles = StyleSheet.create({
    user: {
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        borderRadius: 20
    },
    userTxt: {
        fontSize: 14,
        color: "#000",
        fontFamily: colorsFonts.BOLD
    },
    pointsTxt: {
        fontSize: 12,
        fontFamily: colorsFonts.SEMIBOLD,
        color: colorsFonts.Primarycolor
    },
    players: {
        height: 40,
        width: 40,
        resizeMode: 'contain',
        borderRadius: 20
    }
})