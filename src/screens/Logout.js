import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import axios from 'axios';

// @ redux config
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { resetChatData } from './../store/botler/action';
import { resetUserData } from './../store/user/action'
import { resetTaskData } from './../store/task/action'

class Logout extends Component {
  componentWillMount() {
    this.logout()
  }

  // @ remove token and move to login page
  logout = () => {
    let self = this
    axios.delete(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/api/logout`, { headers: { 'x-auth': this.props.token } })
    .then(() => {
      self._removeToken();
      self._resetState();
      this.props.screenProps.logout();
        // this.props.navigation.goBack();
      }).catch(e => {
        console.log('Failed to logout!', e);
      });
  }

   // @ remove token from local storage
   _removeToken = async () => {
    try {
      await AsyncStorage.removeItem('UserToken');
    } catch(e) {
      console.log('Failed remove UserToken from storage');
    }
  }
  
  _resetState = () => {
    this.props.resetChatData()
    this.props.resetUserData()
    this.props.resetTaskData()
  }

  render() {
    return (
      <View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  resetChatData,
  resetTaskData,
  resetUserData
}, dispatch);

const mapStateToProps = (state) => ({
  token: state.userState.userData.token
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);