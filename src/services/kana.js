export const restGetKana = () =>
  fetch("http://localhost:3000/kana.json", {
    headers: {
      "content-type": "application/json"
    }
  })
    .then(resp => {
      return resp.json();
    })
    .then(data => data.kana);
