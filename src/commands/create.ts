import * as vscode from 'vscode';
import {Deis, promisifyDeis} from './deisUtil';
import {readConfig, setConfig} from './app';

export const create = async () => {
    let configuration = readConfig();

    if (configuration.appName) {
        vscode.window.showErrorMessage(`I'm sorry, Dave. I can't do that. You already have an existing application: ${configuration.appName}`);
        return;
    }

    let name = await vscode.window.showInputBox({
        prompt: 'Please enter an application name or leave blank to generate one…',
        placeHolder: 'meddling-parrot'
    });

    let data = promisifyDeis(Deis.apps.create, name);
    vscode.window.showInformationMessage(`Your application ${name} has been created`);

    configuration.appName = name;
    setConfig(configuration);
}