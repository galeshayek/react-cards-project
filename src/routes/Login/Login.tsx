import { Card } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginType } from "../../@types/types"
import { toast } from "react-toastify"
import { LoginUser } from "../../services/login"
import { Link, useNavigate } from "react-router-dom"
import { emailPattern } from "../../Validations/validations"
import "./Login.scss"
import { useContext, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"

const Login = () => {
    const { login } = useContext(AuthContext)
    const [failed, setFail] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<LoginType>({
        mode: 'onSubmit'
    })
    const onSubmit: SubmitHandler<LoginType> = (data) => {
        return (
            toast.promise(
                LoginUser(data), {
                pending: 'processing',
                success: {
                    render({ data }) {
                        setFail(false);
                        login(data.data)
                        navigate('/')
                        return 'User successfuly logged in'
                    },
                },
                error: {
                    render() {
                        setFail(true);
                        return 'Login failed'
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
    return (
        <section className="flex flex-col gap-3 justify-center items-center h-screen">
            <Card w={'35vw'} h={300}>
                <form className="w-3/4 flex flex-col mx-auto justify-evenly h-full" noValidate onSubmit={handleSubmit(onSubmit)}>
                    <input type="email"
                        placeholder="Enter your Email"
                        autoComplete="email"
                        aria-label="email"
                        {
                        ...register(
                            'email', {
                            required: 'this feild is required',
                            pattern: emailPattern,
                        }
                        )
                        }
                    />
                    {errors.email && (<p>{errors.email.message}</p>)}
                    <input type="password"
                        placeholder="Password"
                        aria-label="password"
                        {
                        ...register(
                            'password', {
                            required: 'this field is requierd'
                        }
                        )
                        }
                    />
                    {errors.password && (<p>{errors.password.message}</p>)}
                    {failed && (<p>Email or Password are incorrect</p>)}
                    <button className="btn border-0 bg-primary dark:bg-primary-dark hover:bg-accent dark:hover:bg-accent-dark dark:text-textDark">Login</button>
                </form>
            </Card>
            <div className="flex gap-1">
                <p >Not a user?</p>
                <Link to={'/register'} className="text-complimentry dark:text-complimentry-dark font-semibold">Register</Link>
            </div>
        </section>
    )
}

export default Login