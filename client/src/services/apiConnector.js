import axios from "axios"

const axioInstace = axios.create({})

export const apiConnector = (method, url, body, header, params) => {
  return axioInstace({
    method: `${method}`,
    url: `${url}`,
    data: body ? body : null,
    headers: header ? header : null,
    params: params ? params : null,
  })
}
