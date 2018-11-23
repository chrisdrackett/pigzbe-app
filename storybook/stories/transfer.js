import React, {Fragment} from 'react';
import {storiesOf} from '@storybook/react-native';
import {Transfer} from '../../src/app/screens/transfer';
import Review from '../../src/app/screens/transfer/review';
import Payments from '../../src/app/components/payments';
import StepModule from '../../src/app/components/step-module';
import Button from '../../src/app/components/button';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const payments = [
    {
        date: '2018-06-29T13:34:03Z',
        amount: '0.5000000',
        assetCode: 'WLO',
        direction: 'in',
        from: 'GAGU75S64LOTOMJFULBGQENU3K5WXBQXHC5R2PABER7YITNKR5H5E7ZE',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GAGU75S64LOTOMJFULBGQENU3K5WXBQXHC5R2PABER7YITNKR5H5E7ZE',
        memo: 'From Ian',
        link: 'https://horizon-testnet.stellar.org/operations/41889881189785601'
    },
    {
        date: '2018-06-22T16:19:55Z',
        amount: '100.0000000',
        assetCode: 'WLO',
        direction: 'in',
        from: 'GAER3I4YDEPXCFMUB5J5OXD7QT7F4XPT2NVUOMNIUAMD2UCYOKKPFB2U',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GAER3I4YDEPXCFMUB5J5OXD7QT7F4XPT2NVUOMNIUAMD2UCYOKKPFB2U',
        memo: 'Thanks',
        link: 'https://horizon-testnet.stellar.org/operations/41378913225547777'
    },
    {
        date: '2018-06-20T16:22:47Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: '',
        link: 'https://horizon-testnet.stellar.org/operations/41230629479653377'
    },
    {
        date: '2018-07-06T18:37:50Z',
        amount: '5.4672469',
        assetCode: 'WLO',
        direction: 'in',
        from: 'GDPCWCCJDXJHSA3GA62PFMZNP6A7NZSEGNEH3F3LSSUQZZ3NDCFVB6GB',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GDPCWCCJDXJHSA3GA62PFMZNP6A7NZSEGNEH3F3LSSUQZZ3NDCFVB6GB',
        memo: 'Welcome to Pigzbe',
        link: 'https://horizon-testnet.stellar.org/operations/42425038409838593'
    },
    {
        date: '2018-06-20T16:21:37Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: '',
        link: 'https://horizon-testnet.stellar.org/operations/41230569350115329'
    },
    {
        date: '2018-06-20T16:18:57Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/41230431911153665'
    },
    {
        date: '2018-06-20T14:18:22Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/41224217093488641'
    },
    {
        date: '2018-06-20T14:17:36Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/41224178438791169'
    },
    {
        date: '2018-06-20T14:16:02Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/41224096834392065'
    },
    {
        date: '2018-06-20T14:13:41Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/41223976575307777'
    },
    {
        date: '2018-06-20T11:35:36Z',
        amount: '100.0000000',
        assetCode: 'WLO',
        direction: 'in',
        from: 'GAER3I4YDEPXCFMUB5J5OXD7QT7F4XPT2NVUOMNIUAMD2UCYOKKPFB2U',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GAER3I4YDEPXCFMUB5J5OXD7QT7F4XPT2NVUOMNIUAMD2UCYOKKPFB2U',
        memo: 'From Wen',
        link: 'https://horizon-testnet.stellar.org/operations/41215829022351361'
    },
    {
        date: '2018-06-19T13:15:45Z',
        amount: '3.0000000',
        assetCode: 'WLO',
        direction: 'in',
        from: 'GDHCHMOBVB2GCXOJWMEFF5BYHJZ5PUPFOLISC2D5YJPVYDJOLCSCHNCD',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GDHCHMOBVB2GCXOJWMEFF5BYHJZ5PUPFOLISC2D5YJPVYDJOLCSCHNCD',
        memo: 'Hi Daniel have some Wollo',
        link: 'https://horizon-testnet.stellar.org/operations/41146847552614401'
    },
    {
        date: '2018-06-19T13:13:50Z',
        amount: '5.0000000',
        assetCode: 'WLO',
        direction: 'out',
        from: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        to: 'GDHCHMOBVB2GCXOJWMEFF5BYHJZ5PUPFOLISC2D5YJPVYDJOLCSCHNCD',
        address: 'GDHCHMOBVB2GCXOJWMEFF5BYHJZ5PUPFOLISC2D5YJPVYDJOLCSCHNCD',
        memo: 'Here’s 5 Wollo for you!',
        link: 'https://horizon-testnet.stellar.org/operations/41146748768358401'
    },
    {
        date: '2018-06-18T14:43:00Z',
        amount: '1.0000000',
        assetCode: 'WLO',
        direction: 'out',
        from: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        to: 'GDHCHMOBVB2GCXOJWMEFF5BYHJZ5PUPFOLISC2D5YJPVYDJOLCSCHNCD',
        address: 'GDHCHMOBVB2GCXOJWMEFF5BYHJZ5PUPFOLISC2D5YJPVYDJOLCSCHNCD',
        memo: 'Wolllloooooo',
        link: 'https://horizon-testnet.stellar.org/operations/41077303442153473'
    },
    {
        date: '2018-06-13T13:28:01Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40706768023592961'
    },
    {
        date: '2018-06-13T13:27:26Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40706737958825985'
    },
    {
        date: '2018-06-13T13:25:25Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40706634879602689'
    },
    {
        date: '2018-06-13T13:23:06Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40706514620526593'
    },
    {
        date: '2018-06-13T07:44:27Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40689214492258305'
    },
    {
        date: '2018-06-13T07:41:57Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40689085643231233'
    },
    {
        date: '2018-06-12T17:50:14Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40646522517327873'
    },
    {
        date: '2018-06-12T17:49:22Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40646479567663105'
    },
    {
        date: '2018-06-12T17:47:59Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40646406553223169'
    },
    {
        date: '2018-06-12T13:07:13Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40632087132262401'
    },
    {
        date: '2018-06-12T13:06:18Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40632039887622145'
    },
    {
        date: '2018-06-12T13:03:57Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40631923923488769'
    },
    {
        date: '2018-06-12T13:00:37Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40631752124817409'
    },
    {
        date: '2018-06-11T16:57:24Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40570205243445249'
    },
    {
        date: '2018-06-11T16:54:44Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40570067804491777'
    },
    {
        date: '2018-06-11T16:42:09Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40569419264430081'
    },
    {
        date: '2018-06-11T15:09:10Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40564656145715201'
    },
    {
        date: '2018-06-11T15:07:00Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40564544476561409'
    },
    {
        date: '2018-06-11T15:05:40Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40564475757072385'
    },
    {
        date: '2018-06-11T15:04:45Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40564428512432129'
    },
    {
        date: '2018-06-11T14:56:55Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        memo: 'Test',
        link: 'https://horizon-testnet.stellar.org/operations/40564024785522689'
    },
    {
        date: '2018-06-11T14:55:37Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        link: 'https://horizon-testnet.stellar.org/operations/40563960361009153'
    },
    {
        date: '2018-06-11T14:54:35Z',
        amount: '1.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GCX4CQ4RBK4HIATR2MYG3VJU2CGAOQMLK25FS574OUYG6MYGG3Y6V353',
        link: 'https://horizon-testnet.stellar.org/operations/40563904526422017'
    },
    {
        date: '2018-06-06T09:51:52Z',
        amount: '10.0000000',
        assetCode: 'WLO',
        direction: 'in',
        from: 'GAER3I4YDEPXCFMUB5J5OXD7QT7F4XPT2NVUOMNIUAMD2UCYOKKPFB2U',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GAER3I4YDEPXCFMUB5J5OXD7QT7F4XPT2NVUOMNIUAMD2UCYOKKPFB2U',
        memo: 'Ten Wollo',
        link: 'https://horizon-testnet.stellar.org/operations/40179827075981313'
    },
    {
        date: '2018-06-06T09:51:27Z',
        amount: '20.0000000',
        assetCode: 'WLO',
        direction: 'in',
        from: 'GAER3I4YDEPXCFMUB5J5OXD7QT7F4XPT2NVUOMNIUAMD2UCYOKKPFB2U',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GAER3I4YDEPXCFMUB5J5OXD7QT7F4XPT2NVUOMNIUAMD2UCYOKKPFB2U',
        memo: 'Twenty',
        link: 'https://horizon-testnet.stellar.org/operations/40179805601144833'
    },
    {
        date: '2018-06-05T12:20:30Z',
        amount: '100.0000000',
        assetCode: 'WLO',
        direction: 'in',
        from: 'GAER3I4YDEPXCFMUB5J5OXD7QT7F4XPT2NVUOMNIUAMD2UCYOKKPFB2U',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GAER3I4YDEPXCFMUB5J5OXD7QT7F4XPT2NVUOMNIUAMD2UCYOKKPFB2U',
        memo: 'Here\'s some more Wollo!',
        link: 'https://horizon-testnet.stellar.org/operations/40113272262758401'
    },
    {
        date: '2018-05-04T09:58:09Z',
        amount: '468.5000000',
        assetCode: 'WLO',
        direction: 'in',
        from: 'GAER3I4YDEPXCFMUB5J5OXD7QT7F4XPT2NVUOMNIUAMD2UCYOKKPFB2U',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GAER3I4YDEPXCFMUB5J5OXD7QT7F4XPT2NVUOMNIUAMD2UCYOKKPFB2U',
        memo: '',
        link: 'https://horizon-testnet.stellar.org/operations/37731034292297729'
    },
    {
        date: '2018-05-04T09:55:20Z',
        amount: '10.0000000',
        assetCode: 'XLM',
        direction: 'in',
        from: 'GDPCWCCJDXJHSA3GA62PFMZNP6A7NZSEGNEH3F3LSSUQZZ3NDCFVB6GB',
        to: 'GCUPGH4DZZVXNWVMEOXMO2M2524UYY2O6DXDGUR6YRFPNFGVF4LX63TW',
        address: 'GDPCWCCJDXJHSA3GA62PFMZNP6A7NZSEGNEH3F3LSSUQZZ3NDCFVB6GB',
        memo: '',
        link: 'https://horizon-testnet.stellar.org/operations/37730888263413761'
    }
];

const store = createStore(combineReducers({
    settings: () => ({
        baseCurrency: 'GBP'
    }),
    exchange: () => ({
        exchange: {
            XLM: 0.3936,
            BTC: 0.0000147,
            ETH: 0.00025584,
            EUR: 0.102828,
            USD: 0.12,
            JPY: 13.8984,
            GBP: 0.091956,
            GOLD: 0.0031452
        }
    }),
    wollo: () => ({
        loading: false,
        payments,
    }),
    keys: () => ({
        publicKey: 'GDF7DRJXKBDYXKNP4JOBUVGEIHLVEXZKKX7V7IYNMEXM7J5H3LLFW5TU',
    }),
    kids: () => ({
        kids: [],
    })
}), applyMiddleware(thunk));

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_TRANSFER',
            routeName: 'SCREEN_TRANSFER'
        },
        actions: {}
    },
    error: null,
    balance: '801.4672469',
    balanceXLM: '43.9999500',
    minXLM: '1.50001',
    hasGas: true,
    loading: false,
    exchange: {
        XLM: 0.3936,
        BTC: 0.0000147,
        ETH: 0.00025584,
        EUR: 0.102828,
        USD: 0.12,
        JPY: 13.8984,
        GBP: 0.091956,
        GOLD: 0.0031452
    },
    sending: false,
    sendStatus: null,
    sendComplete: false,
    payments
};

storiesOf('Transfer')
    .addDecorator(story => <Provider store={store}>{story()}</Provider>)
    .add('transfer', () => (
        <Transfer {...props}/>
    ))
    .add('review transfer', () => (
        <StepModule
            title={'Review Transfer'}
            icon="transfer"
            error={null}
            pad
            paddingTop={10}
            keyboardOffset={-50}
        >
            <Fragment>
                <Review {...{
                    ...props,
                    amount: '1',
                    memo: 'Happy Birthday',
                    destination: 'GDPCWCCJDXJHSA3GA62PFMZNP6A7NZSEGNEH3F3LSSUQZZ3NDCFVB6GB',
                    onReview: () => {}
                }} />
                <Button
                    theme="outline"
                    label={'Cancel'}
                    onPress={() => {}}
                />
            </Fragment>
        </StepModule>
    ))
    .add('review transfer no memo', () => (
        <StepModule
            title={'Review Transfer'}
            icon="transfer"
            error={null}
            pad
            paddingTop={10}
            keyboardOffset={-50}
        >
            <Fragment>
                <Review {...{
                    ...props,
                    amount: '1',
                    destination: 'GDPCWCCJDXJHSA3GA62PFMZNP6A7NZSEGNEH3F3LSSUQZZ3NDCFVB6GB',
                    onReview: () => {}
                }} />
                <Button
                    theme="outline"
                    label={'Cancel'}
                    onPress={() => {}}
                />
            </Fragment>
        </StepModule>
    ))
    .add('transfer progress', () => (
        <Transfer {...{
            ...props,
            sending: true,
            sendComplete: false,
        }}/>
    ))
    .add('transfer complete', () => (
        <Transfer {...{
            ...props,
            sending: true,
            sendComplete: true,
        }}/>
    ))
    .add('payments', () => (
        <Payments {...props}/>
    ))
    .add('transfer loading', () => (
        <Transfer {...{
            ...props,
            payments: [],
            loading: true
        }}/>
    ))
    .add('transfer error', () => (
        <Transfer {...{
            ...props,
            payments: [],
            error: new Error('Network error')
        }}/>
    ));
