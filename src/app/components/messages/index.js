import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import styles from './styles';
import {messagesLoad, messagesMarkRead} from '../../actions';
import Loader from '../loader';
import Logo from '../logo';
import Pig from '../pig';
import Message from './message';
import {strings} from '../../constants';
import ScrollList from '../scroll-list';
import Footer from '../footer';

class Messages extends Component {
    componentDidMount() {
        this.props.dispatch(messagesMarkRead());
    }

    updateMessages() {
        this.props.dispatch(messagesLoad());
    }

    render() {
        const {
            messages,
            loading,
        } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Logo/>
                    <Text style={styles.title}>
                        {strings.messagesTitle}
                    </Text>
                    <Pig/>
                </View>
                <ScrollList
                    border
                    items={messages}
                    ItemComponent={Message}
                    loading={loading}
                    loaderMessage={strings.messagesLoading}
                />
                <Footer/>
                <Loader
                    isLoading={loading}
                    message={strings.messagesLoading}
                />
            </View>
        );
    }
}

// export for test
export const MessagesComponent = Messages;

export default connect(state => ({
    messages: state.messages.messages,
    loading: state.messages.messagesLoading,
    error: state.messages.messagesError
}))(Messages);
