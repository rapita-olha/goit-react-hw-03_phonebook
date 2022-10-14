import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Title from './components/Title';
import ContactForm from './components/ContactForm';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

import './App.scss';

class App extends Component {
  
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({ contacts: contacts });
    }

  }

  addContact = ({ name, number }) => {

    const { contacts } = this.state;
    const contact = {
      id: uuidv4(),
      name,
      number,
    };

    contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? alert(`${name} is already in contacts.`)
      :
        this.setState(prevState => ({
          contacts: [...prevState.contacts, contact],
        }));
  };

  handleDeleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  handleChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  visibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { filter } = this.state;
    const {
      addContact,
      handleChangeFilter,
      handleDeleteContact,
      visibleContacts,
    } = this;
    
    return (
      <div className="container">
        <h1 className="visually_hidden">Phonebook</h1>

        <Title title="Phonebook" />
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleChangeFilter} />
        <ContactList
          visibleContacts={visibleContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('Оновлено рядок contacts, записую contacts у сховище');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
}

export default App;
