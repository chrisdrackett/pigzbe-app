import React, {Component, Fragment} from 'react';
import NotificationModal from 'app/components/notification-modal';
import moneyFormat from '../../utils/money-format';
import {
    FUNDING_URL,
    MIN_BALANCE,
    MIN_BALANCE_XLM_ADD_KID
} from '../../constants';
import WebPage from 'app/components/web-page';

const ADD_TASK = 'ADD_TASK';
const ASSIGN_TASK = 'ASSIGN_TASK';
const TRANSFER = 'TRANSFER';

export default class FundingMessage extends Component {
    static ADD_TASK = ADD_TASK
    static ASSIGN_TASK = ASSIGN_TASK
    static TRANSFER = TRANSFER

    state = {
        helpOpen: false,
        modalHidden: false,
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.open && this.props.open) {
            this.setState({modalHidden: false});
        }
    }

    onModalHide = () => {
        this.setState({modalHidden: true});
        if (typeof this.props.onModalHide === 'function') {
            this.props.onModalHide();
        }
    }

    onHelp = () => this.setState({helpOpen: true})

    onClose = () => this.setState({helpOpen: false, modalHidden: false}, this.props.onClose)

    getMessage = () => {
        const {
            balances = {XLM: '0', WLO: '0'},
            requiredBalance = '0',
            fundingType,
        } = this.props;

        const msgXLM = `You currently have ${moneyFormat(balances.XLM, 5)} XLM in your wallet. `;
        const msgWLO = `You currently have ${moneyFormat(balances.WLO, 5)} WLO in your wallet. `;

        switch (fundingType) {
            case ADD_TASK:
                return `${msgXLM} To add a task fund your account with XLM.`;
            case ASSIGN_TASK:
                return `${msgWLO} To add the task you need ${moneyFormat(requiredBalance)} WLO.`;
            case TRANSFER:
                return `${msgXLM} To transfer Wollo you need to add XLM to your wallet.`;
            default:
                return `${msgXLM} Children can only be added once you have funded your account with at least ${moneyFormat(MIN_BALANCE)} XLM + ${moneyFormat(MIN_BALANCE_XLM_ADD_KID)} XLM per child.`;

        }
    }

    render () {
        const {
            buttonLabel = 'Learn more',
        } = this.props;

        const message = this.getMessage();

        return (
            <Fragment>
                <NotificationModal
                    open={this.props.open && !this.state.helpOpen}
                    type={'warning'}
                    text={message}
                    onRequestClose={this.onClose}
                    buttonLabel={buttonLabel}
                    onButtonPress={this.onHelp}
                    onModalHide={this.onModalHide}
                    closeCross
                />
                <WebPage
                    open={this.state.helpOpen && this.state.modalHidden}
                    url={FUNDING_URL}
                    title="How to activate your wallet"
                    onClose={this.onClose}
                />
            </Fragment>
        );
    }
}
