import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { FormLabel, Icon } from 'react-native-elements'
import axios from 'axios';
import { GOOGLE_MAPS_API } from '../../config';

class TaskDetailPage extends Component {
  constructor() {
    super()
    this.state = {
      initialAddress: 'Jalan Sultan Iskandar Muda No.7, RT.5/RW.9, Kebayoran Lama Selatan, Kebayoran Lama, RT.5/RW.9, Kby. Lama Sel., Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12240',
      destinationAddress: 'Jl. Metro Pondok Indah, Pd. Pinang, Kby. Lama, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12310',
      distance: '',
      time: '',
      loading: true
    }
  }

  componentDidMount() {
    this.getDistance()
  }
  
  getDistance = () => {
    this.setState({loading: true})
    let self = this
    axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${this.state.initialAddress}&destinations=${this.state.destinationAddress}&key=${GOOGLE_MAPS_API}`)
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
          <Text style={styles.titleStyle}>Nama Aktifitas</Text>
          <View style={styles.topStyle}>
            <Text style={styles.topTextHead}>Time Needed:</Text>
            <Text style={{fontSize: 24, marginBottom: 10}}>{this.state.time}</Text>
            <Text style={styles.topTextHead}>Distance:</Text>
            <Text style={{fontSize: 24, marginBottom: 10}}>{this.state.distance}</Text>
          </View>
          <FormLabel>Activity:</FormLabel>
          <Text>Nama aktifitas</Text>
          <FormLabel>Lokasi:</FormLabel>
          <Text>Lokasi aktifitas</Text>
          <FormLabel>Alamat:</FormLabel>
          <Text>Alamat aktifitas</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={ styles.timeStyle }>
              <FormLabel>Time Start:</FormLabel>
              <Text>Waktu mulai</Text>
            </View>
            <View style={ styles.timeStyle }>
              <FormLabel>Time End:</FormLabel>
              <Text>Waktu selesai</Text>
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
    alignItems: 'center'
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
  }
})

export default TaskDetailPage;