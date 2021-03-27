import React, {useState, useCallback, useRef, useEffect} from 'react'; 
import { 
  SafeAreaView, View, Button, RefreshControl, StyleSheet, Text,TextInput, ScrollView, Image, TouchableOpacity
} from 'react-native';
import MessageBubble from './Components/MessageBubble';
import messagesInitiauxBot from './messagesInitiauxBot.json'

var timeOut_ID = undefined;      

const App = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [inputText, setInputText] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const [isSessionOff, setSessionOff] = useState(false);
  const scrollViewRef = useRef();
  const motDefini = ["Solution","IBM","J\'aime Lille","Indice 1","Indice 2","Indice 3","Bonjour","J\'aime IBM","Qui est tu ?"]


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
      if(mine){  // Si j'envoie un message, je l'envoie aussi au Bot
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
      }, 5*1000);
    }
      let dataSource_temp = dataSource;
      dataSource_temp.push({"mine":mine,"text":textMessage,"horaire":getCurrentDate(),"isSessionOff":false});
      setDataSource(dataSource_temp);
      onRefresh();  
      submitText();
    }
  } 

  const submitText = () => {
    setInputText("")
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

  return(
    <SafeAreaView style={{flex: 1, flexDirection: 'column',paddingTop: 20, paddingBottom:10}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginTop: 20}}>
        <Button title="RETOUR"/>
        </View>
      <Text style={{paddingTop: 30, paddingBottom: 20, paddingLeft: 20, alignSelf: 'center'}}>
        Conversation avec BOTTY
      </Text>
      <Image style={{width: 50, height: 50, marginLeft: 40, marginTop: 15}}
              source={require('./Components/logo_transparent_coloured.png')}
            />
      </View>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} 
        showsVerticalScrollIndicator={false}
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
      <ScrollView horizontal={true} style={{flexDirection: 'row', height: 80, paddingTop: 20}}>
      { motDefini.length > 0 &&
          motDefini.map((mot,key) => {
            return (
              <TouchableOpacity onPress={() => refreshAndAddMessage(true,mot)} key={key}  >
                <Text style={{marginLeft: 30}}>
                  {mot}
                </Text>
              </TouchableOpacity>
            )
          })
        }
        </ScrollView>
      {/* <ScrollView horizontal={true} style={{flexDirection: 'row', height: 80, paddingTop: 20}}>
        <TouchableOpacity onPress={() => refreshAndAddMessage(true,"IBM")}>
          <Text style={{marginLeft: 30}}>IBM</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refreshAndAddMessage(true,"solution")}>
          <Text style={{marginLeft: 30}}>solution</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refreshAndAddMessage(true,"J'aime Lille")}>
          <Text style={{marginLeft: 30}}>J'aime Lille</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refreshAndAddMessage(true,"réponse")}>
          <Text style={{marginLeft: 30}}>réponse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refreshAndAddMessage(true,"énigme")}>
          <Text style={{marginLeft: 30}}>énigme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refreshAndAddMessage(true,"bonjour")}>
          <Text style={{marginLeft: 30}}>bonjour</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refreshAndAddMessage(true,"au revoir")}>
          <Text style={{marginLeft: 30}}>au revoir</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refreshAndAddMessage(true,"J'aime IBM")}>
          <Text style={{marginLeft: 30}}>J'aime IBM</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => refreshAndAddMessage(true,"Test")}>
          <Text style={{marginLeft: 30}}>Test</Text>
        </TouchableOpacity>

       </ScrollView> */}
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
        onTouchStart={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        />
        <View style={{marginRight: 20, marginTop: 20, alignSelf: 'center'}}>
          <Button
            title="Envoyer"
            onPress={() => refreshAndAddMessage(true, inputText)}
          />
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
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff",
    flex: 4,
    flexDirection: 'row'
  }
});

export default App;