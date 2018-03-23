import '@expo/browser-polyfill';
import React, {Component} from 'react';
import {PanResponder, View, PixelRatio} from 'react-native';
import Expo from 'expo';
import * as PIXI from 'pixi.js';
import startGame from './start-game';
import images from './images';
import sounds from './sounds';

global.PIXI = PIXI;

export default class Game extends Component {
    constructor(props) {
        super(props);

        this.setupGestures();

        console.log('new Game');

        this.didBlurSubscription = this.props.navigation.addListener(
            'didBlur',
            payload => {
                console.debug('didBlur', payload);
                this.onBlur();
            }
        );
        this.didFocusSubscription = this.props.navigation.addListener(
            'didFocus',
            payload => {
                console.debug('didFocus', payload);
                this.onFocus();
            }
        );
        // this.didBlurSubscription.remove();
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

    onBlur = () => {
        if (!this.app) {
            return;
        }
        this.app.onBlur();
    }

    onFocus = () => {
        if (!this.app) {
            return;
        }
        this.app.onFocus();
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

        console.log('1 context.drawingBufferWidth', context.drawingBufferWidth);
        console.log('1 context.drawingBufferHeight', context.drawingBufferHeight);

        this.app = new PIXI.Application({
            context,
            resolution,
            scale: resolution,
            width: context.drawingBufferWidth / resolution,
            height: context.drawingBufferHeight / resolution,
            backgroundColor: 0x0000ff
        });
        this.app.ticker.add(() => context.endFrameEXP());

        startGame(this.app, PIXI, resources, sounds);
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
