import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from './phonebookOperations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

export const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState,
  reducers: {
    setFilterValue: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchContacts.pending]: state => {
      state.contacts.isLoading = true;
    },
    [fetchContacts.fulfilled]: state => {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = action.payload;
    },
    [fetchContacts.rejected]: state => {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
    [addContact.pending]: state => {
      state.contacts.isLoading = true;
    },
    [addContact.fulfilled]: state => {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = [...state.contacts.items, action.payload];
    },
    [addContact.rejected]: state => {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
    [deleteContact.pending]: state => {
      state.contacts.isLoading = true;
    },
    [deleteContact.fulfilled]: state => {
      state.contacts.isLoading = false;
      state.contacts.error = null;
      state.contacts.items = state.contacts.items.filter(
        item => item.id !== action.payload.id
      );
    },
    [deleteContact.rejected]: state => {
      state.contacts.isLoading = false;
      state.contacts.error = action.payload;
    },
  },
});

export const getFilter = state => state.phonebook.filter;
export const getContacts = state => state.phonebook.contacts.items;
export const getErrror = state => state.phonebook.contacts.error;
export const getLoading = state => state.phonebook.contacts.isLoading;
