import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '../../components/button';
// import {strings} from '../../constants';
import Container from '../../components/container';
import {SCREEN_SETTINGS, SCREEN_CLAIM_ICO} from '../../constants';
import Header from '../../components/header';

class Claim extends Component {
    onBack = () => this.props.navigation.navigate(SCREEN_SETTINGS)

    onICO = () => this.props.navigation.navigate(SCREEN_CLAIM_ICO)

    onAirdropBounty = () => {}

    onVIPs = () => {}

    render() {
        return (
            <Container>
                <Header/>
                <Container body>
                    <View style={styles.containerText}>
                        <Text style={styles.title}>{'Claim Your Wollo'}</Text>
                        <Text style={styles.subtitle}>{'If you’re an ICO, Airdrop, Bounty or VIP participant, you can now claim your Wollo. Please make your choice below:'}</Text>
                    </View>
                    <View>
                        <Button
                            label={'Back'}
                            onPress={this.onBack}
                        />
                        <Button
                            label={'Purchase via Eidoo ICO'}
                            onPress={this.onICO}
                        />
                        <Button
                            secondary
                            label={'Airdrop / Bounty'}
                            onPress={this.onAirdropBounty}
                        />
                        <Button
                            secondary
                            label={'VIPs'}
                            onPress={this.onVIPs}
                        />
                    </View>
                </Container>
            </Container>
        );
    }
}

export default connect(
    state => ({
        error: state.wollo.error
    })
)(Claim);
