import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-paper';
import BackButton from '../../../../components/BackButton/BackButton';
import { images } from '../../../../constants/images';
import { colorsFonts } from '../../../../constants/colorsfont';
import Button from '../../../../components/Button/Button';

const Editprofile = ({ navigation }) => {
    const [data, setdata] = useState({
        email: "",
        phone: '',
        fullname: '',
        country: ''
    });
    return (
        <View>
            <View style={{ margin: 10 }}>
                <BackButton onPress={() => navigation.goBack()} title={"Edit profile"} />
                <View style={{ marginVertical: 40 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={images.user} style={{ height: 120, width: 120 }} />
                    </View>
                    <View style={styles.space} />
                    <TextInput
                        mode="outlined"
                        theme={{
                            roundness: 15,
                            colors: { primary: colorsFonts.Primarycolor, underlineColor: 'transparent', }
                        }}
                        contentStyle={{ fontFamily: colorsFonts.REGULAR }}
                        outlineStyle={{ borderWidth: .5 }}
                        label="Full name"
                        style={styles.filedstyle}
                        value={data.fullname}
                        onChangeText={text => setdata({ ...data, fullname: text })}
                    />

                    <TextInput
                        theme={{
                            roundness: 15,
                            colors: { primary: colorsFonts.Primarycolor, underlineColor: 'transparent', },
                            fonts: {
                                regular: {
                                    fontFamily: 'Montserrat-Regular',

                                },
                            },
                        }}
                        mode="outlined"
                        label="Email"
                        contentStyle={{ fontFamily: colorsFonts.REGULAR }}

                        outlineStyle={{ borderWidth: .5 }}
                        style={styles.filedstyle}
                        value={data.email}
                        onChangeText={text => setdata({ ...data, email: text })}
                    />
                    <TextInput
                        theme={{
                            roundness: 15,
                            colors: {
                                primary: colorsFonts.Primarycolor,
                                underlineColor: 'transparent',

                            },
                            fonts: {
                                regular: {
                                    fontFamily: 'Montserrat-Regular',

                                },
                            },

                        }}
                        mode="outlined"
                        outlineStyle={{ borderWidth: .5 }}
                        label="Phone number"
                        contentStyle={{ fontFamily: colorsFonts.REGULAR }}

                        style={styles.filedstyle}
                        value={data.phone}
                        onChangeText={text => setdata({ ...data, phone: text })}
                    />
                    <TextInput
                        theme={{
                            roundness: 15,
                            colors: { primary: colorsFonts.Primarycolor, underlineColor: 'transparent', },
                            fonts: {
                                regular: {
                                    fontFamily: 'Montserrat-Regular',
                                },
                            },
                        }}
                        mode="outlined"
                        outlineStyle={{ borderWidth: .5, }}
                        contentStyle={{ fontFamily: colorsFonts.REGULAR }}
                        label="Country"
                        style={styles.filedstyle}
                        value={data.country}
                        onChangeText={text => setdata({ ...data, country: text })}
                    />
                    <Button
                        linear={true}
                        btnstyle={{
                            marginTop: 30
                        }}
                        title={"Save changes"}
                        onPress={()=>navigation.goBack()}
                    />
                </View>
            </View>

        </View>
    )
}

export default Editprofile

const styles = StyleSheet.create({
    filedstyle: {
        height: 50,
        borderRadius: 10,
        fontFamily: colorsFonts.REGULAR,
        marginVertical: 6
    },
    space: {
        height: 40
    },

})