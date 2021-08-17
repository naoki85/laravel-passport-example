const buildUrlQuery = (params: { [key: string]: string }): string => {
  const esc = encodeURIComponent;
  return Object.keys(params).map(k => esc(k) + '=' + esc(params[k])).join('&')
}

export default buildUrlQuery
