import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

import Svg, { Path } from 'react-native-svg'
import { moderateScale } from 'react-native-size-matters'

class MessageBubble extends React.Component {
  render(){
    return (
      <View style={[
          styles.message,
          this.props.mine ? styles.mine : styles.not_mine
        ]}
      >
        
        <View
          style={styles.cloud_date}>
        <View
          style={[
            styles.cloud,
            {
              backgroundColor: this.props.mine ? '#007aff' : '#dddddd'
            }
          ]}
        >
          {
            this.props.image
            ?
              <Image
                style={{alignSelf: this.props.mine ? 'flex-end' : 'flex-start' }}
                borderRadius={10}
                source={this.props.image}
              />
            :
              null
          }
          {
            this.props.text 
            ?
              <Text
                style={[
                  styles.text,
                  {
                    color: this.props.mine ? 'white' : 'black'
                  }
                ]}
              >
                {this.props.text}
              </Text>
            :
              null
          }
          <View
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
                  fill={this.props.mine ? '#007AFF' : '#dddddd'}
                  x="0"
                  y="0"
              />
            </Svg>
            
          </View>
        </View>
        <View style={[{flexDirection: this.props.mine ?  'row-reverse' : 'row'}]}>
        {!this.props.mine && 
            <Image style={[styles.img_circle ,{marginLeft: this.props.mine ? 0:-35}]}
              source= {require('./logo_transparent_coloured.png')}
            >
            </Image>
          }
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
    marginVertical: moderateScale(7,2)
  },
  not_mine: {
    marginLeft: 40,
  },
  mine: {
    alignSelf: 'flex-end',
    marginRight: 40
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
    fontSize: 17,
    lineHeight: 22,
    maxWidth:200  // Fait varier la taille max des msg avant passage de ligne
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
    marginTop:5,
    textAlign: 'left',
    marginLeft: 10

  },
  date_right: {
    marginTop:5,
    textAlign: 'right',
    marginRight: 10

  },

  img_circle:{
    marginTop: -5,
    borderRadius: 50,
    height:50,
    width:50,
    backgroundColor: 'rgba(52,52,52,0.5)'
  }



})