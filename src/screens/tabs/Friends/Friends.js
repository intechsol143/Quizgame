import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colorsFonts } from '../../../constants/colorsfont'
import { images } from '../../../constants/images'
import Header from '../../../components/AppTitleheader/Header'
import Listview from '../../../components/Listview/Listview'
import Button from '../../../components/Button/Button'
import Icon from 'react-native-vector-icons/Entypo'
const Friends = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Header title={"Friends"} />
        <View style={styles.subcontainerView}>
          <TouchableOpacity onPress={() => navigation.navigate("Joinfriends")} style={[styles.usersView, { ...styles.userspreadView1 }]}>
            <Image source={images.groupicon} style={styles.group} />
            <Text style={[styles.txt, { marginLeft: 6,color:'#000' }]}>Friends</Text>
          </TouchableOpacity>
          <View style={[styles.usersView, { ...styles.userspreadview }]}>
            <Text style={{ color: '#25C30B' }}>{'\u2B24'}</Text>
            <Text style={[styles.txt, { color: "#fff", marginLeft: 6 }]}>10 online</Text>
          </View>
        </View>
        <View style={{ margin: 10 }}>
          {["1", "2", "3", "4"].map((item) => {
            return (
              <Listview friendScreen={true} />
            )
          })}
          <Button
            title={"INVITE FRIENDS"}
            linear={true}
            btnstyle={{ marginTop: 20 }}
            Icon={<Icon name={"facebook-with-circle"} size={24} color={"#fff"} style={{ right: 6 }} />}
          />
        </View>


      </View>
    </View>
  )
}

export default Friends

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colorsFonts.appBg
  },
  group: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  userspreadview: {
    backgroundColor: colorsFonts.Primarycolor,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 100, paddingLeft: 6
  },
  userspreadView1: { width: 120, paddingLeft: 12 },
  usersView: {
    height: 40,
    // backgroundColor: 'red',
    width: 100,
    flexDirection: 'row',
    alignItems: 'center'
  },
  txt: {
    fontSize: 14,
    fontFamily: colorsFonts.SEMIBOLD
  },
  subcontainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})