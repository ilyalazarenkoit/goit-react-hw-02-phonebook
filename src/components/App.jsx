import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from '../components/App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  onHandleClick = ({ name, number }) => {
    let contact = {
      name,
      number,
      id: nanoid(),
    };

    if (this.state.contacts.find(item => item.name === contact.name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  setFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getContacts = () => {
    const { filter, contacts } = this.state;
    const lowerCaseFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const contactsUnparsed = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contactsUnparsed);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const getContacts = this.getContacts();
    return (
      <>
        <div className={css.container}>
          <h2 className={css.title}>Phonebook</h2>
          <ContactForm onHandleClick={this.onHandleClick} />

          <h2 className={css.title}>Contacts:</h2>
          {this.state.contacts.length > 0 ? (
            <Filter filter={filter} onChange={this.setFilter} />
          ) : null}
          {this.state.contacts.length === 0 ? (
            <h2 className={css.title}>You have no contacts yet</h2>
          ) : (
            <ContactList
              contacts={getContacts}
              deleteContact={this.deleteContact}
            />
          )}
        </div>
      </>
    );
  }
}
