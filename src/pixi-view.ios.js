import React, {Component} from 'react';
import {View, Dimensions, PixelRatio, Text} from 'react-native';
import Expo from 'expo';
import ExpoPixi, {PIXI} from 'expo-pixi';
import startGame from './start-game';

const images = {
    pig: require('./pig.png')
};

export default class Game extends Component {
  state = {
      loading: true,
      resources: {}
  };

  async componentWillMount() {
      const downloads = Object.keys(images).map(key => {
          const asset = Expo.Asset.fromModule(images[key]);
          return asset.downloadAsync();
      });

      await Promise.all(downloads);
      this.cacheResourceURIs();
  }

  cacheResourceURIs() {
      const resources = Object.keys(images).reduce((ob, key) => {
          ob[key] = Expo.Asset.fromModule(images[key]).localUri;
          return ob;
      }, {});
      this.setState({
          resources,
          loading: false
      });
  }

  startGame(context, resources) {
      const app = ExpoPixi.application({
          context,
          backgroundColor: 0x0000ff,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
          resolution: PixelRatio.get()
      });
      startGame(app, PIXI, resources);
  }

  render() {
      const {loading, resources} = this.state;

      if (loading) {
          return <Expo.AppLoading/>;
      }

      return (
          <View style={{flex: 1, width: '100%'}}>
              <Text>{Dimensions.get('window').width}</Text>
              <Expo.GLView
                  style={{
                      flex: 1,
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height
                  }}
                  onContextCreate={context => this.startGame(context, resources)}
              />
          </View>
      );
  }
}
