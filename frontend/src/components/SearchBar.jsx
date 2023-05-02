import React from 'react'
import { Input } from 'antd';
const { Search } = Input;

function SearchBar({ value, onChange, onSearch }) {
  return (
    <>
        <Search
            placeholder="Search for Artist"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            onChange={onChange}
            value={value}
        />
    </>
  )
}

export default SearchBar