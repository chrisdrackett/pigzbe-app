import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {loadMessages, messagesMarkRead} from '../../actions';
import Message from './message';
import {strings} from 'app/constants';
import ScrollList from 'app/components/scroll-list';
import StepModule from 'app/components/step-module';
import WebPage from 'app/components/web-page';
import url from 'url';

export class Messages extends Component {
    state = {
        openLink: false,
        link: null,
        title: null,
    }

    componentDidMount() {
        this.props.dispatch(messagesMarkRead());
        this.focusListener = this.props.navigation.addListener('didFocus', this.update);
    }

    componentWillUnMount() {
        this.focusListener.remove();
    }

    update = () => this.props.dispatch(loadMessages())

    onOpenLink = link => this.setState({
        openLink: true,
        title: url.parse(link).hostname,
        link,
    })

    onCloseLink = () => this.setState({openLink: false})

    render() {
        const {messages, loading, error} = this.props;

        return (
            <Fragment>
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
                        itemProps={{
                            onOpenLink: this.onOpenLink
                        }}
                    />
                </StepModule>
                <WebPage
                    open={this.state.openLink}
                    url={this.state.link}
                    title={this.state.title}
                    onClose={this.onCloseLink}
                />
            </Fragment>
        );
    }
}

export default connect(state => ({
    messages: state.messages.messages,
    loading: state.messages.loadMessagesing,
    error: state.messages.messagesError
}))(Messages);
