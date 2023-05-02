import React, { useContext, useEffect, useState } from 'react'
import { InputNumber } from 'antd';
import GenerateContext from '../context/GenerateContext';

function NumberInput({ min, max }) {
    const [number, setNumber] = useState(25)

    const { data, updateData } = useContext(GenerateContext)

    const onChange = (value) => {
        if(!value || value===""){
            setNumber(25)
            updateData('amount_of_songs', 25)
        } else {
            setNumber(value)
            updateData('amount_of_songs', value)
        }
    };

    useEffect(() => {
        if(data.amount_of_songs===""){
            updateData('amount_of_songs', number)
        }
    }, [])

    return (
        <InputNumber min={min || 5} max={max || 75} value={number} onChange={onChange} style={{ width: 300 }}/>
    )
}

export default NumberInput