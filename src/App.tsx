import './App.css'
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Router from './routes'

function App() {

  return (
    <FavoritesProvider>
      <Router />
    </FavoritesProvider>
  )
}

export default App
