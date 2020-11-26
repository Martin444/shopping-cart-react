import React from 'react'
import styled from 'styled-components'
import ImaBanner from '../Image/banner2.jpg'

export default function Banner() {
    return (
        <Bann>
            <div className='ban-content'>

               <h1 className ='title'>ECO FOOD</h1>
               <h3>Una opción saludable al alcance de tu mano</h3>
            </div>
        </Bann>
    )
}


const Bann = styled.div`

    top: 0;
    left: 0;
    width: 100%;
    height: 60vh;
    text-align: center;
    background-image: linear-gradient(to bottom, rgba(97, 41, 153, 0.20), rgba(22, 162, 217, 0.25)), url(${ImaBanner});
    background-size: cover;
    color: #fff;

    .ban-content{
        margin: 0;
        padding:0 auto;
        display: block;
        justify-content: center;
        height: 100%;
        margin-top:150px;
    }

    .title{
        text-align:center;
        font-size: 90px;
    }

    h3{
        font-size: 50px;
    }

`