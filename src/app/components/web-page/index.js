import React, {Component} from 'react';
import {WebView} from 'react-native';
import StepModule from 'app/components/step-module';
import ReactModal from 'react-native-modal';

export default class WebPage extends Component {
    static defaultProps = {
        open: false,
        title: 'Web page',
        url: 'http://wwww.example.com',
    }

    onClose = () => this.props.onClose()

    render() {
        const showLoader = this.props.url && this.props.url.slice(-4) !== '.pdf';

        return (
            <ReactModal
                isVisible={this.props.open}
                animationIn="slideInRight"
                animationOut="slideOutRight"
                style={{
                    margin: 0,
                }}
            >
                <StepModule
                    onBack={this.onClose}
                    customTitle={this.props.title}
                    avoidKeyboard={false}
                >
                    <WebView
                        style={{flex: 1}}
                        source={{uri: this.props.url}}
                        originWhitelist={['*']}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        mediaPlaybackRequiresUserAction={false}
                        scrollEnabled={true}
                        bounces={true}
                        startInLoadingState={showLoader}
                        // onError={this.onError}
                    />
                </StepModule>
            </ReactModal>
        );
    }
}
