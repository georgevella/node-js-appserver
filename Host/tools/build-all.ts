import {default as buildModule} from './build-module';
import {default as packageModule} from './package-module';

import * as gtv from 'git-tag-version';

console.log(`Version: ${gtv()}`);

if (!buildModule('@jorge/lib-di'))
{
    console.log('Build failed, exiting abruptly');
    process.exit(1);
}
if (!packageModule('@jorge/lib-di')){
    console.log(`Failed to package module @jorge/lib-di`)
}

console.log(`@jorge/lib-di: build completed ...`);

