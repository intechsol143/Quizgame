import {StyleSheet} from 'react-native'
import { colorsFonts } from '../../constants/colorsfont'

export const startScreenstyle = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'red',
    
    },
    subcontainer:{
        flex:1,
        justifyContent:'flex-end',
        padding:10,
        paddingBottom:20,
        
        // backgroundColor:'green'
    },
    textView:{
        alignItems:'center',
        paddingTop:20
    },
    txt:{
        fontSize:16,

        color:colorsFonts.black,
        fontFamily:colorsFonts.BOLD,
        textAlign:'center'
    },
    buttonsView:{
        alignItems:'center',
        marginTop:30
    },
    titleView:{
        right: 10
      },
      Rview:{ alignItems: 'center' }
  

})
export const loginScreenstyle = StyleSheet.create({

})
export const regScreenstyle = StyleSheet.create({

})