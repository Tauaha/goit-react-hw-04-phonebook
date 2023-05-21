import {  useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import styles from 'components/ContactsForm/ContactsForm.module.css'


function ContactsForm ({onSubmit}) {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [number, setNumber] =useState('');
   
 
 const handleInputNameChange=(e)=>{
    const { name, value } = e.target;
    switch(name){
      case 'name':
        setName(value)
        break;
        case 'number':
          setNumber(value)
          break; 
        default: return
         }
  };
  const handleOnSubmit=(e)=>{
    e.preventDefault();
    const options = {contacts, name, number} 
    onSubmit(options);
    cleanInput();
  }

  const cleanInput=()=> {
    return(
     setName(''),
     setNumber('')
    )
     
    
  }
     return(
      <form onSubmit={handleOnSubmit} className={styles.form}>
      <label>Name</label>
      <input
     type="text"
     name="name"
     pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
     title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
     required
     value={name}
     onChange={handleInputNameChange}
     className={styles.input}
   />
    <label>Number</label>
   <input
 type="tel"
 name="number"
 pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
 title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
 required
 value={number}
     onChange={handleInputNameChange}
/>
   <button type='submit' className={styles.button}>Add contacts</button>
      </form>
  )
       }

ContactsForm.propTypes ={
   onSubmit: PropTypes.func.isRequired

}        

export default ContactsForm





