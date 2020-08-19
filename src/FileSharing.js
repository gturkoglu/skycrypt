import React, {useCallback, useState} from 'react';
import { Link } from "react-router-dom";
import { useDropzone } from 'react-dropzone';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useAlert } from 'react-alert'

export default function FileSharing(props) {
    const [password, setPassword] = useState('');
    const alert = useAlert()
    function uploadTest() {
        const reader = new FileReader()
        reader.onabort = () => alert('Operation cancelled')
        reader.onerror = () => alert('File reading has failed')
        reader.onload = () => {
            const binaryStr = reader.result.toString()
            var CryptoJS = require("crypto-js");
            var ciphertext = CryptoJS.AES.encrypt(binaryStr, password).toString();
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
        
                    <div id="file" style="display: none;">
                        <p>Please use the button below to download the file.</p>
                        <a download id="fileDownload" href="#"><button>Download file</button></a>
                    </div>

                    <script>
                        function decryptPaste() {
                            var ciphertext = "${ciphertext}";
                            var bytes  = CryptoJS.AES.decrypt(ciphertext, document.getElementById("password").value);
                            var originalText = bytes.toString(CryptoJS.enc.Utf8);
                            if (originalText) {
                                document.getElementById("passwordForm").parentNode.removeChild(document.getElementById("passwordForm"));
                                document.getElementById("info").parentNode.removeChild(document.getElementById("info"));
                                document.getElementById("file").style.display = "block";
                                document.getElementById("fileDownload").href = originalText;
                                
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
                    `https://siasky.net/skynet/skyfile/${paste_uuid}?filename=file.html`, 
                    formData
                ).then(response => {
                    alert.show(
                        'Your Skylink is: ' + response.data.skylink + ' accessible on ' + 'https://siasky.net/' + response.data.skylink);
                });
        }
        reader.readAsDataURL(acceptedFiles[0])
    }
    function logFiles() {
        uploadTest();
    }
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
    const files = acceptedFiles.map(file => (
        <li key={file.path}>
        {file.path} - {file.size} bytes
        </li>
    ));
return (
    <div>
    <h1><Link to="/">skycrypt</Link></h1>
    <h3>File sharing</h3>
    <ul>
        <li>Only one file is supported at this time.</li>
        <li>All file types are supported.</li>
        <li>Keep your password, it is required to decrypt the files.</li>
    </ul>
        <fieldset>
        <legend>File upload</legend>
            <div class="row">
            <div {...getRootProps({className: 'dropzone'})} class="col">
                <input {...getInputProps()} multiple/>
                <p>Please click here to select files</p>
            </div>
            <div class="col">
                <h4>Files</h4>
                <ul>{files}</ul>
            </div>
            </div>
            <div class="row">
            <div class="col">
            <label>Password </label>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
            <br />
            <small>Password will be used to encrypt the paste.</small>
            </div>
             <div class="col">
            <button onClick={logFiles} href="#">Upload file</button>
        </div>
        </div>
    </fieldset>
    </div>
);
}