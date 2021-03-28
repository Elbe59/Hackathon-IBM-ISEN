import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity
} from 'react-native'

import Svg, { Path } from 'react-native-svg'
import { moderateScale } from 'react-native-size-matters'

class PageAccueil extends React.Component {
  render(){
    return (
        <View style = {styles.principal}>
            <Text style = {[styles.titre_App,{padding:10}]}>
                Inspir'HEI
            </Text>
            <Text style = {styles.nom_indice}>
              Indice 1:
            </Text>
            <Text style = {styles.contenu_indice}>
              X = Trouver le nombre de 6 chiffres se positionnant après la première occurence de 036695 dans les décimales de PI. Convertir ce nombre de la base10 en base26.
            </Text>
            <Text style = {styles.nom_indice}>
              Indice 2:
            </Text>
            <Text style = {styles.contenu_indice}>
              Y = https://pasteboard.co/074 065 051 049 084 077 048 046 112 110 103/
            </Text>
            <Text style = {styles.nom_indice}>
              Indice 3:
            </Text>
            <Text style = {styles.contenu_indice}>
              Z = 'X'+'Y' Lille
            </Text>
            <Text style = {{alignSelf:'center'}}>Clique sur ma tête pour commencer la communication.</Text>
            <TouchableOpacity onPress={ () => this.props.navigation.navigate("PageMessagerie")} >
              <Image style = {styles.img_launch} source= {require('./Components/logo_transparent_coloured.png')}></Image>
            </TouchableOpacity>

        </View>
    )
  }
}
export default PageAccueil

const styles = StyleSheet.create({
  principal:{
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  titre_App:{
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: 'center'
  },
  nom_indice:{
    padding:10,
    color: "#0000FF",
    fontSize: 15,
    alignSelf: 'center'
  },
  contenu_indice:{
    padding: 10,
    fontSize: 10,
    alignSelf: 'center'
  },
  img_launch:{
    height: 200,
    width: 200,
    alignSelf: 'center'
  }

})