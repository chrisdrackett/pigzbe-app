import React, {Component} from 'react';
import {WebView, View} from 'react-native';
import Pdf from 'react-native-pdf';
import StepModule from 'app/components/step-module';
import ReactModal from 'react-native-modal';
import isAndroid from 'app/utils/is-android';
import Button from 'app/components/button';
import openURL from '../../utils/open-url';

export default class WebPage extends Component {
    static defaultProps = {
        open: false,
        title: 'Web page',
        url: 'http://wwww.example.com',
    }

    onClose = () => this.props.onClose()

    onOpenInBrowser = () => openURL(this.props.url)

    render() {
        const {url, open, title} = this.props;
        const isPDF = url ? url.slice(-4).toLowerCase() === '.pdf' : false;

        return (
            <ReactModal
                isVisible={open}
                animationIn="slideInRight"
                animationOut="slideOutRight"
                style={{
                    margin: 0,
                }}
                onBackButtonPress={this.onClose}
            >
                <StepModule
                    onBack={this.onClose}
                    customTitle={title}
                    avoidKeyboard={false}
                    scroll={false}
                >
                    {!isPDF &&
                        <WebView
                            style={{flex: 1}}
                            source={{uri: url}}
                            originWhitelist={['*']}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                            mediaPlaybackRequiresUserAction={false}
                            scrollEnabled={true}
                            bounces={true}
                            startInLoadingState={true}
                            // onError={this.onError}
                        />
                    }
                    {isPDF &&
                        <Pdf
                            style={{flex: 1}}
                            source={{uri: url, cache: true}}
                        />
                    }
                    {!isAndroid && (
                        <View style={{padding: 20, paddingBottom: 10}}>
                            <Button
                                theme="outline"
                                label="Open in Safari"
                                onPress={this.onOpenInBrowser}
                            />
                        </View>
                    )}
                </StepModule>
            </ReactModal>
        );
    }
}
