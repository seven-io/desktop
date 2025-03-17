import {useEffect, useRef} from 'react'

export const usePrevious = <T extends {}>(value: T): T | undefined => {
    const ref = useRef<T>(value);

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
};