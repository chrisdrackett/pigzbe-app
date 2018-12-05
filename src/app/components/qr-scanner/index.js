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
        visible: false,
    }

    onLayout = event => this.setState({
        width: event.nativeEvent.layout.width
    })

    delayedVisibilitySet = () => this.setState({visible: this.props.visible})

    componentDidMount() {
        setTimeout(this.delayedVisibilitySet, 500);
    }
    componentDidUpdate(oldProps) {
        if (this.props.visible !== oldProps.visible) {
            setTimeout(this.delayedVisibilitySet, 500);
        }
    }

    render() {
        const {onScan, onCancel} = this.props;
        const {visible, width} = this.state;
        const cameraSize = {width, height: width};

        return (
            <ReactModal
                isVisible={this.props.visible}
                animationIn="slideInRight"
                animationOut="slideOutRight"
                style={{margin: 0}}
                onBackButtonPress={onCancel}
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
