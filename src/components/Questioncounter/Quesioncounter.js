import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '../../constants/images'
import { colorsFonts } from '../../constants/colorsfont'

const Quesioncounter = ({ time,qNo }) => {
    return (
        <View>
            <View style={styles.ques}>
                <View style={styles.items}>
                    <Text style={styles.Txt}>Q - {qNo + 1}</Text>
                    <View style={styles.clockView}>
                        <Image source={images.clock} style={styles.clockstyle} />
                        <Text style={styles.Txt}>00:{time == 0 ? "00" : time}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Quesioncounter

const styles = StyleSheet.create({
    ques: {
        height: 60,
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: colorsFonts.Primarycolor,
        paddingHorizontal: 12,
        justifyContent: "center",
        borderRadius: 15
    },
    items: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    clockstyle: {
        height: 20,
        width: 20,
        marginRight: 10
    },
    clockView: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    Txt: {
        fontSize: 16,
        color:"#000",
        fontFamily: colorsFonts.BOLD
    }
})