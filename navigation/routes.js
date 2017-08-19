import { StackNavigator } from 'react-navigation';

import AuthScreen from '../screens/auth-screen';
import TodoScreen from '../screens/todo-screen';

const StartupStack = StackNavigator(
  {
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
