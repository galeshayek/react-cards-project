import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CardError, CardType, EditCardtype } from '../@types/types'
import { updateCard } from '../services/cards'
import React from 'react'
import { FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
export const EditCard: React.FC<EditCardtype> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { register, handleSubmit, formState: { errors } } = useForm<CardType>({
        mode: 'all',
    })
    const onSubmit: SubmitHandler<CardType> = (data) => {
        return (
            toast.promise(updateCard(data, props.Id), {
                pending: 'Creating Card',
                success: {
                    render() {
                        return 'Card Updated'
                    },
                    autoClose: 850,
                    closeButton: false,
                    onClose: onClose

                },
                error: {
                    render({ data }) {
                        return (data as CardError).data.response.data
                    },
                    autoClose: 5000
                }
            }, {
                position: "top-center"
            })
        )
    }
    return (
        <>
            <Button onClick={onOpen} variant='ghost'><FaEdit /></Button>

            <Modal isOpen={isOpen} onClose={onClose} size='5xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Card</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form noValidate onSubmit={handleSubmit(onSubmit)}
                            className=" my-4 registerForm w-3/4 mx-auto flex flex-col flex-auto items-center justify-center gap-3">

                            <section>
                                <input
                                    {...register('title', {
                                        required: 'This field is required',
                                        minLength: { value: 2, message: 'Title is too short' },
                                        maxLength: { value: 256, message: 'Title is too long' },
                                    })}
                                    placeholder="Title"
                                />
                                {errors.title && <p>{errors.title.message}</p>}
                            </section>

                            <section>
                                <input
                                    {...register('subtitle', {
                                        required: 'This field is required',
                                        minLength: { value: 2, message: 'Subtitle is too short' },
                                        maxLength: { value: 256, message: 'Subtitle is too long' },
                                    })}
                                    placeholder="Subtitle"
                                />
                                {errors.subtitle && <p>{errors.subtitle.message}</p>}
                            </section>

                            <section>
                                <input
                                    {...register('description', {
                                        required: 'This field is required',
                                        minLength: { value: 2, message: 'Description is too short' },
                                        maxLength: { value: 1024, message: 'Description is too long' },
                                    })}
                                    placeholder="Description"
                                />
                                {errors.description && <p>{errors.description.message}</p>}
                            </section>

                            <section>
                                <input
                                    type="tel"
                                    {...register('phone', {
                                        required: 'This field is required',
                                        minLength: { value: 9, message: 'Phone number is too short' },
                                        maxLength: { value: 11, message: 'Phone number is too long' },
                                    })}
                                    placeholder="Phone"
                                />
                                {errors.phone && <p>{errors.phone.message}</p>}
                            </section>

                            <section>
                                <input
                                    type="email"
                                    {...register('email', {
                                        required: 'This field is required',
                                        minLength: { value: 5, message: 'Email is too short' },
                                    })}
                                    placeholder="Email"
                                />
                                {errors.email && <p>{errors.email.message}</p>}
                            </section>

                            <section>
                                <input
                                    type="url"
                                    {...register('web', {
                                        required: 'This field is required',
                                        minLength: { value: 14, message: 'Web address is too short' },
                                    })}
                                    placeholder="Website"
                                />
                                {errors.web && <p>{errors.web.message}</p>}
                            </section>

                            <section>
                                <input
                                    type="url"
                                    {...register('image.url', {
                                        required: 'Image URL is required',
                                        minLength: { value: 14, message: 'Image URL is too short' },
                                    })}
                                    placeholder="Image URL"
                                />
                                {errors.image?.url && <p>{errors.image.url.message}</p>}
                            </section>

                            <section>
                                <input
                                    {...register('image.alt', {
                                        required: 'Image description is required',
                                        minLength: { value: 2, message: 'Image description is too short' },
                                        maxLength: { value: 256, message: 'Image description is too long' },
                                    })}
                                    placeholder="Image Description"
                                />
                                {errors.image?.alt && <p>{errors.image.alt.message}</p>}
                            </section>

                            <section>
                                <input
                                    {...register('address.state', { required: 'State is required' })}
                                    placeholder="State"
                                />
                                {errors.address?.state && <p>{errors.address.state.message}</p>}
                            </section>

                            <section>
                                <input
                                    {...register('address.country', { required: 'Country is required' })}
                                    placeholder="Country"
                                />
                                {errors.address?.country && <p>{errors.address.country.message}</p>}
                            </section>

                            <section>
                                <input
                                    {...register('address.city', { required: 'City is required' })}
                                    placeholder="City"
                                />
                                {errors.address?.city && <p>{errors.address.city.message}</p>}
                            </section>

                            <section>
                                <input
                                    {...register('address.street', { required: 'Street is required' })}
                                    placeholder="Street"
                                />
                                {errors.address?.street && <p>{errors.address.street.message}</p>}
                            </section>

                            <section>
                                <input
                                    type="number"
                                    {...register('address.houseNumber', {
                                        required: 'House number is required',
                                        min: { value: 1, message: 'House number must be greater than 0' },
                                    })}
                                    placeholder="House Number"
                                />
                                {errors.address?.houseNumber && <p>{errors.address.houseNumber.message}</p>}
                            </section>

                            <section>
                                <input
                                    type="number"
                                    {...register('address.zip', { required: 'ZIP code is required' })}
                                    placeholder="ZIP Code"
                                />
                                {errors.address?.zip && <p>{errors.address.zip.message}</p>}
                            </section>


                            <button className="col-span-2 w-4/12 mx-auto disabled:bg-slate-400 disabled:dark:bg-slate-400 bg-complimentry dark:bg-complimentry-dark p-1 rounded">Update Card</button>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <button className="p-3 mr-3 mb-3 disabled:bg-slate-400 disabled:dark:bg-slate-400 bg-complimentry dark:bg-complimentry-dark rounded" onClick={onClose}>Close</button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}