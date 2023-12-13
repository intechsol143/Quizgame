import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Feather'
import Entypo from "react-native-vector-icons/Entypo"
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
import { selectcoinToplay } from '../tabsscreenStyles'
import { colorsFonts } from '../../../constants/colorsfont'
import { images } from '../../../constants/images'
const CongLeader = ({ route }) => {
  const { coins, position } = route?.params
  return (
    <ImageBackground source={images.emp} style={styles.winerBg}>
      {/* <ScrollView> */}
      <View style={{ flex: 3 }}>
        <ImageBackground resizeMode='cover' source={images.gliter} style={{
          height: heightPercentageToDP(50),
          width: widthPercentageToDP(100)
        }}>
          <View style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: heightPercentageToDP(30)
          }}>
            <View style={{ alignItems: 'center', paddingVertical: 20 }}>
              <Text style={styles.congTxt}>Congratulation</Text>
            </View>
          </View>
          <View style={{ alignItems: 'center', marginTop: heightPercentageToDP(10) }}>
            <Text style={styles.rankTxt}>Your ranking position
              on the league leaderboard
              is {position == "First" ? "1st" : position == "Second" ? "2nd" : "3rd"} position.</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={{
        height: heightPercentageToDP(45),
        // paddingBottom:heightPercentageToDP(10),
        // backgroundColor: 'red',
        alignItems: 'center'
      }}>

        <ImageBackground resizeMode='contain' source={images.leaderStar} style={{
          height: heightPercentageToDP(40),
          alignItems: 'center',
          justifyContent: 'center',
          width: 320
        }}>
          <View style={{ height: heightPercentageToDP(40), width: 250, alignItems: 'center' }}>
            <View style={{ alignItems: 'center', paddingTop: 40 }}>
              <Image source={images.leadercoin} style={{ height: 90, width: 90 }} />
              <Text style={{
                color: colorsFonts.goldencolor,
                bottom: 10,
                fontFamily: colorsFonts.SEMIBOLD, fontSize: 20
              }}>{coins}</Text>
            </View>
          </View>
        </ImageBackground>

      </View>
      {/* </ScrollView> */}

      {/* <ImageBackground resizeMode='cover' source={images.gliter} style={{ height: heightPercentageToDP(50), width: widthPercentageToDP(100) }}>
        <View style={styles.subcontainer}>
          <View style={{ alignItems: 'center', paddingVertical: 20 }}>
            <Text style={styles.congTxt}>Congratulation</Text>
          </View>
        </View>
      </ImageBackground> */}
      <View>
        {/* <View style={{alignItems:'center'}}>
        <Text style={styles.rankTxt}>Your ranking position
          on the league leaderboard
          is 3rd position</Text>
        </View> */}

        {/* <View style={styles.subcontainer}>
          <View style={{ alignItems: 'center', paddingVertical: 20 }}>
            <Text style={styles.congTxt}>Congratulation</Text>
            <Text style={styles.rankTxt}>Your ranking position
              on the league leaderboard
              is 3rd position</Text>


          </View>
        </View> */}
        <View style={styles.end1container}>
          {/* <View style={{ alignItems: 'center' }}>
                        <Text style={styles.congTxt}>Congratulation</Text>
                        <View style={styles.amount}>
                            <Image source={images.coin} style={[styles.coinstyle, { top: 4 }]} />
                            <Text style={[styles.txt, { marginLeft: 6, fontSize: 50, fontFamily: colorsFonts.BOLD }]}>25,000</Text>
                        </View>
                        <Text style={[styles.congTxt, {
                            fontSize: 16,
                            textAlign: 'center',
                            fontFamily: colorsFonts.REGULAR,
                            marginTop: '10%',
                            paddingHorizontal: 12,
                        }]}>Lorem ipsum dolor sit elit adipiscing consectetur adipiscing elit.</Text>
                        <View style={styles.correcIncView}>
                            <View style={styles.inc}>
                                <Icon name={"check"} size={12} color={"#fff"} />
                                <Text style={styles.txt}> {"6"} Correct</Text>
                            </View>
                            <View style={[styles.inc, { backgroundColor: colorsFonts.incorrectAnscolor }]}>
                                <Entypo name={"cross"} size={12} color={"#fff"} />
                                <Text style={styles.txt}> {"4"} Incorrect</Text>
                            </View>
                        </View>

                    </View> */}
        </View>

      </View>

    </ImageBackground>
  )
}

export default CongLeader

const styles = StyleSheet.create({
  container: { backgroundColor: 'red' },
  subcontainer: {
    height: heightPercentageToDP(40),
    // flex: 3,
    // backgroundColor: 'red',
    paddingTop: 20,
    justifyContent: 'center'
    // justifyContent: 'flex-end'
  },
  end1container: { flex: 2.5 },
  end2container: { flex: 1, paddingHorizontal: 12, justifyContent: 'center' },
  congTxt: {
    fontSize: 30,
    fontFamily: colorsFonts.SEMIBOLD,
    color: '#fff'
  },
  playbuton: {
    height: 40,
    marginTop: 20,
    alignItems: 'center',
    width: 120,
    justifyContent: 'center',
    backgroundColor: colorsFonts.playbutton, borderTopRightRadius: 40, borderBottomRightRadius: 40
  },
  Names: {
    height: 50,
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  txt: {
    fontSize: 14,
    fontFamily: colorsFonts.SEMIBOLD,
    color: '#fff'
  },
  rankTxt: {
    fontSize: 20,
    // marginTop: "10%",
    color: colorsFonts.goldencolor,
    fontFamily: colorsFonts.SEMIBOLD, textAlign: 'center', width: widthPercentageToDP(75)
  },
  play2: {
    height: 40,
    marginTop: 40,
    justifyContent: 'center',
    alignSelf: "flex-end",
    alignItems: 'center',
    width: 120,
    backgroundColor: "lightgrey", borderTopLeftRadius: 40, borderBottomLeftRadius: 40
  },
  namesView: {
    height: 50,
    width: null,
    // backgroundColor:'green',
    alignItems: 'center'
  },
  coinstyle: {
    height: 30,
    width: 30,
    resizeMode: 'contain'
  },
  croneView: {
    height: 100, width: "45%",
    // backgroundColor: 'black',
    alignItems: 'center', justifyContent: 'center'
  },
  playersView: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'space-around'
  },
  winerPrize: {
    height: 100,
    // backgroundColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  inc: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: "40%",
    borderRadius: 20,
    flexDirection: 'row',

    backgroundColor: colorsFonts.correctAnscolor
  },
  amount: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: '10%',
    alignItems: 'center'
  },
  correcIncView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: "10%",
    width: '100%',

    justifyContent: 'space-around'
  },
  winerBg: {
    height: "100%",
    width: '100%'
  }
})