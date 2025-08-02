//store.jsx
import { proxy } from 'valtio';

const state = proxy({
    currentModel: 'shirt',

    shirt: {
        logoDecal: '',
        fullDecal: '',
        isLogoTexture: true,
        isFullTexture: false,
        logoScale: 0.15,
        logoPosition: [0, 0.04, 0.15],
        color: '#ffffff',
        logoRotationY: Math.PI,
        keepLogoAspect: true,
        partsColor: {
            than_ao: '#ffffff',
            tay_ao: '#ffffff',
            co_ao: '#ffffff',
        },
    },

    bracelet: {
        logoDecal: '',
        fullDecal: '',
        isLogoTexture: false,
        isFullTexture: false,
        logoScale: 0.1,
        logoPosition: [0, 0, 0],
        color: '#ffb6c1',
        braceletText: 'Hello!',
        textColor: '#000000',
        outlineColor: '#ffffff',
        outlineWidth: 0,
        fontFamily: 'UTM-Akashi.ttf',
        partsColor: {
            than_ao: '#ffb6c1',
            tay_ao: '#ffb6c1',
            co_ao: '#ffb6c1',
        },
        fontSize: 0.097,
    },
});

export default state;
