const getUsers = ({ page = 1, results = 5 } = {}) => {
  return fetch(
    `https://randomuser.me/api/?page=${page}&results=${results}&seed=abc`,
  ).then((response) => {
    if (!response.ok) {
      throw new Error("Ошибка запроса");
    }
    return response.json();
  });
};

export default getUsers;
