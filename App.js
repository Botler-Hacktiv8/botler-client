import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation'
import { YellowBox } from 'react-native';

// @ require components
import LoginPage from './src/screens/LoginPage';
import BotPage from './src/screens/BotPage';
import RegisterPage from './src/screens/RegisterPage';
import ListTaskPage from './src/screens/ListTaskPage'

// @ redux setup
import { Provider } from 'react-redux';
import store from './src/store/index';

// @ navigation
const RootStackNav = createStackNavigator({
  Login: LoginPage,
  Register: RegisterPage,
  Bot: BotPage,
  ListTask: ListTaskPage
}, {
  initialRouteName: 'Login',
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <RootStackNav />
      </Provider>
    );
  }
}

// @ ignore error
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Remote debugger']);