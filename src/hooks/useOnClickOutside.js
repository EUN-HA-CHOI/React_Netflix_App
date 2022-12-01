import { useEffect } from 'react';

export default function useOnClickOutside(ref, handler) {
    
    useEffect(
        () => {
            console.log("ref",ref);
            const listener = (event) => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => { //컴포넌트가 언마운트 될 때 리스너들을 삭제
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [ref, handler]
    );
}