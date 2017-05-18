import * as fs from 'fs';
import * as vscode from 'vscode';
import * as deis from 'deis-api';

export let Deis;

export const getDeisHost = ():string => {
    const workspaceConfig = vscode.workspace.getConfiguration('deis');
    if (!workspaceConfig.get('deisHost')) {
        throw "No Deis Host!";
    }

    return workspaceConfig.get('deisHost') as string;
}

export const getDeisPassword = ():string => {
    const workspaceConfig = vscode.workspace.getConfiguration('deis');

    if (!workspaceConfig.get('deisPassword')) {
        throw "No Deis Password!";
    }

    return workspaceConfig.get('deisPassword') as string;
}

export const getDeisUsername = ():string => {
    const workspaceConfig = vscode.workspace.getConfiguration('deis');

    if (!workspaceConfig.get('deisUsername')) {
        throw "No Deis Username";
    }

    return workspaceConfig.get('deisUsername') as string;
}

export const performLogin = async (username, password, endpoint) => {
    return new Promise(async (resolve, reject) => {
        Deis = new deis({username:username, password:password, controller:endpoint, version:2});
        await loginDeis(Deis);
        resolve(Deis);
    });
}

export const promisifyDeis = async (deisFunction, appName) => {
    return new Promise(async (resolve, reject) => {
        deisFunction(appName, (error, body) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(body);
        })
    });
}

const loginDeis = (deis):Promise<string> => {
    return new Promise((resolve, reject) => {
        deis.login((error, body) => {
            if (error === null) {
                resolve(body);
            }
        });
    });
}
