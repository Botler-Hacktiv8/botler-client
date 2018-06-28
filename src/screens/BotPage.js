import React, { Component } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native'
import { Icon } from 'react-native-elements';
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
      showResponse: null,
      showCommand: null,
      recievedData: null
    };
  }

  async getDialogFlow(msg) { 
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
      this.setState({
        showResponse: response.data.result.fulfillment.speech,
        recievedData: response.data.result.parameters
      });
      console.log(response)
      return response;
    } catch (error) {
      console.log(error)
    }
  }

  async onSpeak() {
    try {
      const spokenText = await SpeechAndroid.startSpeech("talk to Bot", SpeechAndroid.ENGLISH);
      console.log(spokenText)
      this.setState({showCommand: spokenText})
      const dialogflowResponse = await this.getDialogFlow(spokenText);
      console.log(this.state.showResponse)
      if (this.state.showResponse != null) {
        Tts.speak(dialogflowResponse.data.result.fulfillment.speech);
        ToastAndroid.show(dialogflowResponse.data.result.fulfillment.speech, ToastAndroid.LONG);
        console.log(dialogflowResponse.data)
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
    return (
      <View style={styles.container}>
        <View style={styles.styleResponse}>
          <Text>{ this.state.showResponse }</Text>
        </View>
        <Icon
          raised
          name='microphone'
          type='font-awesome'
          color='red'
          onPress={this.onSpeak}
        />
        <View style={styles.styleCommand}>
          <Text>{ this.state.showCommand }</Text>
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
  styleResponse: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 3,
    margin: 5
  },
  styleCommand: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#adffe6',
    borderWidth: 2,
    borderRadius: 3,
    margin: 5
  }
})

export default BotPage;