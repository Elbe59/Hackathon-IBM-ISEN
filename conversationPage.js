import React, {useState, useCallback} from 'react'; 
import { 
  SafeAreaView, View, Button
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RefreshControl, StyleSheet, Text } from 'react-native';
import MessageBubble from './components/MessageBubble';
import listMessages from './messages.json'


const App = () => {

      const [refreshing, setRefreshing] = useState(false);

      const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
      const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false)); //Don't need to wait in our case
      }, []);

    const refreshAndAddMessage = () =>{
      onRefresh();
      dataSource.push({"mine":true,"text":"vhkdrel elvzjv","horaire":"10:02"});
    }

    var dataSource = listMessages;


    return(
        <SafeAreaView>
        <Button onPress={() => refreshAndAddMessage()}
        title="Send Message"/>
        
            <ScrollView 
            refreshControl={
              <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}/>
            }
            >
            {
              dataSource.map(addMessageBubble)
            }
            <MessageBubble
              mine
              text = "CoucoursgdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF"
              horaire = {getCurrentDate()}
            />
            <MessageBubble
              text = "Salut !"
              horaire = {getCurrentDate()}
            />
            <MessageBubble
              text = "ça va gdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF?"
              horaire = {getCurrentDate()}
            />
            <MessageBubble
            mine
            text="Bof et toi?"
            horaire = {getCurrentDate()}
            />
            <MessageBubble
              mine
              text = "CoucoursgdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF"
              horaire = {getCurrentDate()}
            />
            <MessageBubble
              text = "Salut !"
              horaire = {getCurrentDate()}
            />
            <MessageBubble
              text = "ça va gdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF?"
              horaire = {getCurrentDate()}
            />
            <MessageBubble
            mine
            text="Bof et toi?"
            horaire = {getCurrentDate()}
            />
            <MessageBubble
              mine
              text = "CoucoursgdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF"
              horaire = {getCurrentDate()}
            />
            <MessageBubble
              text = "Salut !"
              horaire = {getCurrentDate()}
            />
            <MessageBubble
              text = "ça va gdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF?"
              horaire = {getCurrentDate()}
            />
            <MessageBubble
            mine
            text="Bof et toi?"
            horaire = {getCurrentDate()}
            />
            <MessageBubble
              mine
              text = "CoucoursgdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF"
              date = {getCurrentDate()}
            />
            <MessageBubble
              text = "Salut !"
              horaire = {getCurrentDate()}
            />
            <MessageBubble
              text = "ça va gdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF?"
              horaire = {getCurrentDate()}
            />
            <MessageBubble
            mine
            text="Bof et toi?"
            horaire = {getCurrentDate()}
            />
          </ScrollView>
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

export default App;