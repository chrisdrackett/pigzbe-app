import React, {Component} from 'react';
import {connect} from 'react-redux';
import {settingsUpdate} from 'app/actions';
import StepModule from 'app/components/step-module';
import SearchableList from 'app/components/searchable-list';
import {CURRENCIES} from 'app/constants';

const currenciesForSelect = Object.keys(CURRENCIES).reduce((obj, key) => {
    if (key !== 'WLO') {
        obj[key] = CURRENCIES[key].name;
    }
    return obj;
}, {});

export class CurrencySet extends Component {
    render() {
        const {baseCurrency, onBack, onSetBaseCurrency} = this.props;

        return (
            <StepModule
                customTitle="Currencies"
                onBack={onBack}
                avoidKeyboard={false}
            >
                <SearchableList
                    selectedKey={baseCurrency}
                    onChangeSelection={onSetBaseCurrency}
                    items={currenciesForSelect}
                />
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        baseCurrency: state.settings.baseCurrency,
    }),
    (dispatch, ownProps) => ({
        onSetBaseCurrency: baseCurrency => {
            dispatch(settingsUpdate({baseCurrency}));
            setTimeout(() => {
                ownProps.navigation.goBack();
            }, 200);
        },
        onBack: () => ownProps.navigation.goBack(),
    }),
)(CurrencySet);
