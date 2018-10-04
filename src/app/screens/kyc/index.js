import React, {Component, Fragment} from 'react';
import {Text} from 'react-native';
import {connect} from 'react-redux';

import {
    kycSetStep,
    kycSetDetails,
    kycFetchAddresses,
    kycSetPendingAddress,
    kycAddAddress,
    kycSetDocumentType,
    kycAddDocumentImage,
    kycClearDocumentImages,
} from 'app/actions';
import {SCREEN_CLAIM} from 'app/constants';
import {getKYCDocumentsForCountry} from 'app/utils/address';

import Intro from './intro';
import Details1 from './details1';
import Details2 from './details2';
import AddAddress from './add-address';
import ConfirmAddress from './confirm-address';
import PhotoRequest from './photo-request';
import PhotoCapture from './photo-capture';
import TokenCode from './token-code';
import TextCodeRequest from './text-code-request';
import TextCodeEnter from './text-code-enter';
import Finish from './finish';

class ClaimVIP extends Component {
    componentDidMount() {
        this.props.dispatch(kycSetStep('intro'));
        //this.props.dispatch(kycSetStep('tokenCode'));
    }

    renderAddressesStep() {
        if (!this.props.pendingAddress) {
            return (
                <AddAddress
                    onBack={() => {
                        // @todo make this a bit smarter
                        // perhaps step back through addresses
                        this.props.dispatch(kycSetStep('details2'))
                    }}
                    onNext={address => {
                        this.props.dispatch(kycSetPendingAddress(address));
                    }}
                    onFetchAddresses={({postCode, houseNumber}) => this.props.dispatch(kycFetchAddresses(postCode, houseNumber))}
                    fetchingAddresses={this.props.fetchingAddresses}
                    possibleAddresses={this.props.possibleAddresses}
                    numAddedAddresses={this.props.addresses.length}
                />
            )
        } else {
            return (
                <ConfirmAddress
                    onBack={() => this.props.dispatch(kycSetPendingAddress(null))}
                    onNext={() => {
                        this.props.dispatch(kycAddAddress(this.props.pendingAddress));
                        this.props.dispatch(kycSetPendingAddress(null));
                        this.props.dispatch(kycSetStep('photoRequest'));
                    }}
                    onAddPreviousAddress={() => {
                        this.props.dispatch(kycAddAddress(this.props.pendingAddress));
                        this.props.dispatch(kycSetPendingAddress(null));
                    }}
                    onEnterManualAddress={() => this.props.dispatch(kycSetPendingAddress(null))}
                    address={this.props.pendingAddress}
                    numAddedAddresses={this.props.addresses.length}
                />
            )
        }
    }

    renderPhotoIdentityStep() {
        const {details, documentType, documentImages} = this.props;
        const permissibleDocuments = getKYCDocumentsForCountry(details.nationality || 'GBR');

        if (!documentType) {
            return (
                <PhotoRequest
                    onBack={() => this.props.dispatch(kycSetStep('addresses'))}
                    documents={permissibleDocuments}
                    onDocumentSelect={index => this.props.dispatch(kycSetDocumentType(permissibleDocuments[index].type))}
                />
            )
        } else {

            const document = permissibleDocuments.find(document => document.type === documentType);

            const side = documentImages.length === 0 ? 'front' : 'back';

            return (
                <PhotoCapture
                    onBack={() => {
                        this.props.dispatch(kycSetDocumentType(null));
                        this.props.dispatch(kycClearDocumentImages());
                    }}
                    document={document}
                    onPhotoCaptured={base64 => {
                        this.props.dispatch(kycAddDocumentImage({
                            side,
                            base64,
                        }));

                        // Do we have all the photos that we need?
                        if (!document.bothSides || documentImages.length === 1) {
                            // @todo upload and show status

                            this.props.dispatch(kycSetStep('tokenCode'))
                        }
                    }}
                    side={side}
                />
            )
        }
    }

    render() {
        const {step, details} = this.props;

        return (
            <Fragment>
                {step === 'intro' && (
                    <Intro 
                        onBack={() => this.props.navigation.navigate(SCREEN_CLAIM)}
                        onNext={() => this.props.dispatch(kycSetStep('details1'))}
                    />
                )}
                {step === 'details1' && (
                    <Details1
                        onBack={() => this.props.dispatch(kycSetStep('intro'))}
                        onNext={() => this.props.dispatch(kycSetStep('details2'))}
                        onDetailsChange={details => this.props.dispatch(kycSetDetails(details))}
                        details={details}
                        errors={{}}
                    />
                )}
                {step === 'details2' && (
                    <Details2
                        onBack={() => this.props.dispatch(kycSetStep('details1'))}
                        onNext={() => this.props.dispatch(kycSetStep('addresses'))}
                        onDetailsChange={details => this.props.dispatch(kycSetDetails(details))}
                        details={details}
                        errors={{}}
                    />
                )}
                {step === 'addresses' && 
                    this.renderAddressesStep()
                }
                {step === 'photoRequest' &&
                    this.renderPhotoIdentityStep()
                }
                {step === 'tokenCode' && (
                    <TokenCode
                        onBack={() => this.props.dispatch(kycSetStep('photoRequest'))}
                        onNext={tokenCode => {
                            // @todo store it or do API call, show success?
                            this.props.dispatch(kycSetStep('textCodeRequest'));
                        }}
                    />
                )}
                {step === 'textCodeRequest' &&
                    <TextCodeRequest
                        onBack={() => this.props.dispatch(kycSetStep('photoRequest'))}
                        onNext={() => {
                            // @todo do API call
                            this.props.dispatch(kycSetStep('textCodeEnter'));
                        }}
                        number={1234}
                    />
                }
                {step === 'textCodeEnter' &&
                    <TextCodeEnter
                        onBack={() => this.props.dispatch(kycSetStep('textCodeRequest'))}
                        onNext={textCode => {
                            // @todo do API call
                            this.props.dispatch(kycSetStep('finish'));
                        }}
                    />
                }
                {step === 'finish' &&
                    <Finish
                        onBack={() => this.props.dispatch(kycSetStep('textCodeEnter'))}
                        onNext={() => {
                            // @todo do API call or send to another screen
                            alert("All done");
                        }}
                    />
                }
            </Fragment>
        )
    }
}
export default connect(state => ({
    step: state.kyc.step,
    details: state.kyc.details,
    addresses: state.kyc.addresses,
    fetchingAddresses: state.kyc.fetchingAddresses,
    possibleAddresses: state.kyc.possibleAddresses,
    pendingAddress: state.kyc.pendingAddress,
    documentType: state.kyc.documentType,
    documentImages: state.kyc.documentImages,
}))(ClaimVIP);
