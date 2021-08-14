const putRequest = async (url: string, params?: { [key: string]: string }, headers?: { [key: string]: string }): Promise<any> => {
  try {
    let requestHeaders = { 'Content-Type': 'application/json' }
    if (headers) {
      requestHeaders = Object.assign(requestHeaders, headers)
    }

    const body = JSON.stringify(params)

    const response = await fetch(url, {
      method: 'PUT',
      headers: requestHeaders,
      body: body,
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

export default putRequest