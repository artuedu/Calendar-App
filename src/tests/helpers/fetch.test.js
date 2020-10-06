import '@testing-library/jest-dom';
import { fetchConToken, fetchSinToken } from '../../helpers/fetch';

describe('Pruebas en el helper fetch', () => {

    let token = '';
   
    test('Fetch sin token debe de funcionar', async () => {
       
        const res = await fetchSinToken('auth', { email: 'arturo@gmail.com', password: '123456'}, 'POST');

        expect(res instanceof Response).toBe(true);

        const body = await res.json();

        expect(body.ok).toBe(true);

        token = body.token;

    });

    test('Fetch con token debe de funcionar', async () => {
       
        localStorage.setItem('token', token);

        const resp = await fetchConToken('events/5ee25d21c25cce32af01a3f3', {}, 'DELETE');
        const body = await resp.json();

        expect(body.msg).toBe('Evento no identificado');

    });
    
});
