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

    const scrollViewRef = useRef();

    return(
      <SafeAreaView style={{flex: 1, flexDirection: 'column',paddingTop: 20,paddingBottom: 10}} >
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            style={{flex: 2}}
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
        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
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
        <View style={{marginRight: 20, marginTop: 20, alignSelf: 'center'}}>
          <Button
          title="Envoyer"
          onPress={() => refreshAndAddMessage(true)}/>
        </View>
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

const addMessageBubble = (message) => {
  return(
  <MessageBubble
      mine = {message.mine}
      text = {message.text}
      horaire = {message.horaire} //getCurrentDate()}
  />
  )};

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