const headers = new Headers();
headers.append("Content-Type", "application/json; charset=utf-8");

module.exports.postJson = (url, body) => fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers
});

module.exports.get = (url) => fetch(url, {
    method: "GET"
});
