import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadMessages, messagesMarkRead} from '../../actions';
import Message from './message';
import {strings} from '../../constants';
import ScrollList from '../../components/scroll-list';
import StepModule from '../../components/step-module';

export class Messages extends Component {

    componentDidMount() {
        this.props.dispatch(messagesMarkRead());
        this.focusListener = this.props.navigation.addListener('didFocus', this.update);
    }

    componentWillUnMount() {
        this.focusListener.remove();
    }

    update = () => this.props.dispatch(loadMessages())

    render() {
        const {messages, loading, error} = this.props;

        return (
            <StepModule
                title="Your updates"
                icon="messages"
                scroll={false}
                error={error}
                loading={loading && !messages.length}
                loaderMessage={strings.loadMessagesing}
            >
                <ScrollList
                    items={messages}
                    ItemComponent={Message}
                />
            </StepModule>
        );
    }
}

export default connect(state => ({
    messages: state.messages.messages,
    loading: state.messages.loadMessagesing,
    error: state.messages.messagesError
}))(Messages);
