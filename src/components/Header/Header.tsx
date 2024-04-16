import { useContext, useEffect, useRef, useState } from "react"
import NavBar from "../NavBar/NavBar"
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, useBoolean, useDisclosure } from "@chakra-ui/react"
import { FcMenu } from "react-icons/fc"
import { FaSearch } from "react-icons/fa"
import { SearchContext } from "../../contexts/SearchContext"

const Header = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const { handleSearch } = useContext(SearchContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef<HTMLButtonElement>(null)
    const [isMobile, setMobile] = useState(false)
    const [search, onSearch] = useBoolean()
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        inputRef.current?.focus()
        if (search) {
            const timer = setTimeout(() => setOpacity(1), 3000);
            return () => clearTimeout(timer);
        }
    }, [search])
    useEffect(() => {
        function handleResize() {
            const isMobileQuery = window.matchMedia('(max-width: 768px)').matches
            setMobile(isMobileQuery)
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    if (isMobile) {
        return (
            <header className="bg-primary dark:bg-primary-dark sticky top-0 translate-y-0 z-10 py-4 pl-4">
                <Button variant={'ghost'} ref={btnRef} colorScheme='teal' onClick={onOpen}>
                    <FcMenu className="text-3xl" />
                </Button>
                <Drawer
                    isOpen={isOpen}
                    placement='left'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerBody>
                            <NavBar action={onClose} />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
                {!search && (
                    <Button onClick={() => onSearch.on()}>
                        <FaSearch className={`opacity-${opacity}`} />
                    </Button>
                )}
                {search && (
                    <input
                        ref={inputRef}
                        className="dark:text-black w-11 focus:w-52 focus:transition-all focus:duration-300 duration-300"
                        type="text"
                        role="searchbox"
                        aria-label="searchbox"
                        onChange={(e) => handleSearch(e.target.value)}
                        onBlur={() => onSearch.off()}
                    />
                )}

            </header>
        )
    } else {
        return (
            <header className="bg-primary dark:bg-primary-dark sticky top-0 translate-y-0 z-10">
                <NavBar />
            </header>
        )
    }
}

export default Header