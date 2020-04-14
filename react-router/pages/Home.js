import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
  Animated,
  Easing,
} from 'react-native';
import {Link} from '../router';
import logo from '../logo.png';

class Home extends Component {
  state = {
    spinValue: new Animated.Value(0),
  };

  onClick = () => {
    const wasRotated = this.state.spinValue._value === 1;
    Animated.timing(this.state.spinValue, {
      toValue: wasRotated ? 0 : 1,
      duration: 250,
      easing: Easing.linear,
    }).start();
  };

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <View style={styles.container}>
        <Link to="/router">
          <Text style={[styles.button, styles.buttonText]}>
            To router route
          </Text>
        </Link>
        <Animated.Image
          source={logo}
          style={[styles.logo, {transform: [{rotate: spin}]}]}
        />
        <Text style={styles.title}>Create React Native Web App</Text>
        <Text style={styles.text}>
          Open up src/App.js to start working on your app!
        </Text>
        <Text style={styles.text}>
          Changes you make will automatically reload.
        </Text>
        {Platform.OS !== 'web' && (
          <Text style={styles.text}>
            Shake your phone to open the developer menu.
          </Text>
        )}
        <TouchableHighlight
          onPress={this.onClick}
          style={styles.button}
          underlayColor={'#0A84D0'}>
          <Text style={styles.buttonText}>Rotate Logo</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 300,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  text: {
    color: '#fff',
  },
  button: {
    borderRadius: 3,
    padding: 20,
    marginVertical: 10,
    marginTop: 10,
    backgroundColor: '#1B95E0',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Home;
