import * as vscode from 'vscode';

import { getDeisHost, getDeisUsername, getDeisPassword, performLogin } from './deisUtil';

import { readConfig } from './app'

export const instantiate = async () => {
    let deisHost, username, password;

    try {
        deisHost = getDeisHost();
        username = getDeisUsername();
        password = getDeisPassword();
    } catch (e) {
        vscode.window.showErrorMessage('Please complete your Deis Configuration!');
        return;
    }

    let Deis:any = await performLogin(username, password, deisHost);
    console.log(Deis.whoami().message);
    readConfig();
}