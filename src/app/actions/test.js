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
            expect(actions.validateTx('')).toEqual(expect.any(Function));
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
            expect(actions.loadMessages()).toEqual(expect.any(Function));
        });

        it('should create an action to dispatch loading', () => {
            expect(actions.loadMessagesing(true)).toEqual({
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

    describe('Wollo', () => {
        it('should create an action to load account', () => {
            expect(actions.loadWallet()).toEqual(expect.any(Function));
        });
    });

    describe('Game', () => {
        it('should create an action to count wollo collected', () => {
            expect(actions.gameWolloCollected(10)).toEqual({
                type: actions.GAME_WOLLO_COLLECTED,
                value: 10
            });
        });

        it('should create an action to open overlay', () => {
            expect(actions.gameOverlayOpen(true)).toEqual({
                type: actions.GAME_OVERLAY_OPEN,
                value: true
            });
        });
    });

});
