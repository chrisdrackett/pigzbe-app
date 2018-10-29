import {createSelector} from 'reselect';
import Config from 'react-native-config';
import BigNumber from 'bignumber.js';
import {Asset} from '@pigzbe/stellar-utils';
import {CLAIM_CONTRACT_NAME} from 'app/constants';

const configSelector = state => state.config;
const kidsSelector = state => state.kids;
const currentClaimSelector = state => state.claim.currentClaim;
const claimsSelector = state => state.claim.claims;

export const apiURL = createSelector(
    configSelector,
    config => {
        console.log('config.network', config.network);
        if (!config.network) {
            console.error('No config network');
        }
        switch (config.network) {
            case config.NETWORK_LOCAL:
                return `http://${Config.OFFLINE_HOST || '0.0.0.0'}:5001`;
            case config.NETWORK_MAINNET:
                return 'https://api.pigzbe.com';
            default:
                return 'https://staging.api.pigzbe.com';
        }
    }
);

export const wolloAsset = createSelector(
    configSelector,
    config => {
        const {network, stellar} = config;
        const {code, address} = stellar.networks[network];
        return new Asset(code, address);
    }
);

export const erc20Token = createSelector(
    currentClaimSelector,
    configSelector,
    (currentClaim, config) => {
        const contractName = CLAIM_CONTRACT_NAME[currentClaim];
        const {network, ethereum} = config;
        const {abi, networks} = ethereum[contractName];
        const networkDetails = networks[network];
        return {
            ...networkDetails,
            abi
        };
    }
);

export const getClaim = createSelector(
    currentClaimSelector,
    claimsSelector,
    (currentClaim, claims) => claims[currentClaim]
);

export const claimToken = createSelector(
    currentClaimSelector,
    currentClaim => CLAIM_CONTRACT_NAME[currentClaim]
);
