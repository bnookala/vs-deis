'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { instantiate } from './commands/login';
import { create } from './commands/create';
import { deploy } from './commands/deploy';
import { scale, listContainers } from './commands/scale';
import { info } from './commands/info';
import { logs} from './commands/logs';
import { destroy} from './commands/destroy';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export const activate = async (context: vscode.ExtensionContext) => {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Deis extension is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    const subscriptions = [
        vscode.commands.registerCommand('extension.Create', create),
        vscode.commands.registerCommand('extension.Deploy', deploy),
        vscode.commands.registerCommand('extension.Scale', scale),
        vscode.commands.registerCommand('extension.Containers', listContainers),
        vscode.commands.registerCommand('extension.Info', info),
        vscode.commands.registerCommand('extension.Logs', logs),
        vscode.commands.registerCommand('extension.Destroy', destroy)
    ]

    subscriptions.forEach((element) => {
        context.subscriptions.push(element);
    }, this);

    await instantiate();
}

// this method is called when your extension is deactivated
export function deactivate() {

}