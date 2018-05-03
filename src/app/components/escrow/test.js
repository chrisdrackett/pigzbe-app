import React from 'react';
import renderer from 'react-test-renderer';
import {EscrowComponent} from './';

const props = {
    dispatch: () => {},
    escrow: {
        destinationPublicKey: 'GCEMHENLZNFWDODIVJJ3L65KA6Q5I6RA6CQJKEY5VBN3KZU6MSPXR7WM',
        escrowPublicKey: 'GAHOSKJQ2UDJJ7IWRI3CMHOAQOHS435UYCP6Z3O3QU525C7DIMCGMCYW',
        transactions: [
            {
                amount: '625000',
                date: '1525278258',
                xdr: 'AAAAAA7pKTDVBpT9Foo2Jh3Ag48ub7TAn+zt24U7rovjQwRmAAAAZACFl0YAAAAGAAAAAQAAAABa6eYyAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAIjDkavLS2G4aKpTtfuqB6HUeiDwoJUTHahbtWaeZJ94AAAAAVdMTwAAAAAAN5Elfl1kQx1zgHE9fuRFc+Jxrn1+uK7y7B9BS/F6R+gAAAWvMQekAAAAAAAAAAAA',
                hash: 'a97c5c731b3de9257534025c54f9c1d12905486b16f01f208a3dab4417c17ff7',
                seq: '37602498806022150'
            },
            {
                amount: '625000',
                date: '1525278264',
                xdr: 'AAAAAA7pKTDVBpT9Foo2Jh3Ag48ub7TAn+zt24U7rovjQwRmAAAAZACFl0YAAAAHAAAAAQAAAABa6eY4AAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAIjDkavLS2G4aKpTtfuqB6HUeiDwoJUTHahbtWaeZJ94AAAAAVdMTwAAAAAAN5Elfl1kQx1zgHE9fuRFc+Jxrn1+uK7y7B9BS/F6R+gAAAWvMQekAAAAAAAAAAAA',
                hash: '5c374d271b3b104b254d981016e5bcbefcece0d0ac42c6ba133dbd855c091041',
                seq: '37602498806022151'
            },
            {
                amount: '625000',
                date: '1525278270',
                xdr: 'AAAAAA7pKTDVBpT9Foo2Jh3Ag48ub7TAn+zt24U7rovjQwRmAAAAZACFl0YAAAAIAAAAAQAAAABa6eY+AAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAIjDkavLS2G4aKpTtfuqB6HUeiDwoJUTHahbtWaeZJ94AAAAAVdMTwAAAAAAN5Elfl1kQx1zgHE9fuRFc+Jxrn1+uK7y7B9BS/F6R+gAAAWvMQekAAAAAAAAAAAA',
                hash: 'adeaa44b6a3c5eb939fa093972b8e4484bcdd104d92cd53fda375b787fcd7cb1',
                seq: '37602498806022152'
            },
            {
                amount: '625000',
                date: '1525278276',
                xdr: 'AAAAAA7pKTDVBpT9Foo2Jh3Ag48ub7TAn+zt24U7rovjQwRmAAAAZACFl0YAAAAJAAAAAQAAAABa6eZEAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAIjDkavLS2G4aKpTtfuqB6HUeiDwoJUTHahbtWaeZJ94AAAAAVdMTwAAAAAAN5Elfl1kQx1zgHE9fuRFc+Jxrn1+uK7y7B9BS/F6R+gAAAWvMQekAAAAAAAAAAAA',
                hash: '76bfcccad39648394f4818401a78875f290ce1c81e90f842fb77e8da4cef3b14',
                seq: '37602498806022153'
            }
        ]
    }
};

describe('Escrow', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<EscrowComponent {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
