import { useState, useEffect, useRef } from 'react';
import { utilService } from '../services/util.service';

export function MailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const debouncedSetFilter = useRef(utilService.debounce(onSetFilter, 500)).current

    useEffect(() => {
        debouncedSetFilter(filterByToEdit)
    }, [filterByToEdit])
    
    function handleSubmit(ev) {
        ev.preventDefault(); // Prevent form submission
    }

    function handleChange({ target }) {
        let { name: field, value } = target;
        if (field === 'isRead') {
            if (value === 'all') value = null;
            else value = (value === 'read');
        }
        // Update the local filter state
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        console.log(filterByToEdit.txt)
    }

    const { txt, isRead } = filterByToEdit;

    return (
        <form className="header-search" onSubmit={handleSubmit}>
            <div className="input-container">
                <label title="search" htmlFor="txt" className="material-symbols-outlined">
                    search
                </label>
                <div className="mail-filter">
                    <input
                        value={txt || ''} // Ensure input is controlled
                        onChange={handleChange}
                        type="text"
                        name="txt"
                        id="txt"
                        placeholder="Search"
                    />
                    <select
                        value={isRead === null ? 'all' : isRead ? 'read' : 'unread'}
                        onChange={handleChange}
                        name="isRead"
                    >
                        <option value="all">All</option>
                        <option value="read">Read</option>
                        <option value="unread">Unread</option>
                    </select>
                </div>
            </div>
        </form>
    );
}
