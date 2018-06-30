import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, ScrollView, AsyncStorage } from 'react-native'
import { Icon, FormInput } from 'react-native-elements';
import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';
import axios from 'axios'
import PushNotification from 'react-native-push-notification'
import Geocoder from 'react-native-geocoder'
import Permissions from 'react-native-permissions'
import distance from 'google-distance'

// @ redux config
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllTaskAction, postTaskAction, updateTaskAction, deleteTaskAction } from './../store/task/action';

import { ACCESS_TOKEN } from '../../config';

class BotPage extends Component {
  constructor() {
    super();
    this.onSpeak = this.onSpeak.bind(this);
    this.getDialogFlow = this.getDialogFlow.bind(this);
    this.state = {
      showChat: [],
      recievedData: null,
      chatText: '',
      _UserToken: '',
    };
  }

  componentWillMount () {
    // retrieve token
    this._retrieveToken();
    let greetChat = { speaker: 'Botler', chat: 'Greetings, how may I be of assistance today?' }
    let arrayChat = []
    arrayChat.push(greetChat)
    this.setState({showChat: arrayChat})
    Tts.speak('Greetings, how may I be of assistance today?')
  }
  
  // @ retrive token from local storage
  _retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem('UserToken');
      this.setState({ _UserToken: value });
     } catch (e) {
       console.log('Failed UserToken from storage', e);
     }
  }

  // @ remove token from local storage
  _removeToken = async () => {
    try {
      await AsyncStorage.removeItem('UserToken');
    } catch(e) {
      console.log('Failed remove UserToken from storage');
    }
  }

  // @ get response data from dialog-flow
  addData = (responseData) => {
    
  }

  getDialogFlow = async(msg) => { 
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.dialogflow.com/v1/query?v=20170712',
        data: JSON.stringify({
          query: msg,
          lang: 'EN',
          sessionId: 'somerandomthing'
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
      })
      let speech = response.data.result.fulfillment.speech
      let botReply = { speaker: 'Botler', chat: speech }
      Tts.speak(speech);
      if (speech == 'Understood, i will arrange it for you. Please wait a moment') {
        this.addData(response.data.result.contexts[1].parameters)
      }
      let currentArray = this.state.showChat
      currentArray.push(botReply)
      this.setState({
        showChat: currentArray,
        recievedData: response.data.result.parameters
      });
      console.log(response)
      return response;
    } catch (error) {
      console.log(error)
    }
  }
  
  //For text chat input
  chatToBot = async() => {
    try {
      let userChat = { speaker: 'me', chat: this.state.chatText }
      let arrayChat = this.state.showChat
      arrayChat.push(userChat)
      this.setState({ showChat: arrayChat })
      const dialogflowResponse = await this.getDialogFlow(userChat.chat);
      this.setState({ chatText: ''})
    } catch (error) {
      console.log(error)
    }
  }

  //For speach to text
  onSpeak = async() => {
    try {
      const spokenText = await SpeechAndroid.startSpeech("talk to Bot", SpeechAndroid.ENGLISH);
      console.log('spokenText: ',spokenText)
      if (spokenText == 'show tasks') {
        this.props.navigation.navigate('ListTask')
      } else if (spokenText == 'log out') {
        this.logout()
      } else {
        let userChat = { speaker: 'me', chat: spokenText }
        let arrayChat = this.state.showChat
        arrayChat.push(userChat)
        this.setState({showChat: arrayChat})
        const dialogflowResponse = await this.getDialogFlow(spokenText);
      }
    } catch (error) {
      switch(error) {
        case SpeechAndroid.E_VOICE_CANCELLED:
          ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_NO_MATCH:
          ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
          break;
        case SpeechAndroid.E_SERVER_ERROR:
          ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
          break;
      }
    }
  }

  // @ remove token and move to login page
  logout = () => {
    this._removeToken();
    console.log('logout', this.state._UserToken);
    axios.delete(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/api/logout`, { headers: { 'x-auth': this.state._UserToken } })
      .then(() => {
        this.props.screenProps.logout();
        // this.props.navigation.goBack();
      }).catch(e => {
        console.log('Failed to logout!', e);
      });
  }

  // @ testing show task list
  clickTaskHandle = () => {
    console.log('clickTaskHandle', this.state._UserToken);
    this.props.getAllTaskAction(this.state._UserToken);
  }

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <View style={styles.avatarPlacement}>
          <Text>BOT AVATAR</Text>
        </View>
        <ScrollView 
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight)=>{        
              this.scrollView.scrollToEnd({animated: true});
          }}
        >
        <View style={styles.chatRoom}>
        { this.state.showChat.map((chatData, i) => (
          <View style={styles.styleChat} key={'chat' + i}>
            <Text style={{fontWeight: 'bold'}}>{ chatData.speaker }</Text>
            <Text>{ chatData.chat }</Text>
          </View>
        ))
        }
        </View>
        </ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 10 }}>
          <Icon
            name='arrow-circle-right'
            type='font-awesome'
            color='#00a9ff'
            size={35}
            onPress={this.chatToBot}
          />
          <View style={{width: '75%', marginBottom: 10}}>
            <FormInput onChangeText={(chatText) => this.setState({chatText})} value={this.state.chatText} />
          </View>
          <Icon
            name='microphone'
            type='font-awesome'
            color='red'
            onPress={this.onSpeak}
          />
        </View>
        <Button onPress={ this.clickTaskHandle } title="Task Testing" />
        <Button onPress={ this.logout } title="Logout" />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  taskData: state.taskState.taskData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllTaskAction,
  postTaskAction,
  updateTaskAction,
  deleteTaskAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BotPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarPlacement: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 3,
    margin: 5
  },
  styleChat: {
    borderRadius: 10,
    width: '100%',
    padding: 10,
  },
  chatRoom: {
    flex: 1,
    padding: 3,
    height: '100%'
  }
})