import * as vscode from 'vscode';
import * as rp from 'request-promise';
import {Deis, promisifyDeis } from './deisUtil';
import {config} from './app';
import {getDeisHost} from './deisUtil';

export const scale = async () => {
    let appName, numContainers;
    if (config.appName) {
        appName = config.appName;
    } else {
        appName = await vscode.window.showInputBox({
            prompt: 'Please enter an application name',
        });
    }

    numContainers = await vscode.window.showInputBox({
        'prompt': 'How many web processes do you need?'
    });

    await promisifyScale(appName, numContainers);
    await listContainers();
}

export const listContainers = async () => {
    let appName, numContainers;
    if (config.appName) {
        appName = config.appName;
    } else {
        appName = await vscode.window.showInputBox({
            prompt: 'Please enter an application name',
        });
    }

    const containerInfo = await getContainers(Deis, appName);
    const output = vscode.window.createOutputChannel("Deis");
    output.append(containerInfo as string);
    output.show();
}

const promisifyScale = async (appName, processes) => {
    return new Promise((resolve, reject) => {
        Deis.scale(appName, {'web': processes}, function (error, results) {
            resolve(results);
        });
    });
}

const getContainers = async (Deis, appName) => {
    const options = {
        uri: `http://${getDeisHost()}/v2/apps/${appName}/containers`,
        headers: {
            'Authorization': `token ${Deis.auth.authToken()}`,
            'Accept': 'application/json'
        }
    }

    return rp(options);
}