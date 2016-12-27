const getResponse = (url) => {
  return fetch(url).then(
      (response) => response.json(),
      (response) => response
    );
};

export default getResponse;
