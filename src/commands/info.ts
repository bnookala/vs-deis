import * as vscode from 'vscode';
import { Deis, promisifyDeis } from './deisUtil';
import { config } from './app';



export const info = async () => {
    let appName;
    if (config.appName) {
        appName = config.appName;
    } else {
        appName = await vscode.window.showInputBox(
            'Please enter an application name'
        );
    }

    const appInfo = await promisifyDeis(Deis.info, appName);
    //const outputChannel = vscode.window.createOutputChannel('Deis');

    // TODO: figure out how to display this information nicely.
    console.log(appInfo);
}