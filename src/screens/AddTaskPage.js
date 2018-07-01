import React, { Component } from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TimePickerAndroid,
  DatePickerAndroid
} from 'react-native'
import { FormInput, FormLabel, Icon } from 'react-native-elements'

class AddTaskPage extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  }
  constructor() {
    super()
    this.state = {
      description: '',
      address: '',
      location: '',
      startDate: '',
      startTime: '',
      finishDate: '',
      finishTime: ''
    }
  }

  setStartTime = async() => {
    try {
      let minutes = new Date().getMinutes()
      let hours = new Date().getHours()
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: hours,
        minute: minutes,
        is24Hour: false, // Will display with 'PM & AM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        this.setState({ startTime: hour + ':' + minute + ':00' })
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }

  setStartDate = async() => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({ startDate: year + '-' + Number(month+1) + '-' + day})
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  setFinishTime = async() => {
    let minutes = new Date().getMinutes()
    let hours = new Date().getHours()
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: hours,
        minute: minutes,
        is24Hour: false, // Will display with 'PM & AM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        this.setState({ finishTime: hour + ':' + minute + ':00' })
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }

  setFinishDate = async() => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: new Date()
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({ finishDate: year + '-' + Number(month+1) + '-' + day})
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  //@ adding new task to db
  addNewTask = () => {

    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10, paddingTop: 20}}>ADD NEW TASK</Text>
        <View>
          <FormLabel>Name Of Activity:</FormLabel>
          <FormInput
            onChangeText={(description) => this.setState({description})}
            value={this.state.description}
          />
          <FormLabel>Location:</FormLabel>
          <FormInput
            onChangeText={(location) => this.setState({location})}
            value={this.state.location}
          />
          <FormLabel>Address:</FormLabel>
          <FormInput
            onChangeText={(address) => this.setState({address})}
            value={this.state.address}
          />
          <FormLabel>Start</FormLabel>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={styles.styleDateTimeButtonArea}>
              <Text style={styles.timeDateText}>Date: <Text style={styles.styleTimeDateData}>{this.state.startDate}</Text></Text>
              <TouchableOpacity onPress={ this.setStartDate }>
                <View style={styles.button}>
                  <Text style={styles.butonText}>Set Date</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.styleDateTimeButtonArea}>
            <Text style={styles.timeDateText}>Time: <Text style={styles.styleTimeDateData}>{this.state.startTime}</Text></Text>
              <TouchableOpacity onPress={ this.setStartTime }>
                <View style={styles.button}>
                  <Text style={styles.butonText}>Set Time</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <FormLabel>Finish</FormLabel>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <View style={styles.styleDateTimeButtonArea}>
            <Text style={styles.timeDateText}>Date: <Text style={styles.styleTimeDateData}>{this.state.finishDate}</Text></Text>
          <TouchableOpacity onPress={ this.setFinishDate }>
            <View style={styles.button}>
              <Text style={styles.butonText}>Set Date</Text>
            </View>
          </TouchableOpacity>
          </View>
          <View style={styles.styleDateTimeButtonArea}>
            <Text style={styles.timeDateText}>Time: <Text style={styles.styleTimeDateData}>{this.state.finishTime}</Text></Text>
          <TouchableOpacity onPress={ this.setFinishTime }>
            <View style={styles.button}>
              <Text style={styles.butonText}>Set Time</Text>
            </View>
          </TouchableOpacity>
          </View>
          </View>
        </View>
        <TouchableOpacity onPress={ this.addNewTask }>
          <View style={styles.submitButton}>
            <Icon
              name='check'
              type='font-awesome'
              size={20}
              color='white'
            />
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>SUBMIT</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  button: {
    width: 150,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#37c660',
    margin: 10,
    borderRadius: 10,
  },
  butonText: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold'
  },
  submitButton: {
    flexDirection: 'row',
    backgroundColor: '#4885ed',
    width: 390,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 3,
    marginTop: 20,
  },
  timeDateText: {
    marginLeft: 10
  },
  styleTimeDateData: {
    fontWeight: 'bold',
    paddingLeft: 10,
  },
  styleDateTimeButtonArea: {
    flexDirection: 'column',
    paddingTop: 3
  }
})

export default AddTaskPage;