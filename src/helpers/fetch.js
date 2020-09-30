const baseUrl = process.env.REACT_APP_API_URL;

const fetchSinToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;

    if(method === 'GET'){
        return fetch(url);
    }else{
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        });
    }

}

const fetchConToken = (endpoint, data, method = 'GET') => {

    const url = `${baseUrl}/${endpoint}`;

    const token = localStorage.getItem('token') || '';

    if(method === 'GET'){
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            redirect: 'follow'
        });
    }else{
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data),
            redirect: 'follow'
        });
    }

}

export {
    fetchSinToken,
    fetchConToken
}