import React, {useEffect} from "react";
import { Route, Switch } from 'react-router-dom';
import AOS from 'aos';

import RecordsLogic from "./Pages/RecordsLogic";
import Error from "./Error";
import './Components/App.css';

const App = () => {

  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      offset: 20,
      delay: 0,
      duration: 600,
      easing: 'ease-in',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  })

  return (
    <main>
        <Switch>
            <Route path="/" render={renderprops =>
              <RecordsLogic {...renderprops} />} />
            <Route render={renderprops =>
              <Error {...renderprops} />} />
        </Switch>
    </main>
    );
};
export default App;