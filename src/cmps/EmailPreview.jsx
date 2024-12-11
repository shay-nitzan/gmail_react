import React from "react"
import "../cmps/EmailPreview.scss"
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify'

export function EmailPreview({ email, onUpdateEmail }) {
    const navigate = useNavigate()

    if (!email || !onUpdateEmail) {
        console.error("Email or onUpdateEmail is not provided.")
        return null;
    }

    const { from, subject, body, sentAt, isStarred } = email

    // Format the date to "MMM DD"
    const formattedDate = new Date(sentAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    })

    const handleEmailClick = () => {
        if (!email.isRead) {
            onUpdateEmail(email.id, { isRead: true })
        }
        navigate(`/email/${email.id}`)
    }

    const handleStarClick = (ev) => {
        ev.stopPropagation() // Try to prevent triggering email click
        onUpdateEmail(email.id, { isStarred: !isStarred })
        console.log(isStarred)
        console.log(email.id)
        console.log(email.isStarred)
        const updatedStarredStatus = !isStarred;
        toast(updatedStarredStatus ? "Star on!" : "Star off!");
    }

return (
    <div className={`email-preview ${email.isRead ? "read" : "unread"}`} onClick={handleEmailClick}>
            <span className="star" >
            <img
                src={isStarred ? "../public/img/star_fill.png" : "../public/img/star_baseline.png"}
                alt={isStarred ? "Starred" : "Not Starred"}
                className="star-icon"
                onClick={handleStarClick}
            /> </span>
        <section className="left">
            <span className="email-from">{from}</span>
        </section>
        <section className="middle">
            <span className="email-subject">{subject}</span>
        </section>
        <section className="right">
            <span className="email-body">{body}</span>
            <span className="email-date">{formattedDate}</span>
        </section>
    </div>
    )
}