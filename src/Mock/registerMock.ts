import { RegisterType } from "../@types/types";

export const mockValues: RegisterType = {
    name: {
        first: "gal",
        middle: "",
        last: "eshayek"
    },
    phone: "0546580054",
    email: "galeshayek15@gmail.com",
    password: "Ga1234567!",
    image: {
        url: "",
        alt: ""
    },
    address: {
        state: "il",
        country: "israel",
        city: "kfar saba",
        street: "emek izrael",
        houseNumber: +('08'),
        zip: 44415
    },
    isBusiness: false
}