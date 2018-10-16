import React, {Component, Fragment} from 'react';
import {Image, Dimensions, View} from 'react-native';
import Button from '../../components/button';
import InputBoxes from '../../components/input-boxes';
import Modal from '../../components/modal';
import Title from '../../components/title';
import Paragraph from '../../components/paragraph';
import ReactModal from 'react-native-modal';

const boxes = 7;
const space = 8;
const qrSize = 200;

export default class VerifyCode extends Component {
    state = {
        code: '',
        showQRCode: false,
    }

    static defaultProps = {
        onVerify: () => {},
        onResend: () => {},
        error: null,
        qrCode: null,
    }

    onChangeCode = code => this.setState({code})

    onResend = () => this.props.onResend()

    onVerify = () => {
        if (!this.state.code || this.state.code.length < boxes) {
            return;
        }
        this.props.onVerify(this.state.code);
    }

    onOpenQRCode = () => this.setState({showQRCode: true})

    onCloseQRCode = () => this.setState({showQRCode: false})

    render() {
        const {error, qrCode} = this.props;

        const boxW = Math.min(50, (Dimensions.get('window').width * 0.8875 - 40 - space * (boxes - 1)) / boxes);

        return (
            <Fragment>
                <View style={{marginTop: 30}}>
                    <InputBoxes
                        onFulfill={this.onChangeCode}
                        boxes={boxes}
                        boxSize={{width: boxW, height: 44}}
                        space={space}
                        error={error}
                    />
                    <View style={{marginBottom: qrCode ? 40 : 60}}>
                        <Button
                            theme="plain"
                            label={'Resend code'}
                            onPress={this.onResend}
                            style={{marginTop: 10, marginBottom: 0}}
                        />
                        {qrCode && (
                            <Button
                                theme="plain"
                                label={'Show QR Code'}
                                onPress={this.onOpenQRCode}
                                style={{marginTop: -10}}
                            />
                        ) }
                    </View>
                </View>
                <Button
                    label={'Verify'}
                    onPress={this.onVerify}
                />
                {qrCode && (
                    <ReactModal
                        isVisible={qrCode && this.state.showQRCode}
                        animationIn="slideInRight"
                        animationOut="slideOutRight"
                        style={{margin: 0}}
                        onBackButtonPress={this.onCloseQRCode}
                    >
                        <Modal>
                            <Title dark>QR Code</Title>
                            <Paragraph>Scan the QR Code below with a compatible app such as Authenticator or Authy.</Paragraph>
                            <Image source={{uri: qrCode}} style={{marginBottom: 20, alignSelf: 'center', width: qrSize, height: qrSize}}/>
                            <Button
                                theme="outline"
                                label={'Close'}
                                onPress={this.onCloseQRCode}
                            />
                        </Modal>
                    </ReactModal>
                )}
            </Fragment>
        );
    }
}
