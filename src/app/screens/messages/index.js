import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {messagesLoad, messagesMarkRead} from '../../actions';
import Loader from '../../components/loader';
import Message from './message';
import {strings} from '../../constants';
import ScrollList from '../../components/scroll-list';
// import Footer from '../../components/footer';
import StepModule from '../../components/step-module';

export class Messages extends Component {
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
            <Fragment>
                <StepModule
                    title={strings.messagesTitle}
                    icon="messages"
                    scroll={false}
                >
                    <ScrollList
                        items={messages}
                        ItemComponent={Message}
                        loading={loading}
                        loaderMessage={strings.messagesLoading}
                    />
                </StepModule>
                <Loader
                    isLoading={loading}
                    message={strings.messagesLoading}
                />
            </Fragment>
        );
    }
}

export default connect(state => ({
    messages: state.messages.messages,
    loading: state.messages.messagesLoading,
    error: state.messages.messagesError
}))(Messages);
