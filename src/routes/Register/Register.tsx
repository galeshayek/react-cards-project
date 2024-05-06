import "./Register.scss"
import { SubmitHandler, useForm } from "react-hook-form"
import { RegisterError, RegisterType } from "../../@types/types"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { postUser } from "../../services/register"
import { UrlPattern, emailPattern, passwordPattern, phonePattern } from "../../Validations/validations"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button } from "@chakra-ui/react"


const Register = () => {
    const [part, setPart] = useState(1)
    const navigate = useNavigate()
    const [password, setpassword] = useState(true)
    const showPass = () => { password == false ? setpassword(true) : setpassword(false) }
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterType>({
        mode: "all",
        delayError: 1000,
    })
    const onSubmit: SubmitHandler<RegisterType> = (data) => {
        return (
            toast.promise(
                postUser(data),
                {
                    pending: 'data is being sent'
                    ,
                    success: {
                        render(response) {
                            localStorage.setItem('userId', response.data.data._id)
                            return 'User successfuly registered'
                        },
                        onClose: () => navigate('/login'),
                    },
                    error: {
                        render({ data }) {
                            return `${(data as RegisterError).response.data}`
                        },
                    },
                }, {
                position: "top-center",
                closeButton: false,
                autoClose: 1500,
            }
            )
        )
    }
    return (<div className="flex flex-col">
        <Breadcrumb margin={'auto'} pt={'2'} >
            <BreadcrumbItem>
                <BreadcrumbLink isActive={part === 1} _active={{ color: 'complimentry.100' }} variant={'link'} as={Button} onClick={() => setPart(1)}>
                    Part 1
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbLink isActive={part === 2} _active={{ color: 'complimentry.100' }} variant={'link'} as={Button} onClick={() => setPart(2)}>
                    Part 2
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
                <BreadcrumbLink isActive={part === 3} _active={{ color: 'complimentry.100' }} variant={'link'} as={Button} onClick={() => setPart(3)}>
                    Part 3
                </BreadcrumbLink>
            </BreadcrumbItem>

        </Breadcrumb>
        <div className="flex mx-auto pt-5 gap-3">
            <Button w={'130px'} onClick={() => setPart(prev => prev <= 1 ? prev = 1 : prev - 1)}>Previous</Button>
            <Button w={'130px'} onClick={() => setPart(prev => prev >= 3 ? prev = 3 : prev + 1)}>Next</Button>
        </div>
        <form noValidate onSubmit={handleSubmit(onSubmit)} className=" pt-10 registerForm w-3/4 mx-auto flex flex-col  items-center justify-center gap-x-3 gap-y-10">
            {part == 1 && (<>
                <section>
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        placeholder="First Name"
                        aria-label="First Name"
                        autoComplete="given-name"
                        type="text"
                        {...register("name.first", {
                            required: 'this field is mandatory',
                            minLength: {
                                value: 2,
                                message: 'First Name is too short'
                            },
                            maxLength: {
                                value: 16,
                                message: 'First Name is too long'
                            }
                        })}
                    />
                    {errors.name?.first && (<p>{errors.name?.first?.message}</p>)}
                </section>

                <section>
                    <label htmlFor="middle_name">Middle Name:</label>
                    <input
                        type="text"
                        placeholder="Middle Name"
                        aria-label="Middle Name"
                        autoComplete="additional-name"
                        {...register(
                            "name.middle",
                            {
                                minLength: {
                                    value: 2,
                                    message: 'Name is too short'
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'Name is too long'
                                }
                            }
                        )}
                    />
                    {errors.name?.middle && (
                        <p>{errors.name?.middle?.message}</p>
                    )}
                </section>

                <section>
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        aria-label="Last Name"
                        autoComplete="family-name"
                        {...register(
                            'name.last',
                            {
                                required: 'this field is mandatory',
                                minLength: {
                                    value: 2,
                                    message: 'Name is too short'
                                },
                                maxLength: {
                                    value: 16,
                                    message: 'Name is too long'
                                }
                            }
                        )}
                    />
                    {errors.name?.last && (<p>{errors.name?.last?.message}</p>)}
                </section>

                <section>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        aria-label="Email"
                        autoComplete="email"
                        {...register(
                            'email',
                            {
                                required: 'this field is mandatory',
                                minLength: {
                                    value: 5,
                                    message: 'Email is too short'
                                },
                                pattern: {
                                    value: emailPattern,
                                    message: 'Must use a standard email'
                                }

                            }
                        )}
                    />
                    {errors.email && (<p>{errors.email?.message}</p>)}
                </section>

                <section>
                    <label htmlFor="phone">Phone number:</label>
                    <input
                        type="tel"
                        placeholder="Phone number:"
                        aria-label="Phone number:"
                        autoComplete="tel"
                        {...register(
                            "phone",
                            {
                                required: 'This field is mandatory',
                                pattern: {
                                    value: phonePattern,
                                    message: 'Phone number must start with "05" and without "-"'
                                },
                                minLength: {
                                    value: 10,
                                    message: 'Phone number is too short'
                                },
                                maxLength: {
                                    value: 13,
                                    message: 'Phone number is too long'
                                }
                            }
                        )}
                    />
                    {errors.phone && (
                        <p>{errors.phone?.message}</p>
                    )}
                </section>

            </>)}

            {part == 2 && (<>
                <section className="relative">
                    <label htmlFor="password">Password:</label>
                    <input
                        type={password ? 'password' : 'text'}
                        placeholder="Password"
                        aria-label="password"
                        autoComplete="new-password"
                        {...register(
                            'password', {
                            required: 'this field is mandatory',
                            pattern: {
                                value: passwordPattern,
                                message: 'Password must include one lowercase and uppercase letter and one special character'
                            },
                            minLength: {
                                value: 7,
                                message: 'Must be between 7-16 characters'
                            },
                            maxLength: {
                                value: 16,
                                message: 'Must be between 7-16 characters'
                            }
                        })}
                        maxLength={16}
                    />
                    <button className="absolute top-8 right-2 text-complimentry dark:text-complimentry-dark" type="button" onClick={showPass}>
                        {password ? <FaEye /> : <FaEyeSlash />}
                    </button>
                    {errors.password && (
                        <p>{errors.password?.message}</p>
                    )}
                </section>

                <section>
                    <label htmlFor="image_url">Image URL:</label>
                    <input
                        type="text"
                        placeholder="Image URL"
                        aria-label="image URL"
                        {...register(
                            'image.url', {
                            minLength: {
                                value: 14,
                                message: "URL is too short"
                            },
                            pattern: {
                                value: UrlPattern,
                                message: 'Invalid URL'
                            }
                        })}
                    />
                    {errors.image?.url && (
                        <p>{errors.image?.url?.message}</p>
                    )}
                </section>

                <section>
                    <label htmlFor="image_alt_text">Image Alt Text:</label>
                    <input
                        type="text"
                        placeholder="Image Alt Text"
                        aria-label="image alt text"
                        {...register(
                            'image.alt', {
                            minLength: {
                                value: 2,
                                message: "Text is too short"
                            },
                            maxLength: {
                                value: 256,
                                message: 'Text is too long'
                            }
                        })}
                    />
                    {errors.image?.alt && (
                        <p>{errors.image?.alt?.message}</p>
                    )}
                </section>


                <section>
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        placeholder="State"
                        aria-label="state"
                        {...register(
                            'address.state', {
                            minLength: {
                                value: 2,
                                message: "State is too short"
                            },
                            maxLength: {
                                value: 256,
                                message: 'State is too long'
                            }
                        })}
                    />
                    {errors.address?.state && (
                        <p>{errors.address?.state?.message}</p>
                    )}
                </section>

                <section>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        placeholder="Country"
                        aria-label="country"
                        {...register(
                            'address.country', {
                            minLength: {
                                value: 2,
                                message: "Country is too short"
                            },
                            maxLength: {
                                value: 256,
                                message: 'Country is too long'
                            }
                        })}
                    />
                    {errors.address?.country && (
                        <p>{errors.address?.country?.message}</p>
                    )}
                </section>

            </>)}

            {part == 3 && (<>
                <section>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        placeholder="City"
                        aria-label="city"
                        {...register(
                            'address.city', {
                            minLength: {
                                value: 2,
                                message: "City is too short"
                            },
                            maxLength: {
                                value: 256,
                                message: 'City is too long'
                            }
                        })}
                    />
                    {errors.address?.city && (
                        <p>{errors.address?.city?.message}</p>
                    )}
                </section>

                <section>
                    <label htmlFor="street">Street:</label>
                    <input
                        type="text"
                        placeholder="Street"
                        aria-label="street"
                        {...register(
                            'address.street', {
                            minLength: {
                                value: 2,
                                message: "Street is too short"
                            },
                            maxLength: {
                                value: 256,
                                message: 'Street is too long'
                            }
                        })}
                    />
                    {errors.address?.street && (
                        <p>{errors.address?.street?.message}</p>
                    )}
                </section>

                <section>
                    <label htmlFor="houseNumber">House Number:</label>
                    <input
                        type="text"
                        placeholder="House Number"
                        aria-label="houseNumber"
                        {...register(
                            'address.houseNumber', {
                            minLength: {
                                value: 2,
                                message: "House Number is too short"
                            },
                            maxLength: {
                                value: 256,
                                message: 'House Number is too long'
                            }
                        })}
                    />
                    {errors.address?.houseNumber && (
                        <p>{errors.address?.houseNumber?.message}</p>
                    )}
                </section>

                <section>
                    <label htmlFor="zip">ZIP Code:</label>
                    <input
                        type="text"
                        placeholder="ZIP Code"
                        aria-label="zip"
                        {...register(
                            'address.zip', {
                            minLength: {
                                value: 2,
                                message: "ZIP Code is too short"
                            },
                            maxLength: {
                                value: 256,
                                message: 'ZIP Code is too long'
                            }
                        })}
                    />
                    {errors.address?.zip && (
                        <p>{errors.address?.zip?.message}</p>
                    )}
                </section>

                <section className="isBusiness flex gap-2 items-baseline place-self-end self-center">
                    <p>Are you a business?</p>
                    <input
                        type="checkbox"
                        aria-label="isBusiness"
                        {...register('isBusiness')}
                    />
                </section>

                <button className="disabled:bg-slate-400 disabled:dark:bg-slate-400 bg-complimentry dark:bg-complimentry-dark p-1 rounded">Submit</button>
            </>)}
        </form >
    </div>)
}

export default Register