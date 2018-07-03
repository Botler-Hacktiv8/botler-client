import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  Image,
  ToastAndroid,
  TextInput
} from 'react-native'
import { Icon, Header } from 'react-native-elements';

import SpeechAndroid from 'react-native-android-voice';
import Tts from 'react-native-tts';
import axios from 'axios';

// @ redux config
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllTaskAction } from './../store/task/action';
import { getProfileAction } from './../store/user/action';
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
      userToken: '',
    };
  }

  componentWillMount () {
    // @ retrieve token
    this._retrieveToken()

    let greetChat = { speaker: 'Botler', chat: 'Halo, nama saya Botler. Apa yang bisa saya bantu?' }
    let arrayChat = []
    arrayChat.push(greetChat)
    this.setState({showChat: arrayChat})
    Tts.setDefaultLanguage('id-ID');
    Tts.setDefaultVoice('id-id-x-dfz#male_2-local')
    Tts.getInitStatus().then(() => {
      Tts.speak('Halo, nama saya Botler. Apa yang bisa saya bantu?');
    });
  }
  
  // @ retrive token from local storage
  _retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem('UserToken');
      this.setState({ userToken: value }, () => {
        this.props.getProfileAction(this.state.userToken);
        this.props.getAllTaskAction(this.state.userToken);
      });
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
    console.log('Fix data:', responseData);
    let {
      address,
      dateEnd,
      timeEnd,
      timeStart,
      dateStart,
      locationName,
      text
    } = responseData

    let payload = {
      address,
      timeStart: new Date(`${dateStart} ${timeStart}`),
      timeEnd: new Date(`${dateEnd} ${timeEnd}`),
      locationName,
      text
    }

    // navigate to confirm page
    this.props.navigation.navigate('Confirm', { payload })
  }

  getDialogFlow = async(msg) => { 
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.dialogflow.com/v1/query?v=20170712',
        data: JSON.stringify({
          query: msg,
          lang: 'ID',
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
      if (speech.includes('sedang saya proses')) {
        let dataParameter;
        response.data.result.contexts.forEach(element => {
          if (element.name == 'membuataktivitasbaru-followup') {
            dataParameter = element.parameters;
            this.addData(dataParameter);
          }
        });
        // this.addData(response.data.result.contexts[2].parameters);
      }
      let currentArray = this.state.showChat
      currentArray.push(botReply)
      this.setState({
        showChat: currentArray,
        recievedData: response.data.result.parameters
      });
      return response;
    } catch (error) {
      console.log(error)
    }
  }
  
  //@ text chat input
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

  //@ speach to text
  onSpeak = async() => {
    try {
      const spokenText = await SpeechAndroid.startSpeech("talk to Bot", SpeechAndroid.INDONESIAN);
      console.log('spokenText: ',spokenText)
      if (spokenText == 'lihat aktivitas') {
        this.props.navigation.navigate('ListTask')
      } else if (spokenText == 'keluar') {
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
    axios.delete(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/api/logout`, { headers: { 'x-auth': this.state.userToken } })
      .then(() => {
        this.props.screenProps.logout();
        // this.props.navigation.goBack();
      }).catch(e => {
        console.log('Failed to logout!', e);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header 
          rightComponent={
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AddTask')}>
            <Icon
              name='plus'
              type='font-awesome'
              color='white'
            />
          </TouchableOpacity>
          }
          centerComponent={
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>BOTLER</Text>
            }
          leftComponent={
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Icon
              name='bars'
              type='font-awesome'
              color='white'
            />
          </TouchableOpacity>
          }
        />
        <View style={styles.avatarPlacement}>
          <TouchableOpacity onPress={this.onSpeak}>
              <Image source={require('../assets/botler-icon.png')} style={{ width: 100, height: 100 }}/>
          </TouchableOpacity>
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
            <Text style={{ fontWeight: 'bold' }}>{ chatData.speaker }</Text>
            <Text style={{ marginLeft: 10}}>{ chatData.chat }</Text>
          </View>
        ))
        }
        </View>
        </ScrollView>
        <View style={ styles.chatBox }>
          <View style={{width: '75%', paddingBottom: 10}}>
            <TextInput
              onChangeText={(chatText) => this.setState({chatText})}
              value={this.state.chatText}
            />
          </View>
          <Icon
            name='arrow-circle-right'
            type='font-awesome'
            color='#00a9ff'
            size={35}
            onPress={this.chatToBot}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getAllTaskAction,
  getProfileAction
}, dispatch);

export default connect(null, mapDispatchToProps)(BotPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ceedff'
  },
  avatarPlacement: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 5
  },
  styleChat: {
    borderRadius: 10,
    width: '100%',
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20
  },
  chatRoom: {
    flex: 1,
    padding: 3,
    height: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  },
  nameTag: {
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 5,
    width: 100
  },
  chatBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10
  }
})