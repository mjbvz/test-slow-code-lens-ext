'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { setTimeout } from 'timers';

class DelayedCodeLensProvider implements vscode.CodeLensProvider {

    constructor(
        private readonly delay: number,
        private readonly animal: string
    ) { }

    provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeLens[]> {
       
        return document.getText().split(/\n/g).map(((line, i) => {
            if (!line.startsWith('x')) {
                return undefined;
            }
            const lens: vscode.CodeLens = {
                command: {
                    command: '',
                    title: this.animal
                },
                range: new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, 0)),
                isResolved: false
            };
            return lens;
        })).filter(x => !!x);
    }
    resolveCodeLens(codeLens: vscode.CodeLens, _token: vscode.CancellationToken) {
        return new Promise<vscode.CodeLens>(resolve => setTimeout(() => resolve(codeLens), this.delay))        
    }
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "test-slow-code-lens-ext" is now active!');

    vscode.languages.registerCodeLensProvider('markdown', new DelayedCodeLensProvider(5000, '🐢'))
    vscode.languages.registerCodeLensProvider('markdown', new DelayedCodeLensProvider(0, '🐰'))
}

// this method is called when your extension is deactivated
export function deactivate() {
}