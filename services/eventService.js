const mockEvents = [
    {
      id: '1',
      title: 'Festival de Música Verde',
      description: 'Um festival de música ao ar livre com bandas locais.',
      date: '2025-06-15',
      time: '18:00',
      location: 'Recife',
      image: 'https://fly.metroimg.com/upload/q_85,w_700/https://uploads.metroimg.com/wp-content/uploads/2022/07/22153152/Caneta-azul-1.jpg',
      rating: 4.5,
      category: 'Música',
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
  