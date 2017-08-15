import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Root = () => (
	<MuiThemeProvider>
		<App />
	</MuiThemeProvider>
);

injectTapEventPlugin();
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
