import { StackNavigator } from 'react-navigation';

import SplashScreen from '../screens/splash-screen';
import AuthScreen from '../screens/auth-screen';
import TodoScreen from '../screens/todo-screen';

const StartupStack = StackNavigator(
  {
    SplashScreen: {screen: SplashScreen},
    AuthScreen: { screen: AuthScreen },
    TodoScreen: { screen: TodoScreen }
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

export default StartupStack;
