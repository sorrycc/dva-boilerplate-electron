import React from 'react';
import dva from 'dva';

const app = dva();

function App() {
  return <div>App</div>;
}

app.router(() => <App />);
app.start('#root');
