export type userType = {
    _id: string,
    name: string,
    email: string,
    token : string
}

export type registerType = {
    name: string,
    email: string,
    password: string
}

export type loginType = {
    email: string,
    password: string
}

export type authType = {
    user: userType | null,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string | unknown 
}

export type profileDataType = {
    phone: string,
    hall: string,
    yearOfStudy: string
}

export type gameDataType = {
    gameType: string,
    location: string,
    date: Date,
    startTime: string,
    maxPlayers: number,
}

export type participantType = {
    userId: string,
    name: string,
    phone: string
}

export type gameType = {
    _id: string,
    user: string,
    hostName: string,
    gameType: string,
    location: string,
    date: Date,
    startTime: string,
    maxPlayers: number,
    participants: participantType[]
}

export type gameSliceType = {
    games: gameType[],
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    isHostedError: boolean,
    isHostedSuccess: boolean,
    isJoinedError: boolean,
    isJoinedSuccess: boolean,
    message: string | unknown 
}

export type profileType = {
    _id: string,
    user: string,
    name: string,
    phone: string,
    hall: string,
    yearOfStudy: string
}

export type profileSliceType = {
    profile: profileType | null,
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string | unknown 
}

// hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';

// Typed versions of the hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;