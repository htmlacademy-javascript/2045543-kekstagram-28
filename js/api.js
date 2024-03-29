const API_URL = 'https://28.javascript.pages.academy/kekstagram';

export function fetchData() {
  return fetch(`${API_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Ошибка при загрузке данных с сервера');
    });
}

export function sendData(data) {
  return fetch(`${API_URL}`, {
    method: 'POST',
    body: data,
  });
}

