import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const emailService = {
    getEmails,
    getById,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getDefaultSort,
    isFiltered,
    getEmailsByText,
    getFolders
}

const STORAGE_KEY = 'emails'
const loggedinUser = { email: 'user@appsus.com', fullname: 'Shay Nitzan' }

_createEmails()

async function getEmails(filterBy) {

    let emails = await storageService.query(STORAGE_KEY)

    if (!emails || !emails.length) return [];
    if (filterBy) {
        emails = emails.filter(email => !isFiltered(email, filterBy, loggedinUser));
    }

    return emails
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
    if (emailToSave.id) {
        return storageService.put(STORAGE_KEY, emailToSave)
    } else {
        emailToSave.isOn = false
        return storageService.post(STORAGE_KEY, emailToSave)
    }
}

function getEmptyMail(
    subject = '',
    body = '',
    sentAt = '',
    from = '',
    to = '',
    isRead = false,
    isStarred = false,
    removedAt = null
    ) { return { id: '', subject, body, sentAt, from, to, isRead, isStarred, removedAt }
}

function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: null,
        isStarred: null,
        labels: []
    }
}

function getDefaultSort() {
    return {
        by: 'date',
        dir: 1
    }
}

function _createEmails() {

    let emails = utilService.loadFromStorage(STORAGE_KEY)
    if (!emails || !emails.length) {
        emails = [
            { id: utilService.makeId(), subject: 'Meeting Reminder', body: 'Don’t forget about the meeting scheduled for tomorrow.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'team@company.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Project Update', body: 'The latest project updates have been shared on the drive.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'updates@company.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Welcome Aboard!', body: 'We’re excited to have you join our team!', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'hr@company.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Password Reset', body: 'Click the link below to reset your password.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'security@company.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Invoice Due', body: 'Your invoice #12345 is due on 11/30/2024.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'billing@services.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Weekly Newsletter', body: 'Here’s your weekly dose of updates and news.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'newsletter@updates.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Job Application', body: 'Your application for the Software Engineer position has been received.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'careers@company.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Event Invitation', body: 'Join us for our annual tech conference next month.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'events@company.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Birthday Wishes', body: 'Happy Birthday! Wishing you a wonderful year ahead.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'greetings@company.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Exclusive Offer', body: 'Enjoy 20% off your next purchase with code SAVE20.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'promotions@shop.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Meeting Follow-up', body: 'Here’s a summary of the points discussed in today’s meeting.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'team@company.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'System Alert', body: 'Your system is running low on storage. Please take action.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'alerts@company.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Subscription Renewal', body: 'Your subscription to our service will renew on 12/01/2024.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'billing@services.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Congratulations!', body: 'You’ve been selected for the next round of interviews.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'hr@company.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Feedback Request', body: 'We’d love to hear your thoughts on our latest feature.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'support@company.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Security Alert', body: 'A login attempt was made from an unrecognized device.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'security@company.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Order Confirmation', body: 'Thank you for your purchase. Your order #67890 is confirmed.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'orders@shop.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Happy Holidays!', body: 'Wishing you and your family a joyous holiday season.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'greetings@company.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Account Verification', body: 'Please verify your account by clicking the link below.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'no-reply@service.com', to: 'user@appsus.com' },
            { id: utilService.makeId(), subject: 'Technical Support', body: 'Your support ticket #112233 has been updated.', isRead: false, isStarred: false, sentAt: 1551133930594, removedAt: null, from: 'support@company.com', to: 'user@appsus.com' },
        ];
        // console.log('Emails created:', emails);

        utilService.saveToStorage(STORAGE_KEY, emails)
}
}

function isFiltered(email, filterBy) {
    // console.log('Current filterBy:', filterBy);

    if (filterBy.status === 'inbox') 
        return email.removedAt !== null;
    
    if (filterBy.status === 'sent') 
        return email.from != loggedinUser.email;
    
    if (filterBy.status === 'star')
        return !email.isStarred;

    if (filterBy.status === 'trash')
        return !email.removedAt;

    return false
}
// function isFiltered(email, filterBy, loggedinUser) {

//     if (!filterBy.status || filterBy.status === 'inbox') 
//         return (email.to != loggedinUser.email || email.removedAt)
    
//     if (filterBy.status === 'sent') 
//         return email.from != loggedinUser.email;
    
//     if (filterBy.status === 'star')
//         return !email.isStarred;

//     if (filterBy.status === 'trash')
//         return !email.removedAt;

//     return false
// }

async function getEmailsByText(emails, text){

    if(text == '')
        return await getEmails()

    const txtLower = text.toLowerCase();
    
    const filteredEmails = emails.filter(email =>
        email.subject.toLowerCase().includes(txtLower) ||
        email.body.toLowerCase().includes(txtLower) ||
        email.from.toLowerCase().includes(txtLower)
    );

    return filteredEmails
}

function getFolders() {
    return [
        {
            path: 'inbox',
            icon: 'inbox',
            name: 'Inbox'
        },
        {
            path: 'starred',
            icon: 'star',
            name: 'Starred'
        },
        {
            path: 'sent',
            icon: 'send',
            name: 'Sent'
        },
        {
            path: 'draft',
            icon: 'draft',
            name: 'Drafts'
        },
        {
            path: 'trash',
            icon: 'Delete',
            name: 'Deleted'
        },

    ]
}

window.rs = emailService            // Easy access from console