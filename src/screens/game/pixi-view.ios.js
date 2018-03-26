import '@expo/browser-polyfill';
import React, {Component} from 'react';
import {PanResponder, View, PixelRatio} from 'react-native';
import Expo from 'expo';
import startGame from './start-game';
import images from './images';
import sounds from './sounds';

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.setupGestures();

        console.log('new Game');
    }

    state = {
        active: true,
        loading: true,
        resources: {},
        view: null
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
            const {locationX, locationY} = nativeEvent;
            this.touchUp({x: locationX, y: locationY});
        };

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: touchesBegan,
            // onMoveShouldSetResponder: () => true,
            onPanResponderMove: touchesMoved,
            onPanResponderRelease: touchesEnded,
            // onPanResponderTerminationRequest: () => true,
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
        console.log('touchUp', this.app.touchUp);
        if (!this.app) {
            return;
        }
        this.app.touchUp(point);
    }

    initGame(context, resources) {
        console.log('initGame');
        const getAttributes = context.getContextAttributes || (() => ({}));
        context.getContextAttributes = () => {
            const contextAttributes = getAttributes();
            return {
                ...contextAttributes,
                stencil: true
            };
        };

        const resolution = PixelRatio.get();

        this.app = startGame({
            context,
            resolution,
            scale: resolution,
            width: context.drawingBufferWidth / resolution,
            height: context.drawingBufferHeight / resolution
        }, resources, sounds, this.props.navigation);

        this.app.ticker.add(() => context.endFrameEXP());
    }

    resize = view => {
        if (!this.app) {
            return;
        }
        this.app.resize(view);
    }

    render() {
        const {loading, resources, view} = this.state;

        if (loading) {
            return <Expo.AppLoading/>;
        }

        return (
            <View
                onLayout={event => {
                    const {x, y, width, height} = event.nativeEvent.layout;
                    console.log('view: ', x, y, width, height);
                    this.setState({
                        view: {x, y, width, height}
                    });
                    this.resize({x, y, width, height});
                }}
                style={{
                    flex: 1,
                    width: '100%'
                }}>
                {/* <Text>{Dimensions.get('window').width}</Text> */}
                {/* <Text>{JSON.stringify(Object.keys(this), null, 2)}</Text> */}
                {view && (
                    <Expo.GLView
                        msaaSamples={4}
                        {...this.panResponder.panHandlers}
                        style={{
                            // flex: 1,
                            width: view.width,
                            height: view.height
                        }}
                        onContextCreate={context => this.initGame(context, resources)}
                    />
                )}
            </View>
        );
    }
}
