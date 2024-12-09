
import React from "react";
import { EmailPreview } from "./EmailPreview";
import { Link } from "react-router-dom";

export function EmailList({ emails, onUpdateEmail }) {
    return (
        <div className="email-list">
            {emails.map(email => (
                <Link to={`/email/${email.id}`} key={email.id}>
                    <EmailPreview email={email} onUpdateEmail={onUpdateEmail} />
                </Link>
            ))}
        </div>
    );
}

