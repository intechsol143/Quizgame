import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackButton from '../../../../components/BackButton/BackButton'
import { colorsFonts } from '../../../../constants/colorsfont'
import { images } from '../../../../constants/images'

const Terms = ({navigation}) => {
    return (
        <View>
            <View style={{ margin: 10 }}>
                <BackButton title={"Terms & Condition"} onPress={() => navigation.goBack()} />
                <ScrollView contentContainerStyle={{paddingBottom:80}} showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={images.terms} style={styles.termsImg} />
                        <Text style={styles.txt}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            {"\n\n"}
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            {"\n\n"}
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            {"\n\n"}
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            {"\n\n"}
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                        </Text>
                    </View>
                </ScrollView>

            </View>
        </View>
    )
}

export default Terms

const styles = StyleSheet.create({
    txt: {
        fontFamily: colorsFonts.REGULAR,
        color: '#737F8B',
        fontSize:13,
        textAlign: 'center'
    },
    termsImg: {
        height: 250,
        width: 250,
        resizeMode: 'contain'
    }
})