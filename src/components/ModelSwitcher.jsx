import { useSnapshot } from 'valtio';
import state from '../store';
import Shirt from './Shirt';
import Bracelet from './Bracelet';

const ModelSwitcher = () => {
    const snap = useSnapshot(state);

    return (
        <>
            {snap.currentModel === 'shirt' ? <Shirt /> : <Bracelet />}
        </>
    );
};

export default ModelSwitcher;
