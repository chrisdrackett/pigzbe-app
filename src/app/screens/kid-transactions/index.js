import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import KidAvatar from 'app/components/kid-avatar';
import StepModule from 'app/components/step-module';
import Payments from 'app/components/payments';
import styles from './styles';


export class KidTransactions extends Component {
 
    onBack = () => this.props.navigation.goBack();

    render () {
        const {kid, navigation} = this.props;
        return (
            <StepModule
                headerChildren={(
                    <View style={styles.header}>
                        <KidAvatar photo={kid.photo} size={54}/>
                        <Text style={styles.name}>{kid.name}'s Transactions</Text>
                    </View>
                )}
                scroll={false}
                onBack={this.onBack}
            >
                <Payments navigation={navigation} address={kid.address} />
            </StepModule>
                    
        );
    }
}

export default connect(
    (state, props) => ({
        kid: state.kids.kids.find(k => k.address === props.navigation.state.params.kid.address),
    })
)(KidTransactions);
