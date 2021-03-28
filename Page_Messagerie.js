import React, {useState, useCallback, useRef, useEffect} from 'react'; 
import { 
  SafeAreaView, View, Button, RefreshControl, StyleSheet, Text,TextInput, ScrollView, Image, TouchableOpacity
} from 'react-native';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
import MessageBubble from './Components/MessageBubble';
import messagesInitiauxBot from './messagesInitiauxBot.json';

var timeOut_ID = undefined;      

const PageMessagerie = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [inputText, setInputText] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [isSessionOff, setSessionOff] = useState(false);
  const scrollViewRef = useRef();
  const motDefini = ["Solution","IBM","J\'aime Lille","Indice 1","Indice 2","Indice 3","Bonjour","J\'aime IBM","Qui est tu ?"]
  const indice_1 = "Indice 1:\n\nX = Trouver le nombre de 6 chiffres se positionnant après la première occurence de 036695 dans les décimales de PI. Convertir ce nombre de la base10 en base26";
  const indice_2 = "Indice 2:\n\nY = https://pasteboard.co/074 065 051 049 084 077 048 046 112 110 103/";
  const indice_3 = "Indice 3:\n\nZ = 'X'+'Y' Lille";


  const url = "https://nodejs-express-app-cxlkb-2020-11-30.eu-gb.mybluemix.net/ai"

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
  useEffect(() => {
    getFirstMessages();
    getSession(url);
  }, []) 
  
  const getFirstMessages = () => {
    let data = messagesInitiauxBot;
    for(let i = 0; i < data.length; i++)
      data[i].horaire = getCurrentDate();
    setDataSource(data);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(100).then(() => setRefreshing(false)); //Don't need to wait to load the messages
  }, []);

  const refreshAndAddMessage = (mine,textMessage) =>{
    if(isSessionOff){
      getSession();
      setSessionOff(false);
    }
    if(textMessage!=""){
      let dataSource_temp = dataSource;
      dataSource_temp.push({"mine":mine,"text":textMessage,"horaire":getCurrentDate(),"isSessionOff":false});
      setDataSource(dataSource_temp);
      onRefresh(); 
      if(mine){  // Si j'envoie un message, je l'envoie aussi au Bot sauf si indice1-2-3 ou réponse.
        sendMessageToBot(textMessage);
      if(timeOut_ID != undefined){
        clearTimeout(timeOut_ID);
      }
      timeOut_ID = setTimeout(() => {
        setSessionOff(true);
        dataSource.slice(2).map((data) => {
          data.isSessionOff = true;
        })
        onRefresh();
      }, 5*60*1000);
    }
      setInputText("")
    }
  } 



  const getSession = () =>{
    fetch(url + '/session').then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then((responseJson) => {
      setSessionId(responseJson.response);
    })
    .catch((error) => {
      console.log(error)
    });
  }    

  const sendMessageToBot = (messageText) =>{
    if(messageText == "Solution"){
      navigation.navigate('Solution');
    }
    else if(messageText == "Indice 1"){
      refreshAndAddMessage(false,indice_1);
    }
    else if(messageText == "Indice 2"){
      refreshAndAddMessage(false,indice_2);
    }
    else if(messageText == "Indice 3"){
      refreshAndAddMessage(false,indice_3);
    }
    else{
      fetch(url, { 
        method: "POST", 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({sessionId: sessionId, reqText: messageText})
        })
      .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong');
      }
      })
      .then((responseJson) => {
        refreshAndAddMessage(false,responseJson.response);
      })
      .catch((error) => {
        console.log(error)
      });
    }

  }

  return(
    <SafeAreaView style={{flex: 1, flexDirection: 'column',paddingTop: 20, paddingBottom:10}}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate("PageAccueil")} style={[styles.btn_send_return,{marginLeft:10}]}>
          <Text style = {{fontSize:15}}>RETOUR</Text>
        </TouchableOpacity>
        <Text style={{margin:20, alignSelf: 'center',fontSize:15}}>
            Conversation avec BOTTY
        </Text>
        <Image style={{width: 50, height: 50,marginTop:7,marginLeft:5}}
            source={require('./Components/logo_transparent_coloured.png')}
        />
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} 
        showsVerticalScrollIndicator={true}
      >
        { dataSource.length > 0 &&
          dataSource.map((message, index) => {
            return (
              <MessageBubble
                key = {index}
                mine = {message.mine}
                text = {message.text}
                horaire = {message.horaire}
                isSessionOff = {message.isSessionOff}
              />
            )
          })
        }

      </ScrollView>
      <View>
        <ScrollView horizontal={true} style={styles.horizontal_scroll} keyboardShouldPersistTaps='always'>
        { motDefini.length > 0 &&
            motDefini.map((mot,key) => {
              return (
                <TouchableOpacity style = {styles.horizontal_scroll_content} onPress={() => refreshAndAddMessage(true,mot)} key={key}  >
                  <Text style = {{fontWeight: 'bold'}}>
                    {mot}
                  </Text>
                </TouchableOpacity>
              )
            })
          }
          </ScrollView>
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
          <TextInput
          style={styles.input}
          placeholder='Ajouter votre texte ...'
          onChangeText={(input) => setInputText(input)}
          value={inputText}
          onKeyPress={ (event) => {
            if(event.nativeEvent.key == "Enter"){
              refreshAndAddMessage(true, inputText)
            }
          }}
          onTouchStart={() => setTimeout(() => scrollViewRef.current.scrollToEnd({ animated: true }), 500)}
          onChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          />
          <TouchableOpacity onPress={() => refreshAndAddMessage(true, inputText)} style={styles.btn_send_return}>
            <Text style = {{fontSize:15}}>ENVOYER</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const getCurrentDate = () => {
  var dateHours = new Date().getHours();
  var dateMin = new Date().getMinutes();
  if (dateMin.toLocaleString().length < 2){
    dateMin = '0'+dateMin;
  }
  if (dateHours.toLocaleString().length < 2){
    dateHours = '0'+dateHours;
  }
  let date = dateHours + ':' + dateMin;
  return date;
};

const styles = StyleSheet.create({
  input:{
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
    padding: 6,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff",
    flex: 4,
    flexDirection: 'row'
  },
  horizontal_scroll:{
    flexDirection: 'row',
    height: 50,
    marginBottom:5
  },
  horizontal_scroll_content:{
    backgroundColor: "#dddddd",
    padding:10,
    paddingTop:12,
    borderWidth:1,
    borderColor:"rgba(128,128,128,0.1)"
  },
  btn_send_return:{
    marginRight: 10,
    padding:5,
    alignSelf: 'center',
    borderRadius:30,
    borderWidth:2,
    backgroundColor:"#1C96F9"
  }
});

export default PageMessagerie;