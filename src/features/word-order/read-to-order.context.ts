import { createContext } from 'react';

type ReadyToOrderContextType = {
    ready: boolean;
    setReady: (ready: boolean) => void;
};
const ReadyToOrderContext = createContext<ReadyToOrderContextType>({
    ready: false,
    setReady: (ready: boolean) => {},
});
export default ReadyToOrderContext;
