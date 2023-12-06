import { StyleSheet, Text, View, Switch, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { colorsFonts } from '../../../../constants/colorsfont'
import BackButton from '../../../../components/BackButton/BackButton'
import auth from '@react-native-firebase/auth'
const Settings = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled2, setIsEnabled2] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(!isEnabled)
    };
    const toggleSwitch2 = () => {
        setIsEnabled2(!isEnabled2)
        // _handleNotifications(!isEnabled2)
    };

    const _signOut = () => {
        auth()
            .signOut()
            .then(() => console.log('User signed out!'))
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1, paddingHorizontal: 12, marginTop: '5%' }}>
                <View style={{ flex: 5 }}>
                    <View>
                        <BackButton title={"Settings"} onPress={() => navigation.goBack()} />
                        <View style={{ marginTop: '10%' }}>
                            {/* <View style={{ height: 50, backgroundColor:"yellow", opacity: .1 }}>

                            </View> */}
                            {/* <View style={{ position: 'absolute', width: '100%' }}>
                                <TouchableOpacity onPress={() => navigation.navigate("CashwithdrawlScreen")} style={styles.btn}>
                                    <Text style={[styles.btnsTxt, { color:"yellow" }]}>Cash Withdrawl Requests 6</Text>
                                    <AntDesign name={"arrowright"} color={"yellow"} size={22} />
                                </TouchableOpacity>
                            </View> */}

                            <View style={[styles.rowStyle, { marginTop: '10%' }]}>
                                <Text style={styles.btnsTxt}>Login with</Text>
                                <Text style={[styles.btnsTxt, { fontFamily: colorsFonts.SEMIBOLD, color: "#1777F2" }]}>facebook</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Privacy")}
                                style={styles.rowStyle}>
                                <Text style={styles.btnsTxt}>Privacy Policy</Text>
                                <MaterialIcon name={"arrow-forward-ios"} color={colorsFonts.Primarycolor} size={20} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Terms")}
                                style={styles.rowStyle}>
                                <Text style={styles.btnsTxt}>Terms and conditions</Text>
                                <MaterialIcon name={"arrow-forward-ios"} color={colorsFonts.Primarycolor} size={20} />
                            </TouchableOpacity>
                            <View style={[styles.rowStyle, { marginTop: 50, borderBottomWidth: 0 }]}>
                                <Text style={[styles.btnsTxt, { fontSize: 16, fontFamily: colorsFonts.SEMIBOLD, color: colorsFonts.Primarycolor }]}>Options</Text>
                            </View>
                            <View style={styles.rowStyle}>
                                <Text style={styles.btnsTxt}>Sound Effects</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: colorsFonts.Primarycolor }}
                                    thumbColor={isEnabled2 ? "#f4f3f4" : "#f4f3f4"}
                                    onValueChange={toggleSwitch2}
                                    value={isEnabled2}
                                />
                            </View>
                            <View style={styles.rowStyle}>
                                <Text style={styles.btnsTxt}>Notifications</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: colorsFonts.Primarycolor }}
                                    thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>
                            <View style={[styles.rowStyle, { borderBottomWidth: 0 }]}>
                                <Text style={styles.btnsTxt}>Delete Account</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            "Are you sure!",
                                            "to delete your account",
                                            [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                                {
                                                    text: "OK", onPress: () => {
                                                        _signOut()
                                                    }
                                                }
                                            ]
                                        );
                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.btnsTxt, { color: "red", fontSize: 12 }]}>Delete</Text>
                                    <MaterialIcon name={"arrow-forward-ios"} color={colorsFonts.Primarycolor} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.endView}>
                    {/* <Button
                        title={"Log Out"}
                        onPress={() => {
                            SetUser(null)(disptach)
                            SetMilestoneRefresh(1)(disptach)
                            SetQcounterRefres(1)(disptach)
                        }}
                    /> */}
                </View>
            </View>


        </View>
    )
}

export default Settings


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    endView: { flex: 1, justifyContent: 'center' },
    btn: {
        height: 50,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: "yellow",
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconsColor: {
        color: colorsFonts.Primarycolor
    },
    rowStyle: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        borderBottomWidth: .3,
        borderBottomColor: 'grey',
        paddingVertical: 10,
        justifyContent: 'space-between'
    },

    profileText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: colorsFonts.SEMIBOLD
    },
    btnsTxt: {
        color: colorsFonts.Primarycolor,
        fontSize: 14,
        fontFamily: colorsFonts.SEMIBOLD
    }
})