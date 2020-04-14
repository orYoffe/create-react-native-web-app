import React from 'react';
import {StyleSheet, Text, View, Image, Platform, Linking} from 'react-native';
import {Link} from '../router';
import logo from './reactRouterLogo';

const url = 'https://reacttraining.com/react-router/native/guides/quick-start';
const openLink = () =>
  Linking.canOpenURL(url).then((supported) => {
    return Linking.openURL(url);
  });

const linkProps =
  Platform.OS === 'web'
    ? {
        accessibilityRole: 'link',
        target: '_blank',
        href: url,
      }
    : {onPress: openLink};

const ReactRouter = () => {
  return (
    <View style={styles.container}>
      <Link to="/">
        <Text style={[styles.button, styles.buttonText]}>To to main page</Text>
      </Link>
      <Image
        source={{
          uri: logo,
        }}
        style={styles.logo}
      />
      <Text style={[styles.button, styles.buttonText]} {...linkProps}>
        Go to react-router docs
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logo: {
    width: 300,
    height: 300,
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

export default ReactRouter;
