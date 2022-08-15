// const EMPTY_PAGE = 99999;

import { fetchWithRetries } from './fetchWithRetries.js';

// try {
//   // get last page number
//   const res = await fetch(
//     `https://api.mangaupdates.com/v1/releases/days?page=${EMPTY_PAGE}&include_metadata=true`,
//   );
//   const { total_hits, per_page } = await res.json();
//   const lastPageNumber = Math.ceil(total_hits / per_page);

//   // get releases on last page
//   const res2 = await fetchWithRetries(
//     // `https://api.mangaupdates.com/v1/releases/days?page=${lastPageNumber}&include_metadata=true`,
//     `https://api.mangaupdates.com/v1/releases/days?page=0&include_metadata=true`,
//     {},
//     { retries: 3, retryDelay: 5000 },
//   );
//   const { results } = await res2.json();

//   for (const result of results) {
//     const { record, metadata } = result;

//     // console.log(JSON.stringify(record, null, 2));
//     // console.log(JSON.stringify(metadata, null, 2));
//   }
// } catch (error) {
//   console.log(error);
// }

try {
  const res = await fetchWithRetries({ url: 'bad', retryOptions: { retries: 5, retryDelay: 5000 } });
  const { results } = await res.json();
  console.log(results);
} catch (e) {
  console.log(e);
}
