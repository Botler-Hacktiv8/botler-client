import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { YellowBox, AsyncStorage } from 'react-native';

// @ require components
import LoginPage from './src/screens/LoginPage';
import BotPage from './src/screens/BotPage';
import RegisterPage from './src/screens/RegisterPage';
import ListTaskPage from './src/screens/ListTaskPage';
import Welcome from './src/screens/Welcome';

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

const RootDrawerNav = createDrawerNavigator({
  Bot: BotPage,
  ListTask: ListTaskPage,
}, {
  initialRouteName: 'Bot'
})

export default class App extends Component {
  state = {
    isLogin: false
  }

  login = () => {
    this.setState({ isLogin: true });
  }

  logout = () => {
    this.setState({ isLogin: false });
  }

  componentDidMount = async () => {
    const UserToken = await AsyncStorage.getItem('UserToken');
    if (UserToken) {
      this.setState({ isLogin: true })
    }
  }

  render() {
    return (
      <Provider store={store}>
        { this.state.isLogin ? <RootDrawerNav screenProps={{ logout: this.logout }} /> : <RootStackNav screenProps={{ login: this.login }} /> }
      </Provider>
    );
  }
}

// @ ignore error
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Remote debugger']);