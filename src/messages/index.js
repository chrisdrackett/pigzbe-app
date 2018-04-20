import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    // FlatList,
    Text,
    TouchableOpacity,
    View,
    Linking,
    ScrollView
} from 'react-native';
import styles from './styles';
import {messagesLoad} from '../actions';
import moment from 'moment';
import Loader from '../loader';
import Alert from '../alert';

const daysAgo = date => {
    const str = moment(date).fromNow();
    return str.slice(0, 1).toUpperCase() + str.slice(1);
};

const dateFormat = date => moment(date).format('LL');

const Message = ({
    date,
    text,
    link
}) => (
    <View style={styles.message}>
        <TouchableOpacity onPress={() => {
            if (link) {
                Linking.openURL(link);
            }
        }}>
            <Text style={styles.date}>
                {daysAgo(date)} {dateFormat(date)}
            </Text>
            <Text style={styles.text}>
                {text}
            </Text>
        </TouchableOpacity>
    </View>
);

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
                <Text style={styles.title}>Messages</Text>
                {/* <FlatList
                    data={messages}
                    renderItem={({item}) => <Message item={item}/>}
                /> */}
                <ScrollView>
                    {messages.map((item, i) => (
                        <Message key={i} {...item}/>
                    ))}
                </ScrollView>
                <Loader
                    isLoading={loading}
                    message={'Loading messages...'}
                />
                <Alert
                    error={error}
                />
            </View>
        );
    }
}

export default connect(state => ({
    messages: state.messages.messages,
    loading: state.messages.messagesLoading,
    error: state.messages.error
}))(Messages);
