const faceApiBaseUrl = 'https://spotifai.cognitiveservices.azure.com/face/v1.0/detect';

const headers = {
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': 'b2cf0902bf004b89b2a5096c2df5e0e3',
};

const createFetch = (path, params) => {
    return fetch(`${faceApiBaseUrl}${path}`, params);
};

const createMethodHandler = (method) => {
    return (path, body) => createFetch(path, {
        method,
        headers,
        body: method !== 'GET' && body,
    });
};

export default {
    get: createMethodHandler('GET'),
    put: createMethodHandler('PUT'),
    post: createMethodHandler('POST'),
    del: createMethodHandler('DELETE'),
};
