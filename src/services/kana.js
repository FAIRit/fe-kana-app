export const restGetKana = () =>
  fetch(process.env.PUBLIC_URL + "/kana.json", {
    headers: {
      "content-type": "application/json",
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((data) => data.kana);
