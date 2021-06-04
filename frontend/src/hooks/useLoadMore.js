import React, { useState, useEffect } from "react"

function useLoadMore(dispatcher, actionType) {
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleScroll() {
            const scrollTop = (document.documentElement 
            && document.documentElement.scrollTop) || document.body.scrollTop;

            const scrollHeight = (document.documentElement
                && document.documentElement.scrollHeight)
                || document.body.scrollHeight;
            if (scrollTop + window.innerHeight + 50 >= scrollHeight){
                setTimeout(() => {
                    setIsBottom(true);
                }, 2000);
                
            }
    }

    useEffect(() => {
        if (isBottom) {
            dispatcher(actionType, {setIsBottom})
        }
    }, [isBottom]);

}

export default useLoadMore