import React, { useContext, useEffect } from 'react'
import { Rate } from 'antd';
import { useState } from 'react';
import GenerateContext from '../context/GenerateContext';

function TrackRating({ update_key, track_id, index, defaultRating }) {
    const { data, updateData, resetData } = useContext(GenerateContext)
    const [value, setValue] = useState(3);

    const handleChange = (value) => {
        setValue(value)
        let copy = [ ...data.ratings ]
        copy[index].rating = value
        updateData(update_key, copy)
    }

    useEffect(() => {
        if(defaultRating!==undefined){
            setValue(defaultRating.rating)
        }
    }, [defaultRating])

    return (
        <span>
          <Rate onChange={handleChange} value={value} />
        </span>
    );
}

export default TrackRating