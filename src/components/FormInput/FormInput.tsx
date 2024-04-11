import { InputHTMLAttributes } from "react"

const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input className="bg-slate-200/50 rounded" {...props} />
    )
}

export default Input