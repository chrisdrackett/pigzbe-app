import React, {Component} from 'react';
import {PanResponder, View, Dimensions, PixelRatio} from 'react-native';
import Expo from 'expo';
import ExpoPixi, {PIXI} from 'expo-pixi';
import startGame from './start-game';
import images from './images';

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.setupGestures();
    }

    state = {
        loading: true,
        resources: {}
    };

    setupGestures() {
        const touchesBegan = ({nativeEvent}) => {
            const {touches} = nativeEvent;
            touches.map(
                // ({target, locationX, locationY, force, identifier, timestamp}) => {
                ({locationX, locationY}) => this.touchDown({x: locationX, y: locationY})
            );
        };

        const touchesMoved = ({nativeEvent}) => {
            const {touches} = nativeEvent;
            touches.map(
                ({locationX, locationY}) => this.touchMove({x: locationX, y: locationY})
            );
        };

        const touchesEnded = ({nativeEvent}) => {
            const {touches} = nativeEvent;
            touches.map(
                ({locationX, locationY}) => this.touchUp({x: locationX, y: locationY})
            );
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: touchesBegan,
            onPanResponderMove: touchesMoved,
            onPanResponderRelease: touchesEnded,
            onPanResponderTerminate: touchesEnded, //cancel
            onShouldBlockNativeResponder: () => false
        });
    }

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

    touchDown = point => {
        if (!this.app) {
            return;
        }
        this.app.touchDown(point);
    }

    touchMove = point => {
        if (!this.app) {
            return;
        }
        this.app.touchMove(point);
    }

    touchUp = point => {
        if (!this.app) {
            return;
        }
        this.app.touchUp(point);
    }

    startGame(context, resources) {
        this.app = ExpoPixi.application({
            context,
            backgroundColor: 0x0000ff,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            resolution: PixelRatio.get()
        });
        startGame(this.app, PIXI, resources);
    }

    render() {
        const {loading, resources} = this.state;

        if (loading) {
            return <Expo.AppLoading/>;
        }

        return (
            <View style={{flex: 1, width: '100%'}}>
                {/* <Text>{Dimensions.get('window').width}</Text> */}
                {/* <Text>{JSON.stringify(Object.keys(this), null, 2)}</Text> */}
                <Expo.GLView
                    {...this.panResponder.panHandlers}
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
