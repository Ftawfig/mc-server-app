import Router from 'next/router'

export const userService = {
    login,
    logout,
};

const sendAuthData = async (formData) => {
    return await fetch("/api/users/auth", {
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
    return sendAuthData(formData);
}

function logout() {
    // remove user from local storage
    localStorage.removeItem('user');
}