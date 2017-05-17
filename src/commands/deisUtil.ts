import * as fs from 'fs';
import * as vscode from 'vscode';
import * as deis from 'deis-api';

const AUTH_FILE = '.deis-auth';

export let Deis;

export const getDeisHost = () => {
    const workspaceConfig = vscode.workspace.getConfiguration('deis');
    if (!workspaceConfig.get('deisHost')) {
        throw "No Configuration Found";
    }

    return workspaceConfig.get('deisHost');
}


export const performLogin = async (username, password, endpoint) => {
    return new Promise(async (resolve, reject) => {
        console.log(endpoint);
        Deis = new deis({username:username, password:password, controller:endpoint, version:2});
        await loginDeis(Deis);
        resolve(Deis);
    });
}

const loginDeis = (deis):Promise<string> => {
    return new Promise((resolve, reject) => {
        deis.login((results) => {
            if (results === null) {
                resolve('Logged In');
            }
        });
    });
}

const getAuth = () => {
    // Gets auth from the .deis-auth file, if it exists. otherwise null.
}

const setAuth = (user, token) => {
    // Sets auth token found from logging into deis workflow
}

