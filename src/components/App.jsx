import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { Container, PhonebookContainer, PhonebookTitle } from './App.styled';
import Contacts from './Phonebook/ContactsList/ContactList';
import {
  addContact,
  getContacts,
  setFilterValue,
  removeContactById,
  getFilter,
} from 'Redux/phonebookSlice';
import ContactAddForm from './Phonebook/ContactAddForm/ContactAddForm';
import Filter from './Phonebook/Filter/Filter';

export default function App() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();


  const nameCheker = name => {
    return contacts.find(contact => contact.name === name);
  };

  const onFormSubmit = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (nameCheker(name)) {
      return alert(`${name} is already in contacts.`);
    }
    dispatch(addContact(newContact));
  };

  const onDeleteContact = contactId => {
    dispatch(removeContactById(contactId));
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
