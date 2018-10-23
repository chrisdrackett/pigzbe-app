import '../../src/app/global.js';
import React, {Component} from 'react';
import {storiesOf} from '@storybook/react-native';
import Claim from '../../src/app/screens/claim';
import {ClaimICO} from '../../src/app/screens/claim-ico';
import {ClaimAirdrop} from '../../src/app/screens/claim-airdrop';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        isFocused: () => {},
        state: {
            key: 'SCREEN_CLAIM',
            routeName: 'SCREEN_CLAIM'
        },
        actions: {}
    },
};

const propsICO = {
    web3: {eth: {getGasPrice: () => '1000000000'}},
    userLogin: () => {},
    initWeb3: () => {},
    transfer: () => {},
    burn: () => {},
    clearClaimData: () => {},
    loadWallet: () => {},
    claimStart: () => {},
    loading: null,
    contract: {
        address: '0x7e37788454705F47a4B1d09D2a70d92847c52707',
        supply: '24995939220595076689687918',
        name: 'Wollo',
        symbol: 'WLO',
        owner: '0xdB0C4Ffc5E462bcEDEd3076adDF761Eff88256A4',
        instance: {
            currentProvider: {
                host: 'https://ropsten.infura.io/Oan138HoQpDarYosPryu',
                timeout: 0,
                connected: true
            },
            _requestManager: {
                provider: {
                    host: 'https://ropsten.infura.io/Oan138HoQpDarYosPryu',
                    timeout: 0,
                    connected: true
                },
                providers: {},
                subscriptions: {}
            },
            givenProvider: null,
            providers: {},
            _provider: {
                host: 'https://ropsten.infura.io/Oan138HoQpDarYosPryu',
                timeout: 0,
                connected: true
            },
            options: {
                gasPrice: '1000000000',
                gas: 6721975,
                address: '0x7e37788454705F47a4B1d09D2a70d92847c52707',
                jsonInterface: [
                    {
                        constant: true,
                        inputs: [],
                        name: 'name',
                        outputs: [
                            {
                                name: '',
                                type: 'string'
                            }
                        ],
                        payable: false,
                        stateMutability: 'view',
                        type: 'function',
                        signature: '0x06fdde03'
                    },
                    {
                        constant: false,
                        inputs: [
                            {
                                name: '_spender',
                                type: 'address'
                            },
                            {
                                name: '_value',
                                type: 'uint256'
                            }
                        ],
                        name: 'approve',
                        outputs: [
                            {
                                name: '',
                                type: 'bool'
                            }
                        ],
                        payable: false,
                        stateMutability: 'nonpayable',
                        type: 'function',
                        signature: '0x095ea7b3'
                    },
                    {
                        constant: true,
                        inputs: [],
                        name: 'totalSupply',
                        outputs: [
                            {
                                name: '',
                                type: 'uint256'
                            }
                        ],
                        payable: false,
                        stateMutability: 'view',
                        type: 'function',
                        signature: '0x18160ddd'
                    },
                    {
                        constant: false,
                        inputs: [
                            {
                                name: '_from',
                                type: 'address'
                            },
                            {
                                name: '_to',
                                type: 'address'
                            },
                            {
                                name: '_value',
                                type: 'uint256'
                            }
                        ],
                        name: 'transferFrom',
                        outputs: [
                            {
                                name: '',
                                type: 'bool'
                            }
                        ],
                        payable: false,
                        stateMutability: 'nonpayable',
                        type: 'function',
                        signature: '0x23b872dd'
                    },
                    {
                        constant: true,
                        inputs: [],
                        name: 'INITIAL_SUPPLY',
                        outputs: [
                            {
                                name: '',
                                type: 'uint256'
                            }
                        ],
                        payable: false,
                        stateMutability: 'view',
                        type: 'function',
                        signature: '0x2ff2e9dc'
                    },
                    {
                        constant: true,
                        inputs: [],
                        name: 'decimals',
                        outputs: [
                            {
                                name: '',
                                type: 'uint8'
                            }
                        ],
                        payable: false,
                        stateMutability: 'view',
                        type: 'function',
                        signature: '0x313ce567'
                    },
                    {
                        constant: false,
                        inputs: [
                            {
                                name: '_value',
                                type: 'uint256'
                            }
                        ],
                        name: 'burn',
                        outputs: [],
                        payable: false,
                        stateMutability: 'nonpayable',
                        type: 'function',
                        signature: '0x42966c68'
                    },
                    {
                        constant: false,
                        inputs: [
                            {
                                name: '_spender',
                                type: 'address'
                            },
                            {
                                name: '_subtractedValue',
                                type: 'uint256'
                            }
                        ],
                        name: 'decreaseApproval',
                        outputs: [
                            {
                                name: '',
                                type: 'bool'
                            }
                        ],
                        payable: false,
                        stateMutability: 'nonpayable',
                        type: 'function',
                        signature: '0x66188463'
                    },
                    {
                        constant: true,
                        inputs: [
                            {
                                name: '_owner',
                                type: 'address'
                            }
                        ],
                        name: 'balanceOf',
                        outputs: [
                            {
                                name: '',
                                type: 'uint256'
                            }
                        ],
                        payable: false,
                        stateMutability: 'view',
                        type: 'function',
                        signature: '0x70a08231'
                    },
                    {
                        constant: false,
                        inputs: [],
                        name: 'renounceOwnership',
                        outputs: [],
                        payable: false,
                        stateMutability: 'nonpayable',
                        type: 'function',
                        signature: '0x715018a6'
                    },
                    {
                        constant: false,
                        inputs: [
                            {
                                name: '_from',
                                type: 'address'
                            },
                            {
                                name: '_value',
                                type: 'uint256'
                            }
                        ],
                        name: 'burnFrom',
                        outputs: [],
                        payable: false,
                        stateMutability: 'nonpayable',
                        type: 'function',
                        signature: '0x79cc6790'
                    },
                    {
                        constant: true,
                        inputs: [],
                        name: 'owner',
                        outputs: [
                            {
                                name: '',
                                type: 'address'
                            }
                        ],
                        payable: false,
                        stateMutability: 'view',
                        type: 'function',
                        signature: '0x8da5cb5b'
                    },
                    {
                        constant: true,
                        inputs: [],
                        name: 'symbol',
                        outputs: [
                            {
                                name: '',
                                type: 'string'
                            }
                        ],
                        payable: false,
                        stateMutability: 'view',
                        type: 'function',
                        signature: '0x95d89b41'
                    },
                    {
                        constant: false,
                        inputs: [
                            {
                                name: '_to',
                                type: 'address'
                            },
                            {
                                name: '_value',
                                type: 'uint256'
                            }
                        ],
                        name: 'transfer',
                        outputs: [
                            {
                                name: '',
                                type: 'bool'
                            }
                        ],
                        payable: false,
                        stateMutability: 'nonpayable',
                        type: 'function',
                        signature: '0xa9059cbb'
                    },
                    {
                        constant: false,
                        inputs: [
                            {
                                name: '_spender',
                                type: 'address'
                            },
                            {
                                name: '_addedValue',
                                type: 'uint256'
                            }
                        ],
                        name: 'increaseApproval',
                        outputs: [
                            {
                                name: '',
                                type: 'bool'
                            }
                        ],
                        payable: false,
                        stateMutability: 'nonpayable',
                        type: 'function',
                        signature: '0xd73dd623'
                    },
                    {
                        constant: true,
                        inputs: [
                            {
                                name: '_owner',
                                type: 'address'
                            },
                            {
                                name: '_spender',
                                type: 'address'
                            }
                        ],
                        name: 'allowance',
                        outputs: [
                            {
                                name: '',
                                type: 'uint256'
                            }
                        ],
                        payable: false,
                        stateMutability: 'view',
                        type: 'function',
                        signature: '0xdd62ed3e'
                    },
                    {
                        constant: false,
                        inputs: [
                            {
                                name: '_newOwner',
                                type: 'address'
                            }
                        ],
                        name: 'transferOwnership',
                        outputs: [],
                        payable: false,
                        stateMutability: 'nonpayable',
                        type: 'function',
                        signature: '0xf2fde38b'
                    },
                    {
                        inputs: [],
                        payable: false,
                        stateMutability: 'nonpayable',
                        type: 'constructor',
                        signature: 'constructor'
                    },
                    {
                        anonymous: false,
                        inputs: [
                            {
                                indexed: true,
                                name: 'previousOwner',
                                type: 'address'
                            }
                        ],
                        name: 'OwnershipRenounced',
                        type: 'event',
                        signature: '0xf8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c64820'
                    },
                    {
                        anonymous: false,
                        inputs: [
                            {
                                indexed: true,
                                name: 'previousOwner',
                                type: 'address'
                            },
                            {
                                indexed: true,
                                name: 'newOwner',
                                type: 'address'
                            }
                        ],
                        name: 'OwnershipTransferred',
                        type: 'event',
                        signature: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
                    },
                    {
                        anonymous: false,
                        inputs: [
                            {
                                indexed: true,
                                name: 'burner',
                                type: 'address'
                            },
                            {
                                indexed: false,
                                name: 'value',
                                type: 'uint256'
                            }
                        ],
                        name: 'Burn',
                        type: 'event',
                        signature: '0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5'
                    },
                    {
                        anonymous: false,
                        inputs: [
                            {
                                indexed: true,
                                name: 'owner',
                                type: 'address'
                            },
                            {
                                indexed: true,
                                name: 'spender',
                                type: 'address'
                            },
                            {
                                indexed: false,
                                name: 'value',
                                type: 'uint256'
                            }
                        ],
                        name: 'Approval',
                        type: 'event',
                        signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
                    },
                    {
                        anonymous: false,
                        inputs: [
                            {
                                indexed: true,
                                name: 'from',
                                type: 'address'
                            },
                            {
                                indexed: true,
                                name: 'to',
                                type: 'address'
                            },
                            {
                                indexed: false,
                                name: 'value',
                                type: 'uint256'
                            }
                        ],
                        name: 'Transfer',
                        type: 'event',
                        signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
                    }
                ]
            },
            defaultAccount: null,
            defaultBlock: 'latest',
            methods: {},
            events: {},
            _address: '0x7e37788454705F47a4B1d09D2a70d92847c52707',
            _jsonInterface: [
                {
                    constant: true,
                    inputs: [],
                    name: 'name',
                    outputs: [
                        {
                            name: '',
                            type: 'string'
                        }
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                    signature: '0x06fdde03'
                },
                {
                    constant: false,
                    inputs: [
                        {
                            name: '_spender',
                            type: 'address'
                        },
                        {
                            name: '_value',
                            type: 'uint256'
                        }
                    ],
                    name: 'approve',
                    outputs: [
                        {
                            name: '',
                            type: 'bool'
                        }
                    ],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                    signature: '0x095ea7b3'
                },
                {
                    constant: true,
                    inputs: [],
                    name: 'totalSupply',
                    outputs: [
                        {
                            name: '',
                            type: 'uint256'
                        }
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                    signature: '0x18160ddd'
                },
                {
                    constant: false,
                    inputs: [
                        {
                            name: '_from',
                            type: 'address'
                        },
                        {
                            name: '_to',
                            type: 'address'
                        },
                        {
                            name: '_value',
                            type: 'uint256'
                        }
                    ],
                    name: 'transferFrom',
                    outputs: [
                        {
                            name: '',
                            type: 'bool'
                        }
                    ],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                    signature: '0x23b872dd'
                },
                {
                    constant: true,
                    inputs: [],
                    name: 'INITIAL_SUPPLY',
                    outputs: [
                        {
                            name: '',
                            type: 'uint256'
                        }
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                    signature: '0x2ff2e9dc'
                },
                {
                    constant: true,
                    inputs: [],
                    name: 'decimals',
                    outputs: [
                        {
                            name: '',
                            type: 'uint8'
                        }
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                    signature: '0x313ce567'
                },
                {
                    constant: false,
                    inputs: [
                        {
                            name: '_value',
                            type: 'uint256'
                        }
                    ],
                    name: 'burn',
                    outputs: [],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                    signature: '0x42966c68'
                },
                {
                    constant: false,
                    inputs: [
                        {
                            name: '_spender',
                            type: 'address'
                        },
                        {
                            name: '_subtractedValue',
                            type: 'uint256'
                        }
                    ],
                    name: 'decreaseApproval',
                    outputs: [
                        {
                            name: '',
                            type: 'bool'
                        }
                    ],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                    signature: '0x66188463'
                },
                {
                    constant: true,
                    inputs: [
                        {
                            name: '_owner',
                            type: 'address'
                        }
                    ],
                    name: 'balanceOf',
                    outputs: [
                        {
                            name: '',
                            type: 'uint256'
                        }
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                    signature: '0x70a08231'
                },
                {
                    constant: false,
                    inputs: [],
                    name: 'renounceOwnership',
                    outputs: [],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                    signature: '0x715018a6'
                },
                {
                    constant: false,
                    inputs: [
                        {
                            name: '_from',
                            type: 'address'
                        },
                        {
                            name: '_value',
                            type: 'uint256'
                        }
                    ],
                    name: 'burnFrom',
                    outputs: [],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                    signature: '0x79cc6790'
                },
                {
                    constant: true,
                    inputs: [],
                    name: 'owner',
                    outputs: [
                        {
                            name: '',
                            type: 'address'
                        }
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                    signature: '0x8da5cb5b'
                },
                {
                    constant: true,
                    inputs: [],
                    name: 'symbol',
                    outputs: [
                        {
                            name: '',
                            type: 'string'
                        }
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                    signature: '0x95d89b41'
                },
                {
                    constant: false,
                    inputs: [
                        {
                            name: '_to',
                            type: 'address'
                        },
                        {
                            name: '_value',
                            type: 'uint256'
                        }
                    ],
                    name: 'transfer',
                    outputs: [
                        {
                            name: '',
                            type: 'bool'
                        }
                    ],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                    signature: '0xa9059cbb'
                },
                {
                    constant: false,
                    inputs: [
                        {
                            name: '_spender',
                            type: 'address'
                        },
                        {
                            name: '_addedValue',
                            type: 'uint256'
                        }
                    ],
                    name: 'increaseApproval',
                    outputs: [
                        {
                            name: '',
                            type: 'bool'
                        }
                    ],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                    signature: '0xd73dd623'
                },
                {
                    constant: true,
                    inputs: [
                        {
                            name: '_owner',
                            type: 'address'
                        },
                        {
                            name: '_spender',
                            type: 'address'
                        }
                    ],
                    name: 'allowance',
                    outputs: [
                        {
                            name: '',
                            type: 'uint256'
                        }
                    ],
                    payable: false,
                    stateMutability: 'view',
                    type: 'function',
                    signature: '0xdd62ed3e'
                },
                {
                    constant: false,
                    inputs: [
                        {
                            name: '_newOwner',
                            type: 'address'
                        }
                    ],
                    name: 'transferOwnership',
                    outputs: [],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'function',
                    signature: '0xf2fde38b'
                },
                {
                    inputs: [],
                    payable: false,
                    stateMutability: 'nonpayable',
                    type: 'constructor',
                    signature: 'constructor'
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            name: 'previousOwner',
                            type: 'address'
                        }
                    ],
                    name: 'OwnershipRenounced',
                    type: 'event',
                    signature: '0xf8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c64820'
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            name: 'previousOwner',
                            type: 'address'
                        },
                        {
                            indexed: true,
                            name: 'newOwner',
                            type: 'address'
                        }
                    ],
                    name: 'OwnershipTransferred',
                    type: 'event',
                    signature: '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            name: 'burner',
                            type: 'address'
                        },
                        {
                            indexed: false,
                            name: 'value',
                            type: 'uint256'
                        }
                    ],
                    name: 'Burn',
                    type: 'event',
                    signature: '0xcc16f5dbb4873280815c1ee09dbd06736cffcc184412cf7a71a0fdb75d397ca5'
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            name: 'owner',
                            type: 'address'
                        },
                        {
                            indexed: true,
                            name: 'spender',
                            type: 'address'
                        },
                        {
                            indexed: false,
                            name: 'value',
                            type: 'uint256'
                        }
                    ],
                    name: 'Approval',
                    type: 'event',
                    signature: '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            name: 'from',
                            type: 'address'
                        },
                        {
                            indexed: true,
                            name: 'to',
                            type: 'address'
                        },
                        {
                            indexed: false,
                            name: 'value',
                            type: 'uint256'
                        }
                    ],
                    name: 'Transfer',
                    type: 'event',
                    signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
                }
            ]
        },
        network: 'ropsten'
    },
    eth: {
        coinbase: null,
        balanceWei: null,
        balanceWollo: null,
        supply: null,
        loggedIn: false,
        stellar: {
            pk: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
            sk: 'SBBZSQRKV4NDIKRVSXYL3T7NYKR3QP4X23VYGLEWYITFCKFN6Y4GY2PA'
        },
        privateKey: null
    },
    events: {
        activity: [],
        claim: null,
        transfer: null,
        loading: null,
        error: null,
        transactionHash: null,
        get: () => {}
    },
    data: {loaded: true},
    error: null
};

class ClaimICOWrapper extends Component {
    state = {data: {}}

    componentDidMount() {
        setTimeout(() => this.setState({data: {loaded: true}}), 1000);
    }

    render() {
        console.log('ClaimICOWrapper render', this.state.localStorage);
        return (
            <ClaimICO {...{
                ...props,
                ...propsICO,
                localStorage: this.state.localStorage
            }}/>
        );
    }
}

const claim = storiesOf('Claim')
    .add('default', () => (
        <Claim {...props}/>
    ))
    .add('claim ico', () => (
        <ClaimICOWrapper/>
    ));


claim.add('claim airdrop', () => (
    <ClaimAirdrop {...{
        ...props,
        ...propsICO
    }} />
));
