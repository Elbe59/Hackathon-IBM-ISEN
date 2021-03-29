import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import PageMessagerie from './Page_Messagerie';
import PageAccueil from './Page_Accueil';
import {Solution} from "./Solution"


// Ce conteneur définit les différentes pages de notre application afin de pouvoir naviguer entre celles-ci
// headerShow: false permet d'enlever l'entête des automatique des pages (leur titre et une bordure).
const SearchStackNavigator = createStackNavigator({
  PageAccueil: {
    screen: PageAccueil,
    navigationOptions: {
      headerShown: false
    }
  },
  PageMessagerie: {
    screen: PageMessagerie,
    navigationOptions: {
      headerShown: false
    }
  },
  Solution: {
    screen: Solution,
    navigationOptions: {
      headerShown: false
    }
  }
})
export default createAppContainer(SearchStackNavigator)