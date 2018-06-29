import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { FormInput, FormLabel, Icon } from 'react-native-elements'

class RegisterPage extends Component {

  constructor(){
    super()
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirm: ''
    }
  }

  registerUser = () => {
    //Register new user
    //Connect to redux
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.registerTitle}>REGISTER</Text>
          <View style={{ flex: 0.9 }}>
            <FormLabel>First Name</FormLabel>
            <FormInput 
              placeholder="Please enter your first name..."
              onChangeText={(firstname) => this.setState({firstname})}
              value={this.state.firstname}
              secureTextEntry={true}
            />
            <FormLabel>Last Name</FormLabel>
            <FormInput 
              placeholder="Please enter your last name..."
              onChangeText={(lastname) => this.setState({lastname})}
              value={this.state.lastname}
              secureTextEntry={true}
            />
            <FormLabel>Email</FormLabel>
            <FormInput 
              placeholder="Please enter you email address..."
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              secureTextEntry={true}
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
    justifyContent: 'center'
  },
  buttonSubmit: {
    flexDirection: 'row',
    width: 400,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#21ff46',
    marginBottom: 2
  }
})

export default RegisterPage;