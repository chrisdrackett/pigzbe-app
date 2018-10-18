import React, {Component, Fragment} from 'react';
import {View, Text, Image, Modal} from 'react-native';
//import RNModal from 'react-native-modal';
import styles from './styles';
import NotificationModal from 'app/components/notification-modal';
import Bar from './bar';
import Paragraph from '../paragraph';

const Test = ({text, active, title}) => (
    <Modal
        transparent={true}
        visible={true}
    >
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Paragraph small style={styles.text}>
                    {text}
                </Paragraph>
                <Bar active={active}/>
            </View>
        </View>
    </Modal>
)

export default class Progress extends Component {
    state = {
        active: false
    }

    activate() {
        this.setState({active: true});
    }

    componentDidMount() {
        if (this.props.active) {
            this.activate();
        }
    }

    componentDidUpdate() {
        if (this.props.active && !this.state.active) {
            this.activate();
        }
    }

    onPress = () => {
        this.setState({
            active: false,
        });
    }

    render() {
        const {active} = this.state;

        if (!active) {
            return null;
        }

        const {
            title,
            text,
            complete = false,
            onPress,
            error = null
        } = this.props;

        const errorMessage = (error && error.message) || error;

        if (errorMessage === null && (!complete || complete === undefined)) {
            return (
                <Test {...this.props} />
            )
        }

        return (
            <Fragment>
                <NotificationModal
                    open={errorMessage === null && complete}
                    type="success"
                    text="Your wallet balance has been updated"
                    onRequestClose={onPress}
                    buttonLabel="Ok"
                />
                <NotificationModal
                    open={errorMessage !== null && !complete}
                    type="error"
                    text={errorMessage}
                    onRequestClose={onPress}
                    buttonLabel="Ok"
                />
                
            </Fragment>
        );
    }
}
