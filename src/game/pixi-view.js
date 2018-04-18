import '@expo/browser-polyfill';
// import './polyfill';
import React, {Component} from 'react';
import {
    ActivityIndicator,
    PanResponder,
    View,
    PixelRatio
} from 'react-native';
import Expo from 'expo';
import Game from './game';
import images from './images';

export default class PixiView extends Component {
    constructor(props) {
        super(props);

        this.setupGestures();
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
            // ({target, locationX, locationY, force, identifier, timestamp}) => {
            touches.map(({locationX, locationY}) => this.touchDown({
                x: locationX,
                y: locationY
            }));
        };

        const touchesMoved = ({nativeEvent}) => {
            const {touches} = nativeEvent;
            touches.map(({locationX, locationY}) => this.touchMove({
                x: locationX,
                y: locationY
            }));
        };

        const touchesEnded = ({nativeEvent}) => {
            const {locationX, locationY} = nativeEvent;
            this.touchUp({
                x: locationX,
                y: locationY
            });
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
        if (!this.game) {
            return;
        }
        this.game.touchDown(point);
    }

    touchMove = point => {
        if (!this.game) {
            return;
        }
        this.game.touchMove(point);
    }

    touchUp = point => {
        if (!this.game) {
            return;
        }
        this.game.touchUp(point);
    }

    onContextCreate(context) {
        const getAttributes = context.getContextAttributes || (() => ({}));
        context.getContextAttributes = () => {
            const contextAttributes = getAttributes();
            return {
                ...contextAttributes,
                stencil: true
            };
        };

        this.initGame(context);
    }

    initGame(context) {
        const {resources} = this.state;
        const resolution = PixelRatio.get();

        this.game = new Game({
            context,
            resolution,
            scale: resolution,
            width: context.drawingBufferWidth / resolution,
            height: context.drawingBufferHeight / resolution
        }, resources, this.props.navigation);

        this.game.app.ticker.add(() => context.endFrameEXP());
    }

    resize = view => {
        if (!this.game) {
            return;
        }
        this.game.resize(view);
    }

    render() {
        const {loading, view} = this.state;

        if (loading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }

        return (
            <View
                onLayout={event => {
                    const {x, y, width, height} = event.nativeEvent.layout;
                    this.setState({view: {x, y, width, height}});
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
                        {...this.panResponder.panHandlers}
                        style={{
                            // flex: 1,
                            width: view.width,
                            height: view.height
                        }}
                        onContextCreate={context => this.onContextCreate(context)}
                    />
                )}
            </View>
        );
    }
}
