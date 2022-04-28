const url = "http://sefdb02.qut.edu.au:3001";

export async function getVolcanoes(country, populatedWithin) {
    return fetch(url + `/volcanoes?country=${country}&populatedWithin=${populatedWithin}`, {
        method: 'GET',
    }).then((res) => {
        return res.json()
    });
}

export async function getCountries() {
    return fetch(url + '/countries', {
        method: 'GET',
    }).then((res) => {
        return res.json()
    });
}

export async function getVolcanoInfo(volcanoId, token) {
    if (token) {
        return fetch(url + `/volcano/${volcanoId}`, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            return res.json()
        });
    } else {
        return fetch(url + `/volcano/${volcanoId}`, {
            method: 'GET',
        }).then((res) => {
            return res.json()
        });
    }
}

export async function login(body) {
    return fetch(url + '/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => {
        return res.json()
    });
}

export async function register(body) {
    return fetch(url + '/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => {
        return res.json()
    });
}
