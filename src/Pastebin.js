import React, {useState} from "react";
import { Link } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";


function App() {    
    const [paste, setPaste] = useState('');
    const [password, setPassword] = useState('');
    function uploadPaste() {
        var CryptoJS = require("crypto-js");
        var ciphertext = CryptoJS.AES.encrypt(paste, password).toString();
        console.log(ciphertext);
    }
    function onChange(newValue) {
        setPaste(newValue)
        }
    return (
    <div>
        <h1>
        <Link to="/">skycrypt</Link>
        </h1>
        <h3>Pastebin</h3>
        <ul>
        <li>Keep your password, it is required to decrypt the paste.</li>
        </ul>
        <form>
        <fieldset>
            <legend>Pastebin</legend>
            <AceEditor
                    theme="github"
                    onChange={onChange}
                    name="Ace"
                    editorProps={{ $blockScrolling: true }}
                    setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: false,
                    enableSnippets: true
                    }}
                />
            <div class="row">
            <div class="col">
                <label>Password </label>
                <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                <br />
                <small>Password will be used to encrypt the paste.</small>
            </div>
            <div class="col">
                <button onClick={uploadPaste} href="#">Upload paste</button>
            </div>
            </div>
        </fieldset>
        </form>
    </div>
    );
}

export default App;
