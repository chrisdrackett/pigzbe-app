/*eslint no-undefined: 0*/
import authReducer, {initialState as authState} from './auth';
import messagesReducer, {initialState as messagesState} from './messages';
import walletReducer, {initialState as walletState} from './wallet';
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
            expect(authReducer(undefined, {type: actions.AUTH_LOGIN}))
                .toEqual(Object.assign({}, authState, {
                    loggedIn: true,
                }));
        });

        it('should handle logout', () => {
            expect(authReducer(undefined, {
                type: actions.AUTH_LOGOUT
            }))
                .toEqual(Object.assign({}, authState, {
                    loggedIn: false
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
                    loadMessagesing: true
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

    describe('Wallet', () => {
        it('should return the initial state', () => {
            expect(walletReducer(undefined, {})).toEqual(walletState);
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
