import { StyleSheet } from 'react-native'
import { colorsFonts } from '../../constants/colorsfont'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const homestyle = StyleSheet.create({
    container: {
        flex: 1
    },
    subcontainer: {
        flex: 1,
        padding: 12
    },
    playbutton: {
        width: 120,
        borderRadius: 10,
        height: 35,

        marginTop: 10
    },
    cardOver: { height: 180, width: "100%", justifyContent: 'center', paddingLeft: 20 },
    bgImg: {
        height: 170,
        width: wp(93),
        marginTop: 20
    },
    txt: {
        fontSize: 16,
        fontFamily: colorsFonts.BOLD,
        paddingLeft: 8,
        color: colorsFonts.black
    },
    row2: { flexDirection: 'row', marginTop: 10, alignItems: 'center' },
    icon: {
        height: 35,
        width: 35,
        resizeMode: 'contain'
    },
    crownicon: {
        height: 80,
        width: 80,
        resizeMode: 'contain'
    },
    crownicon1: {
        height: 25,
        width: 80,
        alignItems: 'center',
        // justifyContent:'center',
        // resizeMode:'contain',
        // tintColor:"#6A5AE0"
    },
    crownView: {
        height: 50,
        width: wp(93),
        // backgroundColor:'red',
        paddingHorizontal: 12,

        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    },
    linearcard: {
        height: 140, width: 100,
        borderRadius: 10,
        marginTop: 20
    },
    sublinearcard: {
        height: 40,
        width: 100,
        borderRadius: 10,
        alignItems: 'center'

    },
    treasureImg: {
        height: 70,
        top: 10,
        width: 70
    }

})
export const playerscreen = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: colorsFonts.appBg, padding: 15
    },
    subContainer: { flex: 1 },
    subContainer2: {
        flex: 4, paddingTop: 10
    },
    buttonsContainer: { flex: 3, justifyContent: 'center' },
    logo: {
        height: 150,
        resizeMode: 'contain',
        width: 150
    },
    logoView: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export const selectcoinToplay = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorsFonts.appBg,
        padding: 15,

    },
    subContainer: {
        flex: 1,
        // backgroundColor:'red'
    },
    Spacer: {
        height: 15
    },
    playerStyle: {
        height: 150,
        borderWidth: 2,
        borderColor:colorsFonts.Primarycolor,
        width: 150,
        borderRadius: 80
    },
    userNameTxt: {
        fontSize: 16,
        marginTop: hp(4),
        color: '#000',
        fontFamily: colorsFonts.BOLD
    },
    vsTxt: {
        fontSize: 35,
        color: "#fff",
        marginTop: 10,
        fontFamily: colorsFonts.BOLD
    },
    userView: {
        height: 100,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor:colorsFonts.Primarycolor, 
        // borderRadius: 50,
        // borderWidth:2,
    },
    subContainer2: {
        flex: 4,
        // backgroundColor:'green',

        // paddingTop: 10
    },
    buttonsContainer: {
        flex: 3,
        paddingTop: "30%"

        // justifyContent: 'center'
    },
    logo: {
        height: 150,
        resizeMode: 'contain',
        width: 150
    },
    playercotainer: {
        alignItems: 'center',
        // justifyContent: "flex-start",
        // height:120,

    },
    logoView: {
        flex: 0.7,
        // backgroundColor:'grey',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coinstyle: {
        height: 20,
        width: 20,
        marginRight: 5,
        resizeMode: 'contain'
    }
})