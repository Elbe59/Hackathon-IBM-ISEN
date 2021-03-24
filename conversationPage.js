import React from 'react'; 
import { 
  SafeAreaView, View
} from 'react-native';

import MessageBubble from './Components/MessageBubble'

class App extends React.Component {
  render(){
    return(
        <SafeAreaView>
          <MessageBubble
            mine
            text = "Coucou"
            date = {getCurrentDate()}
          />
          <MessageBubble
            text = "Salut !"
            date = {getCurrentDate()}
          />
          <MessageBubble
            text = "ça va ?"
            date = {getCurrentDate()}
          />
          <MessageBubble
           mine
           text="Bof et toi?"
           date = {getCurrentDate()}
          />
        </SafeAreaView>
    )
  }
}

const getCurrentDate = () => {
  var dateHours = new Date().getHours();
  var dateMin = new Date().getMinutes();
  if (dateMin.toString.length < 1){
    dateMin = '0'+dateMin;
  }
  if (dateHours.toString.length < 1){
    dateHours = '0'+dateHours;
  }

  let date = dateHours + ':' + dateMin;
  console.log(date);
  return date;
}

export default App;