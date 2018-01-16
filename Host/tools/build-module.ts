///<reference path="../node_modules/@types/node/index.d.ts"/>
import * as fs from 'fs';
import * as path from 'path';

import * as ts from 'typescript';
import * as utils from './utils';

export default function buildModule(moduleId: string) : boolean {
    const projectPath = utils.getPackageFolder(moduleId);

    const tsConfigFilename = path.resolve(projectPath, 'tsconfig.json');

    const tsConfig = ts.readConfigFile(tsConfigFilename, ts.sys.readFile);

    const parsed: ts.ParsedCommandLine = ts.parseJsonConfigFileContent(
        tsConfig.config || {},
        ts.sys,
        projectPath,
        { },
        tsConfigFilename
    );
    
    const compilerOptions = parsed.options;

    const host = ts.createCompilerHost(compilerOptions);
    
    const program = ts.createProgram(parsed.fileNames, compilerOptions, host);
    const emitResult = program.emit();
    
    let allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file) {
            let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start!);
            let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
        }
        else {
            console.log(`${ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')}`);
        }
    });
    
    if (emitResult.emittedFiles != null) {
        emitResult.emittedFiles.forEach(f => console.log(`File: ${f}`));
    }
    
    return !emitResult.emitSkipped;
}