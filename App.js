import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation'
import { YellowBox } from 'react-native';

// @ require components
import Welcome from './src/screens/Welcome';
import BotPage from './src/screens/BotPage'

// @ redux setup
import { Provider } from 'react-redux';
import store from './src/store/index';

// @ navigation
const RootStackNav = createStackNavigator({
  Welcome: Welcome,
  Bot: BotPage
}, {
  initialRouteName: 'Welcome',
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