
export function detectDigit(text){

    if(text.charAt(0) == ' ') return "3";

    const allow = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(text.length > 18) return "4";
    let countZero = 0;
    for (var i = 0; i < text.length; i++){
        if(text.charAt(i) == ' ') countZero++;
        if(countZero > 1) return "2";
        if (allow.indexOf(text.charAt(i)) == -1){
            return "1";
        }
    }
    return "0";
}


export function sortCountryCases(wordlCountries){

    const keysSorted = Object.values(wordlCountries).sort(function(a,b){return b.val - a.val});
    return keysSorted;
}


export function fetchCountry(countryID){
    return fetch(`/api/country/${countryID}`, {
        method: 'GET'
    })
    .then( response => {
        const data = response.json();
        return data;
    })
    .catch(() => {Promise.reject({error : 'Network-Error'})})
}


export function fetchProvince(countryID, provinceCode){

    return fetch(`/api/province/${countryID},${provinceCode}`, {
        method: 'GET'
    })
    .then( response => {
        const data = response.json();
        return data;
    })
    .then(data => {
        return data;
    })
    .catch(() => {Promise.reject({error : 'Network-Error'})})
}


export function fetchGetCountries(){
    return fetch('/api/countries', {
        method: 'GET'
    })
    .then( response => {
        const data = response.json();
        return data;
    })
    .catch(() => {Promise.reject({error : 'Network-Error'})})
}


export function getProvince(){
    return fetch('/api/getProvince', {
        method: 'GET'
    })
    .then( response => {
        const data = response.json();
        return data;
    })
    .then(data => {return data})
    .catch(() => {Promise.reject({error : 'Network-Error'})})

}


export function filterProvince(country,data){
    const provinces = [];

    if(country === 'worldwide') {
        provinces.push(' N/A ');
        return provinces;
    }

    if(country === 'USA') country = 'US';
    else if(country === 'UK') country = 'United Kingdom';
    
    Object.values(data).map(countryID => {
        if(countryID.country == country){
            provinces.push(countryID.province)
        }
    })
    return provinces;
}



export function fetchAddTodo(task) {
    return fetch('/api/todos', {
        method: 'POST',
        headers: new Headers({
        'content-type': 'application/json',
        }),
        body: JSON.stringify( { task } ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
    }

export function fetchDeleteTodo(id) {
    return fetch(`/api/todos/${id}`, {
        method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
    }

export function fetchUpdateTodo( id, todoUpdates ) {
    return fetch(`/api/todos/${id}`, {
        method: 'PATCH',
        headers: new Headers({
        'content-type': 'application/json',
        }),
        body: JSON.stringify( todoUpdates ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
    }

export function fetchTodos() {
    return fetch('/api/todos')
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
        if (response.ok) {
            return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
    }


export function fetchSession() {
    return fetch('/api/session', {
        method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
        if (response.ok) {
        return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
}

export function fetchLogout() {
    return fetch('/api/session', {
        method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
        if (response.ok) {
        return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
}

export function fetchLogin(username) {
    return fetch('/api/session', {
        method: 'POST',
        headers: new Headers({
        'content-type': 'application/json'
        }),
        body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
        if (response.ok) {
        return response.json();
        }
        return response.json()
        .catch( error => Promise.reject({ error }) )
        .then( err => Promise.reject(err) );
    });
}