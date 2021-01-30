import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {resetResponseStatus} from '../redux/reducer/actions'
/**
 * @description execute a function when saving response succesfully
 * @param {string} success success request
 */

const useResponseSuccess = (success, callbacks = []) =>
{
    const dispatch = useDispatch();
    useEffect(()=>
    {
        if(!callbacks.length || !success) return; 

        callbacks.forEach(async callback => {
            await setTimeout(callback, 10);
            await dispatch(resetResponseStatus())
        });

    }, [success]);
}

export default useResponseSuccess;