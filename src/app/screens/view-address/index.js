import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import Button from '../../components/button';
import {SCREEN_DASHBOARD} from '../../constants';
import StepModule from '../../components/step-module';
import Title from '../../components/title';
import Paragraph from '../../components/paragraph';

export class ViewAddress extends Component {
    state = {loading: false}

    onBack = () => this.props.navigation.navigate(SCREEN_DASHBOARD)

    onCopy = () => {

    }

    onShare = () => {

    }

    render() {
        const {publicKey} = this.props;

        return (
            <StepModule
                pad
                loading={this.state.loading}
                onBack={this.onBack}
                justify="space-between"
                plain
                customTitle={'Wollo Address'}
            >
                <View>
                    <Title dark style={{
                        textAlign: 'center',
                        marginTop: 28,
                    }}>
                    Only send Wollo (WLO) to this address
                    </Title>
                    <Paragraph small>
                    Sending any other digital asset will result in permanent loss.
                    </Paragraph>
                </View>
                <View>
                    <Text>{publicKey}</Text>
                </View>
                <View>
                    <Button
                        label="Copy address"
                        onPress={this.onCopy}
                        theme="outline"
                    />
                    <Button
                        label="Share"
                        onPress={this.onShare}
                        theme="outline"
                    />
                </View>
            </StepModule>
        );
    }
}

export default connect(state => ({
    publicKey: state.keys.publicKey
}))(ViewAddress);
