import React from 'react'

function Dropdown({ options, selected }) {

    return (
        <>
        <select name="selectList" id="selectList" style={{ width: '15%' }} onChange={e => selected(e.target.value)}>
            {options.map((option) => 
                <option key={option.id} value={option.id}>{option.name}</option>
            )}
        </select>
        </>
    )
}

export default Dropdown