import React, { useState, useEffect } from "react"

function useLoadMore(dispatch, loadMoreTodos) {
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isBottom) {
            dispatch(loadMoreTodos(setIsBottom))
        }
    }, [isBottom]);

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

}

export default useLoadMore