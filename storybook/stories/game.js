import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Game} from '../../src/app/screens/game';
import GameBg from '../../src/app/components/game-bg';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const store = createStore(combineReducers({
    kids: () => ({
        goalLoading: false,
        balances: {
            GAXMIBCMT6EZ65OVCWMWHNMFX6Z3UAKTMAQP3P4QK7KH2TAVHMZR4USS: '0.0000000',
            GC4F2Y35HHKUZRQEVDNON2V3YZULS6KASP6SO45EQBHUQF5CX6Z5SKPB: '0.0000000',
            GBRGWC5G5A4EXE2Y4WOVH2RQUUEGMUG5P7AJ3FUK5PM67N3CMV2ZFYHO: '0.0000000',
            GCJXZI6X7RMUPELH7KORB34IEQVWOZLUU46IYAW3O6CNTGBFU5ADHCGB: '0.0000000'
        },
    }),
    settings: () => ({
        baseCurrency: 'USD',
    }),
    exchange: () => ({
        exchange: {
            USD: 0.12,
            EUR: 0.103992,
            JPY: 13.704,
            GBP: 0.092388,
            AUD: 0.168,
            CAD: 0.1596,
            CHF: 0.11868,
            CNY: 0.804,
            SEK: 1.0836,
            NZD: 0.2028,
            MXN: 2.2476,
            SGD: 0.1656,
            HKD: 0.9468,
            NOK: 1.014,
            KRW: 136.5156,
            TRY: 0.738,
            RUB: 8.0184,
            INR: 8.736,
            BRL: 0.4764,
            ZAR: 1.8192,
            GOLD: 0.003384,
            XLM: 0.4908,
            BTC: 0.00001829,
            ETH: 0.00053592
        },
    }),
    wallet: () => ({
        loading: false,
        payments: [],
    }),
    keys: () => ({
        publicKey: '',
    }),
}), applyMiddleware(thunk));

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => ({remove: () => {}}),
        state: {
            key: 'SCREEN_GAME',
            routeName: 'SCREEN_GAME'
        },
        actions: {}
    },
    kid: {
        name: 'Iggy',
        address: 'GADOVZSAP7QXAY2GOBXSMBOP2EPHIYBYQXW7FY7GKYU6A5TQULT2FS6P',
        home: 'GAXMIBCMT6EZ65OVCWMWHNMFX6Z3UAKTMAQP3P4QK7KH2TAVHMZR4USS',
        photo: '',
        balance: '0.0000000',
        dob: '04/10/2018',
        tasks: [
            {
                kid: {
                    name: 'Iggy',
                    address: 'GADOVZSAP7QXAY2GOBXSMBOP2EPHIYBYQXW7FY7GKYU6A5TQULT2FS6P',
                    home: 'GAXMIBCMT6EZ65OVCWMWHNMFX6Z3UAKTMAQP3P4QK7KH2TAVHMZR4USS',
                    photo: '',
                    balance: '0',
                    dob: '04/10/2018',
                    tasks: [],
                    goals: [],
                    allowances: [
                        {
                            id: 1,
                            amount: '25',
                            interval: 'Daily',
                            day: null,
                            nextDate: '2018-10-05T14:22:43.215Z',
                            timezone: 'Europe/London',
                            payments: [
                                {
                                    id: 1,
                                    status: 'success'
                                }
                            ]
                        }
                    ],
                    actions: []
                },
                task: 'Clean the car',
                reward: 5,
                transaction: 'f5671760e6c9015b1940631605be4d5af207cbe86177cf87c399b1f94cf8144c'
            }
        ],
        goals: [
            {
                address: 'GC4F2Y35HHKUZRQEVDNON2V3YZULS6KASP6SO45EQBHUQF5CX6Z5SKPB',
                name: 'Goal 1',
                reward: 39
            },
            {
                address: 'GBRGWC5G5A4EXE2Y4WOVH2RQUUEGMUG5P7AJ3FUK5PM67N3CMV2ZFYHO',
                name: 'Goal 2',
                reward: 245
            },
            {
                address: 'GCJXZI6X7RMUPELH7KORB34IEQVWOZLUU46IYAW3O6CNTGBFU5ADHCGB',
                name: 'Goal 3',
                reward: 708
            },
            {
                address: 'GCJXZI6X7RMUPELH7KORB34IEQVWOZLUU46IYAW3O6CNTGBFU5ADHCGB',
                name: 'Goal 4',
                reward: 708
            },
            {
                address: 'GCJXZI6X7RMUPELH7KORB34IEQVWOZLUU46IYAW3O6CNTGBFU5ADHCGB',
                name: 'Goal 5',
                reward: 708
            },
            {
                address: 'GCJXZI6X7RMUPELH7KORB34IEQVWOZLUU46IYAW3O6CNTGBFU5ADHCGB',
                name: 'Goal 6',
                reward: 708
            },
            {
                address: 'GCJXZI6X7RMUPELH7KORB34IEQVWOZLUU46IYAW3O6CNTGBFU5ADHCGB',
                name: 'Goal 7',
                reward: 708
            },
            {
                address: 'GCJXZI6X7RMUPELH7KORB34IEQVWOZLUU46IYAW3O6CNTGBFU5ADHCGB',
                name: 'Goal 8',
                reward: 708
            }
        ],
        allowances: [
            {
                id: 1,
                amount: '25',
                interval: 'Daily',
                day: null,
                nextDate: '2018-10-05T14:22:43.215Z',
                timezone: 'Europe/London',
                payments: [
                    {
                        id: 1,
                        status: 'success'
                    }
                ]
            }
        ],
        actions: [
            {
                memo: 'Allowance #1.1 to Iggy',
                type: 'TRANSFER_TYPE_ALLOWANCE',
                amount: '25',
                totalAmount: '25',
                hash: '1cc7255d877ace1ada0be8f0150a921491c8687ab9a7125d1329a8d9e3ac099f',
                date: '2018-10-04T14:22:52Z'
            },
            {
                memo: 'Task: Clean the car',
                type: 'TRANSFER_TYPE_TASK',
                amount: '5',
                totalAmount: '5',
                hash: 'f5671760e6c9015b1940631605be4d5af207cbe86177cf87c399b1f94cf8144c',
                date: '2018-10-04T14:23:02Z'
            },
            {
                memo: 'From dad',
                type: 'TRANSFER_TYPE_PRESENT',
                amount: '8',
                totalAmount: '8',
                hash: 'f8ae3b2fae64b68c4248c0c2171b8f2e9db244d56f0ed862a2ec29db084d653c',
                date: '2018-10-04T14:23:22Z'
            }
        ]
    },
    parentNickname: 'dad',
    exchange: {
        USD: 0.12,
        EUR: 0.103992,
        JPY: 13.704,
        GBP: 0.092388,
        AUD: 0.168,
        CAD: 0.1596,
        CHF: 0.11868,
        CNY: 0.804,
        SEK: 1.0836,
        NZD: 0.2028,
        MXN: 2.2476,
        SGD: 0.1656,
        HKD: 0.9468,
        NOK: 1.014,
        KRW: 136.5156,
        TRY: 0.738,
        RUB: 8.0184,
        INR: 8.736,
        BRL: 0.4764,
        ZAR: 1.8192,
        GOLD: 0.003384,
        XLM: 0.4908,
        BTC: 0.00001829,
        ETH: 0.00053592
    },
    wolloCollected: 0,
    overlayOpen: false,
    balances: {
        GAXMIBCMT6EZ65OVCWMWHNMFX6Z3UAKTMAQP3P4QK7KH2TAVHMZR4USS: '4.0000000',
        GC4F2Y35HHKUZRQEVDNON2V3YZULS6KASP6SO45EQBHUQF5CX6Z5SKPB: '1000000.0000000',
        GBRGWC5G5A4EXE2Y4WOVH2RQUUEGMUG5P7AJ3FUK5PM67N3CMV2ZFYHO: '0.0000000',
        GCJXZI6X7RMUPELH7KORB34IEQVWOZLUU46IYAW3O6CNTGBFU5ADHCGB: '0.0000000'
    },
};

storiesOf('Game')
    .addDecorator(story => <Provider store={store}>{story()}</Provider>)
    .add('default', () => (
        <Game {...props}/>
    ))
    .add('bg start', () => (
        <GameBg />
    ))
    .add('bg anim', () => (
        <GameBg targetX={2000} />
    ))
    .add('with learn', () => (
        <Game {...{
            ...props,
            overlayOpen: true
        }}/>
    ))
    .add('with tasks', () => (
        <Game {...{
            ...props,
            kid: {
                ...props.kid,
                tasks: [{
                    task: 'Clean the car',
                    reward: '10',
                }, {
                    task: 'Do your homework',
                    reward: '100',
                }]
            },
        }}/>
    ));
