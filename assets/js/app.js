import React from "react";
import ReactDom from 'react-dom/client'
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.css';
import 'animate.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDom.createRoot(document.getElementById('root')).render(<App/>);

serviceWorkerRegistration.register()
