import * as npm from 'npm';
import * as util from './utils';
import * as childprocess from 'child_process';

export default function packageModule(module: string) : boolean {
    const result = childprocess.spawnSync("npm", ["pack"],
        {
            cwd: util.getPackageFolder(module),
        });
    
    return result.status == 0;
}
