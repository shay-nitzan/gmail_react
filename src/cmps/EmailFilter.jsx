import { useState, useEffect, useRef } from 'react';
import { utilService } from '../services/util.service';
import "./EmailFilter.css";
import * as Yup from 'yup';

export function EmailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [errors, setErrors] = useState({}) // track validation errors
    const debouncedSetFilter = useRef(utilService.debounce(onSetFilter, 500)).current

    useEffect(() => {
        debouncedSetFilter(filterByToEdit)
    }, [filterByToEdit])
    
    // Yup validation schema
    const validationSchema = Yup.object().shape({
        txt: Yup.string()
            .max(50, 'Search text cannot exceed 50 characters') // Maximum length validation
            .matches(/^[a-zA-Z0-9\s]*$/, 'Search text can only contain letters, numbers, and spaces') // Custom pattern validation
            .nullable(), // Allows null or undefined values
    })

    function handleSubmit(ev) {
        ev.preventDefault(); // Prevent form submission
    }

    async function handleChange({ target }) {
        let { name: field, value } = target;
        if (field === 'isRead') {
            if (value === 'all') value = null;
            else value = (value === 'read');
        }

        // Validate the `txt` field if it is being updated
        if (field === 'txt') {
            try {
                // Validate the field using the Yup schema
                await validationSchema.validateAt(field, { [field]: value })
                setErrors((prevErrors) => ({ ...prevErrors, [field]: null })) // Clear error if valid
            } catch (err) {
                setErrors((prevErrors) => ({ ...prevErrors, [field]: err.message })) // Set error message
            }
        }

        // Update the local filter state
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        console.log(filterByToEdit.txt)
    }

    const { txt, isRead } = filterByToEdit

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
                    {errors.txt && <span className="error-msg">{errors.txt}</span>} {/* Show validation error */}

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
    )
}
