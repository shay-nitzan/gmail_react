import { useEffect, useState } from "react"
import { emailService } from "../services/email.service"
import { Outlet, useNavigate } from "react-router-dom"
import '../pages/EmailIndex.css';

import { EmailList } from "../cmps/EmailList";


export function EmailIndex() {
    const [ emails, setEmails ] = useState(null)
    const defaultFilter = emailService.getDefaultFilter()
    const [ filterBy, setFilterBy ] = useState(defaultFilter)
    const navigate = useNavigate()

    const loggedinUser = { email: 'user@appsus.com', fullname: 'Shay Nitzan' }

    useEffect(() => {
        loadEmails()
    }, [filterBy])

    async function loadEmails() {
        try {
            const emails = await emailService.getEmails(filterBy)
            setEmails(emails)
            console.log(emails)
        } catch (err) {
            console.log(err)            
            alert('Couldnt load emails')
        }
    }

    async function removeEmail(emailId) {
        try {
            await emailService.remove(robotId)
            setEmails(emails => emails.filter(email => email.id !== emailId))
        } catch (err) {
            console.log(err)            
            alert('Couldnt remove email')
        }
    }

    function onFilterBy(filterBy) {
        setFilterBy(filterBy)
    }
    
    if(!emails) return <div>Loading...</div>
    return (
        <section className="email-index">
            <h1>Inbox</h1>
            <EmailList emails = { emails } filterBy = {filterBy}/>
        </section>
    )
}
