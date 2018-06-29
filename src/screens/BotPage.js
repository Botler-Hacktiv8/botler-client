import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, ScrollView } from 'react-native'
import { Icon, FormInput } from 'react-native-elements';
import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';
import axios from 'axios'

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
    };
  }

  componentWillMount () {
    let greetChat = { speaker: 'Botler', chat: 'Greetings, how may I be of an assistance for today?' }
    let arrayChat = []
    arrayChat.push(greetChat)
    this.setState({showChat: arrayChat})
    Tts.speak('Greetings, how may I be of assistance today?')
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
      let botReply = { speaker: 'Botler', chat: response.data.result.fulfillment.speech }
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

  chatToBot = async() => {
    try {
      let userChat = { speaker: 'me', chat: this.state.chatText }
      let arrayChat = this.state.showChat
      arrayChat.push(userChat)
      this.setState({ showChat: arrayChat })
      const dialogflowResponse = await this.getDialogFlow(userChat.chat);
      console.log(this.state.showResponse)
      this.setState({ chatText: ''})
      if (this.state.showResponse != null) {
        Tts.speak(dialogflowResponse.data.result.fulfillment.speech);
        // ToastAndroid.show(dialogflowResponse.data.result.fulfillment.speech, ToastAndroid.LONG);
        // console.log(dialogflowResponse.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  onSpeak = async() => {
    try {
      const spokenText = await SpeechAndroid.startSpeech("talk to Bot", SpeechAndroid.ENGLISH);
      console.log(spokenText)
      let userChat = { speaker: 'me', chat: spokenText }
      let arrayChat = this.state.showChat
      arrayChat.push(userChat)
      this.setState({showChat: arrayChat})
      const dialogflowResponse = await this.getDialogFlow(spokenText);
      console.log(this.state.showResponse)
      if (this.state.showResponse != null) {
        Tts.speak(dialogflowResponse.data.result.fulfillment.speech);
        // ToastAndroid.show(dialogflowResponse.data.result.fulfillment.speech, ToastAndroid.LONG);
        // console.log(dialogflowResponse.data)
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
      </View>
    );
  }
}

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

export default BotPage;