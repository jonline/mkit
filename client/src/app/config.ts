const config = {
    api: {
        base: 'http://localhost:3000/api',
        tokenLabel: 'Authorization',
        tokenValue: token => 'Bearer ' + token,
        contentType: 'application/json; charset=UTF-8',
    }
}

export default config;
