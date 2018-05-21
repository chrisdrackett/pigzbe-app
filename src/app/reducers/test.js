/*eslint no-undefined: 0*/
import authReducer, {initialState as authState} from './auth';
import messagesReducer, {initialState as messagesState} from './messages';
import profileReducer, {initialState as profileState} from './profile';
import wolloReducer, {initialState as wolloState} from './wollo';
import gameReducer, {initialState as gameState} from './game';
import * as actions from '../actions';

describe('Reducers', () => {

    describe('Auth', () => {
        it('should return the initial state', () => {
            expect(authReducer(undefined, {})).toEqual(authState);
        });

        it('should handle login start', () => {
            expect(authReducer(undefined, {
                type: actions.AUTH_LOGIN_START
            }))
                .toEqual(Object.assign({}, authState, {
                    isLoggingIn: true
                }));
        });

        it('should handle login error', () => {
            const error = new Error('Fail');
            expect(authReducer(undefined, {
                type: actions.AUTH_LOGIN_FAIL, error
            }))
                .toEqual(Object.assign({}, authState, {
                    error
                }));
        });

        it('should handle login success', () => {
            expect(authReducer(undefined, {
                type: actions.AUTH_LOGIN,
                keypair: {
                    publicKey: () => 'pk',
                    secret: () => 'sk'
                }
            }))
                .toEqual(Object.assign({}, authState, {
                    isLoggedIn: true,
                    publicKey: 'pk',
                    secretKey: 'sk'
                }));
        });

        it('should handle logout', () => {
            expect(authReducer(undefined, {
                type: actions.AUTH_LOGOUT
            }))
                .toEqual(Object.assign({}, authState, {
                    isLoggedIn: false
                }));
        });
    });

    describe('Messages', () => {
        it('should return the initial state', () => {
            expect(messagesReducer(undefined, {})).toEqual(messagesState);
        });

        it('should handle update', () => {
            const messages = ['1', '2', '3'];

            expect(messagesReducer(undefined, {
                type: actions.MESSAGES_UPDATE,
                messages
            }))
                .toEqual(Object.assign({}, messagesState, {
                    messages
                }));
        });

        it('should handle loading', () => {
            expect(messagesReducer(undefined, {
                type: actions.MESSAGES_LOADING,
                value: true
            }))
                .toEqual(Object.assign({}, messagesState, {
                    messagesLoading: true
                }));
        });

        it('should handle error', () => {
            const error = new Error('Fail');

            expect(messagesReducer(undefined, {
                type: actions.MESSAGES_ERROR,
                error
            }))
                .toEqual(Object.assign({}, messagesState, {
                    messagesError: error
                }));
        });
    });

    describe('Profile', () => {
        it('should return the initial state', () => {
            expect(profileReducer(undefined, {})).toEqual(profileState);
        });

        it('should handle loading', () => {
            expect(profileReducer(undefined, {
                type: actions.PROFILE_LOADING,
                value: true
            }))
                .toEqual(Object.assign({}, profileState, {
                    isLoadingProfile: true
                }));
        });

        it('should handle update', () => {
            const profile = {
                name: 'Name',
                email: 'mail@example.com',
                image: null,
                subscribe: false
            };

            expect(profileReducer(undefined, {
                type: actions.PROFILE_UPDATE,
                ...profile
            }))
                .toEqual(Object.assign({}, profileState, {
                    ...profile
                }));
        });

        it('should handle availability', () => {
            expect(profileReducer(undefined, {
                type: actions.PROFILE_AVAILABLE,
                value: true
            }))
                .toEqual(Object.assign({}, profileState, {
                    hasProfile: true
                }));
        });
    });

    describe('Wollo', () => {
        it('should return the initial state', () => {
            expect(wolloReducer(undefined, {})).toEqual(wolloState);
        });

        it('should handle account update', () => {
            const account = {
                id: '1234'
            };

            expect(wolloReducer(undefined, {
                type: actions.WOLLO_UPDATE_ACCOUNT,
                account
            }))
                .toEqual(Object.assign({}, wolloState, {
                    account
                }));
        });

        it('should handle balance update', () => {
            const balance = '123';

            expect(wolloReducer(undefined, {
                type: actions.WOLLO_UPDATE_BALANCE,
                balance
            }))
                .toEqual(Object.assign({}, wolloState, {
                    balance
                }));
        });

    });

    describe('Game', () => {
        it('should return the initial state', () => {
            expect(gameReducer(undefined, {})).toEqual(gameState);
        });

        it('should handle wollo collected update', () => {
            expect(gameReducer(undefined, {
                type: actions.GAME_WOLLO_COLLECTED,
                value: 10
            }))
                .toEqual(Object.assign({}, gameState, {
                    wolloCollected: 10
                }));
        });
    });

});
