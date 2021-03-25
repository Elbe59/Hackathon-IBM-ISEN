import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';

var DomParser = require('react-native-html-parser').DOMParser

export default function App() {
  let scrollViewRef = React.createRef();
  const windowHeight = Dimensions.get('window').height;

  let [Pi, setPi] = useState("");
  let [decimalPi, setDecimalPi] = useState(0);
  let [XRaw, setXRaw] = useState("");
  let [X, setX] = useState("");

  let [YUrl, setYUrl] = useState("");
  let [Y, setY] = useState("");

  FetchPi = () => {
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

        console.log(text);
    }).catch((e) => console.error(e.message))
  }

  TranslateURL = () => {
    var url = "https://pasteboard.co/074 065 051 049 084 077 048 046 112 110 103/"
    var res = url.split("/")
    var final = res[3].split(" ")
    var output =""
    final.forEach((e) => output += String.fromCharCode(e));
    setYUrl(url.replace(res[3], output));
    getClueY("https://eqrcode.co/a/RL7uJn");
  }

  getClueY = (url) => {
    fetch(url).then(function (response) {
      return response.text();
    }).then(function (html) {
      var root = new DomParser().parseFromString(html,'text/html');
      var elem = root.getElementsByClassName("item center")[0];
      setY(String(elem).split(/[><]/)[2]); // due to an error witht the node module... 
    }).catch(function (err) {
      console.warn('Something went wrong.', err);
    });
  }

  useEffect(() => {
    FetchPi();
    TranslateURL();
    setTimeout(() => {
      try {
        scrollViewRef.scrollToEnd({animated: true, duration:10000});
      } catch (error) {
        console.log(error)
      }
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={(r) => scrollViewRef=r}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      >
        <View style={{alignItems:"center", justifyContent:"center"}}>
          <Text>We have:</Text>
          <Text>X = {X}</Text>
          <Text>Y = {YUrl} = {Y}</Text>
          <Text>Z = 'X'+'Y' Lille</Text>
          <Text></Text>
          <Text>Thus:</Text>
          <Text>Z = {X}+{Y} Lille</Text>
          <Text>{XRaw}</Text>
        </View>
        <Text style={{textAlign:"justify", fontSize:36, fontWeight:"600"}}>
          {Pi}
          <Text style={{fontSize:36, fontWeight:"bold", color:"red"}}>{XRaw}</Text>
        </Text>
        <Text style={{textAlign:"center", fontSize:22, marginTop:25,   paddingBottom:windowHeight/2.5}}>{decimalPi}th decimal of π</Text>
      </ScrollView>

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
});
