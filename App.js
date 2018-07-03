import React, { Component } from 'react';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { YellowBox, AsyncStorage } from 'react-native';

// @ require components
import LoginPage from './src/screens/LoginPage';
import BotPage from './src/screens/BotPage';
import RegisterPage from './src/screens/RegisterPage';
import ListTaskPage from './src/screens/ListTaskPage';
import TaskDetailPage from './src/screens/TaskDetailPage';
import AddTaskPage from './src/screens/AddTaskPage';
import UpdateTaskPage from './src/screens/UpdateTaskPage';
import ConfirmPage from './src/screens/ConfirmPage';
import Logout from './src/screens/Logout'
import Welcome from './src/screens/Welcome';

// @ redux setup
import { Provider } from 'react-redux';
import store from './src/store/index';

// @ navigation
const RootStackNav = createStackNavigator({
  Login: LoginPage,
  Register: RegisterPage,
}, {
  initialRouteName: 'Login',
  headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})

// @ drawer navigation
const RootDrawerNav = createDrawerNavigator({
  Home: BotPage,
  ListTask: ListTaskPage,
  Detail: TaskDetailPage,
  Confirm: ConfirmPage,
  AddTask: AddTaskPage,
  UpdateTask: UpdateTaskPage,
  Logout: Logout
}, {
  initialRouteName: 'Home'
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