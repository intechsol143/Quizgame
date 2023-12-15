import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '../../constants/images'
import { colorsFonts } from '../../constants/colorsfont'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Header = ({navigation,user}) => {
    return (
        <View>
            <View style={styles.headerParent}>
                <View style={styles.headersubParent}>
                    <View style={styles.profileview}>
                    <Image source={{uri:user?.picture}} style={styles.Usericon} />
                    </View>
                    <View style={{ paddingLeft: 10 }}>
                        <Text style={styles.nameText}>{user?.username}</Text>
                        <View style={styles.headersubParent2}>
                            <Text style={styles.amountText}>{user?.amount}</Text>
                            <Image source={images.coin} style={styles.icon} />
                        </View>
                    </View>
                </View>
                <View>
                    <AntDesign onPress={()=>navigation.navigate("Settings")} color={colorsFonts.neutralGrey} name={"setting"} size={24} />
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    headerParent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    headersubParent: { flexDirection: 'row', alignItems: 'center' },
    headersubParent2: { flexDirection: 'row', alignItems: 'center',borderWidth:.5,borderColor:colorsFonts.Primarycolor,
    borderRadius:5,
    width:90,
    marginTop:4,
    justifyContent:'center',
    paddingVertical:2 },
    profileview: { 
        height: 40,
         width: 40,
         elevation:2,
         borderRadius: 20,
          backgroundColor: '#fff' },
    nameText: {
        fontSize: 14,
        fontFamily: colorsFonts.SEMIBOLD,
        color: colorsFonts.black

    },
    amountText: {
        fontSize: 14,
        fontFamily: colorsFonts.REGULAR,
        color: colorsFonts.black
    },
    icon: {
        height: 20,
        width: 20,
        marginLeft:3,
        resizeMode: 'contain'
    },
    Usericon: {
        height: 40,
        width: 40,
      borderRadius:20
    }
})