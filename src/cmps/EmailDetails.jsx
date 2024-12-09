import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { emailService } from "../services/email.service"
import "./EmailDetails.css";

export function EmailDetails() {
    const { mailId } = useParams()
    const navigate = useNavigate()
    const [email, setEmail] = useState(null)

    useEffect(() => {
        loadEmail()
    }, [mailId])

    async function loadEmail() {
        try {
            const Email = await emailService.getEmailById(mailId)
            setEmail(Email)
        } catch (err) {
            console.error("Error loading email:", err)
            alert("Couldn't load email")
        }
    }

    function onGoBack() {
        navigate(-1); // Navigate back to the previous page
    }

    if (!email) return <div>Loading email...</div>

    return (
        <div className="email-details">
            <button onClick={onGoBack}>Back</button>
            <h2>{email.subject}</h2>
            <p>From: {email.from}</p>
            <p>To: {email.to}</p>
            <p>{email.body}</p>
            <small>Sent at: {new Date(email.sentAt).toLocaleString()}</small>
        </div>
    );
}
