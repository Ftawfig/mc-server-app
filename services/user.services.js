import Router from 'next/router'

export const userService = {
    //user: userSubject.asObservable(),
    login,
    logout,
};

const sendAuthData = async (formData) => {
    const response = await fetch("/api/users/auth", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
    }).then(user => {
        localStorage.setItem('user', JSON.stringify(user));
    }

    );
}

function login(formData) {
    sendAuthData(formData);
}

function logout() {
    // remove user from local storage, publish null to user subscribers and redirect to login page
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}