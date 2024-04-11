import axios from "axios";
import { toast } from "react-toastify";
import { CardType, CreateCardType } from "../@types/types";



export const baseUrl = 'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/';

export const GetCards = () => {
    return axios.get(baseUrl)
}
export const GetCardById = (data: any) => {
    return axios.get(`${baseUrl}${data}`)
}

export const GetAllMyCards = () => {
    return axios.get(`${baseUrl}my-cards`, {
        headers: {
            "x-auth-token": localStorage.getItem('jwt')

        }
    })
}

export const PostCard = (data: CreateCardType) => {
    return axios.post(baseUrl, data, {
        headers: {
            "x-auth-token": localStorage.getItem('jwt')
        }
    })
}

export const updateCard = (data: CardType, cardId: string) => {
    return axios.put(`${baseUrl}${cardId}`, data, {
        headers: {
            "x-auth-token": localStorage.getItem('jwt')
        }
    })
}

export const handleLike = (cardId: string) => {
    return axios.patch(`${baseUrl}${cardId}`, {}, {
        headers: {
            "x-auth-token": localStorage.getItem('jwt')
        }
    }).then(() => {
        GetCards().then((r) => {
            localStorage.setItem('cards', JSON.stringify(r.data));
        })
    })
        .catch((e: any) => toast.error(e.response.data));
}

export const deleteCard = (cardId: string, bizNumber: number) => {
    return axios.delete(`${baseUrl}${cardId}`, {
        data: bizNumber,
        headers: {
            "x-auth-token": localStorage.getItem('jwt')
        }
    })
}