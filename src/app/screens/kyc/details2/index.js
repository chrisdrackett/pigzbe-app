import React, {Fragment} from 'react';
import {View} from 'react-native';
import TextInput from 'app/components/text-input';
import SelectInput from 'app/components/select-input';
import Paragraph from 'app/components/paragraph';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';
import {countriesForSelect} from 'app/utils/address';

export default ({onNext, onBack, onDetailsChange, details, errors}) => (
    <StepModule
        title="Your details"
        content={
            <Fragment>
                <Paragraph>Please fill in your details carefully and accurately.</Paragraph>
                <SelectInput
                    error={errors['nationality']}
                    value={details.nationality}
                    placeholder="Your nationality"
                    onChangeSelection={nationality => onDetailsChange({nationality})}
                    options={countriesForSelect}
                    searchable
                />
                <TextInput
                    error={errors['townOfBirth']}
                    value={details.townOfBirth}
                    placeholder={'Town of birth'}
                    onChangeText={(townOfBirth) => onDetailsChange({townOfBirth})}
                />
                <SelectInput
                    error={errors['countryOfBirth']}
                    value={details.countryOfBirth}
                    placeholder={'Country of birth'}
                    onChangeSelection={(countryOfBirth) => onDetailsChange({countryOfBirth})}
                    options={countriesForSelect}
                    searchable
                />
                <TextInput
                    error={errors['mothersMaidenName']}
                    value={details.mothersMaidenName}
                    placeholder={'Mothers maiden name'}
                    onChangeText={(mothersMaidenName) => onDetailsChange({mothersMaidenName})}
                />
            </Fragment>
        }
        icon="vip"
        onBack={onBack}
        pad
    >
        <View>
            <Button
                label="Next"
                onPress={onNext}
            />
        </View>
    </StepModule>
);
