import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  TextInput,
  ScrollView
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import StartupStack from './navigation/routes';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAppReady: false,
      isLoggedIn: false,
      idToken: null,
      username: null
    };

  }

  componentDidMount() {
    this.setState({isAppReady: true});

    if (this.state.isAppReady) {
      if (this.state.isLoggedIn) {
        this.navigateTo('TodoScreen');
      } else {
        this.navigateTo('AuthScreen');
      }
    }
  }

  navigateTo = (routeName) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
    });
    this.props.navigation.dispatch(actionToDispatch);
  };

  setIdToken = (idToken) => {
    if (idToken === null) {
      this.setState({
        idToken: null,
        username: null
      });
    } else {
      // Set token and user information
      const decoded = jwtDecode(idToken);
      this.setState({
        idToken,
        username: decoded.user,
      });
    }
  };

  onLoginChange = () => {
    this.setState({isLoggedIn: !this.state.isLoggedIn});
  }

  render() {
    return (
      <StartupStack
        screenProps={
          {
            isAppReady: this.state.isAppReady,
            isLoggedIn: this.state.isLoggedIn,
            idToken: this.state.idToken,
            username: this.state.username,
            setIdToken: this.setIdToken,
            onLoginChange: this.onLoginChange,
          }
        }
      />
    );
  }
}

Expo.registerRootComponent(App);
