import React, { Component } from 'react';
import { 
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TimePickerAndroid,
  DatePickerAndroid,
  ScrollView,
  ToastAndroid
} from 'react-native'
import { FormInput, FormLabel, Icon } from 'react-native-elements'

// @ redux config
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateTaskAction } from './../store/task/action';

class UpdateTaskPage extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  }

  constructor() {
    super()
    this.state = {
      _id: '',
      description: '',
      address: '',
      location: '',
      startDate: '',
      startTime: '',
      finishDate: '',
      finishTime: ''
    }
  }

  componentDidMount() {
    this.prepareState();
  }

  prepareState = () => {
    const task = this.props.navigation.getParam('task');
    const _id = task._id;
    const startTime = task.timeStart.substring(11, 19);
    const startDate = task.timeStart.split('T')[0];
    const finishTime = task.timeEnd.substring(11, 19);
    const finishDate = task.timeEnd.split('T')[0];
    this.setState({
      _id: _id,
      description: task.text,
      address: task.address,
      location: task.locationName,
      startDate: startDate,
      finishDate: finishDate,
      startTime: startTime,
      finishTime: finishTime
    })
  }

  setStartTime = async() => {
    try {
      let minutes = this.state.startTime.substring(0,2)
      let hours = this.state.startTime.substring(3,5)
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
      let startDate = new Date(this.state.startDate)
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        date: startDate
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
    let minutes = this.state.finishTime.substring(0,2)
    let hours = this.state.finishTime.substring(3,5)
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
      let finishDate = new Date(this.state.finishDate)
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: finishDate
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
  updateTask = () => {
    const taskId = this.state._id;
    const payload = {
      text: this.state.description,
      timeStart: new Date(`${this.state.startDate} ${this.state.startTime}`),
      timeEnd: new Date(`${this.state.finishDate} ${this.state.finishTime}`),
      locationName: this.state.location,
      address: this.state.address,
    }
    this.props.updateTaskAction(taskId, payload);
    this.props.navigation.goBack();
    ToastAndroid.show('Success Update Task', ToastAndroid.SHORT);

  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10, paddingTop: 20}}>UPDATE TASK</Text>
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
        <TouchableOpacity onPress={ this.updateTask }>
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
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.buttonCancel}>
              <Icon
                name='times'
                type='font-awesome'
                color='red'
                size={18}
              />
              <Text style={{color: 'red', fontSize: 18, fontWeight: 'bold'}}> CANCEL</Text>
            </View>
          </TouchableOpacity>
      </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateTaskAction,
}, dispatch);

export default connect(null, mapDispatchToProps)(UpdateTaskPage);

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
  },
  buttonCancel: {
    flexDirection: 'row',
    width: 390,
    height: 50,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 20
  },
})