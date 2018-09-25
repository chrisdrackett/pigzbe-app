import React, {Component} from 'react';
import {View, Image} from 'react-native';
import styles from './styles';
import Title from '../title';
import StepModule from '../step-module';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ReactModal from 'react-native-modal';

export default class Scanner extends Component {
    state = {
        width: 284,
    }

    onLayout = event => this.setState({
        width: event.nativeEvent.layout.width
    })

    render() {
        const {visible, onScan, onCancel} = this.props;
        const {width} = this.state;
        const cameraSize = {width, height: width};

        return (
            <ReactModal
                isVisible={visible}
                animationIn="slideInRight"
                animationOut="slideOutRight"
                style={{margin: 0}}
            >
                <StepModule
                    onBack={onCancel}
                    justify="space-between"
                    plain
                    customTitle="Scan"
                >
                    <View style={styles.wrapper} onLayout={this.onLayout}>
                        <Title dark style={styles.title}>
                            Align camera to the QR code
                        </Title>
                        <View style={[styles.wrapperInner, cameraSize]}>
                            {visible && (
                                <QRCodeScanner
                                    containerStyle={cameraSize}
                                    cameraStyle={cameraSize}
                                    onRead={onScan}
                                />
                            )}
                            <Image
                                style={[styles.target, {
                                    left: (width - 190) / 2,
                                    top: (width - 190) / 2,
                                }]}
                                source={require('./images/target.png')}
                            />
                        </View>
                    </View>
                </StepModule>
            </ReactModal>
        );
    }
}
