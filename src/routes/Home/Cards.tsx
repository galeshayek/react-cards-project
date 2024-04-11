import { Card, CardHeader, CardBody, CardFooter, Divider, Image, Button, ButtonGroup, AspectRatio, } from '@chakra-ui/react'
import { GetCards, handleLike } from '../../services/cards'
import { useContext, useEffect, useState } from 'react'
import { CardType } from '../../@types/types'
import { BsHeartFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { SearchContext } from '../../contexts/SearchContext'
import { toast } from 'react-toastify'
import { AuthContext } from '../../contexts/AuthContext'
const Cards = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const [cards, setCards] = useState<CardType[]>([]);
    const [cardsSearch, setSearch] = useState<CardType[]>([])
    const { searchValue } = useContext(SearchContext);
    // const [heart, setHeart] = useState('text-slate-400 dark:text-slate-300');
    // const changeHeart = () => {
    //     setHeart(heart == 'text-slate-400 dark:text-slate-300' ? 'text-complimentry dark:text-complimentry-dark' : 'text-slate-400 dark:text-slate-300')
    // }
    const userId = localStorage.getItem('userId')
    useEffect(() => {
        GetCards().then((r) => {
            localStorage.setItem('cards', JSON.stringify(r.data))
            setCards(JSON.parse(localStorage.getItem('cards') ?? ''))
        })
    }, [])


    useEffect(() => {
        cards.map(() => {
            const newCards = cards.filter((c: CardType) => c.title.includes(searchValue));
            setSearch(newCards);
        })
    }, [searchValue, cards])

    const clickHandler = async (cardId: string) => {
        try {
            await handleLike(cardId)
            setCards(prev => {
                if (!userId) { return prev }
                if (!isLoggedIn) { return prev }
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

    if (!searchValue) {
        return (
            <>
                <section className="border-b-2 mb-4">
                    <h1 className="text-3xl">BizCardHub</h1>
                    <p className="text-lg pb-3">Feel free to 'Like' your favorite cards to show appreciation or click on any card to delve deeper into detailed information about the professional and their services. Whether you're seeking to network, find a service, or simply explore, BizCardHub is your gateway to connecting with professionals across the globe. Start your journey with us today and discover the endless possibilities that await.</p>
                </section>
                <section className="grid md:grid-cols-3 gap-4 mx-6">
                    {cards.map((card) => (
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
                                    <Button variant='ghost' onClick={() => {
                                        clickHandler(card._id)
                                    }}>
                                        {card.likes.includes(userId ?? '') ? <BsHeartFill className='text-complimentry dark:text-complimentry-dark' /> : <BsHeartFill className='text-slate-400 dark:text-slate-300' />}
                                    </Button>
                                </ButtonGroup>

                            </CardFooter>

                        </Card>
                    ))}
                </section>
            </>
        )
    } else {
        return (
            <>
                <section className="border-b-2 mb-4">
                    <h1 className="text-3xl">BizCardHub</h1>
                    <p className="text-lg pb-3">Feel free to 'Like' your favorite cards to show appreciation or click on any card to delve deeper into detailed information about the professional and their services. Whether you're seeking to network, find a service, or simply explore, BizCardHub is your gateway to connecting with professionals across the globe. Start your journey with us today and discover the endless possibilities that await.</p>
                </section>
                <section className="grid md:grid-cols-3 gap-4 mx-6">
                    {cardsSearch.map((card) => (
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
                    ))}
                </section>
            </>
        )
    }
}

export default Cards