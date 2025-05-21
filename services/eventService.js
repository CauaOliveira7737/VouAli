const mockEvents = [
  {
    id: '1',
    title: 'Festival de Música',
    description: 'Um festival de música ao ar livre com bandas locais.',
    date: '2025-06-15',
    time: '18:00',
    location: 'Recife',
    image: 'https://files.adventistas.org/institucional/pt/sites/7/2019/10/shutterstock_681809980.jpg',
    rating: 4.5,
    category: 'Música',
  },
  {
    id: '2',
    title: 'Hacker na Web',
    description: 'Uma palestra compelta sobre o pensamento do hacker.',
    date: '2025-06-17',
    time: '19:00',
    location: 'Olinda',
    image: 'https://flowti.com.br/storage/blog/1438292023022463f8cbe5e1c99.png',
    rating: 4,
    category: 'Tecnologia',
  },
  {
    id: '3',
    title: 'Rec n Play',
    description: 'O evento, que movimenta o ecossistema criativo do Bairro do Recife.',
    date: '2025-11-02',
    time: '09:00',
    location: 'Recife',
    image: 'https://images.sympla.com.br/63475fd8ef44c.png',
    rating: 5,
    category: 'Tecnologia, Arte',
  },
  {
    id: '4',
    title: 'Cozinhando com Brito',
    description: 'Celebridade de internet brsileira, vai fazer um evento com o famoso Calma Calabreso.',
    date: '2025-05-21',
    time: '13:30',
    location: 'Caruaru',
    image: 'https://p2.trrsf.com/image/fget/cf/1200/900/middle/images.terra.com/2024/10/08/667026534-davi-brito.jpg',
    rating: 4.5,
    category: 'Tecnologia, Arte',
  },


];

export const getEventsByLocation = async (location) => {
  return mockEvents.filter((event) =>
    event.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const getEventById = async (id) => {
  return mockEvents.find((event) => event.id === id);
};
