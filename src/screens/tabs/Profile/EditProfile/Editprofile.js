import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-native-paper';
import BackButton from '../../../../components/BackButton/BackButton';
import { images } from '../../../../constants/images';
import { colorsFonts } from '../../../../constants/colorsfont';
import Button from '../../../../components/Button/Button';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import ImagePicker from 'react-native-image-crop-picker';
import Loader from '../../../../components/Loader/Loader';
const Editprofile = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [fullname, setFullname] = useState('');
    const [country, setCountry] = useState('');
    const [pic, setPic] = useState('');
    const [Loading,setLoading] = useState(false)

    const _updatePhoto = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            setPic(image.path)
            //   setdata({ ...data, picture: image.path })
        });
    }

    useEffect(() => {
        setLoading(true)
        // Fetch user data on mount
        const currentUserId = auth().currentUser.uid;
        const usersRef = database().ref(`/users/${currentUserId}`);
        const onDataChange = (snapshot) => {
            setLoading(false)
            const userData = snapshot.val();
            // setCurrentUser(userData);
            setEmail(userData?.email || '');
            setPhone(userData?.phone || '');
            setFullname(userData?.username || '');
            setCountry(userData?.country || '');
            setPic(userData?.picture || '');
        };

        usersRef.on('value', onDataChange);

        return () => {
            usersRef.off('value', onDataChange);
        };
    }, []);

    const _updateUserProfile = () => {
        setLoading(true)
        const userID = auth().currentUser.uid;
        const updatedEmail = email;
        const updatedPhone = phone;
        const updatedFullname = fullname;
        const updatedCountry = country;
        const updateData = {
            email: updatedEmail,
            phone: updatedPhone,
            username: updatedFullname,
            country: updatedCountry,
            picture: pic

        };

        const userRef = database().ref(`/users/${userID}`);
        userRef
            .update(updateData)
            .then(() => {
                setLoading(false)
                console.log('Data updated successfully!!');
                navigation.goBack();
            })
            .catch((error) => {
                setLoading(false)
                console.error('Error updating item:', error.message);
            });
    };
    const handleInputChange = (name, value) => {
        switch (name) {
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'fullname':
                setFullname(value);
                break;
            case 'country':
                setCountry(value);
                break;
            default:
                break;
        }
    };
    return (
        <View>
            <View style={{ margin: 10 }}>
                {Loading && <Loader />}
                <BackButton onPress={() => navigation.goBack()} title={"Edit profile"} />
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
                    <View style={{ marginVertical: 40 }}>
                        <TouchableOpacity onPress={() => _updatePhoto()} style={{ alignItems: 'center' }}>
                            <Image source={{ uri: pic }} style={{
                                height: 120,
                                borderRadius: 60,
                                width: 120
                            }} />
                        </TouchableOpacity>
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
                            value={fullname}
                            onChangeText={(text) => handleInputChange('fullname', text)}

                        />

                        <TextInput
                            editable={false}
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
                            value={email}
                            onChangeText={(text) => handleInputChange('email', text)}
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
                            value={phone}
                            onChangeText={(text) => handleInputChange('phone', text)}
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
                            value={country}
                            onChangeText={(text) => handleInputChange('country', text)}
                        />
                        <Button
                            linear={true}
                            btnstyle={{
                                marginTop: 30
                            }}
                            title={"Save changes"}
                            onPress={() => _updateUserProfile()}
                        />
                    </View>
                </ScrollView>

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