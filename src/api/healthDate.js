import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Show
export const getOneHealthDateByDate = (dateStr, user) => {
    return axios({
        url: `${apiUrl}/dates/byDate/${dateStr}`,
        method: 'GET',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
    })
}

// CREATE -> Add a health date
export const createHealthDate = (user, newHealthDate) => {
    return axios({
        url: `${apiUrl}/dates`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { healthDate: newHealthDate }
    })
}

// UPDATE -> Adjust a health date
export const updateHealthDate = (user, updatedHealthDate) => {
    return axios({
        url: `${apiUrl}/dates/${updatedHealthDate._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { healthDate: updatedHealthDate }
    })
}

// DELETE -> Clear a date completely
export const removeHealthDate = (user, id) => {
    return axios({
        url: `${apiUrl}/dates/${id}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}
