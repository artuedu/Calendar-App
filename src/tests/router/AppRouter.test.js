import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AppRouter } from '../../router/AppRouter';

Enzyme.configure({ adapter: new Adapter() });

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// store.dispatch = jest.fn();

describe('Pruebas en AppRouter', () => {
    
    test('Debe de mostrar el espere...', () => {

        const initState = {
            auth: {
                checking: true
            }
        };
        let store = mockStore(initState);
        
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        // expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h5').exists()).toBe(true);

    });
    
    test('Debe de mostrar la ruta publica', () => {

        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };
        let store = mockStore(initState);
        
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBe(true);

    });

    test('Debe de mostrar la ruta privada', () => {

        const initState = {
            calendar: {
                events: []
            },
            ui: {
                modalOpen: false
            },
            auth: {
                checking: false,
                uid: '123',
                name: 'Juan carlos'
            }
        };
        let store = mockStore(initState);
        
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.calendar-screen').exists()).toBe(true);

    });

});
