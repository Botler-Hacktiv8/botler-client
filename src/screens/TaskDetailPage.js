import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { FormLabel, Icon } from 'react-native-elements'
import axios from 'axios';
import { GOOGLE_MAPS_API } from '../../config';
import { connect } from 'react-redux';

class TaskDetailPage extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  }

  constructor() {
    super()
    this.state = {
      distance: '',
      time: '',
      loading: true,
      _UserToken: '',
      taskDetail: {}
    }
  }

  componentDidMount() {
    this._retrieveToken()
  }
  
  // @ retrive token from local storage
  _retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem('UserToken');
      console.log('_retrieveToken', value);
      this.setState({ _UserToken: value }, () => {
        this.getTaskData(this.props.navigation.getParam('id') ,this.state._UserToken)
      })
     } catch (e) {
       console.log('Failed UserToken from storage', e);
     }
  }

  getTaskData = (id, userToken) => {
    let self = this
    axios.get(`http://ec2-18-191-188-60.us-east-2.compute.amazonaws.com/api/tasks/${id}`, {headers: {'x-auth': self.state._UserToken}})
    .then(function(response) {
      self.setState({taskDetail: response.data.task})
      self.getDistance()
    })
    .catch(function(err) {
      console.log(err)
    })
  }

  getDistance = () => {
    this.setState({loading: true})
    let self = this
    axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${this.props.userData.address}&destinations=${this.state.taskDetail.address}&key=${GOOGLE_MAPS_API}`)
    .then(function(response) {
      console.log(response)
      let distanceInMiles = response.data.rows[0].elements[0].distance.text
      let tempDistance = distanceInMiles.split(' ')[0]
      let distanceInKm = Math.round(Number(tempDistance) * 1.60934).toString() + ' km'
      self.setState({
        distance: distanceInKm,
        time: response.data.rows[0].elements[0].duration.text,
        loading: false
      })
    })
    .catch(function(err) {
      console.log(err)
      self.setState({loading: false})
    })
  }

  render() {
    if(this.state.loading === true) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}>
          <Text style={styles.titleStyle}>{this.state.taskDetail.text}</Text>
          <View style={styles.topStyle}>
            <Text style={styles.topTextHead}>Time Needed:</Text>
            <Text style={{fontSize: 24, marginBottom: 10}}>{this.state.time}</Text>
            <Text style={styles.topTextHead}>Distance:</Text>
            <Text style={{fontSize: 24, marginBottom: 10}}>{this.state.distance}</Text>
          </View>
          <FormLabel>Location:</FormLabel>
          <Text style={{ margin: 10 }}>{this.state.taskDetail.locationName}</Text>
          <FormLabel>Address:</FormLabel>
          <View style={{ margin: 10 }}>
            <Text>{this.state.taskDetail.address}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={ styles.timeStyle }>
              <FormLabel>Time Start:</FormLabel>
              <Text style={{ width: '60%', textAlign: 'center' }}>{new Date(this.state.taskDetail.timeStart).toGMTString().substring(0, 25)}</Text>
            </View>
            <View style={ styles.timeStyle }>
              <Icon
                name="clock-o"
                type="font-awesome"
                size={30}
              />
            </View>
            <View style={ styles.timeStyle }>
              <FormLabel>Time End:</FormLabel>
              <Text style={{ width: '60%', textAlign: 'center' }}>{new Date(this.state.taskDetail.timeEnd).toGMTString().substring(0, 25)}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <View style={styles.buttonMap}>
              <Icon
                name="map"
                type="font-awesome"
                size={20}
                color='white'
              />
              <Text style={{fontWeight: 'bold', fontSize: 20, color: 'white'}}> Show on Map</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.buttonBack}>
              <Text style={{fontWeight: 'bold', fontSize: 16, color: 'red'}}>GO BACK</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10
  },
  topStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  topTextHead: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  timeStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonMap: {
    flexDirection: 'row',
    backgroundColor: '#4885ed',
    width: 390,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 40,
    marginLeft: 10
  },
  buttonBack: {
    flexDirection: 'row',
    width: 400,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 10
  },
})

const mapStateToProps = (state) => ({
  userData: state.userState.userData,
});

export default connect(mapStateToProps, null)(TaskDetailPage);