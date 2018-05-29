import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo';
import { LineChart, Grid, YAxis } from 'react-native-svg-charts'

export default class AccelerometerSensor extends React.Component {
  state = {
    x: [],
    y: [],
    z: [],
    // time: 0,
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  round(number, precision) {
    var shift = function (number, exponent) {
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + exponent) : exponent));
    };
    return shift(Math.round(shift(number, +precision)), -precision);
  }


  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      if (this.state.z.length === 150) {
        this._toggle;
        console.log(this.state);
        // this.setState({
        //   x: [accelerometerData.x],
        //   y: [accelerometerData.y],
        //   z: [accelerometerData.z],
        //   time: this.state.time + 100,
        // });
      } else {
        this.setState({
          // x: [...this.state.x, round(accelerometerData.x, 5)],
          // y: [...this.state.y, round(accelerometerData.y, 5)],
          z: [...this.state.z, this.round(accelerometerData.z, 5)],
          // time: this.state.time + 100,
        });
      }
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    // let { x, y, z } = this.state.accelerometerData;
    console.log(this.state);
    const contentInset = { top: 20, bottom: 20 }
    return (
      <View style={styles.container}>
        <View style={styles.sensor}>
          <Text>Accelerometer:</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this._toggle} style={styles.button}>
              <Text>Toggle</Text>
            </TouchableOpacity>
          </View >
        </View>
        {/* <View style={{ height: 200, flexDirection: 'row' }}>
          <YAxis
            data={ this.state.x }
            contentInset={ contentInset }
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={ 10 }
            formatLabel={ value => `${value}` }
            max={5}
            min={-5}
          />
          <LineChart
            style={{ flex: 1 }}
            data={ this.state.x }
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20, right: 20, left: 10 }}
            gridMin={ -5 }
            gridMax={ 5 }
          >
            <Grid/>
          </LineChart>
        </View>
        <View style={{ height: 200, flexDirection: 'row' }}>
          <YAxis
            data={ this.state.y }
            contentInset={ contentInset }
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={ 10 }
            formatLabel={ value => `${value}` }
            max={5}
            min={-5}
          />
          <LineChart
            style={{ flex: 1 }}
            data={ this.state.y }
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20, right: 20, left: 10 }}
            gridMin={ -5 }
            gridMax={ 5 }
          >
            <Grid/>
          </LineChart>
        </View> */}
        <View style={{ height: 200, flexDirection: 'row' }}>
          <YAxis
            data={ this.state.z }
            contentInset={ contentInset }
            svg={{
              fill: 'grey',
              fontSize: 10,
            }}
            numberOfTicks={ 10 }
            formatLabel={ value => `${value}` }
            max={5}
            min={-5}
          />
          <LineChart
            style={{ flex: 1 }}
            data={ this.state.z }
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={{ top: 20, bottom: 20, right: 20, left: 10 }}
            gridMin={ -5 }
            gridMax={ 5 }
          >
            <Grid/>
          </LineChart>  
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
});
