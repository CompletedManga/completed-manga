const EMPTY_PAGE = 99999;

try {
  // get last page number
  const res = await fetch(
    `https://api.mangaupdates.com/v1/releases/days?page=${EMPTY_PAGE}&include_metadata=true`
  );
  const { total_hits, per_page } = await res.json();
  const lastPageNumber = Math.ceil(total_hits / per_page);

  // get releases on last page
  const res2 = await retryFetch(
    // `https://api.mangaupdates.com/v1/releases/days?page=${lastPageNumber}&include_metadata=true`,
    `https://api.mangaupdates.com/v1/releases/days?page=0&include_metadata=true`,
    {},
    { retries: 3, retryDelay: 5000 }
  );
  const { results } = await res2.json();

  for (const result of results) {
    const { record, metadata } = result;

    // console.log(JSON.stringify(record, null, 2));
    // console.log(JSON.stringify(metadata, null, 2));
  }
} catch (error) {
  console.log(error);
}

async function retryFetch(
  url = "",
  fetchOptions = {},
  retryOptions = { retries: 0, retryDelay: 0 }
) {
  const { retries, retryDelay } = retryOptions;

  try {
    const res = await fetch(url, fetchOptions);
    return res;
  } catch (error) {
    if (retries <= 0) {
      throw new Error(error);
    }

    console.log({
      message: `Request failed, retrying in ${retryDelay} seconds...`,
      error: error?.message,
    });

    await wait({ timeInMilliseconds: retryDelay });

    const nextRetryOptions = {
      retries: retries - 1,
      ...retryOptions,
    };
    return retryFetch(url, fetchOptions, nextRetryOptions);
  }
}

async function wait({ timeInMilliseconds = 0 }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeInMilliseconds);
  });
}
