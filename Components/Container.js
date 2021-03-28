import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import PageMessagerie from './Page_Messagerie';
import PageAccueil from './Page_Accueil';

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
    }
  })

  export default createAppContainer(SearchStackNavigator)