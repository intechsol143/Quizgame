import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colorsFonts } from '../../constants/colorsfont'
import { images } from '../../constants/images'

const Profileheader = ({onClick,user}) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row',alignItems:'center'}}>
                    <View style={styles.userView}>
                    <Image source={{uri:user?.picture}} style={{height:50,width:50,borderRadius:50}} />
                    </View>
                    <View style={styles.itemsView}>
                        <Text style={styles.userName}>{user?.username}</Text>
                        <View style={styles.curencyView}>
                            <Image source={images.country} style={styles.img} />
                            <Text style={[styles.userName, { fontSize: 14, marginLeft: 4 }]}>United-state</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={onClick} style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end' }}>
                        <Text style={[styles.userName, { color: colorsFonts.Primarycolor, marginRight: 10 }]}>Edit</Text>
                        <Image source={images.pencil} style={styles.editimg} />
                    </TouchableOpacity>
                    <View style={[styles.curencyView, { width: 100 }]}>
                        <Text style={[styles.userName, { fontSize: 14, }]}>28000</Text>
                        <Image source={images.coin} style={[styles.img, { marginLeft: 6 }]} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Profileheader

const styles = StyleSheet.create({
    container: { flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' },
    userView: {
        height: 50,
        width: 50,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 50 / 2,
        backgroundColor: '#fff',
        elevation: 2
    },
    userName: {
        fontSize: 14,
        fontFamily: colorsFonts.SEMIBOLD
    },
    curencyView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        backgroundColor:'rgba(190, 30, 45, 0.10)',
        width: 140,
        borderWidth: .5,
        borderColor: colorsFonts.Primarycolor,
        borderRadius: 5,
        // elevation:2,
        marginTop: 4
    },
    itemsView: {
        paddingLeft: 10
    },
    curencyName: {
        fontSize: 14,
        fontFamily: colorsFonts.REGULAR
    },
    img: {
        height: 15,
        width: 15,
        resizeMode: 'contain'
    },
    editimg: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    },
})