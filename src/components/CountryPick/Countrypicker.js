import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, PixelRatio, Image, TouchableOpacity } from 'react-native'
import CountryPicker, { DARK_THEME } from 'react-native-country-picker-modal'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { colorsFonts } from '../../constants/colorsfont'

const styles = StyleSheet.create({
    countrystyl: {
        height: 50,
        padding: 10,
        width: '100%',
        alignSelf: 'center',
        justifyContent: "space-between",
        flexDirection: 'row',

        backgroundColor: colorsFonts.Primarycolor, borderRadius: 50 / 2
    },
    txtstyle: {
        color: '#979797',
        top: 2,
        fontFamily: colorsFonts.REGULAR
    },
    arrow:{
        position: 'absolute',

        alignSelf: 'flex-end', top: 19, right: "7%"
    }
    // countryPickerContainer: {
    //     // width: 114,
    //     backgroundColor: style.grey,
    //     justifyContent: 'center',
    //     height: 50,
    //     margin: 10,
    //     borderRadius: 5,
    // },

    // ...
})

export default function Picker({ st, Getcountry, changeCountry }) {
    console.log("check st", changeCountry)
    const [cca2, setCca2] = useState('US'); // you can set ur country here
    const [callingCode, setCallingCode] = useState('1');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState(changeCountry ? changeCountry : 'US');
    const [country, setCountry] = useState(null);
    const [withFlag, setWithFlag] = useState(true);
    const [withEmoji, setWithEmoji] = useState(true);
    const [withFilter, setWithFilter] = useState(true);
    const [withAlphaFilter, setWithAlphaFilter] = useState(false);
    const [withCallingCode, setWithCallingCode] = useState(false);
    const [modal, setmodal] = useState(false)


    useEffect(() => {
        Getcountry(country)
    }, [country])


    const onSelect = (country) => {
        console.log("country tsett",country)
        setCountryCode(country?.cca2);
        setCountry(country);
        setCca2(country?.cca2);
        setCallingCode(country?.callingCode);
    };

    return (
        <View>
            <View style={{
                height: 50,
                borderRadius: 15,
                backgroundColor: '#fff',
                // opacity: .2,
                borderWidth:.5,
                borderColor:'grey'
            }}>

            </View>
            <View style={{ position: 'absolute', width: '100%' }}>
                <View style={[styles.countrystyl, {
                    borderWidth: st ? .5 : 0,
                    backgroundColor: null,
                    borderRadius: 15,
                    borderColor: st ? 'red' : "grey"
                }]}>
                    <View>
                        <Text style={[styles.txtstyle, {
                            color: '#000',
                            paddingLeft: st ? 14 : 12
                        }]}>{country != null ? country.name :  "Country"}</Text>
                    </View>
                    <CountryPicker
                    // withCallingCode={true}
                    // withCallingCodeButton={true}
                    
                    
                        withFlagButton={{
                        }}
                        theme={{
                            flagSizeButton: 23,

                            // borderRadius:20
                        }}


                        {...{
                            countryCode,
                            withFilter,
                            withFlag,
                            withAlphaFilter,
                            withCallingCode,
                            withEmoji,
                            Getcountry,
                            onSelect,


                        }}



                        containerButtonStyle={{
                            marginRight: 30,
                            // bottom:5

                        }}




                        visible={modal ? true : false}
                    />
                </View>
            </View>
            <View style={styles.arrow}>
                <Icon name={"arrow-down"} color={colorsFonts.Primarycolor} size={13} />
            </View>

        </View>

    )
}