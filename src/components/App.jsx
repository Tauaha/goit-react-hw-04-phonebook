import { useEffect, useState } from 'react';
import React from 'react';
import { nanoid } from 'nanoid'

import ContactsForm from './ContactsForm/ContactsForm';
import ContactList from './ContactList/ContactList';
import ContactFilter from './Filter/Filter';



export default function App () {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


   function formSubmitHandler(data) {
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number
    };
    const chekContact = contacts.some(({name}) => name === data.name)
    if (chekContact) {
      return (
        alert(`${data.name} is already in contacts.`)
      );
    }
    setContacts(prevContacts => [newContact, ...prevContacts]);
  }
  
 
  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

 const filterContacts=()=>{
   const normalizedFilter = filter.toLowerCase();
   return contacts.filter(contact =>
         contact.name.toLowerCase().includes(normalizedFilter)
     ) }

 const onDelete=(id)=>{
  setContacts(prevState => 
      prevState.filter(contacts => contacts.id !== id)
    ); 

 }
  
 
   const visibleContact = filterContacts();

    
    return (<div style={{margin:"20px"}}>
       <h1>Phonebook</h1>
  <ContactsForm onSubmit={formSubmitHandler}/>
       <h2>Contacts</h2>
  <ContactFilter value={filter}  onChange={changeFilter}/>
 {  visibleContact.length > 0 && ( <ContactList 
  visibleContact={visibleContact} 
   onDelete={onDelete} 
  />)}
    </div>
    
   )}








