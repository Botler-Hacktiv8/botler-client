import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

// @ redux config
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getBotlerDataAction } from './../store/botler/action';
import { black } from 'ansi-colors';
import axios from 'axios';

class Welcome extends Component {

  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    this.props.getBotlerDataAction();
  }

  loginUser = async () => {
    const { email, password } = this.state;
    const payload = {
      email,
      password
    }

    axios.post(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/api/login`, payload)
      .then(response => {
        console.log(`Success login`, response.headers['x-auth']);
        this._storeData(response.headers['x-auth']);
        this.props.navigation.navigate('Bot')
      }).catch(e => {
        console.log(`Failed login`, e);
      })
  }

  _storeData = async (token) => {
    try {
      await AsyncStorage.setItem('@UserToken', token);
    } catch (e) {
      console.log('Failed save user token!', error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          BOTLER
        </Text>
        <View style={{flex: 0.4}}>
          <FormLabel>Email</FormLabel>
          <FormInput 
            placeholder="Please enter your email address..."
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <FormLabel>Password</FormLabel>
          <FormInput 
            placeholder="Please enter your password..."
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            secureTextEntry={true}
          />
        </View>
        <View style={{flex: 0.1}}>
          <TouchableOpacity onPress={this.loginUser}>
            <Text style={{ color: 'orange', fontSize: 20, fontWeight: 'bold' }}>LOGIN</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.1}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={{color: '#0000EE', fontSize: 16}}>Don't have an account yet? Register now!</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  botlerData: state.botlerState.botlerData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBotlerDataAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

// @ style

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 10,
    fontWeight: 'bold'
  },
});
