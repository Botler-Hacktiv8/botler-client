import React, { Component } from 'react';
import { View, Button } from 'react-native'
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
        <Button
          onPress={this.onSpeak}
          title="Press to talk"
          color="#37B6DF"
          accessibilityLabel="Press to talk"
        />
      </View>
    );
  }
}

export default BotPage;