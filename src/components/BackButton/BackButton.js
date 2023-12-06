import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '../../constants/images'
import { colorsFonts } from '../../constants/colorsfont'

const BackButton = ({ title, onPress }) => {
    return (
        <View style={styles.headerbuttonback}>
            <TouchableOpacity onPress={onPress}>
                <Image source={images.back} style={{ height: 35, width: 35, resizeMode: 'contain' }} />
            </TouchableOpacity>
            <Text style={{ right: 20, fontSize: 16, fontFamily: colorsFonts.BOLD, color: '#000' }}>{title}</Text>
            <Text></Text>
        </View>
    )
}

export default BackButton

const styles = StyleSheet.create({
    headerbuttonback: {
        flexDirection: 'row',
        alignItems: 'center',
        // margin: 10,
        justifyContent: 'space-between'
    }
})