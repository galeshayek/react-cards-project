import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GetCardById } from "../services/cards";
import { CardType } from "../@types/types";
import { Card, CardBody, CardHeader, Divider, Flex, Image } from "@chakra-ui/react";

const UserCard = () => {
    const { id } = useParams();
    const [userCard, setCard] = useState<CardType>();

    useEffect(() => {
        GetCardById(id).then((r) => setCard(r.data))
    }, [])
    return (
        <div>
            <Card>
                <CardHeader>
                    <p className=" text-sm text-slate-600 dark:text-slate-400">
                        {userCard?.bizNumber}
                    </p>
                    <Flex justify={'space-between'}>
                        <div>
                            <h1 className="text-3xl">{userCard?.title}</h1>
                            <h2 className="text-2xl">{userCard?.subtitle}</h2>
                            <p className="text-xl">{userCard?.description}</p>
                        </div>
                        <Image src={userCard?.image.url} alt={userCard?.image.alt} borderRadius={'lg'} maxW={'15%'} aspectRatio={1 / 1} />
                    </Flex>
                </CardHeader>
                <Divider />
                <CardBody>
                    <div className="flex flex-col gap-5 md:flex-row md:gap-0 text-base justify-around">

                        <div className="bg-accent dark:bg-accent-dark py-2 px-3 rounded w-9/12 mx-auto md:w-3/12 md:mx-0">
                            <h3 className="text-xl font-bold underline underline-offset-4">Info:</h3>
                            <ul>
                                <li><span className="text-lg font-semibold">Phone:</span>
                                    <a className="cursor-pointer" href={`tel:${userCard?.phone}`}> {userCard?.phone}</a></li>
                                <li><span className="text-lg font-semibold">Email: </span>
                                    <a className="cursor-pointer" href={`mailto:${userCard?.email}`} > {userCard?.email}</a></li>
                                <li><span className="text-lg font-semibold">Website: </span>
                                    <a className="link text-blue-600" href={userCard?.web} target="_blank" rel="noopener noreferrer">
                                        {userCard?.web}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-accent dark:bg-accent-dark py-2 px-3 rounded w-9/12 mx-auto md:w-3/12 md:mx-0">
                            <h3 className="text-xl font-bold underline underline-offset-4">Adress:</h3>
                            <ul>
                                <li><span className="text-lg font-semibold">Country:</span>
                                    {userCard?.address.country}
                                </li>
                                <li><span className="text-lg font-semibold">City: </span>
                                    {userCard?.address.city}
                                </li>
                                <li><span className="text-lg font-semibold">Street: </span>
                                    {userCard?.address.street}

                                </li>
                                <li><span className="text-lg font-semibold">House Number: </span>
                                    {userCard?.address.houseNumber}

                                </li>
                            </ul>
                        </div>

                    </div>
                </CardBody>
            </Card>
        </div >
    )
}

export default UserCard