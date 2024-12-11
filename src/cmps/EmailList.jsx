
import React from "react";
import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onUpdateEmail }) {
    return (
        <div className="email-list">
            {emails.map(email => (
                    <EmailPreview key={email.id} email={email} onUpdateEmail={onUpdateEmail} />
            ))}
        </div>
    );
}

