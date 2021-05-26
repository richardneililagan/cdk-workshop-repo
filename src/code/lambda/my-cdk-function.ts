exports.handler = async (event: unknown) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from my workshop AWS account!'),
    };
    return response;
}
