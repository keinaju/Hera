import { useEffect, useRef } from 'react';

export function useIntersection(options, onIntersection) {
    const ref = useRef(null);

    useEffect(() => {
        const callback = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                onIntersection();
            }
        };

        const observer = new IntersectionObserver(callback, options);
        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return ref;
}
