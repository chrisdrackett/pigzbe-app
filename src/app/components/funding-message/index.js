import React, {Component} from 'react';
import openURL from '../../utils/open-url';
import NotificationModal from 'app/components/notification-modal';
import moneyFormat from '../../utils/money-format';
import {
    FUNDING_URL,
    MIN_BALANCE,
    MIN_BALANCE_XLM_ADD_KID,
    MIN_BALANCE_XLM_ADD_GOAL
} from '../../constants';

const ADD_TASK = 'ADD_TASK';
const ADD_GOAL = 'ADD_GOAL';
const ASSIGN_TASK = 'ASSIGN_TASK';

export default class FundingMessage extends Component {
    static ADD_TASK = ADD_TASK
    static ADD_GOAL = ADD_GOAL
    static ASSIGN_TASK = ASSIGN_TASK

    onFundLink = () => openURL(FUNDING_URL)

    onButtonPress = () => {
        if (typeof this.props.onButtonPress === 'function') {
            this.props.onButtonPress();
        } else {
            this.onFundLink();
        }
    }

    onClose = () => this.props.onClose();

    getMessage = () => {
        const {
            balance = '0',
            balanceXLM = '0',
            requiredBalance = '0',
            fundingType,
        } = this.props;

        const msgXLM = `You currently have ${moneyFormat(balanceXLM, 5)} XLM in your wallet. `;
        const msgWLO = `You currently have ${moneyFormat(balance, 5)} WLO in your wallet. `;

        switch (fundingType) {
            case ADD_GOAL:
                return `${msgXLM} To add a new goal you need at least ${moneyFormat(MIN_BALANCE + MIN_BALANCE_XLM_ADD_GOAL)} XLM.`;
            case ADD_TASK:
                return `${msgXLM} To add a task fund your account with XLM.`;
            case ASSIGN_TASK:
                return `${msgWLO} To add the task you need ${moneyFormat(requiredBalance)} WLO.`;
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
            <NotificationModal
                open={this.props.open}
                type={'warning'}
                text={message}
                onRequestClose={this.onClose}
                buttonLabel={buttonLabel}
                onButtonPress={this.onButtonPress}
                closeCross
            />
        );
    }
}
