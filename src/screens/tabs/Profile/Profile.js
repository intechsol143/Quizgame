import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colorsFonts } from '../../../constants/colorsfont'
import Profileheader from '../../../components/ProfileHeader/Profileheader'
import { images } from '../../../constants/images'
import LinearGradient from 'react-native-linear-gradient'
import Header from '../../../components/AppTitleheader/Header'

const Profile = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header title={"Profile"}/>
      <View style={styles.subcontainer}>
        <Profileheader onClick={()=>navigation.navigate("Editprofile")} />
        <View style={styles.reportcontainer}>
          <View style={styles.ranksContainer}>
            <View style={styles.centercontainer}>
              <Text style={styles.days}>Weekly Rank</Text>
              <Text style={styles.price}>1000</Text>
            </View>
            <View style={styles.centercontainer}>
              <Text style={styles.days}>Monthly Rank</Text>
              <Text style={styles.price}>500</Text>
            </View>
            <View style={[styles.centercontainer, { borderRightWidth: 0 }]}>
              <Text style={styles.days}>Yearly Rank</Text>
              <Text style={styles.price}>400</Text>
            </View>
          </View>
        </View>
        <View style={[styles.reportcontainer, { marginTop: '8%' }]}>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#6A5AE0", '#F1EFFC']} style={styles.linearView}>
            <View>
              <View style={styles.clasicViewParent}>
                <View style={styles.clasicView}>
                  <View>
                    <Text style={[styles.num, { fontSize: 22 }]}>Classic</Text>
                  </View>
                  <View style={styles.subView2}>
                    <View style={styles.rats}>
                      <Text style={styles.num}>132</Text>
                      <Text style={styles.txt}>Total</Text>
                    </View>
                    <View style={styles.rats}>
                      <Text style={styles.num}>85</Text>
                      <Text style={styles.txt}>Wins</Text>
                    </View>
                    <View style={styles.rats}>
                      <Text style={styles.num}>23%</Text>
                      <Text style={styles.txt}>Win rate</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.endimgview}>
                  <View style={styles.square}>
                    <View style={styles.triangle}>
                      <Image source={images.line} style={{height:120,width:99,resizeMode:'contain'}}/>
                    </View>
                    <View style={{alignItems:'center',
                    justifyContent:'flex-end',
                    flex:1}}>
                    <Image source={images.ring} style={styles.ringImg} />
                    </View>
                
                  </View>

                </View>
              </View>
            </View>
          </LinearGradient>
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={["#6A5AE0", '#F1EFFC']} style={[styles.linearView,{marginTop:20}]}>
            <View>
              <View style={styles.clasicViewParent}>
                <View style={styles.clasicView}>
                  <View>
                    <Text style={[styles.num, { fontSize: 22 }]}>Player vs Player</Text>
                  </View>
                  <View style={styles.subView2}>
                    <View style={styles.rats}>
                      <Text style={styles.num}>132</Text>
                      <Text style={styles.txt}>Total</Text>
                    </View>
                    <View style={styles.rats}>
                      <Text style={styles.num}>85</Text>
                      <Text style={styles.txt}>Wins</Text>
                    </View>
                    <View style={styles.rats}>
                      <Text style={styles.num}>23%</Text>
                      <Text style={styles.txt}>Win rate</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.endimgview}>
                  <View style={styles.square}>
                    <View style={styles.triangle}>
                      <Image source={images.line} style={{height:120,width:99,resizeMode:'contain'}}/>
                    </View>
                    <View style={{alignItems:'center',
                    justifyContent:'flex-end',
                    flex:1}}>
                    <Image source={images.drac} style={styles.ringImg} />
                    </View>
                
                  </View>

                </View>
              </View>
            </View>
          </LinearGradient>

        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colorsFonts.appBg
  },
  subcontainer: {
    margin: 10
  },
  //rank view.....

  ringImg:{ height: 70,
    resizeMode:'contain',
    width:80,
    
    },
    endimgview:{
      height: 120,
      width: "38%",
      borderTopRightRadius:20,
    },
    subView2:{
      // backgroundColor: 'grey',
      justifyContent: 'space-between', flexDirection: 'row'
    },
  ranksContainer: {
    height: 70,
    borderWidth: .5,
    borderRadius: 10,
    flexDirection: 'row',
    borderColor: colorsFonts.Primarycolor,
    width: '100%'
  },
  clasicViewParent:{
    flexDirection: 'row', width: '100%'
  },
  days: {
    fontFamily: colorsFonts.SEMIBOLD,
    fontSize: 13,
    color: colorsFonts.Primarycolor
  },
  clasicView:{
    justifyContent: 'space-between', height: 120,
    width: '62%',
    paddingVertical: 16,
    paddingLeft: 12,
    // backgroundColor: 'red'
  },
  price: {
    fontFamily: colorsFonts.REGULAR,
    color: colorsFonts.Primarycolor,
    marginTop: 6,
    textAlign:'center'
  },
  square: {
    width: 130, // Adjust the width of the square as needed
    height: 120, // Height is the same as the width for a square
  //  backgroundColor: 'lightgray', // Background color of the square
    position: 'relative',
    borderRadius:10
  },
  triangle: {
    position: 'absolute',
    width: 100,
    transform: [{ rotate: '360deg' }],
    height: 0,
    backgroundColor: 'transparent',
    // borderStyle: 'solid',
    borderLeftWidth: 0, // No left border
    borderRightWidth: 100, // Half of the square's width
    borderBottomWidth: 110, // Equal to the square's height
  borderRightColor:'transparent',
    // borderRightColor: 'transparent',
    // borderRightColor: 'transparent',
    borderBottomColor: 'transparent', // Change the color as desired
    top: 0,
    right: 0,
  },
  centercontainer: {
    borderRightWidth: .5,
    borderRightColor: colorsFonts.Primarycolor,
    alignSelf: 'center',
    height: 50,
    paddingLeft: 8,
    width: "33%"
  },
  reportcontainer: {
    marginTop: "10%"
  },
  rateView: {
    height: 70,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  rats: {
    alignItems: 'center'
  },
  num: {
    fontSize: 14,
    color: '#fff',
    fontFamily: colorsFonts.SEMIBOLD
  },
  txt: {
    fontFamily: colorsFonts.REGULAR,
    color: '#fff',
    fontSize: 12,
    top: 3
  },
  linearView: {
    height: 120,
    elevation: 2,
    borderRadius: 10,
    width: '100%'
  }
})