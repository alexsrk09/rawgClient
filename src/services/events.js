// Eventos de ejemplo
export const events = [
  {
    id: 1,
    title: "Gaming Expo 2025",
    location: "New York",
    image: "/events/gaming_expo.jpg",
    description: "The biggest gaming expo of the year with all the latest releases and announcements.",
    date: "2025-06-15",
  },
  {
    id: 2,
    title: "Indie Game Developers Meetup",
    location: "San Francisco",
    image: "/events/indie_meetup.jpg",
    description: "Connect with indie game developers and share your experiences and projects.",
    date: "2025-07-22",
  },
  {
    id: 3,
    title: "Esports Championship",
    location: "Los Angeles",
    image: "/events/esports.jpg",
    description: "Watch the best players compete in the world's biggest esports tournament.",
    date: "2025-08-10",
  },
  {
    id: 4,
    title: "Game Design Workshop",
    location: "Chicago",
    image: "/events/game_design.jpg",
    description: "Learn game design principles from industry experts in this hands-on workshop.",
    date: "2025-09-05",
  },
  {
    id: 5,
    title: "Retro Gaming Convention",
    location: "Seattle",
    image: "/events/retro_gaming.jpg",
    description: "Celebrate classic games and consoles with fellow retro gaming enthusiasts.",
    date: "2025-10-18",
  },
]

// Simula una petición API que devuelve los eventos después de un pequeño retraso.
export const fetchEvents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(events)
    }, 500) // Simula un retraso de 500 milisegundos
  })
}

// Simula una petición API que devuelve un evento específico
export const fetchEventById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = events.find((event) => event.id === Number.parseInt(id))
      if (event) {
        resolve(event)
      } else {
        reject(new Error("Event not found"))
      }
    }, 300)
  })
}

