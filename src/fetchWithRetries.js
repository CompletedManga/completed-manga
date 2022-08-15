export async function fetchWithRetries({ url, fetchOptions = {}, retryOptions = {} }) {
    const { retries = 0, retryDelay = 0 } = retryOptions;
    try {
        return await fetch(url, fetchOptions);
    }
    catch (e) {
        if (retries <= 0) {
            console.log(e);
            throw new Error(e);
        }
        console.log({
            message: `Request failed, retrying in ${retryDelay} milliseconds...`,
            error: e.message,
        });
        await wait({ timeInMilliseconds: retryDelay });
        const nextRetryOptions = {
            ...retryOptions,
            retries: retries - 1,
        };
        console.log(nextRetryOptions);
        return fetchWithRetries({ url, fetchOptions, retryOptions: nextRetryOptions });
    }
}
async function wait({ timeInMilliseconds = 0 }) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeInMilliseconds);
    });
}
