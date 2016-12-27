export const getResponse = (url) => {
  return fetch(url).then(
      (response) => response.json()
    );
};

export const push = (url, data) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
