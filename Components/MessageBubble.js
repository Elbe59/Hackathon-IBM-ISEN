// Import
import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

import Svg, { Path } from 'react-native-svg'
import { moderateScale } from 'react-native-size-matters'

// Nous avons décidé de créer un component MessageBubble qui sera appelé a chaque ajout d'un message dans le conversation.
// que ce message provienne du Bot ou bien de l'utilisateur. Chaque message va prendre 4 propriétés: 
// - mine : Cette propriété permet de définir si le message provient du Bot ou de l'utilisateur.
// - text : Cette propriété contient le texte (le corps du message).
// - horaire : Contient l'heure d'envoie du message.
// - isSessionOff : Défini si la session du message est fini ou non (Au bout de 5 min -> Session OFF => Message grisé).
// Chaque MessageBubble prend toute la width de l'écran et a une hauteur défini.
// Les messages du Bot sont mis à gauche avec l'image du BOT tandis que les messages utilisateur sont placés à droite.

class MessageBubble extends React.Component {
  render(){
    return (
      <View style={[
          styles.message,
          this.props.mine ? styles.mine : styles.not_mine,
        ]}
      >
        <View
           
          style={styles.cloud_date}>
        <View
          style={[
            styles.cloud,
            {backgroundColor: (this.props.mine && !this.props.isSessionOff) ? '#287BF6' : '#dddddd'} //Couleur de la bulle message dépendant de l'envoyeur et si la session est OFF.
          ]}
        >
          {
            this.props.text 
            ?
              <Text
                style={[
                  styles.text,
                  {
                    color: (this.props.mine || this.props.isSessionOff) ? 'white' : 'black' //Couleur du texte dépendant de l'envoyeur et si la session est OFF.
                  },
                ]}
              >
                {this.props.text}
              </Text>
            :
              null
          }
          <View  // Construction des goutelettes en fonction des propriétés du composant MessageBubble.
            style={[
              styles.arrow_container,
              this.props.mine ? styles.arrow_right_container : styles.arrow_left_container
            ]}
          >
            <Svg
              style={this.props.mine ? styles.arrow_right : styles.arrow_left}
              width={moderateScale(15.5, 0.6)}
              height={moderateScale(17.5, 0.6)}
              viewBox="32.484 17.5 15.515 17.5"
              enableBackground="new 32.485 17.5 15.515 17.5"
            >
              <Path
                  d={ this.props.mine 
                      ? 
                      "M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                      : 
                      "M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                      
                  }
                  fill={(this.props.mine && !this.props.isSessionOff) ? '#287BF6' : '#dddddd'}
                  x="0"
                  y="0"
              />
            </Svg>
            
          </View>
        </View>
        {/* Ajout d'une Image (Icone du BOT) à gauche des messages provenant du BOT. */}
        <View style={[{flexDirection: this.props.mine ?  'row-reverse' : 'row'}]}> 
        {!this.props.mine && 
            <Image style={[styles.img_circle ,{marginLeft: this.props.mine ? 0:-40}]}
              source= {require('../assets/iconbot.png')}
            >
            </Image>
          }
          {/* Ajout de l'horaire auquel le message a été envoyé. */}
          <Text style={this.props.mine ? styles.date_right : styles.date_left }>
              {this.props.horaire}
          </Text>
        </View>
        </View>
      </View>
    )
  }
}
export default MessageBubble

const styles = StyleSheet.create({
  message: {
    flexDirection: 'row',
    marginVertical: moderateScale(4,2)
  },
  not_mine: {
    marginLeft: 50,
  },
  mine: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  cloud: {
    maxWidth: moderateScale(250,2),
    paddingHorizontal: moderateScale(10,2),
    paddingTop: moderateScale(5,2),
    paddingBottom: moderateScale(7,2),
    borderRadius: 20,
    flexDirection: 'row'
  },
  text: {
    paddingTop: 3,
    fontSize: 15,
    lineHeight: 22,
    maxWidth:200,
  },
  arrow_container: {
    position:'absolute',
    top: 0,
    left:0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1
  },
  arrow_left_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  arrow_right_container: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  arrow_left: {
    left: moderateScale(-6, 0.5),
  },
  arrow_right: {
    right: moderateScale(-6, 0.5)
  },
  cloud_date: {
    flexDirection: 'column'
  },
  date_left: {
    marginTop: 5,
    textAlign: 'left',
    marginLeft: 10,
    minWidth: 40
  },
  date_right: {
    marginTop:5,
    textAlign: 'right',
    marginRight: 10,
    minWidth: 40
  },

  img_circle:{
    marginTop: -8,
    borderRadius: 50,
    height:38,
    width:38,
    backgroundColor: "#287BF63F"
  }

})