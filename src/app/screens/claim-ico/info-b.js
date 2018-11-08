import React, {Component, Fragment} from 'react';
import StepWrapper from '../../components/step-wrapper';
import OrderedList from '../../components/ordered-list';
import Paragraph from '../../components/paragraph';
import {SCREEN_CLAIM_ICO_INFO_C} from '../../constants';

export default class InfoB extends Component {
    onBack = () => this.props.navigation.goBack()

    onNext = () => this.props.navigation.navigate(SCREEN_CLAIM_ICO_INFO_C)

    render() {
        return (
            <StepWrapper
                title="Your 12 words (seed)"
                onNext={this.onNext}
                onBack={this.onBack}
                content={(
                    <Fragment>
                        <Paragraph>*Firstly*, open the Eidoo App.</Paragraph>
                        <OrderedList
                            items={[
                                'Go to *Settings*',
                                'Tap *Backup Wallet* and *Backup Now*',
                                'Enter your password to unlock your wallet',
                                'Now write down on paper your *seed words*'
                            ]}
                        />
                    </Fragment>
                )}
            />
        );
    }
}
