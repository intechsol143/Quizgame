import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { colorsFonts } from '../../constants/colorsfont'
import { images } from '../../constants/images'

const Listview = ({ friendScreen }) => {
    return (
        <View style={styles.listView}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.usercircle}>
                    <Image source={images.player1} style={[styles.coin, { ...styles.img }]} />
                </View>
                <View style={{ paddingLeft: 10 }}>
                    <Text style={styles.nameTxt}>Rollins</Text>
                    <View style={styles.txtView}>
                        <Image source={images.coin} style={[styles.coin, { height: 10, width: 10, bottom: 0 }]} />
                        <Text style={[styles.nameTxt, { ...styles.coincount }]}>400k</Text>
                    </View>
                </View>
            </View>
            {!friendScreen ? <Text style={styles.nameTxt}>04</Text> :
                <View>
                    <View style={styles.freindView}>
                        <View style={styles.emailBox}>
                            <Image source={images.mail} style={styles.mailstyle} />
                            <Text style={styles.senTxt}>Sent</Text>
                        </View>
                    </View>
                </View>
            }

        </View>
    )
}

export default Listview

const styles = StyleSheet.create({
    listView: {
        flexDirection: 'row',
        paddingVertical: 4,
        marginVertical: 20,

        justifyContent: 'space-between',
        borderBottomColor:"lightgrey",
        borderBottomWidth: .5
    },
    senTxt: {
        fontSize: 14,
        marginLeft: 4,
        color: colorsFonts.Primarycolor,
        fontFamily: colorsFonts.SEMIBOLD
    },
    emailBox: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
    mailstyle: {
        height: 25,
        width: 25,
        resizeMode: 'contain'
    },
    freindView: {
        height: 30,
        width: 110,
        borderWidth: .5,
        borderColor: colorsFonts.Primarycolor,
        justifyContent: 'center',
        borderRadius: 10,
        // backgroundColor: 'red'
    },
    coincount: {
        marginLeft: 4,
        fontFamily: colorsFonts.REGULAR, color: colorsFonts.goldencolor
    },
    coin: {
        height: 25,
        bottom: 10,
        width: 25,
        resizeMode: 'contain'
    },
    usercircle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        elevation: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    playerImg: {
        height: 40,
        borderRadius: 20,
        width: 40,
    },
    img: {
        height: 40,
        borderRadius: 20,
        width: 40, bottom: 0
    },
    txtView: {
        flexDirection: 'row',
        top: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameTxt: {
        fontSize: 14,
        // marginTop:4,
        color: '#000',
        fontFamily: colorsFonts.SEMIBOLD
    },
})