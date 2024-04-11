import { CreateCardType } from "../@types/types";

export const CardMock: CreateCardType = {
    title: "a wonderful new card",
    subtitle: "a test value for this card",
    description: "a test value for new card test value for new card ",
    phone: "0540000000",
    email: "qwe@gmail.com",
    web: "www.bidbsdgbng.com",
    image: {
        url: "https://img.izismile.com/img/img13/20201030/640/you_have_never_seen_something_like_this_640_36.jpg",
        alt: "image of something"
    },
    address: {
        state: "IL",
        country: "Israel",
        city: "Arad",
        street: "Shoham",
        houseNumber: 5,
        zip: 8920435
    }
}