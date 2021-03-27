import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { render } from 'react-dom';
import { ScrollView, StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity } from 'react-native';
import CardFlip from 'react-native-card-flip';
import * as Animatable from 'react-native-animatable';
import {ClueX} from "./ClueX";
import {ClueY} from "./ClueY";
import { Transition } from './Transition';

var DomParser = require('react-native-html-parser').DOMParser

export default function App() {
  const windowHeight = Dimensions.get('window').height;

  let [Pi, setPi] = useState("");
  let [decimalPi, setDecimalPi] = useState(0);
  let [XRaw, setXRaw] = useState("");
  let [X, setX] = useState("");
  let [showDecimalPi, setShowDecimalPi] = useState(false);

  let [YUrl, setYUrl] = useState("");
  let [Y, setY] = useState("");
  let [YUrlRoot, setYUrlRoot] = useState("");

  let [cardsValues, setCardsValues] = useState([]);
  
  let [animationStep, setAnimationStep] = useState(0);

  const FetchPi = () => {
    fetch('https://uploadbeta.com/api/pi/?cached&n=300000')
    .then(x => x.text())
    .then((text) => {
        var i = text.search("036695")+6;
        setPi("3." + text.substring(3, 60) + "..." + text.substring(i-10000, i))
        var outputRaw = Number(text.substr(i, 6))
        var output = outputRaw.toString(26).toUpperCase();
        setDecimalPi(i);
        setXRaw(outputRaw);
        setX(output);
    }).catch((e) => console.error(e.message))
  }

  const TranslateURL = () => {
    var url = "https://pasteboard.co/074 065 051 049 084 077 048 046 112 110 103/"
    var res = url.split("/")
    var final = res[3].split(" ")
    var output =""
    final.forEach((e) => output += String.fromCharCode(e));
    setCardsValues(final);
    setYUrlRoot(url);//res.slice(0,3).join("/")+"/")

    setYUrl(url.replace(res[3], output));
    getClueY("https://eqrcode.co/a/RL7uJn");
  }

  const getClueY = (url) => {
    fetch(url).then(function (response) {
      return response.text();
    }).then(function (html) {
      var root = new DomParser().parseFromString(html,'text/html');
      var elem = root.getElementsByClassName("item center")[0];
      setY(String(elem).split(/[><]/)[2]); // due to an error with the node module... 
    }).catch(function (err) {
      console.warn('Something went wrong.', err);
    });
  }

  useEffect(() => {
    FetchPi();
    TranslateURL();
    
    setTimeout(() => {
      setShowDecimalPi(true)
    }, 2000);
    
  }, []);

  return (
    <View style={styles.container}>
      {animationStep == 0 && <ClueX X={X} XRaw={XRaw} Pi={Pi} showDecimalPi={showDecimalPi} decimalPi={decimalPi} onFinish={() => {setAnimationStep(animationStep+1)}}/>}
      {animationStep == 1 && <Transition title={"Indice Y"} duration={1000} fontSize={50} delay={1000} onFinish={() => setAnimationStep(animationStep+1)}/>}
      {animationStep == 2 && <ClueY url={YUrlRoot} cardsValues={cardsValues}/> }
      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    height:50,
    width: 50,
    backgroundColor: "black",
    position: "absolute"
  },
  cardContainer: {
    flex: 1,
    height: 100,
    marginHorizontal: 2,
  },
  card: {
    flex: 1,
    height: 50,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: '#FFF',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0, 1)',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
  },
});
