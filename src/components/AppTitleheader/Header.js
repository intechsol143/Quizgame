import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colorsFonts } from '../../constants/colorsfont'

const Header = ({title}) => {
  return (
    <View>
      <Text style={styles.headerTxt}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerTxt:{textAlign:'center',
    paddingVertical:12,
    fontSize:16,
    color:'#000',
    fontFamily:colorsFonts.BOLD}
})