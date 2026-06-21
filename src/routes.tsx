import { Route, Switch } from "wouter";
import Home from '@/pages/Home';
import MovieDetails from '@/pages/MovieDetails';
import Favorites from '@/pages/Favorites';

export default function Router() {

  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/filme/:id"} component={MovieDetails} />
      <Route path={"/favoritos"} component={Favorites} />
    </Switch>
  );
  
}