import { JSXElementConstructor, ReactNode, } from "react";

export type FCC = (props: { children: ReactNode }) => ReactNode

export type JwtDecodeType = {

    iat: number;
    isAdmin: boolean;
    isBusiness: boolean;
    _id: string;
}

export type RegisterType = {
    name: {
        first: string;
        middle: string;
        last: string;
    };
    phone: string;
    email: string;
    password: string;
    image: {
        url: string;
        alt: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
    isBusiness: boolean;
}

export type LoginType = {
    email: string,
    password: string,
}

export type LoginError = {
    Response: {
        data: string
    }
}

export type RegisterError = {
    response: {
        data: string
    }
}
export type CardError = {
    data: {
        response: {
            data: string
        }
    }
}

export type CardType = {
    _id: string;
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
        url: string;
        alt: string;
        _id: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
        _id: string;
    };
    bizNumber: number;
    likes: string[];
    user_id: string;
    createdAt: string;
    __v: number;
};

export type CreateCardType = {
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
        url: string;
        alt: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
};


export type EditCardtype = {
    Id: string;
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
        url: string;
        alt: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
}

export type axiosResponse = { response: { data } }