import * as vscode from 'vscode';
import * as rp from 'request-promise';
import { Deis, getDeisHost } from './deisUtil';
import { config } from './app';

export const logs = async () => {
    let appName;

    if (config.appName) {
        appName = config.appName;
    } else {
        appName = await vscode.window.showInputBox('Please enter an application name');
    }

    const appLogs = await getLogs(Deis, appName);
    const outputChannel = vscode.window.createOutputChannel('Deis');

    outputChannel.append(appLogs);
    outputChannel.show();
}

const getLogs = async (Deis, appName) => {
    const options = {
        uri: `http://${getDeisHost()}/v2/apps/${appName}/logs`,
        headers: {
            'Authorization': `token ${Deis.auth.authToken()}`,
            'Accept': 'application/json'
        }
    }

    return rp(options);
}