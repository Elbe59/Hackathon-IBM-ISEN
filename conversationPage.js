import React from 'react'; 
import { 
  SafeAreaView, View
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import MessageBubble from './Components/MessageBubble'

class App extends React.Component {
  render(){
    return(
        <SafeAreaView>
            <ScrollView style={{paddingBottom:100}}>
            <MessageBubble
              mine
              text = "CoucoursgdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF"
              date = {getCurrentDate()}
            />
            <MessageBubble
              text = "Salut !"
              date = {getCurrentDate()}
            />
            <MessageBubble
              text = "ça va gdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF?"
              date = {getCurrentDate()}
            />
            <MessageBubble
            mine
            text="Bof et toi?"
            date = {getCurrentDate()}
            />
            <MessageBubble
              mine
              text = "CoucoursgdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF"
              date = {getCurrentDate()}
            />
            <MessageBubble
              text = "Salut !"
              date = {getCurrentDate()}
            />
            <MessageBubble
              text = "ça va gdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF?"
              date = {getCurrentDate()}
            />
            <MessageBubble
            mine
            text="Bof et toi?"
            date = {getCurrentDate()}
            />
            <MessageBubble
              mine
              text = "CoucoursgdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF"
              date = {getCurrentDate()}
            />
            <MessageBubble
              text = "Salut !"
              date = {getCurrentDate()}
            />
            <MessageBubble
              text = "ça va gdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF?"
              date = {getCurrentDate()}
            />
            <MessageBubble
            mine
            text="Bof et toi?"
            date = {getCurrentDate()}
            />
            <MessageBubble
              mine
              text = "CoucoursgdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF"
              date = {getCurrentDate()}
            />
            <MessageBubble
              text = "Salut !"
              date = {getCurrentDate()}
            />
            <MessageBubble
              text = "ça va gdtfdfilkujyfdgsfqdQSWDXTFYGUIHOLKJHGFDSERQRERTYFYOGUIJNHGRRDFYIUIKYJNHGREFREGTSTDUTHGFVDSDSFDF?"
              date = {getCurrentDate()}
            />
            <MessageBubble
            mine
            text="Bof et toi?"
            date = {getCurrentDate()}
            />
          </ScrollView>
        </SafeAreaView>
    )
  }
}

const getCurrentDate = () => {
  var dateHours = new Date().getHours();
  var dateMin = new Date().getMinutes();
  console.log(dateMin);
  if (dateMin.toLocaleString().length < 2){
    dateMin = '0'+dateMin;
  }
  if (dateHours.toLocaleString().length < 2){
    dateHours = '0'+dateHours;
  }

  let date = dateHours + ':' + dateMin;
  console.log(date);
  return date;
}

export default App;