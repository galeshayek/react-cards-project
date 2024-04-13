import { SubmitHandler, useForm } from "react-hook-form"
import { CreateCardType } from "../@types/types"
import { PostCard } from "../services/cards"
import { UrlPattern, emailPattern, phonePattern } from "../Validations/validations"
import { CardMock } from "../Mock/cardMock"
import { toast } from "react-toastify"

const CreateCard = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<CreateCardType>({
        mode: 'all',
        defaultValues: CardMock,
    })
    const onSubmit: SubmitHandler<CreateCardType> = (data) => {
        return (
            toast.promise(PostCard(data), {
                pending: 'Creating Card',
                success: {
                    render() {
                        return 'Card Created'
                    },
                    autoClose: 1500,
                    closeButton: false,
                },
                error: {
                    render({ data }) {
                        // @ts-ignore
                        return `${data.response.data}`
                    },
                    autoClose: false
                }
            }, {
                position: "top-center"
            })
        )
        PostCard(data)
            .then((r) => console.log(r))
            .catch((e) => console.log(e))
    }
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}
            className=" my-4 registerForm  w-11/12 md:w-3/4 mx-auto flex flex-col flex-auto items-center justify-center gap-3">
            <section>
                <input
                    type="text"
                    aria-label="title"
                    placeholder="Title"
                    {...register("title", {
                        required: 'this field is required',
                        minLength: { value: 2, message: 'Too short' },
                        maxLength: { value: 256, message: 'Too long' }
                    })}
                />
                {errors.title && (<p>{errors.title?.message}</p>)}
            </section>

            <section>
                <input
                    type="text"
                    aria-label="Subtitle"
                    placeholder="Subtitle"
                    {...register("subtitle", {
                        required: 'this field is required',
                        minLength: { value: 2, message: 'Too short' },
                        maxLength: { value: 256, message: 'Too long' }
                    })}
                />
                {errors.subtitle && (<p>{errors.subtitle?.message}</p>)}
            </section>

            <section>
                <input
                    type="text"
                    aria-label="Description"
                    placeholder="Description"
                    {...register("description", {
                        required: 'this field is required',
                        minLength: { value: 2, message: 'Too short' },
                        maxLength: { value: 1024, message: 'Too long' }
                    })}
                />
                {errors.description && (<p>{errors.description?.message}</p>)}
            </section>

            <section>
                <input
                    type="tel"
                    aria-label="Phone"
                    placeholder="Phone"
                    {...register("phone", {
                        required: 'this field is required',
                        minLength: { value: 9, message: 'Too short' },
                        maxLength: { value: 11, message: 'Too long' },
                        pattern: { value: phonePattern, message: 'must be standard israeli number' },
                    })}
                />
                {errors.phone && (<p>{errors.phone?.message}</p>)}
            </section>

            <section>
                <input
                    type="email"
                    aria-label="Email"
                    placeholder="Email"
                    {...register("email", {
                        required: 'this field is required',
                        minLength: { value: 5, message: 'Too short' },
                        pattern: { value: emailPattern, message: 'must be strandard email pattern' },
                    })}
                />
                {errors.email && (<p>{errors.email?.message}</p>)}
            </section>

            <section>
                <input
                    type="url"
                    aria-label="Website"
                    placeholder="Website"
                    {...register("web", {
                        required: 'this field is required',
                        minLength: { value: 14, message: 'Too short' },
                        pattern: { value: UrlPattern, message: 'must be standard url' },
                    })}
                />
                {errors.web && (<p>{errors.web?.message}</p>)}
            </section>

            <section>
                <input
                    {...register('image.url', { required: 'This field is required', minLength: 14 })}
                    placeholder="Image URL"
                />
                {errors.image?.url && <p>{errors.image?.url?.message}</p>}
            </section>

            <section>
                <input
                    {...register('image.alt', { required: 'This field is required', minLength: 2, maxLength: 256 })}
                    placeholder="Image Description"
                />
                {errors.image?.alt && <p>{errors.image?.alt?.message}</p>}
            </section>

            <section>
                <input
                    {...register('address.state')}
                    placeholder="State"
                />
            </section>

            <section>
                <input
                    {...register('address.country', { required: 'This field is required' })}
                    placeholder="Country"
                />
                {errors.address?.country && <p>{errors.address.country.message}</p>}
            </section>

            <section>
                <input
                    {...register('address.city', { required: 'This field is required' })}
                    placeholder="City"
                />
                {errors.address?.city && <p>{errors.address.city.message}</p>}
            </section>

            <section>
                <input
                    {...register('address.street', { required: 'This field is required' })}
                    placeholder="Street"
                />
                {errors.address?.street && <p>{errors.address.street.message}</p>}
            </section>

            <section>
                <input
                    type="number"
                    {...register('address.houseNumber', { required: 'This field is required' })}
                    placeholder="House Number"
                />
                {errors.address?.houseNumber && <p>{errors.address.houseNumber.message}</p>}
            </section>

            <section>
                <input
                    type="number"
                    {...register('address.zip', { required: 'This field is required' })}
                    placeholder="Zip Code"
                />
                {errors.address?.zip && <p>{errors.address.zip.message}</p>}
            </section>


            <button className="col-span-2 w-4/12 mx-auto disabled:bg-slate-400 disabled:dark:bg-slate-400 bg-complimentry dark:bg-complimentry-dark p-1 rounded">Create Card</button>
        </form>
    )
}

export default CreateCard