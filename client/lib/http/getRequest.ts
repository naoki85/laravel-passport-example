const getRequest = async (url: string, query?: { [key: string]: string }, headers?: { [key: string]: string }): Promise<any> => {
  try {
    let queryString = ''
    if (query) {
      queryString = encodeURI(Object.entries(query).map((e) => `${encodeURIComponent(e[0])}=${encodeURIComponent(e[1])}`).join('&'))
    }

    let requestUrl = url
    if (queryString.length > 0) {
      requestUrl = requestUrl + '?' + queryString
    }

    const response = await fetch(requestUrl, {
      method: 'GET',
      headers: headers || []
    })

    const data = await response.json()
    console.log(data)

    if (response.ok) {
      return data
    }

    const error = new Error(response.statusText)
    // @ts-ignore
    error.response = response
    // @ts-ignore
    error.data = data
    throw error
  } catch (error) {
    if (!error.data) {
      error.data = { message: error.message }
    }
    console.error(error)
    throw error
  }
}

export default getRequest