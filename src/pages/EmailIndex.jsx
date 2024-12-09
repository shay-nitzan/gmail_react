import { useEffect, useState } from "react";
import { emailService } from "../services/email.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../pages/EmailIndex.css";

import { EmailList } from "../cmps/EmailList";
import { FolderList } from "../cmps/FolderList";
import { MailFilter } from "../cmps/MailFilter";

export function EmailIndex() {
    const [emails, setEmails] = useState(null);
    const defaultFilter = emailService.getDefaultFilter();
    const [filterBy, setFilterBy] = useState(defaultFilter);
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate();

    useEffect(() => {
        loadEmails();
    }, [filterBy]);

    async function loadEmails() {
        try {
            const filteredEmails = await emailService.filterMails(filterBy);
            setEmails(filteredEmails);
        } catch (err) {
            console.error("Error loading emails:", err);
            alert("Couldn't load emails");
        }
    }

    function onFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    async function onUpdateEmail(emailId, updatedFields) {
        try {
            await emailService.updateEmail(emailId, updatedFields);
            setEmails(emails =>
                emails.map(email =>
                    email.id === emailId
                        ? { ...email, ...updatedFields }
                        : email
                )
            )
        } catch (err) {
            console.error(err);
            alert("Couldn't update email")
        }
    }

    function onSetFilterByStatus(status) {
        setFilterBy({ ...filterBy, status });
        console.log( filterBy.status )
    }

    if (!emails) return <div>Loading...</div>

    return (
        <div className="email-page">
            <FolderList filterBy={filterBy} onSetFilter={onSetFilterByStatus} />
            <section className="email-index">
                <MailFilter filterBy={filterBy} onSetFilter={onFilterBy} />
                <EmailList emails={emails} filterBy={filterBy} onUpdateEmail={onUpdateEmail}/>
            </section>
        </div>
    )
}
