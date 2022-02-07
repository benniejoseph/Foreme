const URL = '/api/contacts';
let contacts = [];

export const getContacts = () => 
    fetch(URL).then((response) => {
        if(!response.ok) {
            console.log('Contact details fetch Error!!!');
            throw new Error('No response from server');
        }
        return response.json();
    })
    .then((result) => {
        contacts = result.data;
        return contacts;
    });

export const getSession = (sessionId) => {
    return contacts.find((session) => {
        return session.id === sessionId;
    });
};