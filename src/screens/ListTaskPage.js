import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView } from 'react-native';
import Timeline from 'react-native-timeline-listview';

import { connect } from 'react-redux';

class ListTaskPage extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      loading: true
    }
  }

  componentDidMount () {
    this.compileData()
  }

  compileData = () => {
    let rawData = this.props.taskData
    rawData.sort( (a, b) => a.timeStart - b.timeStart)
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
    this.setState({
      data: finalData,
      loading: false
    })
  }

  test = (data) => {
    this.props.navigation.navigate('Detail', {
      id: data._id
    })
  }

  renderTaskList = () => {
    return (
       this.state.data.map( (timeData, i) => (
        <View style={{ flexDirection: 'column', padding: 10 }} key={timeData.date + i}>
        <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{timeData.date}</Text>
        <Timeline 
          style={styles.list}
          data={timeData.data}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5}
          }}
          onEventPress={ (e) => this.test(e)}
        />
        </View>
      ))
    );
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
    padding: 20,
		paddingTop:65,
		backgroundColor:'white'
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
})

const mapStateToProps = (state) => ({
  taskData: state.taskState.taskData,
});

export default connect(mapStateToProps, null)(ListTaskPage);