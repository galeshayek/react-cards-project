import { Link } from "react-router-dom"
import image from '../../assets/bizcardhub.svg'
import { BiLogoFacebook, BiLogoWhatsapp, } from "react-icons/bi";
import { IoMailOutline } from "react-icons/io5";

const Footer = () => {
    return (
        <footer className="bg-primary dark:bg-primary-dark mt-auto flex flex-col md:flex-row justify-between px-5  items-center text-center md:items-start gap-5 py-5">
            <div className="flex flex-col justify-center">
                <img src={image} alt="logo" className="h-14" />
                <p className="text-xl font-semibold">BIZCARDHUB</p>
            </div>

            <div>
                <h4 className="text-lg underline text-complimentry dark:text-complimentry-dark">links:</h4>
                <ul className="hover:*:underline">
                    <li>
                        <Link to={'/'}>Home</Link>
                    </li>
                    <li>
                        <Link to={'/about'}>About</Link>
                    </li>
                    <li>
                        <Link to={'/favcards'}>Favorites</Link>
                    </li>
                    <li>
                        <Link to={'/mycards'}>My Cards</Link>
                    </li>
                    <li>
                        <Link to={'/create'}>Create cards</Link>
                    </li>
                    <li>
                        <Link to={'/login'}>Login </Link>
                    </li>
                    <li>
                        <Link to={'/register'}>Register</Link>
                    </li>
                </ul>
            </div>

            <div>
                <h4 className="text-lg underline text-complimentry dark:text-complimentry-dark">Contact Us:</h4>
                <ul className="text-lg">
                    <li className="flex gap-2">
                        <p>Phone:</p>
                        <a href="tel:+0541234567" className="hover:underline">054-1234567</a>
                    </li>
                    <li className="flex gap-2">
                        <p>Email:</p>
                        <a href="mailto:bizcardhub@gmail.com" className="hover:underline">BizCardHub@gmail.com</a>
                    </li>
                </ul>
                <div className='flex gap-3 justify-center pt-6 text-primary *:text-5xl *:inline-block *:bg-complimentry *:rounded-lg'>
                    <a className="hover:scale-105 transition" href="mailto:bizcardhub@gmail.com" target="_blank" rel="noreferrer noopener">
                        <IoMailOutline />
                    </a>
                    <a className="hover:scale-105 transition" href="https://wa.me/0541234567" target="_blank" rel="noreferrer noopener">
                        <BiLogoWhatsapp />
                    </a>
                    <a className="hover:scale-105 transition" href="https://www.facebook.com" target="_blank" rel="noreferrer noopener">
                        <BiLogoFacebook />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer