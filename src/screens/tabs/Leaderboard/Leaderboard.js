import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { colorsFonts } from '../../../constants/colorsfont'
import { images } from '../../../constants/images'
import LinearGradient from 'react-native-linear-gradient'
import Header from '../../../components/AppTitleheader/Header'
import Listview from '../../../components/Listview/Listview'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import database from "@react-native-firebase/database"
const Leaderboard = ({ navigation }) => {
  const [state, setstate] = useState("1")

  const [firstUser, setFirstUser] = useState(null);
  const [middleUser, setMiddleUser] = useState(null);
  const [lastUser, setLastUser] = useState(null);
  const _Button = (value) => {
    setstate(value)
  }



  const getTopUsers = () => {
    const usersRef = database().ref('users');
    usersRef.orderByChild('user_game_level').limitToLast(3).once('value')
      .then((snapshot) => {
        const fetchedUsers = [];
        snapshot.forEach((childSnapshot) => {
          const userData = childSnapshot.val();
          fetchedUsers.unshift(userData);
        });
        const sortedUsers = [...fetchedUsers];
        sortedUsers.sort((a, b) => b.user_game_level - a.user_game_level);
        const middleUser = sortedUsers[1];

        setFirstUser(sortedUsers[0]);
        setMiddleUser(middleUser);
        setLastUser(sortedUsers[2]);
      })
      .catch((error) => {
        console.error('Error getting top users:', error.message);
      });
  };

  useEffect(() => {
    getTopUsers(); // Call the function when the component mounts
  }, []);



  return (
    <View style={styles.container}>
      <Header title={"Leaderboard"} />
      <ScrollView>
        <View style={styles.subcontainer}>
          <View style={{ margin: 6 }}>
            <View style={styles.selectorParent}>
              <TouchableOpacity
                onPress={() => _Button("0")}
                style={[styles.selector, { backgroundColor: state == "0" ? colorsFonts.Primarycolor : null }]}>
                <Text style={[styles.txt, { color: state == "0" ? "#fff" : "#000" }]}>Weekly</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _Button("1")}
                style={[styles.selector, { backgroundColor: state == "1" ? colorsFonts.Primarycolor : null }]}>
                <Text style={[styles.txt, { color: state == "1" ? "#fff" : "#000" }]}>Monthly</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _Button("2")}
                style={[styles.selector, { backgroundColor: state == "2" ? colorsFonts.Primarycolor : null }]}>
                <Text style={[styles.txt, { color: state == "2" ? "#fff" : "#000" }]}>Yearly</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.imageRow}>
            <View style={{
              height: 250, width: '33%',
              right: heightPercentageToDP(2),
              justifyContent: 'flex-end'
            }}>
              {lastUser && <TouchableOpacity
              onPress={() => navigation.navigate("CongLeader", {
                coins: firstUser?.coins
              })}
              
              style={styles.userStyle}>
                <Image source={{ uri: lastUser?.picture }} style={styles.image} />
                <Image source={images.coin} style={styles.coin} />
                <Text style={styles.nameTxt}>{lastUser?.username}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={images.coin} style={[styles.coin, { height: 10, width: 10, bottom: 0 }]} />
                  <Text style={[styles.nameTxt, { marginLeft: 4 }]}>300k</Text>
                </View>
              </TouchableOpacity>}
            </View>
            <View style={{ height: 250, width: '33%' }}>
              {firstUser && <TouchableOpacity onPress={() => navigation.navigate("CongLeader", {
                position: "First",
                coins: firstUser?.coins
              })} style={[styles.middleImage, { alignItems: 'center' }]}>
                <View>
                  <Image source={images.crown} style={{ height: 70, width: 70, resizeMode: 'contain' }} />
                </View>
                <Image source={{ uri: firstUser?.picture }} style={styles.middleimage} />
                <Image source={images.coin} style={styles.coin} />
                <Text style={styles.nameTxt}>{firstUser?.username}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={images.coin} style={[styles.coin, { height: 10, width: 10, bottom: 0 }]} />
                  <Text style={[styles.nameTxt, { marginLeft: 4 }]}>{firstUser?.coins}k</Text>
                </View>
              </TouchableOpacity>}


            </View>
            <View style={{
              height: 250, width: '33%',
              justifyContent: "flex-end",
              left: heightPercentageToDP(2),
            }}>
              {middleUser && <TouchableOpacity
              onPress={() => navigation.navigate("CongLeader", {
                position: "Second",
                coins: middleUser?.coins
              })}
              style={styles.userStyle}>
                <Image source={{ uri: middleUser?.picture }} style={styles.image} />
                <Image source={images.coin} style={styles.coin} />
                <Text style={styles.nameTxt}>{middleUser?.username}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={images.coin} style={[styles.coin, { height: 10, width: 10, bottom: 0 }]} />
                  <Text style={[styles.nameTxt, { marginLeft: 4 }]}>{middleUser?.coins}</Text>
                </View>
              </TouchableOpacity>}
            </View>
          </View>
          <View style={{ margin: 6 }}>
            {["1", "2", "3"].map((item) => {
              return (
                <Listview />
              )
            })}
          </View>
          <View>
            <LinearGradient
              colors={[colorsFonts.Primarycolor, '#00214E']}
              style={styles.rewardButon}>
              <View style={styles.playerView}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.usercircle}>
                    <Image source={images.player1} style={styles.playerImg} />
                  </View>
                  <View style={{ paddingLeft: 8 }}>
                    <Text style={[styles.nameTxt, { color: "#fff" }]}>Ahmad</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                      <Image source={images.coin} style={[styles.coin, { height: 10, width: 10, bottom: 0 }]} />
                      <Text style={[styles.nameTxt, { color: '#fff', fontFamily: colorsFonts.REGULAR, marginLeft: 4 }]}>128k</Text>
                    </View>
                  </View>
                </View>
                <Text style={[styles.nameTxt, { color: '#fff' }]}>25</Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>

    </View>
  )
}

export default Leaderboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:colorsFonts.appBg
  },
  subcontainer: {
    // margin: 6
  },
  playerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rewardButon: {
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 10,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  usercircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playerImg: {
    height: 40,
    borderRadius: 20,
    width: 40,
  },
  listView: {
    flexDirection: 'row',
    paddingVertical: 4,
    marginVertical: 20,

    justifyContent: 'space-between', borderBottomWidth: .5
  },
  userStyle: {
    alignItems: 'center',
    // backgroundColor:'red',
  },
  selectorParent: {
    height: 40,
    borderRadius: 25,
    backgroundColor: colorsFonts.inactiveTab,
    flexDirection: 'row', width: '100%',
    justifyContent: 'space-around'
  },
  nameTxt: {
    fontSize: 14,
    // marginTop:4,
    color: '#000',
    fontFamily: colorsFonts.SEMIBOLD
  },
  selector: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: 'black', width: "33%"
  },
  txt: {
    fontSize: 14,
    color: "#fff",
    fontFamily: colorsFonts.SEMIBOLD
  },
  coin: {

    height: 25,
    bottom: 10,
    width: 25,
    resizeMode: 'contain'
  },

  // ............images 


  imageRow: {
    flexDirection: 'row', // Arrange the images horizontally
    justifyContent: 'space-between', // Distribute space evenly
    marginBottom: 40, // Margin at the bottom of the row
    marginTop: heightPercentageToDP(14),
    // backgroundColor: 'red',
    // paddingHorizontal: 12
  },
  image: {
    width: 120, // Adjust the width as needed
    height: 120, // Adjust the height as needed
    resizeMode: 'cover', // Maintain aspect ratio
    borderRadius: 80,
    borderWidth: 2,
    borderColor: colorsFonts.Primarycolor
  },
  middleimage: {
    width: 140, // Adjust the width as needed
    height: 140, // Adjust the height as needed
    resizeMode: 'cover', // Maintain aspect ratio
    borderRadius: 80,
    borderWidth: 2,
    borderColor: colorsFonts.Primarycolor
  },
  middleImage: {
    bottom: "35%", // Margin to the left and right of the middle image
  },
})