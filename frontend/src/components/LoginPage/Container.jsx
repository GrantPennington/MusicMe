import React, { useEffect, useState } from 'react'
import LoginButton from '../../LoginButton'
import axios from 'axios'
import NavTab from './NavTab'
import CarouselContainer from '../Carousel/CarouselContainer'
import CarouselState from '../Carousel/CarouselState'
import { visionStatementGPT } from './../Carousel/visionStatementGPT';
import './Container.css'

const containerStyle = {
    width: '100%',
    height: 800,
    display: 'flex',
    backgroundColor: '#8e50a6',
    paddingTop: 25,
    borderRadius: '15px',
    flexDirection: 'column',
}

const containerHeaderStyle = {
  height: '100%',
  width: '40%',
  display:'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  paddingLeft: 70,
  alignItems: 'center',
  color: 'white',
  fontSize: '1.5rem',
  fontFamily: 'DM Sans, sans-serif',
}

const optionsStyle = {
  height: '100%', 
  width: 800,
  display:'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  color: 'white',
  fontSize: '1.25rem',
  marginLeft: '500px',
  marginRight: 50,
  fontFamily: 'DM Sans, sans-serif',
}

const contentStyle = {
  padding: 5,
  float: 'right',
  marginTop: 50,
  marginRight: 50,
}

const carouselStyle = {
  width: '100%',
  height: '100%',
  backgroundColor: 'orange',
}

const visionContainer = {
  width: '90%',
  height: 235,
  //backgroundColor: '#191185',
  padding: 20,
  paddingTop: 0,
  //textIndent: 50,
  paddingLeft:75,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

const visionTextStyle = {
  color: 'white',
  fontSize: '1.2rem',
  textAlign: 'left',
  padding: 10,
  paddingTop: 0,
  lineHeight: 2.25,
}

const visionTextBig = {
  textIndent: '2cm',
  color: 'white',
  fontSize: '2.25rem',
  textAlign: 'left',
  padding: 20,
  paddingTop: 0,
  lineHeight: 1.5,  
}

const visionRowStyle = {
  width: '90%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#1b146e',
  marginTop: 100,
  borderTopRightRadius: '20px',
  borderBottomRightRadius: '20px',
  boxShadow: '5px 10px #221029',
}

function Container(props) {
  //const [images, setImages] = useState([''])

  // const getImages = () => {
  //     axios.get('http://localhost:3001/images')
  //       .then((response) => {
  //         console.log(response)
  //         //setImages([ ...images, response.data.img_path])
  //         //window.location.reload(); // reload page on success to refresh data
  //       })
  //       .catch((error) => console.log(error))
  // }
  const getDescriptionSection = () => {
    //console.log(visionStatementGPT)
    //const myPattern = `/^([^.]*.+){${delimeter}}/`;
    const statement = visionStatementGPT
    const array = statement.match(/^([^.+]*.){4}/)
    //const matches = myPattern.exec(visionStatementGPT);
    //console.log(array[0])
    if(array[0]){
      return array[0]
    }
    return `something went wrong... :(`

    //parseMatch(getDescriptionSection(), /^[\s\S]{15}/)
  }

  const parseMatch = (string, pattern) => {
    return string.match(pattern)
  }
  //const visionStatement = visionStatementGPT
  

  const handleClick = () => {
    console.log('Logging in...')
    //getImages()
  }

  return (
    <div style={containerStyle}>
        <div>
        <div style={{ height: 40, display: 'flex', flexDirection: 'row', marginTop: 15,  }}>
              <div style={containerHeaderStyle}>
                <h2>MusicMe</h2>
              </div>
              <div style={optionsStyle}>
                <NavTab label={'About'}/>
                <NavTab label={'Developer'}/>
                <NavTab label={'Learn React'} />
                <LoginButton label={'Login'} />
                {/*<LoginButton id={'btn-1'} label={'Login'} handleClick={handleClick} />*/}
              </div>
        </div>
        <div >{/*style={contentStyle}*/}
          <CarouselState />
        </div>
      </div>
    </div>
  )
}

/*
<div style={visionRowStyle}>
        <div style={visionContainer}>
          <p>
            <span className={'strong-start'}>{getDescriptionSection().substring(0,30)}</span>
            <span style={visionTextStyle}>{getDescriptionSection().substring(30)}</span>
          </p>
        </div>
      </div>

*/

export default Container