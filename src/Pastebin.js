import React from 'react';
import { Link } from "react-router-dom";

export default function FileSharing() {
return (
    <div>
    <h1><Link to="/">skycrypt</Link></h1>
    <h3>Pastebin</h3>
    <ul>
        <li>Keep your password, it is required to decrypt the files.</li>
    </ul>
    <form>
        <fieldset>
        <legend>Pastebin</legend>
        <div class="row">
            <div class="col">
            <textarea />
            </div>
            <div class="col">
            <label>Password </label>
            <input type="password" placeholder="Password"/>
            <br/><small>Password will be used to encrypt the file(s).</small>
            </div>
        </div>
        <p>
            <button>Upload paste</button>
        </p>
        </fieldset>
        </form>
    </div>
);
}