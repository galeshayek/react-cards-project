import { Link } from 'react-router-dom'

const NotLogged = () => {
    return (
        <section className='flex flex-col gap-2 items-center justify-center flex-1'>
            <h2 className='text-3xl'>You must log in to view this page</h2>
            <button className='bg-complimentry dark:bg-complimentry-dark px-8 py-1 rounded-lg text-xl'>
                <Link to={'/login'}>Log in</Link>
            </button>
            <div className='flex gap-1'>
                <p>Not a user?</p>
                <Link to={'/register'} className='text-complimentry dark:text-complimentry-dark font-semibold'>Register</Link>
            </div>
        </section>
    )
}

export default NotLogged