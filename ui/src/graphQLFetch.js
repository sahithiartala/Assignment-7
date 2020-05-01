/* eslint linebreak-style: ["error", "windows"] */

import fetch from 'isomorphic-fetch';

const apiEndpoint = (__isBrowser__) // eslint-disable-line no-undef
  ? window.ENV.UI_API_ENDPOINT
  : process.env.UI_SERVER_API_ENDPOINT;
export default async function graphQLFetch(query, variables = {}) {
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });
  const result = await response.json();
  return result.data;
}
