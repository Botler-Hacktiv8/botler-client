import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
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
        this._storeToken(response.headers['x-auth']);
        this.props.screenProps.login();
        // this.props.navigation.navigate('Home')
      }).catch(e => {
        console.log(`Failed login`, e);
      })
  }

  _storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('UserToken', token);
    } catch (e) {
      console.log('Failed save user token!', e);
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            BOTLER
          </Text>
          <View style={{ flex: 0.9, margin: 1}}>
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
          <TouchableOpacity onPress={this.loginUser}>
            <View style={styles.loginButton}>
              <Text style={{ color: 'orange', fontSize: 20, fontWeight: 'bold' }}>LOGIN</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <View style={styles.registerButton}>
              <Text style={{color: '#0000EE', fontSize: 16}}>SIGN UP</Text>
            </View>
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
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcome: {
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 10,
    fontWeight: 'bold'
  },
  loginButton: {
    flexDirection: 'column',
    borderColor: 'orange',
    borderWidth: 3,
    width: 400,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 3,
    marginTop: 30,
  },
  registerButton: {
    flexDirection: 'column',
    borderColor: 'orange',
    width: 400,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20
  }
});
