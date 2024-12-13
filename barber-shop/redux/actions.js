// Ações para contatos
export const ADD_CONTACT = 'ADD_CONTACT';
export const REMOVE_CONTACT = 'REMOVE_CONTACT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';

export const addContact = (contact) => ({
  type: ADD_CONTACT,
  payload: contact,
});

export const removeContact = (id) => ({
  type: REMOVE_CONTACT,
  payload: id,
});

export const updateContact = (id, data) => ({
  type: UPDATE_CONTACT,
  payload: { id, data },
});

// Ações para serviços
export const ADD_SERVICE = 'ADD_SERVICE';
export const REMOVE_SERVICE = 'REMOVE_SERVICE';
export const UPDATE_SERVICE = 'UPDATE_SERVICE';

export const addService = (service) => ({
  type: ADD_SERVICE,
  payload: service,
});

export const removeService = (id) => ({
  type: REMOVE_SERVICE,
  payload: id,
});

export const updateService = (id, data) => ({
  type: UPDATE_SERVICE,
  payload: { id, data },
});

// Ações para barbeiros
export const ADD_BARBER = 'ADD_BARBER';
export const REMOVE_BARBER = 'REMOVE_BARBER';
export const UPDATE_BARBER = 'UPDATE_BARBER';

export const addBarber = (barber) => ({
  type: ADD_BARBER,
  payload: barber,
});

export const removeBarber = (id) => ({
  type: REMOVE_BARBER,
  payload: id,
});

export const updateBarber = (id, data) => ({
  type: UPDATE_BARBER,
  payload: { id, data },
});
