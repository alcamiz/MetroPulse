import { React, useState} from 'react';
import '../styles/SearchModel.css'

const ModelSearchBar = ({model, handleSearch}) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchWarning, setSearchWarning] = useState('');

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
        if(event.target.value.trim()) {
            setSearchWarning('')
        }
    }

    const handleSearchSubmit = (event) => {
        if(!searchValue.trim()){
            event.preventDefault();
            setSearchWarning("Please enter a search term.")
        } else {
            setSearchWarning(''); // Clear any existing warning
            handleSearch(searchValue); // Call the handleSearch function passed via props
            setSearchValue(''); // Optionally clear the search input after search
        }
    }

    return (
        <div className='nav-search'>
            <input
                className='nav-search-input'
                type="text"
                placeholder={`Search for ${model}`}
                aria-label={`Search for ${model}`}
                onChange={handleSearchChange}
                value={searchValue}
            />
            <button
                className='nav-search-confirm'
                onClick={handleSearchSubmit}
            >
                Search    
            </button>
            {searchWarning && <div className='search-warning'>{searchWarning}</div>}
        </div>
    )
}

export default ModelSearchBar;