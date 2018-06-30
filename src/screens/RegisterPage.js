import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, AsyncStorage, ScrollView, ToastAndroid } from 'react-native';
import { FormInput, FormLabel, Icon } from 'react-native-elements';
import axios from 'axios';

class RegisterPage extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
    address: ''
  }

  registerUser = async () => {
    const { firstName, lastName, email, password } = this.state;
    const payload = {
      firstName,
      lastName,
      email,
      password
    }

    // console.log('register user', payload);
    axios.post(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/api/register`, payload)
      .then(response => {
        this._storeToken(response.headers['x-auth']);
        ToastAndroid.show('Register Success', ToastAndroid.SHORT);
        this.props.screenProps.login();
        // this.props.navigation.navigate('Home')
      }).catch(e => {
        console.log(`Register failed`, e);
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
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.registerTitle}>REGISTER</Text>
          <View style={{ flex: 0.9 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'column', width: '50%' }}>
                <FormLabel>First Name</FormLabel>
                <FormInput 
                  onChangeText={(firstName) => this.setState({firstName})}
                  value={this.state.firstName}
                />
              </View>
              <View style={{ flexDirection: 'column',  width: '50%'}}>
                <FormLabel>Last Name</FormLabel>
                <FormInput 
                  onChangeText={(lastName) => this.setState({lastName})}
                  value={this.state.lastName}
                />
              </View>
            </View>
            <FormLabel>Email</FormLabel>
            <FormInput 
              placeholder="Please enter you email address..."
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
            <FormLabel>Address</FormLabel>
            <FormInput 
              placeholder="Please enter you address address..."
              onChangeText={(address) => this.setState({address})}
              value={this.state.address}
            />
            <FormLabel>Password</FormLabel>
            <FormInput 
              placeholder="Please enter you password..."
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              secureTextEntry={true}
            />
            <FormLabel>Confirm Password</FormLabel>
            <FormInput 
              placeholder="Please re-enter you password..."
              onChangeText={(confirm) => this.setState({confirm})}
              value={this.state.confirm}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity onPress={this.registerUser}>
            <View style={styles.buttonSubmit}>
              <Icon
                name='check'
                type='font-awesome'
              />
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SUBMIT</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.buttonCancel}>
              <Icon
                name='times'
                type='font-awesome'
                color='white'
              />
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>CANCEL</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerTitle: {
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 10,
  },
  buttonCancel: {
    flexDirection: 'row',
    backgroundColor: 'red',
    width: 400,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  buttonSubmit: {
    flexDirection: 'row',
    width: 400,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#21ff46',
    marginBottom: 3,
    marginTop: 30,
    borderRadius: 20
  }
})

export default RegisterPage;