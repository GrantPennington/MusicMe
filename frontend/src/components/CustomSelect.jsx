import React, { useContext, useState, useEffect } from 'react'
import { Select, Space } from 'antd';
import GenerateContext from '../context/GenerateContext';

function CustomSelect({ updateKey, options, w }) {
    const [selected, setSelected] = useState("")

    const { data, updateData } = useContext(GenerateContext)

    const selectOptions = options.map((option) => {
        return { value: option.id, label: option.name }
    })

    useEffect(() => {
        if(data[updateKey]==="") {
            setSelected("")
        } else {
            setSelected(data['source_name'])
        }
        //console.log(data[label])
    }, [data])

    const handleChange = (value) => {
        //setSelected(value)
        Object.values(options).map((playlist) => {
            if(playlist.id===value){
                updateData(updateKey, playlist.external_urls.spotify)
                updateData('source_name', value)
            }
        })
    }

    return (
        <>
            <Select
                style={{ width: w || 300 }}
                onChange={handleChange}
                options={selectOptions}
                value={selected}
            />
        </>
    )
}

export default CustomSelect