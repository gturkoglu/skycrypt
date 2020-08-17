import React from 'react';
import { Link } from "react-router-dom";

export default function FileSharing() {
return (
    <div>
    <h1><Link to="/">skycrypt</Link></h1>
    <h3>File sharing</h3>
    <ul>
        <li>You can share multiple files.</li>
        <li>Keep your password, it is required to decrypt the files.</li>
    </ul>
    <form>
        <fieldset>
        <legend>File upload</legend>
        <div class="row">
            <div class="col">
            <label>Files </label>
            <input type="file" multiple/>
            </div>
            <div class="col">
            <label>Password </label>
            <input type="password" placeholder="Password"/>
            <br/><small>Password will be used to encrypt the file(s).</small>
            </div>
        </div>
        <p>
            <button>Upload files</button>
        </p>
        </fieldset>
        </form>
    </div>
);
}