import React from 'react';
import dva from 'dva';

const app = dva();

function App() {
  return <div>App</div>;
}

app.router(_ => <App />);
app.start('#root');
