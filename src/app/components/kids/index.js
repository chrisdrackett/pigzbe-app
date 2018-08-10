import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Button from '../button';
import Wollo from '../wollo';
import {familyAddKid, loadFamily} from '../../actions';

export default class Kids extends Component {

    static defaultProps = {
        kids: []
    }

    componentDidMount() {
        this.props.dispatch(loadFamily());
    }

    onAddKids = () => {
        this.props.dispatch(familyAddKid('Name', '01/01/2012', null));
    }

    render () {
        const {kids} = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Kids wallets</Text>
                {!kids.length ? (
                    <Button
                        label="Add My Children"
                        theme="light"
                        onPress={this.onAddKids}
                    />
                ) : (
                    kids.map((kid, i) => (
                        <View key={i} style={styles.kid}>
                            <Text>{kid.name}</Text>
                            <Text>{kid.dob}</Text>
                            <Text>{kid.address}</Text>
                            <Text>{kid.balance}</Text>
                            <Wollo dark balance={kid.balance} />
                        </View>
                    ))
                )}
            </View>
        );
    }
}
