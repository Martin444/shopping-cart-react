import React, { useContext } from 'react'
import styled from 'styled-components'
import CardOrder from '../CardOrder'
import { DataContext } from '../Context'

export default function Orders() {
    const {orders, users} = useContext(DataContext);

    return (
        <Content>
            {
                orders ?
                <div className='contentpage'>
                    <h1>Mis Ordenes</h1>
                    <div className='list'>
                        {
                            orders.map(e=>(
                                // console.log(e.data())
                                <CardOrder data={e}/>
                            ))
                        }
                      
                    </div>
                </div>
                :
                <div className='contentpage'>
                    <h1>No hay ninguna orden aún</h1>
                    <div className='list'>
                        {/* <CardOrder/>
                        <CardOrder/>
                        <CardOrder/>
                        <CardOrder/>
                        <CardOrder/> */}
                    </div>
                </div>

            }
        </Content>
    )
}

const Content = styled.div`

    width: 100%;
    display: flex;
    justify-content: center;

    .contentpage{
        width:1200px;
        display: block;
        margin: 0 auto;
    }

    .list{
        margin-top: 20px;
    }

    @media screen and (min-width: 768px){

    }
`