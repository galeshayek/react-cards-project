import { ReactNode } from "react"

const ErrorP = (props: ReactNode) => {
    return (
        <p className="text-red-500">{props}</p>
    )
}

export default ErrorP