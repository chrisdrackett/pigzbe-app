import countries from 'app/data/countries.json';

export const countriesByAlpha3 = countries.reduce((carry,country) => {
    carry[country['alpha-3']] = country;
    return carry;
}, {});

export const countriesForSelect = countries.reduce((carry,country) => {
    carry[country['alpha-3']] = country['name'];
    return carry;
}, {});

export const getCountryNameByAlpha3 = countryAlpha3 => countriesByAlpha3[countryAlpha3].name;

export const getKYCDocumentsForCountry = countryAlpha3 => {
    const country = countriesByAlpha3[countryAlpha3];

    let documents = [{
        type: 'passport',
        name: 'Passport',
        previewRatio: 0.7,
        bothSides: false,
        sideLabel: {
            front: 'inside',
        },
    }];

    if (['GBR', 'CAN', 'USA'].includes(countryAlpha3)) {
        documents.push({
            type: 'driving_licence',
            name: 'Driving Licence',
            previewRatio: 0.64,
            bothSides: countriesByAlpha3 === 'CAN',
        });
    }

    if (country.eu || ['CHN', 'IND'].includes(countryAlpha3)) {
        documents.push({
            type: 'national_identity_card',
            name: 'National Identity Card',
            previewRatio: 0.64,
            bothSides: country.eu,
        });
    }

    return documents;
}
