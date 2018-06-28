import React, { Component } from 'react';
import { View, Button } from 'react-native'
import { Icon } from 'react-native-elements';
import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';

class BotPage extends Component {
  constructor() {
    super();
    this.onSpeak = this.onSpeak.bind(this);
    this.state = {
      showText: null
    };
  }

  async onSpeak() {
    try {
      const spokenText = await SpeechAndroid.startSpeech("talk to Bot", SpeechAndroid.ENGLISH);
      console.log(spokenText)
      this.setState ({
        showText: 'something'
      })
      if(this.state.showText) {
        Tts.speak('Ya udah makan aja sana')
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
      <View>
        <Icon
          raised
          name='microphone'
          type='font-awesome'
          color='red'
          onPress={this.onSpeak}
        />
      </View>
    );
  }
}

export default BotPage;