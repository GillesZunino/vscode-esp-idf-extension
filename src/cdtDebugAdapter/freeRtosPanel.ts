/*
 * Project: ESP-IDF VSCode Extension
 * File Created: Wednesday, 23rd April 2025 5:52:06 pm
 * Copyright 2025 Espressif Systems (Shanghai) CO LTD
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import path from "path/win32";
import * as vscode from "vscode";

// import * as path from "path";
// import * as fs from "fs";
// import { readParameter } from "../idfConfiguration";
// import { Logger } from "../logger/logger";
// import { ESP } from "../config";
// import { workspace } from "vscode";

export class FreeRTOSInspectorPanel {
    private static readonly viewType = "freeRTOSInspector";

    private static instance: FreeRTOSInspectorPanel;

    private readonly panel: vscode.WebviewPanel;
    private readonly extensionPath: string;

    private disposables: vscode.Disposable[] = [];


    private constructor(panel: vscode.WebviewPanel, extensionPath: string) {
        this.panel = panel;
        this.extensionPath = extensionPath;

        this.panel.iconPath = vscode.Uri.file(path.join(extensionPath, "media", "espressif_icon.png"));

        this.panel.webview.html = this.getHtmlContent(this.panel.webview);
    }

    public static show(extensionPath: string) {
        const column = vscode.window.activeTextEditor? vscode.window.activeTextEditor.viewColumn : undefined;

        if (FreeRTOSInspectorPanel.instance) {
            FreeRTOSInspectorPanel.instance.panel.reveal(column);
            return;
        }

        const panel = vscode.window.createWebviewPanel(FreeRTOSInspectorPanel.viewType, "FreeRTOS", column || vscode.ViewColumn.One,
        {
            enableScripts: true,
            retainContextWhenHidden: true,
            localResourceRoots: [
                vscode.Uri.file(path.join(extensionPath, "dist", "views")),
            ]
        });

        FreeRTOSInspectorPanel.instance = new FreeRTOSInspectorPanel(panel, extensionPath);
    }

    private getHtmlContent(webview: vscode.Webview): string {
        const scriptPath = webview.asWebviewUri(
        vscode.Uri.file(
            path.join(this.extensionPath, "dist", "views", "freeRtosInspector-bundle.js")
        )
        );

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>FreeRTOS Inspector</title>
        </head>
        <body>
        <section id="app"></section>
        <script src="${scriptPath}"></script>
        </body>
        </html>`;
    }
}


// package.json
// "panel" -> "espIdfFreeRTOSInspector" <-> rtos-views  || Missing "icon"

// "menus": {
//     "view/title": [
//         {
//             "command": "mcu-debug.rtos-views.refresh",
//             "when": "view == rtos-views.rtos",
//             "group": "navigation@99"
//         }
//     ]
// }


// ai slop panel;

// export function activate(context: vscode.ExtensionContext) { 
//     context.subscriptions.push(vscode.commands.registerCommand('extension.openWebViewNearTerminal', () => { 
//         // Create a WebView panel in the panel area
//         const panel = vscode.window.createWebviewPanel( 'webviewPanel', // Identifier for the WebView 'My WebView', // Title of the panel 
//         { viewColumn: vscode.ViewColumn.Two, preserveFocus: true }, // Position near terminal 
//          enableScripts: true, // Allow JavaScript in the WebView 
//          retainContextWhenHidden: true // Retain state when hidden
//          } );