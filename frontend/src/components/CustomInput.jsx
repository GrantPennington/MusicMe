import React, { useContext, useEffect, useState } from 'react'
import { Input } from 'antd';
import GenerateContext from '../context/GenerateContext';

function CustomInput({ placeholder, width, label }) {
    const [input, setInput] = useState("")

    const { data, updateData } = useContext(GenerateContext)

    const handleChange = (value) => {
        setInput(value.target.value)
        updateData(label, value.target.value)
    }

    useEffect(() => {
        if(data[label]===""){
            setInput("")
        }
        //console.log(data[label])
    }, [data])

    return (
        <>
            <Input 
                placeholder={placeholder} 
                value={input}
                onChange={handleChange}
                style={{ width: width || 300 }}
            />
        </>
    )
}

export default CustomInput