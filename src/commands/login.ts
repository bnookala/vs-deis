import * as deis from 'deis-api-client';
import * as vscode from 'vscode';

import { getDeisHost, performLogin } from './deisUtil';

export const login = async () => {
    let deisHost, username, password;
    console.log('logging you in!');

    try {
        deisHost = getDeisHost();
    } catch (e) {
        vscode.window.showErrorMessage('Please add your Deis Host to your VSCode configuration');
        return;
    }

    username = await vscode.window.showInputBox({
        prompt: 'Please enter your Deis Username',
        placeHolder: 'Deis Username…'
    });

    password = await vscode.window.showInputBox({
        prompt: 'Please enter your Deis Password',
        password: true,
        placeHolder: 'Deis Password…'
    });

    let Deis:any = await performLogin(username, password, deisHost);
    vscode.window.showInformationMessage(Deis.whoami().message);
}