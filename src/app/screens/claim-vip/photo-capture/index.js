import React, {Component, Fragment} from 'react';
import {Platform, View, Text, Image, Dimensions, TouchableHighlight, TouchableOpacity} from 'react-native';
import {RNCamera} from 'react-native-camera';

import Paragraph from 'app/components/paragraph';
import Button from 'app/components/button';
import Header from 'app/components/header';
import Container from 'app/components/container';
import KeyboardAvoid from 'app/components/keyboard-avoid';

import styles from './styles';

export default class PhotoCapture extends Component {
    state = {
        path: null,
        base64: null,
    }

    takePicture = async () => {
        try {
            const data = await this.camera.takePictureAsync({
                base64: true
            });

            this.setState({
                path: data.uri,
                base64: data.base64
            });
        } catch (err) {
            alert(err);
            console.log('err: ', err);
        }
    };

    componentWillReceiveProps(newProps) {
        if (newProps.side !== this.props.side) {
            this.setState({
                path: null,
                base64: null,
            });
        }
    }

    onPhotoCaptured = () => {
        this.props.onPhotoCaptured(this.state.base64);
    }

    render() {
        const {onBack, document} = this.props;

        const {width, height} = Dimensions.get('window');
        const frameWidth = width * 0.8;
        const frameHeight = frameWidth * document.previewRatio;

        const sideLabel = document.sideLabel && document.sideLabel[this.props.side] ?
            document.sideLabel[this.props.side] :
            this.props.side;

        const capitalisedSideLabel = sideLabel.charAt(0).toUpperCase() + sideLabel.slice(1);

        return (
            <Container scroll={false}>
                <Header onBack={onBack} />
                <KeyboardAvoid style={{flex: 1}} containerStyle={{flexGrow: 1}}>
                    {!this.state.path &&
                        <View style={styles.bg}>
                            <View>
                                <View style={styles.preview}>
                                    <View style={{
                                        width: frameWidth,
                                        height: frameHeight,
                                    }}>
                                        <RNCamera
                                            ref={cam => {
                                                this.camera = cam;
                                            }}
                                            style={{
                                                width: frameWidth,
                                                height: frameHeight,
                                            }}
                                            type={RNCamera.Constants.Type.back}
                                            notAuthorizedView={
                                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20}}>
                                                    <Text style={{color: 'white', textAlign: 'center'}}>
                                                        {Platform.OS === 'ios' ?
                                                            'Camera not authorised. Please go to Settings > Privacy > Camera, and enable Pigzbe' :
                                                            'Camera not authorised. Please go to Settings > Apps > App permissions > Camera, and enable Pigzbe'
                                                        }
                                                    </Text>
                                                </View>
                                            }
                                        />
                                        <Image style={{
                                            position: 'absolute',
                                            top: -2,
                                            right: -5,
                                            width: 28,
                                            height: 29,
                                        }} source={require('./images/corner-top.png')} />
                                        <Image style={{
                                            position: 'absolute',
                                            top: -2,
                                            left: -5,
                                            width: 28,
                                            height: 29,
                                            transform: [{scaleX: -1}]
                                        }} source={require('./images/corner-top.png')} />
                                        <Image style={{
                                            position: 'absolute',
                                            bottom: -6,
                                            right: -5,
                                            width: 28,
                                            height: 30,
                                        }} source={require('./images/corner-bottom.png')} />
                                        <Image style={{
                                            position: 'absolute',
                                            bottom: -6,
                                            left: -5,
                                            width: 28,
                                            height: 30,
                                            transform: [{scaleX: -1}]
                                        }} source={require('./images/corner-bottom.png')} />
                                    </View>
                                </View>

                                <Paragraph style={styles.heading}>
                                    {capitalisedSideLabel} of {document.name}
                                </Paragraph>

                                <Paragraph style={styles.instructions}>
                                    Position the {sideLabel} of your {document.name} in the frame
                                </Paragraph>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.cameraButton} onPress={this.takePicture}>
                                    <Image style={styles.cameraIcon} source={require('./images/camera.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    {!!this.state.path &&
                        <View style={[styles.bg, styles.bgConfirm]}>
                            <View>
                                <View style={styles.preview}>
                                    <Image
                                        source={{uri: this.state.path}}
                                        style={{
                                            width: frameWidth,
                                            height: frameHeight,
                                        }}
                                    />
                                </View>

                                <Paragraph style={[styles.heading, styles.confirmText]}>
                                    Check readability
                                </Paragraph>

                                <Paragraph style={[styles.instructions, styles.confirmText]}>
                                    Make sure your {document.name} details are clear to read, with no blur or glare
                                </Paragraph>

                            </View>
                            <View style={styles.buttons}>
                                <Button
                                    label={'My identity details are readable'}
                                    onPress={this.onPhotoCaptured}
                                />
                                <Button
                                    label="Take a new picture"
                                    theme="outline"
                                    onPress={() => this.setState({path: null})}
                                />
                            </View>
                        </View>
                    }
                </KeyboardAvoid>
            </Container>
        );
    }
}
