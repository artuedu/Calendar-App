import '@testing-library/jest-dom';
import { types } from '../../types/types';

describe('Pruebas en Types', () => {
    
    test('Los types deben de ser iguales', () => {
        
        expect(types).toEqual({

            uiOpenModal: '[ui] Open Modal',
            uiCloseModal: '[ui] Close Modal',
        
            eventSetActive: '[event] Set Active',
            eventLogout: '[event] Logout event',
        
            eventStartAddNew: '[event] Start add new',
            eventAddNew: '[event] Add New',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdated: '[event] Event updated',
            eventDeleted: '[event] Event deleted',
            eventLoaded: '[event] Event loader',
        
            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Start register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout',
            
        });

    });
    
});
