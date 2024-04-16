import { Link, NavLink, useNavigate } from "react-router-dom"
import { Tooltip, useColorMode } from "@chakra-ui/react"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { FaMoon, FaSearch, FaSun } from "react-icons/fa"
import image from '../../assets/bizcardhub.svg'
import { SearchContext } from "../../contexts/SearchContext"
import { GiEntryDoor } from "react-icons/gi"

const NavBar = (props?: any) => {
    const { handleSearch, searchValue } = useContext(SearchContext);
    const navigate = useNavigate()
    const { isLoggedIn, logout, isBiz } = useContext(AuthContext)
    const { colorMode, toggleColorMode } = useColorMode()
    colorMode === 'dark' ? document.body.classList.add('dark') : document.body.classList.remove('dark')
    return (
        <nav className="flex flex-col md:flex-row justify-between px-3 text-lg" onClick={props.action}>
            <div className="leftNav flex items-center gap-5 flex-col md:flex-row md:gap-3">
                <Link to={'/'}>
                    <img src={image} alt="logo" className="h-14 py-2" />
                </Link>
                <NavLink to={'/'} className={({ isActive }) => isActive ? `text-complimentry dark:text-complimentry-dark flex items-center gap-1` : 'flex items-center gap-1'}>
                    <p className="text-lg">Home</p>
                </NavLink>
                <NavLink to={'/about'} className={({ isActive }) => isActive ? `text-complimentry dark:text-complimentry-dark flex items-center gap-1` : 'flex items-center gap-1'}>About</NavLink>
                <span className={isLoggedIn ? 'flex flex-col md:flex-row gap-5 mid:gap-3' : 'opacity-40  flex flex-col md:flex-row gap-5 md:gap-3'}>
                    <NavLink to={'/favcards'} className={({ isActive }) => isActive ? `text-complimentry dark:text-complimentry-dark flex items-center gap-1` : 'flex items-center gap-1'}>Favorites</NavLink>
                    <NavLink to={'/mycards'} className={({ isActive }) => isActive ? `text-complimentry dark:text-complimentry-dark flex items-center gap-1` : 'flex items-center gap-1'}>My Cards</NavLink>
                </span>
            </div>


            <div className="rightNav flex items-center gap-5 flex-col md:flex-row md:gap-3">
                <div className="relative">
                    {!searchValue && (<FaSearch className="absolute top-3 left-2 text-slate-500 text-base hidden md:block" />)}
                    <input
                        className="dark:text-black hidden md:block"
                        type="text"
                        placeholder='    Search'
                        role="searchbox"
                        aria-label="searchbox"
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchValue}
                    />
                </div>
                {isBiz && (<NavLink to={'/create'} className={({ isActive }) => isActive ? ` text-complimentry dark:text-complimentry-dark` : ''}>Create Card</NavLink>)}
                {!isLoggedIn && (<NavLink to={'/login'} className={({ isActive }) => isActive ? ` text-complimentry dark:text-complimentry-dark` : ''}>Login</NavLink>)}
                {!isLoggedIn && (<NavLink to={'/register'} className={({ isActive }) => isActive ? ` text-complimentry dark:text-complimentry-dark` : ''}>Register</NavLink>)}
                <div className="iconsWrapper flex gap-10 md:gap-3">
                    {isLoggedIn && (
                        <Tooltip label='Log out'>
                            <button className="text-3xl" onClick={() => { logout(), navigate('/') }}><GiEntryDoor className=" text-red-600 dark:text-red-700" /></button>
                        </Tooltip>
                    )}
                    <Tooltip label='Theme mode'>
                        <button className="text-2xl" onClick={toggleColorMode}>
                            {colorMode === "light" ? <FaSun className="text-orange-500" /> : <FaMoon className="text-complimentry-dark" />}
                        </button>
                    </Tooltip>
                </div>
            </div>
        </nav >
    )
}

export default NavBar