import React from 'react';
import {storiesOf} from '@storybook/react-native';

import Intro from '../../src/app/screens/claim-vip/intro';
import TokenCode from '../../src/app/screens/claim-vip/token-code';
import TextCodeRequest from '../../src/app/screens/claim-vip/text-code-request';
import TextCodeEnter from '../../src/app/screens/claim-vip/text-code-enter';
import Finish from '../../src/app/screens/claim-vip/finish';
import {ClaimVIP} from '../../src/app/screens/claim-vip';

storiesOf('ClaimVIP')
    .add('intro', () => (
        <Intro
            onNext={() => undefined}
            onBack={() => undefined}
        />
    ))
    .add('token-code', () => (
        <TokenCode
            email="example@example.com"
            onNext={() => undefined}
            onBack={() => undefined}
        />
    ))
    .add('text-code-request', () => (
        <TextCodeRequest
            onNext={() => undefined}
            onBack={() => undefined}
            number={2264}
        />
    ))
    .add('text-code-enter', () => (
        <TextCodeEnter
            onNext={() => undefined}
            onBack={() => undefined}
        />
    ))
    .add('finish-claim', () => (
        <Finish
            onNext={() => undefined}
            onBack={() => undefined}
            wollo={420}
        />
    ))
    .add('index', () => (
        <ClaimVIP dispatch={() => {}} />
    ));
