import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import ContactForm from 'components/ContactForm/ContactForm';



export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const phoneContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(phoneContacts);
    
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts) {
      console.log('update information');
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  

  formSubmitHandler = data => {
    const { name, number } = data;
    const { contacts } = this.state;
    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts`)
      : contacts.push({ id: nanoid(), name: name, number: number });
    this.setState({ contacts: contacts });
  };

  handleChange = evt => {
    this.setState({ filter: evt.target.value });
  };

  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const { handleChange, handleDelete, formSubmitHandler } = this;
    const contactsFiltered = [];
    contacts.forEach(contact => {
      contact.name.toLowerCase().includes(filter.toLowerCase()) &&
        contactsFiltered.push(contact);
    });

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm formSubmitHandler={formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={handleChange} />
        {contactsFiltered && (
          <ContactList
            contacts={contactsFiltered}
            handleDelete={handleDelete}
          />
        )}
      </div>
    );
  }
}
