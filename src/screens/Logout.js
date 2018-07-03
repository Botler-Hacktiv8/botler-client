import React, { Component } from 'react';
import { AsyncStorage, View } from 'react-native';
import axios from 'axios';

// @ redux config
import { connect } from 'react-redux';

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


  render() {
    return (
      <View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.userState.userData.token
});

export default connect(mapStateToProps, null)(Logout);