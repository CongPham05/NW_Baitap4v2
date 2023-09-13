import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { searchText } from './filtersSlice';

interface SearchProps { }

const Search: React.FC<SearchProps> = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('')

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        dispatch(searchText(e.target.value));
    }

    return (
        <div className='dark-border dark-bg_sub   border-t border-solid border-[#d0d7de] h-18 flex items-center p-3 bg-white '>
            <input type="text" placeholder='Filter by keyword or by field'
                className='dark-bg_sub  dark:focus:bg-white dark-border dark:focus:border-[#218bff] w-[800px] border h-9 
                leading-8 text-[16px] pl-6 border-solid outline-none border-[#d0d7de] rounded-md p-1.5 focus:border-[#218bff] '
                onChange={handleSearch}
                value={search}
            />
        </div>
    );
};

export default Search;