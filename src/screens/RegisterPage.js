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
    address: '',
    errorMessage: ''
  }

  registerUser = async () => {
    const { firstName, lastName, email, address, password, confirm } = this.state;

    if (password !== confirm) {
      this.setState({
        errorMessage: 'confirm password don\'t match'
      });
    } else {
      const payload = {
        firstName,
        lastName,
        email,
        password,
        address
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
          this.setState({
            // errorMessage: e.response.data.message
            errorMessage: 'register failed, please input data correctly!',
          })
        })
    }
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
      <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'center' }}>
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
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
          </View>
          <TouchableOpacity onPress={this.registerUser}>
            <View style={styles.buttonSubmit}>
              <Icon
                name='check'
                type='font-awesome'
                color='white'
              />
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}> SUBMIT</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.buttonCancel}>
              <Icon
                name='times'
                type='font-awesome'
                color='red'
                size={18}
              />
              <Text style={{color: 'red', fontSize: 18, fontWeight: 'bold'}}> CANCEL</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>
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
    paddingTop: 20,
    fontWeight: 'bold'
  },
  buttonCancel: {
    flexDirection: 'row',
    // backgroundColor: 'red',
    width: 390,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  buttonSubmit: {
    flexDirection: 'row',
    backgroundColor: '#4885ed',
    width: 390,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 30,
  },
})

export default RegisterPage;