import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from '../components/App.module.css'


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

  onHandleClick = ({ name, number }) => {
    let contact = {
      name,
      number,
      id: nanoid(),
    };
    
   if(this.state.contacts.find(item => item.name === contact.name)) {
    alert(`${contact.name} is already in contacts`)
    return
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


  deleteContact = (id) => {
   this.setState(prevState => ({
    contacts: prevState.contacts.filter(contact => contact.id !== id),
  }));
  }


  render() {
    const {  filter } = this.state;
    const getContacts = this.getContacts();
    return (
      <>
      
      <div className={css.container}>
      <h2 className={css.title}>Phonebook</h2>
        <ContactForm onHandleClick={this.onHandleClick} />
        <h2 className={css.title}>Contacts</h2>
        <Filter filter={filter} onChange={this.setFilter} />
        <ContactList contacts={getContacts} deleteContact={this.deleteContact}/>
        </div>
      </>
    );
  }
}
