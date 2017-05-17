import * as vscode from 'vscode';
import {Deis} from './deisUtil';

export const create = async () => {

    let name = await vscode.window.showInputBox({
        prompt: 'Please enter an application name or leave blank to generate one…',
        placeHolder: 'meddling-parrot'
    });

    Deis.apps.create(name, function (results) {
        if (results === null) {
            vscode.window.showInformationMessage(`Your application ${name} has been created`);
        }
    });
}