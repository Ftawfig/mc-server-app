import Router from 'next/router'

export const userService = {
    login,
    logout,
    create
};

const sendAuthData = async (formData, endpoint) => {
    return await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
    }).then((response) => {
        return response.json()
    }).then((response) => {
        if (response.status != 200) {
            localStorage.setItem('user', JSON.stringify(response));
        }

        return response;
    });
}

function login(formData) {
    return sendAuthData(formData, "/api/users/auth");
}

function create(formData) {
    return sendAuthData(formData, "/api/users/create");
}

function logout() {
    // remove user from local storage
    localStorage.removeItem('user');
}