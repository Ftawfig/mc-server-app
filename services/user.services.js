import Router from 'next/router'

export const userService = {
    login,
    logout,
    create,
    getAll,
    approve,
    update,
    remove
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

const getUsers = async () => {
    return await fetch("/api/users/get-users", {
        method : "GET"
    }).then(response => {
        return response.json();
    }).then(users => {
        return users;
    });  
};

const approveUser = async (id) => {
    return await fetch("/api/users/approve", {
        method: "POST",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        },
    }).then(response => {
        return response;
    });  
};

const updateIPs = async (id, formData) => {
    const requestBody = {
        id: id,
        ip1: formData.ip1,
        ip2: formData.ip2        
    }
    return await fetch("/api/users/update-ip", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
    }).then(response => {
        return response;
    });  
};

const deleteUser = async (id) => {
    return await fetch("/api/users/delete", {
        method: "POST",
        body: JSON.stringify(id),
        headers: {
          "Content-Type": "application/json",
        },
    }).then(response => {
        return response;
    });  
};

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

function getAll() {
    return getUsers();
}

function approve(id) {
    return approveUser(id);
}

function remove(id) {
    return deleteUser(id);
}

function update(id, formData) {
    return updateIPs(id, formData);
}