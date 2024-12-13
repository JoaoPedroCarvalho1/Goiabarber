import { createStore } from 'redux';

// Estado inicial
const initialState = {
  contacts: [{    
    id: 1,
    name: 'Admin',
    phone: '',
    email: 'admin@gmail.com',
    password: '12345',
    service: []
  },
  {    
    id: 2,
    name: 'Teste da Silva',
    phone: '(11)96129-0607',
    email: 'teste@gmail.com',
    password: '123',
    service: []
  }],
  services: [
    {id:1,
    name:'Corte de cabelo',
    value:35},
    {id:2,
    name:'Barba',
    value:25},
    {id:3,
    name:'Sobrancelha',
    value:10}
  ], 
  barbers: [
  { id:1,
    name:'Caio Roberto',
    description:'Sou barbeiro com 5 anos de experiência, especializado em cortes personalizados e cuidados masculinos. Com um foco em qualidade e atendimento personalizado, busco sempre atender às preferências de cada cliente. Minha expertise inclui cortes de cabelo, modelagem de barba e cuidados com o couro cabeludo. Estou constantemente em busca de novas técnicas e tendências para oferecer os melhores resultados. Se você deseja um visual único e de confiança, estou à disposição para transformar o seu estilo.',
    require:''
},
    { id:2,
    name:'Gabriel Assis ',
    description:'Barbeiro com 3 anos de experiência, especializado em cortes masculinos, modelagem de barba e cuidados com o cabelo. Ofereço um atendimento personalizado, sempre atento às preferências dos clientes e às tendências atuais. Meu foco é entregar resultados de alta qualidade, garantindo uma experiência única e satisfatória. Comprometido com o aperfeiçoamento contínuo, participo de workshops e treinamentos para aprimorar minhas técnicas. Estou aqui para ajudar a transformar seu visual e trazer confiança ao seu estilo.',
  },
  { id:3,
    name:'Guilherme',
    description:'Sou um profissional apaixonado pela arte da barbearia, com experiência em cortes modernos, tradicionais e cuidados com a barba. Minha missão é transformar cada atendimento em uma experiência única, valorizando o estilo e a personalidade de cada cliente. Acredito que um bom corte pode elevar a confiança e a autoestima.',
  },{ id:4,
    name:'João pedro Carvalho',
    description:'Barbeiro dedicado, especialista em técnicas de cortes personalizados e design de barbas. Trabalho para unir tradição e inovação, criando estilos que refletem autenticidade. Meu foco está em oferecer excelência no atendimento e detalhes que fazem a diferença.',
  },{ id:5,
    name:'João Pedro Serignolli',
    description:'Profissional de barbearia com anos de prática em cortes clássicos e tendências contemporâneas. Minha prioridade é escutar o cliente e entregar resultados que superem expectativas. Dedicação, técnica e paixão são os pilares do meu trabalho diário.',
  },{ id:6,
    name:'Matheus',
    description:'Barbeiro especializado em criar estilos únicos, focado em realçar a identidade de cada cliente. Com experiência em técnicas avançadas, busco oferecer um atendimento impecável e serviços que combinam tradição, criatividade e qualidade.',
  }]
};

// Tipos de ação
const ADD_CONTACT = 'ADD_CONTACT';
const REMOVE_CONTACT = 'REMOVE_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const ADD_SERVICE = 'ADD_SERVICE';
const REMOVE_SERVICE = 'REMOVE_SERVICE';
const UPDATE_SERVICE = 'UPDATE_SERVICE';
const ADD_BARBER = 'ADD_BARBER';
const REMOVE_BARBER = 'REMOVE_BARBER';
const UPDATE_BARBER = 'UPDATE_BARBER';

// Função reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Ações para contatos
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case REMOVE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id
            ? { ...contact, ...action.payload.data }
            : contact
        ),
      };

    // Ações para serviços
    case ADD_SERVICE:
      return {
        ...state,
        services: [...state.services, action.payload],
      };
    case REMOVE_SERVICE:
      return {
        ...state,
        services: state.services.filter(service => service.id !== action.payload),
      };
    case UPDATE_SERVICE:
      return {
        ...state,
        services: state.services.map(service =>
          service.id === action.payload.id
            ? { ...service, ...action.payload.data }
            : service
        ),
      };

    // Ações para barbeiros
    case ADD_BARBER:
      return {
        ...state,
        barbers: [...state.barbers, action.payload],
      };
    case REMOVE_BARBER:
      return {
        ...state,
        barbers: state.barbers.filter(barber => barber.id !== action.payload),
      };
    case UPDATE_BARBER:
      return {
        ...state,
        barbers: state.barbers.map(barber =>
          barber.id === action.payload.id
            ? { ...barber, ...action.payload.data }
            : barber
        ),
      };

    default:
      return state;
  }
};

// Criar o store
const store = createStore(reducer);

export default store;


export { 
  ADD_CONTACT, REMOVE_CONTACT, UPDATE_CONTACT,
  ADD_SERVICE, REMOVE_SERVICE, UPDATE_SERVICE,
  ADD_BARBER, REMOVE_BARBER, UPDATE_BARBER
};
