import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {messagesLoad, messagesMarkRead} from '../../actions';
import Loader from '../../components/loader';
import Message from './message';
import {strings} from '../../constants';
import ScrollList from '../../components/scroll-list';
import StepModule from '../../components/step-module';

export class Messages extends Component {
    componentWillMount() {
        console.log('messages componentWillMount');
        this.focusListener = this.props.navigation.addListener('didFocus', this.updateMessages);
    }

    componentDidMount() {
        console.log('messages componentDidMount');
        this.props.dispatch(messagesMarkRead());
    }

    updateMessages = () => {
        console.log('messages updateMessages');
        this.props.dispatch(messagesLoad());
    }

    render() {
        const {
            messages,
            loading,
            error
        } = this.props;

        console.log('messages', messages.length);

        return (
            <StepModule
                title={strings.messagesTitle}
                icon="messages"
                scroll={false}
                error={error}
                loading={loading && !messages.length}
                loaderMessage={strings.messagesLoading}
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
    loading: state.messages.messagesLoading,
    error: state.messages.messagesError
}))(Messages);
