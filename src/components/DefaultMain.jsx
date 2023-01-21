import React from 'react'
import Row from '../components/Row'
import requests from '../Request'

const DefaultMain = () => {
  return (
    <>
        <Row rowId='1' title='Terbaru' fetchURL={requests.reqUpcoming}/>
        <Row rowId='2' title='Trending' fetchURL={requests.reqTrending}/>
        <Row rowId='3' title='Aksi' fetchURL={requests.reqAction}/>
        <Row rowId='4' title='Teratas' fetchURL={requests.reqToprated}/>
        <Row rowId='5' title='Populer' fetchURL={requests.reqPopular}/>
        <Row rowId='6' title='Horror' fetchURL={requests.reqHorror}/>
    </>
  )
}

export default DefaultMain
