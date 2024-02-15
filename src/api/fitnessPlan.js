import apiUrl from '../apiConfig'
import axios from 'axios'

// Create fitness plan
// POST /fitness/:healthDateId
export const createFitnessPlan = (healthDate, newFitnessPlan, user) => {
    return axios({
        url: `${apiUrl}/fitness/${healthDate._id}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`,
        },
        data: { fitnessPlan: newFitnessPlan }
    })
}
