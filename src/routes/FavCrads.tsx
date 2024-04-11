import { AspectRatio, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@chakra-ui/react"
import { BsHeartFill } from "react-icons/bs";
import { CardType } from "../@types/types";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleLike } from "../services/cards";
import { SearchContext } from "../contexts/SearchContext";
import { toast } from "react-toastify";

const FavCrads = () => {
    const userId = localStorage.getItem('userId')
    const [allCards, setAllCards] = useState<CardType[]>([]);
    const [cardsSearch, setSearch] = useState<CardType[]>([])
    const { searchValue } = useContext(SearchContext);


    useEffect(() => {
        const cards = JSON.parse(localStorage.getItem('cards') ?? "")
        setAllCards(cards);
    }, []);

    //TODO: add like click handler

    const clickHandler = async (cardId: string) => {
        try {
            await handleLike(cardId)
            setAllCards(prev => {
                if (!userId) { return prev }
                return prev.map(x => {
                    if (x._id !== cardId) { return x }
                    const indexOf = x.likes.indexOf(userId)
                    const newLikes = [...x.likes]
                    if (indexOf === -1) {
                        newLikes.push(userId)
                    } else {
                        newLikes.splice(indexOf, 1)
                    }
                    return {
                        ...x,
                        likes: newLikes
                    }
                })
            })
        } catch (error: any) {
            toast.error('Failed to like card')
        }
    }


    useEffect(() => {
        allCards.map(() => {
            const newCards = allCards.filter((c) => c.title.toLowerCase().includes(searchValue));
            setSearch(newCards);
        })
    }, [searchValue, allCards])
    if (!searchValue) {
        return (
            <section className="grid md:grid-cols-3 gap-4 mx-6">
                {allCards.map((card) => {
                    if (card.likes.includes(userId ?? '')) {
                        return (
                            <Card key={card._id}>
                                <CardHeader justifyContent={'center'}>
                                    <AspectRatio maxW='100%' ratio={2 / 1}>
                                        <Image src={card.image.url} alt={card.image.alt} borderRadius='lg' />
                                    </AspectRatio>
                                </CardHeader>
                                <CardBody>
                                    <h2>{card.title}</h2>
                                    <p>
                                        {card.description}
                                    </p>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <ButtonGroup spacing={5} margin={'auto'}>
                                        <Button>
                                            <Link to={`cards/${card._id}`}>View more</Link>
                                        </Button>
                                        <Button variant='ghost' onClick={() => clickHandler(card._id)}>
                                            {card.likes.includes(userId ?? '') ? <BsHeartFill className='text-complimentry dark:text-complimentry-dark' /> : <BsHeartFill className='text-slate-400 dark:text-slate-300' />}
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>

                            </Card>
                        )
                    }
                })}
            </section>
        )
    } else {
        return (
            <section className="grid md:grid-cols-3 gap-4 mx-6">
                {cardsSearch.map((card) => {
                    if (card.likes.includes(userId ?? '')) {
                        return (
                            <Card key={card._id}>
                                <CardHeader justifyContent={'center'}>
                                    <AspectRatio maxW='100%' ratio={2 / 1}>
                                        <Image src={card.image.url} alt={card.image.alt} borderRadius='lg' />
                                    </AspectRatio>
                                </CardHeader>
                                <CardBody>
                                    <h2>{card.title}</h2>
                                    <p>
                                        {card.description}
                                    </p>
                                </CardBody>
                                <Divider />
                                <CardFooter>
                                    <ButtonGroup spacing={5} margin={'auto'}>
                                        <Button>
                                            <Link to={`cards/${card._id}`}>View more</Link>
                                        </Button>
                                        <Button variant='ghost' onClick={() => clickHandler(card._id)}>
                                            {card.likes.includes(userId ?? '') ? <BsHeartFill className='text-complimentry dark:text-complimentry-dark' /> : <BsHeartFill className='text-slate-400 dark:text-slate-300' />}
                                        </Button>
                                    </ButtonGroup>
                                </CardFooter>

                            </Card>
                        )
                    }
                })}
            </section>
        )
    }
}

export default FavCrads