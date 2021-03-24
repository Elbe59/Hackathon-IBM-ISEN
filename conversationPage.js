import React from 'react'; 
import { 
  SafeAreaView, View,
} from 'react-native';


import MessageBubble from './Components/MessageBubble'

class App extends React.Component {
  render(){
    return(
        <SafeAreaView>
          <MessageBubble
            mine
            text = "Coucou"
          />
          <MessageBubble
            text = "Salut !"
          />
          <MessageBubble
            text = "ça va ?"
          />
          <MessageBubble
           mine
           text="Bof et toi?"
          />
        </SafeAreaView>
    )
  }
}

export default App;