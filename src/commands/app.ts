import * as fs from 'fs';
import * as vscode from 'vscode';

const APP_CONFIG_NAME =  `${vscode.workspace.rootPath}/.deis-app-config`;
export let config;

export const readConfig = () => {
    if (!fs.existsSync(APP_CONFIG_NAME)) {
        config = {};
        return config;
    }

    config = JSON.parse(
        fs.readFileSync(
            APP_CONFIG_NAME,
            {encoding: "utf8", flag: "r"}
        )
    );

    return config;
};

export const setConfig = (newConfiguration) => {
    config = newConfiguration
    fs.writeFileSync(
        APP_CONFIG_NAME,
        JSON.stringify(newConfiguration),
        {encoding: "utf8", flag: "w"}
    );
};