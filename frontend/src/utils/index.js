


export const authHeader = () => {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token){
        return {
            'Authorization': 'Bearer ' + user.token,
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        }
    } else {
        return {};
    }
}

export const handleResponse = async (response, onError) => {
    const res = await response;
    const text = await res.text();

    const data = text && JSON.parse(text);
    if (!res.ok){
        if (res.status === 401 && onError){
            onError();
        }

        const error = (data && data.message) || res.statusText;
        throw new Error(error);
    }

    return data;
}

