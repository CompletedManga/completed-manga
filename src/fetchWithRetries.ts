// function fetch(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>
interface FetchWithRetries {
  url: string;
  fetchOptions?: RequestInit;
  retryOptions?: {
    retries?: number;
    retryDelay?: number;
  }
}

export async function fetchWithRetries({ url, fetchOptions = {}, retryOptions = {} }: FetchWithRetries): Promise<Response> {
  const { retries = 0, retryDelay = 0 } = retryOptions;

  try {
    return await fetch(url, fetchOptions);
  } catch (e: any) {
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

async function wait({ timeInMilliseconds = 0 }): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, timeInMilliseconds);
  });
}
