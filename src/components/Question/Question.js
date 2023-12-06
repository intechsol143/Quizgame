import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colorsFonts } from '../../constants/colorsfont'
import Button from '../Button/Button'
import { images } from '../../constants/images'

const Question = ({ ques }) => {
    return (
        <View style={styles.quesCircle}>
            <Text style={styles.quesion}>{ques}</Text>
            <Button title={"25000"}
                linear={false}
                btnstyle={styles.button}
                buttonTxt={styles.titleTx}
                Icon={<Image source={images.coin} style={styles.coin} />}
            />
        </View>
    )
}

export default Question

const styles = StyleSheet.create({
    quesion: {
        fontSize: 20,
        width: "96%",
        textAlign: 'center',
        color: '#000',
        fontFamily: colorsFonts.SEMIBOLD,

    },
    coin: {
        height: 25,
        width: 25,
        marginRight: 10
    },
    titleTx: {
        color: colorsFonts.black
    },
    button: {
        height: 45,
        width: "40%",
        alignSelf: 'center',
        marginTop: 20,
        borderWidth: .5,
        borderColor: colorsFonts.Primarycolor,
        backgroundColor: null

    },
    quesCircle: {
        //  height: 200,
        // backgroundColor:'red',
        paddingVertical: 15,
        borderWidth: .5,
        borderRadius: 10,
        borderColor: colorsFonts.Primarycolor,
        justifyContent: 'center'
    }
})