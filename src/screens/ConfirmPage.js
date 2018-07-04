import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid } from 'react-native';
import { FormLabel, Icon } from 'react-native-elements';

// @ redux config
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { postTaskAction } from './../store/task/action';

class ConfirmPage extends Component {
  static navigationOptions = {
    drawerLabel: () => null
  }

  state = {
    payload: {
      text: '',
      locationName: '',
      address: '',
      timeStart: '',
      timeEnd: ''
    },
  }

  componentWillMount () {
    const payload = this.props.navigation.getParam('payload', {});
    this.setState({ payload: payload });
  }

  // @ post action
  addTask = () => {
    this.props.postTaskAction(this.state.payload);
    // @ waiting state change
    setTimeout(() => {
      if (this.props.successPost) {
        ToastAndroid.show('Success Post Task', ToastAndroid.LONG);
        this.props.navigation.navigate('Home')
      } else {
        ToastAndroid.show('Failed Post Task', ToastAndroid.LONG);
      }
    }, 1000);
  }

  formatTime = (date) => {
    return `${ date.toString().substring(0,3) }, ${date.toString().substring(4, 15)} ${date.toString().substring(16, 24)}`
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 20}}>Is the Data Correct?</Text>
        <FormLabel labelStyle={styles.textStyle}>Activity:</FormLabel>
        <Text style={styles.textStyle}>{ this.state.payload.text }</Text>
        <FormLabel labelStyle={styles.textStyle}>Lokasi:</FormLabel>
        <Text style={styles.textStyle}>{ this.state.payload.locationName }</Text>
        <FormLabel labelStyle={styles.textStyle}>Alamat:</FormLabel>
        <Text style={styles.textStyle}>{ this.state.payload.address }</Text>
        <FormLabel labelStyle={styles.textStyle}>Time Start:</FormLabel>
        <Text style={styles.textStyle}>{ this.formatTime(this.state.payload.timeStart) }</Text>
        <FormLabel labelStyle={styles.textStyle}>Time End:</FormLabel>
        <Text style={styles.textStyle}>{ this.formatTime(this.state.payload.timeEnd) }</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={ styles.buttonNo }>
              <Icon
                name="times"
                type="font-awesome"
                size={20}
                color='white'
              />
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}> No</Text>
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
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}> Yes</Text>
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
  textStyle: {
    fontSize: 16
  }
})
const mapStateToProps = (state) => ({
  successPost: state.taskState.successPost
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  postTaskAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPage);