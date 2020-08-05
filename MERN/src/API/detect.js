import face from './face';

const processImage = ({
    url,
}) => {
    const requestUrl = '/face/v1.0/detect';
    const body = JSON.stringify({ url });

    return face.post(requestUrl, body);
}

export {
    processImage,
}
