import React, {Component, Fragment} from 'react';
import {View, Text} from 'react-native';
import Paragraph from 'app/components/paragraph';
import TextInput from 'app/components/text-input';
import SelectInput from 'app/components/select-input';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';
import LoaderModal from 'app/components/loader-modal';
import {countriesForSelect, usStatesForSelect} from 'app/utils/address';
import usStates from 'app/data/us-states.json';

export default class AddAddress extends Component {
    state = {
        country: null,
        search: {
            postcode: '',
            houseNumber: '',
        },
        address: {
            flatNumber: '',
            buildingNumber: '',
            buildingName: '',
            streetAddress1: '',
            streetAddress2: '',
            city: '',
            county: '',
            postcode: '',
        },
        manualEntry: false,
    }
    onFetchAddresses = () => {
        this.props.onFetchAddresses({
            postCode: this.state.postCode,
            houseNumber: this.state.houseNumber,
        });
    }
    onUpdateSearch = (fields) => {
        this.setState({
            search: {
                ...this.state.address,
                ...fields,
            } 
        });
    }
    onUpdateAddress = (fields) => {
        this.setState({
            address: {
                ...this.state.address,
                ...fields,
            } 
        });
    }
    showSearch() {
        return this.state.country === 'GBR' && !this.state.manualEntry;
    }
    showManualEntry() {
        return !!this.state.country && !this.showSearch();
    }
    isUnitedStates() {
        return this.state.country === 'USA';
    }
    onNext = () => {
        this.props.onNext({
            ...this.state.address,
            country: this.state.country,
        });
    }
    render() {
        const {
            country,
            address: manualAddress,
        } = this.state;
        const {fetchingAddresses, onBack, numAddedAddresses} = this.props;

        return (
            <StepModule
                title={numAddedAddresses === 0 ? "Current address" : "Previous address"}
                onBack={onBack}
                icon="address"
                pad
                content={
                    <Fragment>

                        <Paragraph>Please enter your {numAddedAddresses === 0 ? 'current' : 'previous'} home address</Paragraph>

                        <SelectInput
                            error={false}
                            value={this.state.country}
                            placeholder={'Country'}
                            onChangeSelection={country => this.setState({country})}
                            options={countriesForSelect}
                            searchable
                        />

                        {this.showSearch() &&
                            <Fragment>
                                <TextInput
                                    error={false}
                                    value={this.state.postCode}
                                    placeholder={'Postcode'}
                                    onChangeText={(postCode) => this.onUpdateSearch({postCode})}
                                />
                                <TextInput
                                    error={false}
                                    value={this.state.houseNumber}
                                    placeholder={'House number or name'}
                                    onChangeText={(houseNumber) => this.onUpdateSearch({houseNumber})}
                                />
                                <Button label="Type your address manually" theme="plain" onPress={() => this.setState({manualEntry: true})} />
                            </Fragment>
                        }
                        {this.showManualEntry() &&
                            <Fragment>
                                <TextInput
                                    error={false}
                                    value={manualAddress.flatNumber}
                                    placeholder={'Flat number (optional)'}
                                    onChangeText={(flatNumber) => this.onUpdateAddress({flatNumber})}
                                />
                                <TextInput
                                    error={false}
                                    value={manualAddress.buildingNumber}
                                    placeholder={'Building number (optional)'}
                                    onChangeText={(buildingNumber) => this.onUpdateAddress({buildingNumber})}
                                />
                                <TextInput
                                    error={false}
                                    value={manualAddress.buildingName}
                                    placeholder={'Building name (optional)'}
                                    onChangeText={(buildingName) => this.onUpdateAddress({buildingName})}
                                />
                                <TextInput
                                    error={false}
                                    value={manualAddress.streetAddress1}
                                    placeholder={'Street address 1'}
                                    onChangeText={(streetAddress1) => this.onUpdateAddress({streetAddress1})}
                                />
                                <TextInput
                                    error={false}
                                    value={manualAddress.streetAddress2}
                                    placeholder={'Street address 2 (optional)'}
                                    onChangeText={(streetAddress2) => this.onUpdateAddress({streetAddress2})}
                                />
                                <TextInput
                                    error={false}
                                    value={manualAddress.city}
                                    placeholder={'City'}
                                    onChangeText={(city) => this.onUpdateAddress({city})}
                                />
                                {this.isUnitedStates() &&
                                    <SelectInput
                                        error={false}
                                        value={manualAddress.county}
                                        placeholder={'State'}
                                        onChangeSelection={county => this.onUpdateAddress({county})}
                                        options={usStates}
                                        searchable
                                    />
                                }
                                {!this.isUnitedStates() &&
                                    <TextInput
                                        error={false}
                                        value={manualAddress.county}
                                        placeholder={'County (optional)'}
                                        onChangeText={(county) => this.onUpdateAddress({county})}
                                    />
                                }
                                <TextInput
                                    error={false}
                                    value={manualAddress.postcode}
                                    placeholder={this.isUnitedStates() ? 'Zipcode' : 'Postcode'}
                                    onChangeText={(postcode) => this.onUpdateAddress({postcode})}
                                />
                            </Fragment>
                        }

                        {false &&
                            <View style={{
                                    marginTop: 20,
                                    marginBottom: 20,
                                    color: 'grey',
                            }}>
                                <Text 
                                    onPress={() => this.setState({country: 'GBR'})}
                                    style={{
                                        color: 'grey',
                                    }}
                                >[Set to UK]</Text>
                                <Text 
                                    onPress={() => this.setState({country: 'USA'})}
                                    style={{
                                        color: 'grey',
                                    }}
                                >[Set to US]</Text>
                                <Text 
                                    onPress={() => this.setState({country: 'DEU'})}
                                    style={{
                                        color: 'grey',
                                    }}
                                >[Set to Germany]</Text>
                            </View>
                        }
                    </Fragment>
                }
            >
                {this.showSearch() &&
                    <Fragment>
                        <View>
                            <Button
                                label="Find Address"
                                onPress={this.onFetchAddresses}
                            />
                        </View>
                        <LoaderModal
                            loading={fetchingAddresses}
                            message="Fetching addresses"
                        />
                    </Fragment>
                }
                {this.showManualEntry() &&
                    <View>
                        <Button
                            label="Next"
                            onPress={this.onNext}
                        />
                    </View>
                }
            </StepModule>
        )
    }
}
