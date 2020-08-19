import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import FileSharing from './FileSharing.js';
import Pastebin from './Pastebin.js';

export default function Menu() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/file_sharing">
            <FileSharing />
          </Route>
          <Route path="/pastebin">
            <Pastebin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  let history = useHistory();
  return (
    <div>
      <h1>skycrypt</h1>
      <p>Encrypted pastebin and file sharing for Skynet.</p>
      <div class="row">
        <div class="col">
          <button onClick={() => history.push('/file_sharing')}>File sharing</button>
          <p>Encrypted file sharing with AES-256.</p>
        </div>
        <div class="col">
          <button onClick={() => history.push('/pastebin')}>Pastebin</button>
          <p>Same encryption with file sharing, however this one is a pastebin.</p>
        </div>
      </div>
    </div>
  );
}