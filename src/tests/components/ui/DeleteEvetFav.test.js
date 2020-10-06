import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/events';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <DeleteEventFab />
    </Provider>
);

describe('Pruebas en DeleteEventFav', () => {
    
    test('Debe de mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();

    });

    test('Debe de llamar el eventStartDelete al hacer click', () => {
       
        wrapper.find('button').prop('onClick')();

        expect(eventStartDelete).toHaveBeenCalled();

    });
    
    
});
