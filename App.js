import React, {useState, useCallback, useRef, useEffect} from 'react'; 
import { 
  SafeAreaView, View, Button, RefreshControl, StyleSheet, Text,TextInput, ScrollView
} from 'react-native';
import MessageBubble from './Components/MessageBubble';
import messagesInitiauxBot from './messagesInitiauxBot.json'


const App = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [inputText, setInputText] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const scrollViewRef = useRef();

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
    if(textMessage!=""){
      if(mine){  // Si j'envoie un message, je l'envoie aussi au Bot
        sendMessageToBot(textMessage);
      }
      let dataSource_temp = dataSource;
      dataSource_temp.push({"mine":mine,"text":textMessage,"horaire":getCurrentDate()});
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
    <SafeAreaView style={{flex: 1, flexDirection: 'column',paddingTop: 20,paddingBottom:10}}>        
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        style={{flex: 2}} 
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} 
        showsVerticalScrollIndicator={false}
      >
        { dataSource.length > 0 &&
          dataSource.map((message, index) => {
            
            console.log(message);

            return (
              <MessageBubble
                key = {index}
                mine = {message.mine}
                text = {message.text}
                horaire = {message.horaire}
              />
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
    marginTop: 20,
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