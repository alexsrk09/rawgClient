const API_KEY = "e3f8413cbefe44c9be2f0f1de8ee1497"
const BASE_URL = "https://api.rawg.io/api"

// muestra los 20 juegos más populares, para los slider y presentaciones
export const fetchPopularGames = async (num) => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&ordering=-metacritic&page_size=${num}`)
  const data = await response.json()
  return data.results
}
// buscar por nombre
export const searchGames = async (searchTerm) => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${searchTerm}&page_size=20`)
  const data = await response.json()
  return data.results
}
// detalles de un juego (por id)
export const fetchGameDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`)
  const data = await response.json()
  return data
}

