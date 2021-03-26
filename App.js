import React, {useState, useCallback, useRef} from 'react'; 
import { 
  SafeAreaView, View, Button, RefreshControl, StyleSheet, Text,TextInput, ScrollView
} from 'react-native';
import MessageBubble from './Components/MessageBubble';
import listMessages from './messages.json'


const App = () => {
      const [refreshing, setRefreshing] = useState(false);
      const [inputText, setInputText] = useState("");

      const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
      const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(100).then(() => setRefreshing(false)); //Don't need to wait to load the messages
      }, []);

    const refreshAndAddMessage = (mine) =>{
      if(inputText!=""){
        onRefresh();
        dataSource.push({"mine":mine,"text":inputText,"horaire":getCurrentDate()});
        submitText();
      }
    }
    const submitText = () => {
      setInputText("");
    }

    var dataSource = listMessages;

    return(
        <SafeAreaView style={{flex: 1, flexDirection: 'column',paddingTop: 10,paddingBottom:10}}>
        <Button onPress={() => refreshAndAddMessage()}
        title="Send Message"/>
        
            <ScrollView 
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}/>
              } 
              showsVerticalScrollIndicator={false}
            >
            {
              dataSource.map(addMessageBubble)
            }
          </ScrollView>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}}>
          <TextInput
          style={styles.input}
          placeholder='Ajouter votre texte ...'
          onChangeText={(input) => setInputText(input)}
          value={inputText}
          onKeyPress={ (event) => {
            if(event.nativeEvent.key == "Enter"){
              refreshAndAddMessage(true)
            } 
        }}
          />
          <Button
          title="Envoyer"
          onPress={() => refreshAndAddMessage(true)}/>
        </View>
        </SafeAreaView>
    )
  }
  const ItemView = (item) => {
    return (
      // Flat List Item
      <View>
        {item.id}. {item.title}. {item.body}
      </View>
    );
  };
const addMessageBubble = (message) =>{
    return(
    <MessageBubble
        mine = {message.mine}
        text = {message.text}
        horaire = {message.horaire} //getCurrentDate()}
    />
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
}

const styles = StyleSheet.create({
  input:{
   marginLeft: 20,
   marginRight: 20,
   padding: 10,
   borderWidth: 0.5,
   borderRadius: 4,
   backgroundColor: "#fff",
   flex: 1
  }
})

export default App;