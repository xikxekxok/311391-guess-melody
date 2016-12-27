const getResponse = (url) => {
  return fetch(url).then(
      (response) => response.json(),
      (response) => Promise.reject(response)
    );
};

export default getResponse;
