import * as actions from './';

describe('Actions', () => {

    describe('Auth', () => {
        it('should create an action to login', () => {
            expect(actions.authLogin('badkey')).toEqual(expect.any(Function));
        });

        it('should create an action to logout', () => {
            expect(actions.authLogout()).toEqual(expect.any(Function));
        });
    });

    describe('Escrow', () => {
        it('should create an action to load config', () => {
            expect(actions.loadEscrow()).toEqual(expect.any(Function));
        });

        it('should create an action to load account', () => {
            expect(actions.loadEscrowAccount()).toEqual(expect.any(Function));
        });

        it('should create an action to validate transaction', () => {
            expect(actions.validateTransaction('')).toEqual(expect.any(Function));
        });

        it('should create an action to submit transaction', () => {
            expect(actions.submitTransaction('')).toEqual(expect.any(Function));
        });

        it('should create an action to view transaction', () => {
            expect(actions.viewTransaction('')).toEqual(expect.any(Function));
        });
    });

    describe('Messages', () => {
        it('should create an action to update', () => {
            expect(actions.messagesUpdate([])).toEqual({
                type: actions.MESSAGES_UPDATE,
                messages: []
            });
        });

        it('should create an action to load', () => {
            expect(actions.messagesLoad()).toEqual(expect.any(Function));
        });

        it('should create an action to dispatch loading', () => {
            expect(actions.messagesLoading(true)).toEqual({
                type: actions.MESSAGES_LOADING,
                value: true
            });
        });

        it('should create an action to dispatch error', () => {
            expect(actions.messagesError(new Error('Msg'))).toEqual({
                type: actions.MESSAGES_ERROR,
                error: new Error('Msg')
            });
        });
    });

    describe('Profile', () => {
        it('should create an action to load', () => {
            expect(actions.profileLoad()).toEqual(expect.any(Function));
        });

        it('should create an action to dispatch loading', () => {
            expect(actions.profileLoading(true)).toEqual({
                type: actions.PROFILE_LOADING,
                value: true
            });
        });

        it('should create an action to update', () => {
            expect(actions.profileUpdate({name: 'Name'})).toEqual(expect.any(Function));
        });

        it('should create an action to dispatch availability', () => {
            expect(actions.profileAvailable(true)).toEqual({
                type: actions.PROFILE_AVAILABLE,
                value: true
            });
        });
    });

    describe('Wollo', () => {
        it('should create an action to load account', () => {
            expect(actions.loadAccount()).toEqual(expect.any(Function));
        });

        it('should create an action to setUseTestnet', () => {
            expect(actions.setUseTestnet(true)).toEqual(expect.any(Function));
        });
    });

});
