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
    // getFolders,
    filterMails,
    updateEmail,
    convertFilterIsRead
}

const STORAGE_KEY = 'emails'
const loggedinUser = { email: 'shay@gmail.com', fullname: 'Shay Nitzan' }

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
            { id: utilService.makeId(), subject: 'Meeting Reminder', body: 'Don’t forget about the meeting scheduled for tomorrow. It’s crucial for our project updates.', isRead: false, isStarred: false, sentAt: 1662134400000, removedAt: null, from: 'team@company.com', to: 'shay@gmail.com' }, // 2022-09-02
            { id: utilService.makeId(), subject: 'Project Update', body: 'The latest project updates have been shared on the drive. Please review them before the next meeting.', isRead: false, isStarred: false, sentAt: 1671235200000, removedAt: null, from: 'updates@company.com', to: 'shay@gmail.com' }, // 2022-12-17
            { id: utilService.makeId(), subject: 'Welcome Aboard!', body: 'We’re excited to have you join our team! Let’s make amazing things happen together.', isRead: false, isStarred: false, sentAt: 1682044800000, removedAt: null, from: 'hr@company.com', to: 'shay@gmail.com' }, // 2023-04-21
            { id: utilService.makeId(), subject: 'Password Reset', body: 'Click the link below to reset your password. If you didn’t request this, please ignore.', isRead: false, isStarred: false, sentAt: 1691030400000, removedAt: null, from: 'security@company.com', to: 'shay@gmail.com' }, // 2023-08-03
            { id: utilService.makeId(), subject: 'Invoice Due', body: 'Your invoice #12345 is due on 11/30/2024. Please make payment to avoid penalties.', isRead: false, isStarred: false, sentAt: 1698883200000, removedAt: null, from: 'billing@services.com', to: 'shay@gmail.com' }, // 2023-11-01
            { id: utilService.makeId(), subject: 'Weekly Newsletter', body: 'Here’s your weekly dose of updates and news. Stay informed and engaged!', isRead: false, isStarred: false, sentAt: 1704489600000, removedAt: null, from: 'newsletter@updates.com', to: 'shay@gmail.com' }, // 2024-01-05
            { id: utilService.makeId(), subject: 'Job Application', body: 'Your application for the Software Engineer position has been received. Good luck!', isRead: false, isStarred: false, sentAt: 1708905600000, removedAt: null, from: 'careers@company.com', to: 'shay@gmail.com' }, // 2024-02-26
            { id: utilService.makeId(), subject: 'Event Invitation', body: 'Join us for our annual tech conference next month. Register now to secure your spot.', isRead: false, isStarred: false, sentAt: 1696204800000, removedAt: null, from: 'events@company.com', to: 'shay@gmail.com' }, // 2023-10-01
            { id: utilService.makeId(), subject: 'Birthday Wishes', body: 'Happy Birthday! Wishing you a wonderful year ahead filled with joy and success.', isRead: false, isStarred: false, sentAt: 1689897600000, removedAt: null, from: 'greetings@company.com', to: 'shay@gmail.com' }, // 2023-07-21
            { id: utilService.makeId(), subject: 'Exclusive Offer', body: 'Enjoy 20% off your next purchase with code SAVE20. Limited time offer!', isRead: false, isStarred: false, sentAt: 1693795200000, removedAt: null, from: 'promotions@shop.com', to: 'shay@gmail.com' }, // 2023-09-04
            { id: utilService.makeId(), subject: 'Meeting Follow-up', body: 'Here’s a summary of the points discussed in today’s meeting. Please review it carefully.', isRead: false, isStarred: false, sentAt: 1677628800000, removedAt: null, from: 'team@company.com', to: 'shay@gmail.com' }, // 2023-02-28
            { id: utilService.makeId(), subject: 'System Alert', body: 'Your system is running low on storage. Please take action immediately to avoid issues.', isRead: false, isStarred: false, sentAt: 1682467200000, removedAt: null, from: 'alerts@company.com', to: 'shay@gmail.com' }, // 2023-04-26
            { id: utilService.makeId(), subject: 'Subscription Renewal', body: 'Your subscription to our service will renew on 12/01/2024. Let us know if you have questions.', isRead: false, isStarred: false, sentAt: 1701120000000, removedAt: null, from: 'billing@services.com', to: 'shay@gmail.com' }, // 2023-11-28
            { id: utilService.makeId(), subject: 'Congratulations!', body: 'You’ve been selected for the next round of interviews. Best of luck!', isRead: false, isStarred: false, sentAt: 1706131200000, removedAt: null, from: 'hr@company.com', to: 'shay@gmail.com' }, // 2024-01-24
            { id: utilService.makeId(), subject: 'Feedback Request', body: 'We’d love to hear your thoughts on our latest feature. Your feedback helps us improve.', isRead: false, isStarred: false, sentAt: 1692422400000, removedAt: null, from: 'support@company.com', to: 'shay@gmail.com' }, // 2023-08-19
            { id: utilService.makeId(), subject: 'Security Alert', body: 'A login attempt was made from an unrecognized device. Please confirm it was you.', isRead: false, isStarred: false, sentAt: 1679952000000, removedAt: null, from: 'security@company.com', to: 'shay@gmail.com' }, // 2023-03-28
            { id: utilService.makeId(), subject: 'Order Confirmation', body: 'Thank you for your purchase. Your order #67890 is confirmed and on its way!', isRead: false, isStarred: false, sentAt: 1694928000000, removedAt: null, from: 'orders@shop.com', to: 'shay@gmail.com' }, // 2023-09-17
            { id: utilService.makeId(), subject: 'Happy Holidays!', body: 'Wishing you and your family a joyous holiday season. Stay warm and festive!', isRead: false, isStarred: false, sentAt: 1701561600000, removedAt: null, from: 'greetings@company.com', to: 'shay@gmail.com' }, // 2023-12-03
            { id: utilService.makeId(), subject: 'Account Verification', body: 'Please verify your account by clicking the link below. If you didn’t sign up, let us know.', isRead: false, isStarred: false, sentAt: 1688947200000, removedAt: null, from: 'no-reply@service.com', to: 'shay@gmail.com' }, // 2023-07-10
            { id: utilService.makeId(), subject: 'Technical Support', body: 'Your support ticket #112233 has been updated. Check out the resolution in your account.', isRead: false, isStarred: false, sentAt: 1682899200000, removedAt: null, from: 'support@company.com', to: 'shay@gmail.com' }, // 2023-05-01
            { id: utilService.makeId(), subject: 'Technical Support', body: 'Your support ticket #112233 has been updated. Check out the resolution in your account.', isRead: false, isStarred: false, sentAt: 1682899200000, removedAt: null, from: 'shay@gmail.com', to: 'support@company.com' }, // 2023-05-01
            { id: utilService.makeId(), subject: 'Technical Support', body: 'Your support ticket #112233 has been updated. Check out the resolution in your account.', isRead: false, isStarred: false, sentAt: 1682899200000, removedAt: null, from: 'shay@gmail.com', to: 'support@company.com' }, // 2023-05-01
        ];
        // console.log('Emails created:', emails);

        utilService.saveToStorage(STORAGE_KEY, emails)
}
}


function isFiltered(email, filterBy) {
    // Inbox: Emails sent **to** 'shay@gmail.com'
    if (filterBy.status === 'inbox') {
        return email.to !== loggedinUser.email || email.removedAt !== null;
    }

    // Sent: Emails sent **from** 'shay@gmail.com'
    if (filterBy.status === 'sent') {
        return email.from !== loggedinUser.email;
    }

    // Starred Emails
    if (filterBy.status === 'star') {
        return !email.isStarred;
    }

    // Trash (Deleted Emails)
    if (filterBy.status === 'trash') {
        return email.removedAt;
    }

    // Trash (Deleted Emails)
    if (filterBy.status === 'draft') {
        return email.removedAt;
    }

    // Default: Show all emails (no specific filtering)
    return false;
}


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

async function filterMails(filterBy) {
    console.log(filterBy.status)
    let emails = await getEmails();

    if (filterBy.status) {
        console.log(filterBy.status)
        emails = _filterMailsByFolder(emails, filterBy.status)
        console.log(emails)

    }
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i');
        emails = emails.filter(
            (mail) => regExp.test(mail.subject) || regExp.test(mail.body) || regExp.test(mail.from)
        );
    }
    if (typeof filterBy.isRead === 'boolean') {
        emails = emails.filter(mail => mail.isRead === filterBy.isRead)
    }
    return emails

}

function _filterMailsByFolder(mails, status) {

    switch (status.status) {
        case 'inbox':
            mails = mails.filter(mail => (mail.to === loggedinUser.email) && !mail.removedAt)
            console.log("shay")
            break
        case 'sent':
            mails = mails.filter(mail => (mail.from === loggedinUser.email) && !mail.removedAt)
            console.log("shay")
            break
        case 'starred':
            mails = mails.filter(mail => mail.isStarred && !mail.removedAt)
            break
        case 'trash':
            mails = mails.filter(mail => mail.removedAt)
            break
        case 'draft':
            mails = mails.filter(mail => !mail.sentAt && !mail.removedAt)
            break
    }

    return mails
}

async function updateEmail(emailId, updatedFields) {
    const email = await getById(emailId)
    if (!email) throw new Error("Email not found")

    Object.assign(email, updatedFields)
    return save(email)
}

function convertFilterIsRead(isRead) {
    if (isRead === null) return 'all'
    return isRead ? 'read' : 'unread'
}

window.rs = emailService            // Easy access from console