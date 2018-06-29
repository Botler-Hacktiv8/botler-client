import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

// @ redux config
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getBotlerDataAction } from './../store/botler/action';
import { black } from 'ansi-colors';

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

  loginUser = () => {
    //Action to redux login
    //If success then change navigation to botpage

    this.props.navigation.navigate('Bot')
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
