import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

// @ redux config
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getBotlerDataAction } from './../store/botler/action';

class Welcome extends Component {

  componentDidMount() {
    this.props.getBotlerDataAction();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Botler App!
        </Text>
        <Text style={styles.instructions}>
          To get started, this is Welcome screen
        </Text>
        <Text style={styles.instructions}>
          Redux work well, this is data from redux: {this.props.botlerData[0]}
        </Text>
        <Button onPress={() => this.props.navigation.navigate('Bot')} title="Go To Bot!"/>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  botlerData: state.botlerState.botlerData,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getBotlerDataAction
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);

// @ style

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
