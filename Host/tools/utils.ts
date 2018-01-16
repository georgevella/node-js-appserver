import * as path from "path";
import * as fs from "fs";

const rootFolder = path.resolve(__dirname, '..');
const packagesFolder = path.resolve(rootFolder, 'packages', 'node_modules');

export function getPackagesFolder() : string {
    return packagesFolder;
}

export function getPackageFolder(packageId : string) : string {
    const projectPath = path.resolve(packagesFolder, packageId);

    let projectDirectoryStat : fs.Stats = null;

    try {
        projectDirectoryStat = fs.statSync(projectPath);
    }
    catch (e)
    {
        //console.log(`Project '${packageId}' is not valid.`);
        throw Error(`Project '${packageId}' is not valid.`);
    }

    if (projectDirectoryStat == null || !projectDirectoryStat.isDirectory() || isValidProjectDirectory(projectPath)) {
        //console.log(`Project '${packageId}' is not valid.`);
        throw Error(`Project '${packageId}' is not valid.`);
    }
    
    return projectPath;
}

function isValidProjectDirectory(projectPath: string) {
    // TODO: check for the existence of package.config with an appropriate name
}