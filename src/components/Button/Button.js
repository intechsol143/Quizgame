import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { colorsFonts } from '../../constants/colorsfont'
import LinearGradient from 'react-native-linear-gradient';
const Button = ({ title, Icon, titlesView, btnstyle, buttonTxt, onPress, linear }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.linearGradient, { ...btnstyle }]}>
      {linear ? <LinearGradient
        colors={[colorsFonts.Primarycolor, '#00214E']}
        style={[styles.linearGradient, { ...btnstyle }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', ...titlesView }}>
          {Icon}
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </LinearGradient> :
        <View style={{ flexDirection: 'row', alignItems: 'center', ...titlesView }}>
          {Icon}
          <Text style={[styles.buttonText,{...buttonTxt}]}>{title}</Text>
        </View>
      }
    </TouchableOpacity>

  )
}

export default Button

const styles = StyleSheet.create({
  linearGradient: {
    // flex: 1,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 5,
    marginVertical: 5,

    borderRadius: 15
  },
  button: {
    backgroundColor: colorsFonts.Primarycolor,
    width: '100%',
    alignItems: 'center',
    borderRadius: 15,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: colorsFonts.SEMIBOLD
  },
})



