import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { nodeFileTrace } from '@vercel/nft';
import cpy from 'cpy';

const files = [
    'dist/source/index.js',
    'node_modules/cross-env/src/bin/cross-env.js',
    'node_modules/cross-env/src/index.js',
    'dist/source/utils/fetch.js'
];
const resultFolder = 'node_modules-minimal';

(async () => {
    const cache = Object.create(null);
    const { fileList } = await nodeFileTrace(files, {
        base: path.resolve(
            path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
        ),
        cache
    });
    const deps = Array.from(fileList).filter((f) => f.includes('node_modules'));
    return cpy(deps, path.resolve(resultFolder), {
        parents: true
    });
})();
