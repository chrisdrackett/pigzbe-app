import React, {Fragment} from 'react';
import {View} from 'react-native';

import TextInput from 'app/components/text-input';
import SelectInput from 'app/components/select-input';
import Paragraph from 'app/components/paragraph';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';

export default ({onNext, onBack, onDetailsChange, details, errors}) => (
    <StepModule
        title="Your details"
        content={
            <Fragment>
                <Paragraph>Please fill in your details carefully and accurately.</Paragraph>
                <SelectInput
                    error={errors['title']}
                    value={details.title}
                    placeholder={'Title'}
                    onChangeSelection={title => onDetailsChange({title})}
                    options={['', 'Mr', 'Mrs', 'Miss', 'Ms', 'Sir', 'Dr']}
                />
                <TextInput
                    error={errors['firstName']}
                    value={details.firstName}
                    placeholder={'First name'}
                    onChangeText={(firstName) => onDetailsChange({firstName})}
                />
                <TextInput
                    error={errors['lastName']}
                    value={details.lastName}
                    placeholder={'Last name'}
                    onChangeText={(lastName) => onDetailsChange({lastName})}
                />
                <TextInput
                    error={errors['previousLastName']}
                    value={details.previousLastName}
                    placeholder={'Previous last name (optional)'}
                    onChangeText={(previousLastName) => onDetailsChange({previousLastName})}
                />
                <TextInput
                    error={errors['dob']}
                    value={details.dob}
                    placeholder={'Date of birth (dd/mm/yyyy)'}
                    onChangeText={(dob) => onDetailsChange({dob})}
                />
                <TextInput
                    error={errors['email']}
                    value={details.email}
                    placeholder={'Email address'}
                    onChangeText={(email) => onDetailsChange({email})}
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
