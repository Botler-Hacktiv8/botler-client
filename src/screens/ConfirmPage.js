import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FormLabel, Icon } from 'react-native-elements'

class ConfirmPage extends Component {

  //@ add task to db
  addTask = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 20}}>CONFIRM!</Text>
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
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={ styles.buttonNo }>
              <Icon
                name="times"
                type="font-awesome"
                size={20}
                color='white'
              />
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>No</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.addTask}>
            <View style={ styles.buttonYes }>
              <Icon
                name="check"
                type="font-awesome"
                size={20}
                color='white'
              />
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Yes</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonNo: {
    flexDirection: 'row',
    backgroundColor: 'red',
    width: 180,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 40,
    marginRight: 10
  },
  buttonYes: {
    flexDirection: 'row',
    backgroundColor: '#37c660',
    width: 180,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 40,
    marginLeft: 10
  },
  timeStyle: {
    flexDirection: 'column',
    alignItems: 'center'
  }
})

export default ConfirmPage;