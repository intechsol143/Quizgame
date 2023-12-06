import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import BackButton from '../../../../components/BackButton/BackButton'
import { images } from '../../../../constants/images'
import { colorsFonts } from '../../../../constants/colorsfont'

const Joinfriends = ({ navigation }) => {
  const [state, setstate] = useState("1")
  const imgAddrss = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
  return (
    <View style={styles.container}>
      <View style={styles.join}>
        <View style={styles.backIconview}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={images.back} style={styles.backicon} />
          </TouchableOpacity>

          <View style={styles.joinedview}>
            <Text onPress={() => setstate("1")} style={[styles.txt, { borderBottomWidth: state == "1" ? 2 : 0, borderColor: colorsFonts.Primarycolor, paddingVertical: 4 }]}>Recently Joined</Text>
            <Text onPress={() => setstate("2")} style={[styles.txt, { borderBottomWidth: state == "2" ? 2 : 0, borderColor: colorsFonts.Primarycolor, paddingVertical: 4 }]}>Pending</Text>
          </View>
          <View />
        </View>
        <View style={{ marginTop: "20%" }}>
          {state == "1" ?
            <View>
              {["1", "2", "3", "4"].map((item) => {
                return (
                  <View style={styles.joinParent}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={styles.userView}>
                        <Image source={{ uri: imgAddrss }} style={styles.img} />
                      </View>
                      <Text style={[styles.txt, { marginLeft: 4 }]}>Travolta</Text>
                    </View>
                    <View>
                      <View style={styles.storeView}>
                        <Image source={images.save} style={styles.storeicon} />
                        <Text style={[styles.txt, { marginLeft: 4, fontFamily: colorsFonts.REGULAR, color: colorsFonts.Primarycolor }]}>Joined</Text>
                      </View>
                    </View>
                  </View>
                )
              })}

            </View>
            : <View>
              {["1", "2",].map((item) => {
                return (
                  <View style={styles.joinParent}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <View style={styles.userView}>
                        <Image source={{ uri: imgAddrss }} style={styles.img} />
                      </View>
                      <Text style={[styles.txt, { marginLeft: 4 }]}>Tom</Text>
                    </View>
                    <View>
                      <View style={styles.storeView}>
                        <Image source={images.pending} style={styles.storeicon} />
                        <Text style={[styles.txt, { marginLeft: 4, fontFamily: colorsFonts.REGULAR, color: colorsFonts.Primarycolor }]}>Pending</Text>
                      </View>
                    </View>
                  </View>
                )
              })}

            </View>
          }


        </View>
      </View>
    </View>
  )
}

export default Joinfriends

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backicon: {
    height: 40,
    width: 40,
    resizeMode: 'contain'
  },
  storeicon: {
    height: 16,
    width: 16,
    resizeMode: 'contain'
  },
  joinParent: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 6 },
  img: {
    height: 50,
    width: 50,
    borderRadius: 25
  },
  backIconview: { flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" },
  storeView: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    width: 100,
    borderWidth: .5,
    flexDirection: 'row'

  },
  join: {
    margin: 12
  },
  userView: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#fff',
    elevation: 2

  },
  txt: {
    fontFamily: colorsFonts.SEMIBOLD,
    fontSize: 14,
    color: colorsFonts.black
  },
  joinedview: {
    flexDirection: 'row',
    width: "60%",
    justifyContent: 'space-between'
  }
})