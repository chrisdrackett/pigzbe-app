import React, {Fragment} from 'react';
import {Alert, View, Text} from 'react-native';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';
import {getCountryNameByAlpha3} from 'app/utils/address';

import styles from './styles';

export default ({onNext, onAddPreviousAddress, onBack, onEnterManualAddress, address, numAddedAddresses}) => (
    <StepModule
        title="Confirm address"
        onBack={onBack}
        icon="address"
        pad
        content={
            <Fragment>
                <View style={styles.address}>
                    {!!address.flatNumber &&
                        <Text style={styles.line}>Flat {address.flatNumber}</Text>
                    }
                    {!!address.streetAddress1 &&
                        <Text style={styles.line}>{!!address.buildingNumber ? `${address.buildingNumber} ` : ''}{address.streetAddress1}</Text>
                    }
                    {!!address.streetAddress2 &&
                        <Text style={styles.line}>{address.streetAddress2}</Text>
                    }
                    {!!address.city &&
                        <Text style={styles.line}>{address.city}</Text>
                    }
                    {!!address.county &&
                        <Text style={styles.line}>{address.county}</Text>
                    }
                    {!!address.postcode &&
                        <Text style={styles.line}>{address.postcode}</Text>
                    }
                    {!!address.country &&
                        <Text style={styles.line}>{getCountryNameByAlpha3(address.country)}</Text>
                    }
                </View>
                <Button label="Not your address? Type it manually" theme="plain" onPress={onEnterManualAddress} />
            </Fragment>
        }
    >
        <View>
            <Button
                label="Confirm"
                onPress={() => {
                    Alert.alert(
                        (numAddedAddresses === 0 ?
                            'Have you lived at this address for more than 6 months?' :
                            `Have you lived at the past ${numAddedAddresses + 1} addresses for more than 6 months?`
                        ),
                        '',
                        [
                          {text: 'No', onPress: onAddPreviousAddress},
                          {text: 'Yes', onPress: onNext},
                        ],
                        {cancelable: false}
                    );
                }}
            />
        </View>
    </StepModule>
);
