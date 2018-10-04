import React, {Component} from 'react';
import {storiesOf} from '@storybook/react-native';
import {getKYCDocumentsForCountry} from 'app/utils/address';

// steps
import Intro from '../../src/app/screens/kyc/intro';
import Details1 from '../../src/app/screens/kyc/details1';
import Details2 from '../../src/app/screens/kyc/details2';
import AddAddress from '../../src/app/screens/kyc/add-address';
import ConfirmAddress from '../../src/app/screens/kyc/confirm-address';
import PhotoRequest from '../../src/app/screens/kyc/photo-request';
import PhotoCapture from '../../src/app/screens/kyc/photo-capture';
import TokenCode from '../../src/app/screens/kyc/token-code';
import TextCodeRequest from '../../src/app/screens/kyc/text-code-request';
import TextCodeEnter from '../../src/app/screens/kyc/text-code-enter';
import Finish from '../../src/app/screens/kyc/finish';

class Details2Test extends Component {
    state = {}
    render() {
        return (
            <Details2
                onNext={() => undefined}
                onBack={() => undefined}
                onDetailsChange={details => this.setState(details)}
                details={this.state}
                errors={{}}
            />
        );
    }
}

const documents = getKYCDocumentsForCountry('FRA');

storiesOf('KYC')
    .add('intro', () => (
        <Intro
            onNext={() => undefined}
            onBack={() => undefined}
        />
    ))
    .add('details1', () => (
        <Details1
            onNext={() => undefined}
            onBack={() => undefined}
            onDetailsChange={() => {}}
            details={{}}
            errors={{}}
        />
    ))
    .add('details2', () => (
        <Details2Test />
    ))
    .add('add-address', () => (
        <AddAddress
            onNext={() => undefined}
            onEnterManualAddress={() => undefined}
            onFindAddress={() => undefined}
            fetchingAddresses={false}
        />
    ))
    .add('confirm-address', () => (
        <ConfirmAddress
            onNext={() => undefined}
            onAddPreviousAddress={() => undefined}
            onBack={() => undefined}
            onEnterManualAddress={() => undefined}
            address={{
                flatNumber: '3a',
                buildingNumber: '7',
                buildingName: 'Niceview',
                streetAddress1: 'Lowland Street',
                streetAddress2: '',
                city: 'London',
                county: '',
                postcode: 'E1187A',
                country: 'GBR',
            }}
        />
    ))
    .add('photo-request', () => (
        <PhotoRequest
            onBack={() => undefined}
            documents={documents}
            onDocumentSelect={index => alert(`Selected documents ${documents[index].name}`)}

        />
    ))
    .add('photo-capture', () => (
        <PhotoCapture
            onNext={() => undefined}
            onBack={() => undefined}
            document={documents[0]}
            side="front"
        />
    ))
    .add('token-code', () => (
        <TokenCode
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
    ));
