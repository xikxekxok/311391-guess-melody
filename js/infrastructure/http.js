const getResponse = (url) => {
  return fetch(url).then(
      (response) => response.json()
    );
};

export default getResponse;
