import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView, TouchableOpacity, Picker } from 'react-native';
import { Header, Icon } from 'react-native-elements'
import Timeline from 'react-native-timeline-listview';

import { connect } from 'react-redux';

class ListTaskPage extends Component {
  constructor() {
    super()
    this.state = {
      data: {},
      compiledData: [],
      loading: true,
      dateArr: [],
      selectedDate: ''
    }
  }

  componentDidMount () {
    this.compileData();
  }

  compileData = () => {
    let rawData = this.props.taskData
    rawData = rawData.sort(function(a,b){return new Date(a.timeStart) - new Date(b.timeStart)})
    let finalData = [];
    let finishDate = [];
    for (let i = 0; i < rawData.length; i++) {
      let dataObj = {}
      let datei = new Date(rawData[i].timeStart).toGMTString().substring(0, 16)
      if(finishDate.includes(datei)) {
        continue;
      } else {
        finishDate.push(datei)
        dataObj.date = datei
        let dataArr = []
        for (let j = 0; j < rawData.length; j++) {
          let datej = new Date(rawData[j].timeStart).toGMTString().substring(0, 16)
          let time = rawData[j].timeStart.split('T')
          if ( datei === datej ) {
            dataArr.push({
              time: time[1].substring(0, 5),
              title: rawData[j].text,
              description: rawData[j].locationName + ', ' + rawData[j].address,
              _id: rawData[j]._id
            })
          }
        }
        dataObj.data = dataArr
      }
      finalData.push(dataObj)
    }
    console.log(finalData)
    this.setState({
      data: finalData[0],
      loading: false,
      dateArr: finishDate,
      compiledData: finalData,
      selectedDate: finishDate[0]
    })
  }

  viewDetail = (data) => {
    this.props.navigation.navigate('Detail', {
      id: data._id
    })
  }

  changeDate = (date) => {
    let newData = {}
    this.state.compiledData.forEach(data => {
      if(data.date == date) {
        newData = data
      }
    })
    this.setState({
      data: newData,
      selectedDate: date
    })
  }

  renderTaskList = () => {
    return (
      <View style={{ flexDirection: 'column', padding: 10 }}>
      <Timeline 
        style={styles.list}
        data={this.state.data.data}
        circleSize={20}
        circleColor='rgb(45,156,219)'
        lineColor='rgb(45,156,219)'
        timeContainerStyle={{minWidth:52}}
        timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
        descriptionStyle={{color:'gray'}}
        options={{
          style:{paddingTop:5}
        }}
        onEventPress={ (e) => this.viewDetail(e)}
      />
      </View>
    );
  }

  renderPicker = () => {
    let date = this.state.dateArr.map( (date, i) => {
      return <Picker.Item key={i} value={date} label={date} />
    });
    return (
      <View style={styles.pickerStyle}>
        <Picker
          selectedValue={this.state.selectedDate}
          style={{ height: 50, width: 200 }}
          onValueChange={this.changeDate}>
          {date}
        </Picker>
      </View>
    )
  }

  render() {
    if(this.state.loading === true) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
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
            <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white' }}>MY SCHEDULE</Text>
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
          {this.renderPicker()}
          <ScrollView>
            {this.renderTaskList()}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    flexDirection: 'column'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  pickerStyle: {
    alignItems: 'center'
  }
})

const mapStateToProps = (state) => ({
  taskData: state.taskState.taskData,
});

export default connect(mapStateToProps, null)(ListTaskPage);