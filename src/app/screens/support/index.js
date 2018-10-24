import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Text, TouchableOpacity, Linking} from 'react-native';
import StepModule from 'app/components/step-module';
import ReactModal from 'react-native-modal';
import styles from './styles';
import {SUPPORT_EMAIL} from 'app/constants';
import {version} from '../../../../package.json';
import Alert from 'app/components/alert';

export class Support extends Component {
    state = {
        alertMessage: null,
    }

    static defaultProps = {
        open: false,
    }

    onEmail = async () => {
        const isSupported = await Linking.canOpenURL(SUPPORT_EMAIL);

        console.log('isSupported', isSupported);

        if (isSupported) {
            Linking.openURL('mailto:support@pigzbe.com');
        } else {
            this.showAlert();
        }
    }

    onClose = () => this.props.onClose()

    showAlert = () => this.setState({alertMessage: 'Cannot open email client'})

    onDismissAlert = () => this.setState({alertMessage: null})

    render() {
        return (
            <ReactModal
                isVisible={this.props.open}
                animationIn="slideInRight"
                animationOut="slideOutRight"
                style={{
                    margin: 0,
                }}
                onBackButtonPress={this.onClose}
            >
                <Fragment>
                    <Alert
                        type="warning"
                        message={this.state.alertMessage}
                        onDismiss={this.onDismissAlert}
                    />
                    <StepModule
                        icon="vip"
                        onBack={this.onClose}
                        customTitle={`Pigzbe App v${version}`}
                        avoidKeyboard={false}
                        title="Need help?"
                        content="For technical support or questions about setting up and using Pigzbe products please contact us on:"
                    >
                        <TouchableOpacity onPress={this.onEmail}>
                            <Text style={styles.link}>
                        support@pigzbe.com
                            </Text>
                        </TouchableOpacity>
                    </StepModule>
                </Fragment>
            </ReactModal>
        );
    }
}

export default connect()(Support);
