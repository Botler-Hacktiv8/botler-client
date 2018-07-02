import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  ToastAndroid
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
      password: '',
      errorMessage: '',
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
        ToastAndroid.show('Login Success', ToastAndroid.SHORT);
        this.props.screenProps.login();
        // this.props.navigation.navigate('Home')
      }).catch(() => {
        this.setState({
          errorMessage: 'email or password not match'
        })
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
          <View>
            <FormLabel>Email</FormLabel>
            <FormInput 
              placeholder="Please enter your email address..."
              onChangeText={(email) => this.setState({email})}
              autoCapitalize = 'none'
              value={this.state.email}
            />
            <FormLabel>Password</FormLabel>
            <FormInput 
              placeholder="Please enter your password..."
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              autoCapitalize = 'none'
              secureTextEntry={true}
            />
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <TouchableOpacity onPress={this.loginUser}>
              <View style={styles.loginButton}>
                <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>LOGIN</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
              <View style={styles.registerButton}>
                <Text style={{color: '#0000EE', fontSize: 16, fontWeight: 'bold' }}>SIGN UP</Text>
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
    backgroundColor: '#4885ed',
    width: 390,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 3,
    marginTop: 30,
  },
  registerButton: {
    flexDirection: 'column',
    width: 390,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
  }
});
