import { AspectRatio, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, Image, Spacer } from "@chakra-ui/react";
import { BsHeartFill } from "react-icons/bs";
import { CardType, RegisterError } from "../@types/types";
import { useContext, useEffect, useState } from "react";
import { GetAllMyCards, deleteCard, handleLike } from "../services/cards";
import { FaPhone, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { EditCard } from "../components/EditCard";
import { SearchContext } from "../contexts/SearchContext";

const MyCards = () => {
    const [myCards, setMyCards] = useState<CardType[]>([]);
    const [cardsSearch, setSearch] = useState<CardType[]>([])
    const { searchValue } = useContext(SearchContext);
    const userId = localStorage.getItem('userId');


    useEffect(() => {
        GetAllMyCards().then((r) => {
            localStorage.setItem('myCards', JSON.stringify(r.data))
            setMyCards(JSON.parse(localStorage.getItem('myCards') ?? ''))
        })
    }, [])

    const clickHandler = async (cardId: string) => {
        try {
            await handleLike(cardId)
            setMyCards(prev => {
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
        myCards.map(() => {
            const newCards = myCards.filter((c) => c.title.toLowerCase().includes(searchValue));
            setSearch(newCards);
            console.log(newCards)
        })
    }, [searchValue, myCards])

    if (!searchValue) {
        return (
            <>
                <section className="border-b-2 mb-4">
                    <h1 className="text-3xl">BizCardHub</h1>
                    <p className="text-lg pb-3">Feel free to 'Like' your favorite cards to show appreciation or click on any card to delve deeper into detailed information about the professional and their services. Whether you're seeking to network, find a service, or simply explore, BizCardHub is your gateway to connecting with professionals across the globe. Start your journey with us today and discover the endless possibilities that await.</p>
                </section>
                <section className="grid md:grid-cols-3 gap-4 mx-6">
                    {myCards.map((card) => (
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
                                    <Button variant={"ghost"} onClick={() => {
                                        deleteCard(card._id, card.bizNumber)
                                        toast.promise(
                                            deleteCard(card._id, card.bizNumber), {
                                            pending: 'Deleting',
                                            success: {
                                                render() {
                                                    return 'Card deleted successfuly'
                                                }, closeButton: false,
                                                autoClose: 1500,
                                            },
                                            error: {
                                                render({ data }) {
                                                    return `${(data as RegisterError).response.data}`
                                                },
                                                autoClose: 6000,

                                            }
                                        }, {
                                            position: "top-center",
                                            closeButton: false,
                                            autoClose: 1500,
                                        }
                                        )
                                    }}>
                                        <FaTrash />
                                    </Button>
                                    <EditCard
                                        Id={card._id}
                                        title={card.title}
                                        subtitle={card.subtitle}
                                        description={card.description}
                                        phone={card.phone}
                                        email={card.email}
                                        web={card.web}
                                        image={card.image}
                                        address={card.address}
                                    />

                                    <Spacer />
                                    <Button variant={"ghost"} >
                                        <a href={`tel:${card.phone}`}>
                                            <FaPhone />
                                        </a>
                                    </Button>
                                    <Button variant='ghost' onClick={() => clickHandler(card._id)}>
                                        {card.likes.includes(userId ?? '') ? <BsHeartFill className='text-complimentry dark:text-complimentry-dark' /> : <BsHeartFill className='text-slate-400 dark:text-slate-300' />}
                                    </Button>
                                </ButtonGroup>

                            </CardFooter>

                        </Card>
                    ))}
                </section >
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
                                    <Button variant={"ghost"} onClick={() => {
                                        deleteCard(card._id, card.bizNumber)
                                        toast.promise(
                                            deleteCard(card._id, card.bizNumber), {
                                            pending: 'Deleting',
                                            success: {
                                                render() {
                                                    return 'Card deleted successfuly'
                                                }, closeButton: false,
                                                autoClose: 1500,
                                            },
                                            error: {
                                                render({ data }) {
                                                    return `${(data as RegisterError).response.data}`
                                                },
                                                autoClose: 6000,

                                            }
                                        }, {
                                            position: "top-center",
                                            closeButton: false,
                                            autoClose: 1500,
                                        }
                                        )
                                    }}>
                                        <FaTrash />
                                    </Button>
                                    <EditCard
                                        Id={card._id}
                                        title={card.title}
                                        subtitle={card.subtitle}
                                        description={card.description}
                                        phone={card.phone}
                                        email={card.email}
                                        web={card.web}
                                        image={card.image}
                                        address={card.address}
                                    />

                                    <Spacer />
                                    <Button variant={"ghost"} >
                                        <a href={`tel:${card.phone}`}>
                                            <FaPhone />
                                        </a>
                                    </Button>
                                    <Button variant='ghost' onClick={() => clickHandler(card._id)}>
                                        {card.likes.includes(userId ?? '') ? <BsHeartFill className='text-complimentry dark:text-complimentry-dark' /> : <BsHeartFill className='text-slate-400 dark:text-slate-300' />}
                                    </Button>
                                </ButtonGroup>

                            </CardFooter>

                        </Card>
                    ))}
                </section >
            </>
        )
    }
}


export default MyCards