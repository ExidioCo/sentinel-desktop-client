const builder = require('electron-builder');

const compression = process.env.NODE_ENV === 'production' ? 'maximum' : 'store';

builder.build({
    targets: builder.Platform.current().createTarget(),
    publish: 'always',
    config: {
        files: [
            './bin/**/*',
            './build/**/*',
            './electron/**/*',
        ],
        extends: null,
        asar: false,
        appId: 'co.sentinel.desktop',
        productName: 'Sentinel',
        compression: compression,
        linux: {
            category: 'Utility',
            executableName: 'sentinel',
            icon: './electron/',
            target: [
                'AppImage',
                'deb',
                'dir',
                'tar.gz',
            ],
        },
        mac: {
            category: 'public.app-category.utilities',
            icon: './electron/icon.icns',
            minimumSystemVersion: '10.12.0',
        },
        win: {
            icon: './electron/icon.ico',
        },
        publish: [{
            // pass GITHUB_TOKEN (with repo scope) to publish
            provider: 'github',
            owner: 'sentinel-official',
            repo: 'desktop-client',
            releaseType: 'release',
        }],
    },
}).then(() => {
    console.log('Build OK!');
}).catch(console.error);
