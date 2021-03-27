import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import PageMessagerie from './PageMessagerie';
import PageAccueil from './PageAccueil';

const SearchStackNavigator = createStackNavigator({
    PageAccueil: {
      screen: PageAccueil,
      navigationOptions: {
        header: false
      }
    },
    PageMessagerie: {
        screen: PageMessagerie,
        navigationOptions: {
          header: false
        }
    }
  })

  export default createAppContainer(SearchStackNavigator)