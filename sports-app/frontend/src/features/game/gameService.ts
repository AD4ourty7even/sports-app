import axios from 'axios'
import { gameDataType } from '../../types';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${backendUrl}/api/games/`

//get all games
const getAllGames = async (token: string | null) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL, config)
    return res.data
}

//create a new game
const createGame = async (gameData: gameDataType, token: string | null) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(API_URL, gameData, config)
    return res.data
}

//delete a game
const deleteGame = async (id: string, token: string | null) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(`${API_URL}${id}`, config)
    return res.data
}

//join a game
const joinAGame = async (id: string, token: string | undefined) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(`${API_URL}${id}`, {}, config)
    return res.data
}

//get a game details
const getGameDetails = async (id: string, token: string | null) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(`${API_URL}${id}`, config)
    return res.data
}


export {
    getAllGames,
    createGame,
    deleteGame,
    getGameDetails,
    joinAGame
}