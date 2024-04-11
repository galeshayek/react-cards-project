import { createContext, useState } from "react";
import { FCC } from "../@types/types";

export const SearchContext = createContext({
    searchValue: "",
    handleSearch: (search: any) => { }
});


const SearchContextProvider: FCC = ({ children }) => {
    const [searchValue, setValue] = useState('');
    const handleSearch = (search: any) => {
        setValue(search)
    }

    return (
        <SearchContext.Provider value={{ searchValue, handleSearch }}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider