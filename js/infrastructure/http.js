const getResponse = (url) => {
    return fetch(url)
        .then(
            (response) => {
                if (response.status !== 200) {  
                    Promise.reject(response);
                }
                return response.json();
            }, 
            (response) => Promise.reject(response));
};

export default getResponse;