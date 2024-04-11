import { createContext, useState } from "react";
import { FCC } from "../@types/types";

export const SearchContext = createContext({
    searchValue: "",
    // @ts-ignore
    handleSearch: (search: string) => { }
});


const SearchContextProvider: FCC = ({ children }) => {
    const [searchValue, setValue] = useState('');

    const handleSearch = (search: string) => {
        const lowerSearch = search.toLowerCase()
        setValue(lowerSearch)
    }

    return (
        <SearchContext.Provider value={{ searchValue, handleSearch }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider