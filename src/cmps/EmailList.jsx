
// EmailList.jsx
import React from "react";
import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails , filterBy }) {
    return (
        <div className="email-list">
            {emails.map(email => (
                <EmailPreview key={email.id} email={email} />
            ))}
        </div>
    );
}
