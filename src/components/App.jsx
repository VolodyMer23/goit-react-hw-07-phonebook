import { useDispatch, useSelector } from 'react-redux';
import { Container, PhonebookContainer, PhonebookTitle } from './App.styled';
import Contacts from './Phonebook/ContactsList/ContactList';
import { fetchContacts, deleteContact, addContact } from 'Redux/operations';
import { getContacts, setFilterValue, getFilter } from 'Redux/phonebookSlice';
import ContactAddForm from './Phonebook/ContactAddForm/ContactAddForm';
import Filter from './Phonebook/Filter/Filter';
import { useEffect } from 'react';

export default function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  console.log('contacts :>> ', contacts);
  
  const nameCheker = name => {
    return contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  const onFormSubmit = (name, number) => {
    if (nameCheker(name)) {
      return alert(`${name} is already in contacts.`);
    }
    dispatch(addContact({ name, number }));
    dispatch(fetchContacts());
  };

  const onDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const onFilterChange = e => {
    dispatch(setFilterValue(e.target.value));
  };

  const onFilterContact = () => {
    const normalizedFilter = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return filteredContacts;
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <PhonebookContainer>
        <PhonebookTitle>Phonebook</PhonebookTitle>
        <ContactAddForm onSubmit={onFormSubmit}></ContactAddForm>
      </PhonebookContainer>
      <Filter value={filter} onChange={onFilterChange}></Filter>
      <Contacts
        title="Contacts"
        contacts={onFilterContact()}
        onDelete={onDeleteContact}
      ></Contacts>
    </Container>
  );
}
