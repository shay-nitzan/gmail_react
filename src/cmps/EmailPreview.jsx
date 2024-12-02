import React from "react";
import '../cmps/EmailPreview.css';

export function EmailPreview({ email }) {
    const { from, subject, body, sentAt } = email;

    // Format the date to "MMM DD"
    const formattedDate = new Date(sentAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

    return (
        <div className="email-preview">
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
    );
}