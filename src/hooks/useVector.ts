import Animated, { useSharedValue } from 'react-native-reanimated';

type UseVectorReturnType = {
    x: Animated.SharedValue<number>;
    y: Animated.SharedValue<number>;
};
export default function useVector(): UseVectorReturnType {
    const x = useSharedValue(0);
    const y = useSharedValue(0);
    return { x, y };
}
