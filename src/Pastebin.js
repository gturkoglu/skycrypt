import React, {useState} from "react";
import { Link } from "react-router-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useAlert } from 'react-alert'

function App() {
    const [paste, setPaste] = useState('');
    const [password, setPassword] = useState('');
    const alert = useAlert()
    function uploadPaste() {
        var CryptoJS = require("crypto-js");
        var ciphertext = CryptoJS.AES.encrypt(paste, password).toString();
        uploadSkynet(ciphertext);
    }
    function onChange(newValue) {
        setPaste(newValue)
    }
    function uploadSkynet(ciphertext) {
        const blob = new Blob([
        `<html>
        <head>
            <title>Skycrypt</title>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400" rel="stylesheet">
            <link rel="stylesheet" href="https://classless.de/classless.css">
            <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js" integrity="sha512-nOQuvD9nKirvxDdvQ9OMqe2dgapbPB7vYAMrzJihw5m+aNcf0dX53m6YxM4LgA9u8e9eg9QX+/+mPu8kCNpV2A==" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/sweetalert2@9"></script>
        </head>
        <body>
            <h1><a href="#" onClick="window.location.reload();">skycrypt</a></h1>
            <p id="info">Please enter the password to decrypt the paste.</p>

            <div id="passwordForm">
                <fieldset>
                    <legend>Decrypt paste</legend>
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password"/>
                    <p>
                        <button onclick="decryptPaste()" href="#">Decrypt paste</button>
                    </p>
                </fieldset>
            </div>

            <div id="paste">
                <pre id="pasteContent">
                </pre>
            </div>

            <script>
                function decryptPaste() {
                    var ciphertext = "${ciphertext}";
                    var bytes  = CryptoJS.AES.decrypt(ciphertext, document.getElementById("password").value);
                    var originalText = bytes.toString(CryptoJS.enc.Utf8);
                    if (originalText) {
                        document.getElementById("passwordForm").parentNode.removeChild(document.getElementById("passwordForm"));
                        document.getElementById("info").parentNode.removeChild(document.getElementById("info"));
                        document.getElementById("pasteContent").innerHTML = originalText;
                    } else {
                        Swal.fire('False password, please try again.')
                    }
                }
            </script>
        </body>
        </html>`
        ], {type: 'text/html'});
        var formData = new FormData();
        formData.append('file', blob);
        var paste_uuid = uuidv4();
        axios.post(
            `https://siasky.net/skynet/skyfile/${paste_uuid}?filename=paste.html`, 
            formData
        ).then(response => {
            alert.show(
                'Your Skylink is: ' + response.data.skylink + 'accessible on ' + 'https://siasky.net/' + response.data.skylink);
        });
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
