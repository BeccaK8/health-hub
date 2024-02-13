import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Show
export const getOneHealthDateByDate = (dateStr, user) => {
    console.log('in api > dateStr = ', dateStr)
    // return axios(`${apiUrl}/dates/byDate/${dateStr}`)
    return axios({
        url: `${apiUrl}/dates/byDate/${dateStr}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
    })
}