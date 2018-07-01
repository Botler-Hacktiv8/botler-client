import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { FormLabel, Icon } from 'react-native-elements'

class ConfirmPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Please Confirm!</Text>
        <View>
          <FormLabel>Activity:</FormLabel>
          <Text>Nama aktifitas</Text>
          <FormLabel>Lokasi:</FormLabel>
          <Text>Lokasi aktifitas</Text>
          <FormLabel>Alamat:</FormLabel>
          <Text>Alamat aktifitas</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'column' }}>
              <FormLabel>Time Start:</FormLabel>
              <Text>Waktu mulai</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <FormLabel>Time End:</FormLabel>
              <Text>Waktu selesai</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <View style={ styles.buttonNo }>
                <Icon
                  name="times"
                  type="font-awesome"
                  size={20}
                />
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>No</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={ styles.buttonYes }>
                <Icon
                  name="check"
                  type="font-awesome"
                  size={20}
                />
                <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Yes</Text>
              </View>
            </TouchableOpacity>
          </View>
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
    alignItems: 'center'
  },
  buttonNo: {
    flexDirection: 'row',
    backgroundColor: 'red',
    width: 400,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  buttonYes: {
    flexDirection: 'row',
    backgroundColor: '#37c660',
    width: 400,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20
  }
})

export default ConfirmPage;