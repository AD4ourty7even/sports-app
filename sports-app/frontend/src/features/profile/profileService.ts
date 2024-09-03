import axios from 'axios'
import { profileDataType } from '../../types';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${backendUrl}/api/profile/`

//get my profile
const getMyProfile = async (token: string | null) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

//create profile
const createMyProfile = async (profileData: profileDataType, token: string | null) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const res = await axios.post(API_URL, profileData, config)
    
    return res.data
}

export {
    getMyProfile,
    createMyProfile  
}