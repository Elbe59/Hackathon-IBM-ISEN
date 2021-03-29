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

// Cette classe correspond à la page Accueil que l'on appelle dans Apps.js
class PageAccueil extends React.Component {
  render(){
    return (
      // Vue principale de la page
        <View style = {styles.principal}>
          {/* Affichage du titre de l'application */}
            <Image style={{width: 300, height: 50, alignSelf: 'center'}}
            source={require('../assets/titre.png')}
            />
            {/* Vue des indices */}
            <View style={{flex: 7}}>
              <Text style = {styles.nom_indice}>
                INDICE X
              </Text>
              <Text style = {styles.contenu_indice}>
                X = Trouver le nombre de 6 chiffres se positionnant après la première occurence de 036695 dans les décimales de PI. Convertir ce nombre de la base10 en base26.
              </Text>
              <Text style = {styles.nom_indice}>
                INDICE Y
              </Text>
              <Text style = {styles.contenu_indice}>
                Y = https://pasteboard.co/074 065 051 049 084 077 048 046 112 110 103/
              </Text>
              <Text style = {styles.nom_indice}>
                INDICE Z
              </Text>
              <Text style = {styles.contenu_indice}>
                Z = 'X'+'Y' Lille
              </Text>
            </View>
            {/* Vue avec le bouton pour se rendre sur les messages */}
            <View style={{flex: 4, justifyContent: 'center', flexDirection: 'row'}}>
              <Image style={{flex: 1, height: 300, alignSelf: 'center'}}
                source={require('../assets/fleche1.png')}
              />
              <TouchableOpacity style={{borderRadius: 200, backgroundColor: "#FFF", width: 145, height: 145, justifyContent: 'center', alignSelf: 'center'}} onPress={ () => this.props.navigation.navigate("PageMessagerie")} >
                <Image style = {styles.img_launch} source= {require('../assets/Bot.gif')}></Image>
              </TouchableOpacity>
              <Image style={{flex: 1, height: 300, alignSelf: 'center'}}
                source={require('../assets/fleche2.png')}
              />
            </View>
            {/* Vue du titre de fin */}
            <View style={{flex: 1}}>
              <Text style={styles.hackathon}>
                Hackathon - IBMxISEN
              </Text>
            </View>
        </View>
    )
  }
}
export default PageAccueil

const styles = StyleSheet.create({
  principal:{
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: 50,
    flex : 1
  },
  titre_App:{
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: 'center',
  },
  nom_indice:{
    marginVertical: 10,
    padding: 15,
    color: "#287BF6",
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  contenu_indice:{
    fontSize: 15,
    alignSelf: 'center',
    marginHorizontal: 20,
    textAlign: 'justify'
  },
  img_launch:{
    height: 100,
    width: 100,
    alignSelf: 'center'
  },
  hackathon:{
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0
  },
})