import axios from 'axios';
export async function addContact(contact: Contact) {
  const requestOptions: RequestInit = {
    method: 'POST', // You can change this to the appropriate HTTP method
    headers: {
      'Content-Type': 'application/json', // Adjust the content type as needed
    },
    body: JSON.stringify(contact), // Convert the contact object to JSON string
  };

  return fetch('http://localhost:3000/api/contacts', requestOptions).then((res) => res.json());
}

export async function getAllContact() {
  try {
    const getContacts = await axios.get('/api/contacts');
    return getContacts.data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
export async function getContact(id: string) {
  try {
    const getContact = await axios.get(`/api/contacts/?id=${id}`);
    return getContact.data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function deleteContact(id: string) {
  try {
    const deleteContact = await axios.delete('/api/contacts/?id=' + id);
    return deleteContact.data;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}

export async function updateContact(id: string, contact: Contact) {  
  try {
   return axios.put('/api/contacts/?id=' + id, contact);
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
