import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventClearActiveEvent, eventStartAddNew } from '../../../actions/events';

Enzyme.configure({ adapter: new Adapter() });
HTMLCanvasElement.prototype.getContext = () => {};

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

// Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola mundo',
            notes: 'Algunas notas',
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
    },
    auth: {
        uid: '123',
        name: 'Arturo'
    },
    ui: {
        modalOpen: true
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
);

describe('Pruebas en CalendarModal', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test('Debe de mostrar el modal', () => {

        // expect(wrapper.find('.modal').exists()).toBe(true);
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true);

    });
    
    test('Debe de llamar la accion de actualizar y cerrar modal', () => {
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
        expect(eventClearActiveEvent).toHaveBeenCalledWith();

    });
    
    test('Debe de mostrar eeror si falta el titulo', () => {
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);

    });

    test('Debe de crear un nuevo evento', () => {
        
        const initState = {
            calendar: {
                events: [],
                activeEvent: null
            },
            auth: {
                uid: '123',
                name: 'Arturo'
            },
            ui: {
                modalOpen: true
            }
        };
        let store = mockStore(initState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal />
            </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(eventStartAddNew).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Hola pruebas',
            notes: ''
        });

        expect(eventClearActiveEvent).toHaveBeenCalled();

    });

    test('Debe de validar las fechas', () => {
        
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        const hoy = new Date();

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect(Swal.fire).toHaveBeenCalledWith("Error", "La fecha fin debe de ser mayor a la fecha de inicio", "error");

    });
    
});
