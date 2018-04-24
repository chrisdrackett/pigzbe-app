import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    FlatList,
    ScrollView
} from 'react-native';
import styles from './styles';
import {messagesLoad} from '../../actions';
import Loader from '../loader';
import Alert from '../alert';
import Message from './message';
import isDesktop from '../../utils/is-desktop';
import {
    strings
} from '../../constants';

class Messages extends Component {
    componentDidMount() {
        this.props.dispatch(messagesLoad());
    }

    render() {
        const {
            messages,
            loading,
            error
        } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {strings.messagesTitle}
                </Text>
                {isDesktop ? (
                    <ScrollView>
                        {messages.map((item, i) => (
                            <Message key={i} {...item}/>
                        ))}
                    </ScrollView>
                ) : (
                    <FlatList
                        data={messages}
                        renderItem={({item}) => <Message {...item}/>}
                    />
                )}
                <Loader
                    isLoading={loading}
                    message={strings.messagesLoading}
                />
                <Alert
                    error={error}
                />
            </View>
        );
    }
}

export const MessagesComponent = Messages;

export default connect(state => ({
    messages: state.messages.messages,
    loading: state.messages.messagesLoading,
    error: state.messages.error
}))(Messages);
