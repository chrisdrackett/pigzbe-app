import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Button from '../button';
import Kid from './kid';
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

    onSliderChange = value => this.setState({value})

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
                        <Kid key={i} kid={kid}/>
                    ))
                )}
            </View>
        );
    }
}
