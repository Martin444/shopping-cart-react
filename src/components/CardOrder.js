import React from 'react'
import { useContext } from 'react'
import styled from 'styled-components'
import { DataContext } from './Context'

export default function CardOrder(props) {
    const {user} = useContext(DataContext);
    let formatedTime;
    
    
    var unix = props.data.data().date;
    var date = new Date(unix);
    
    var hours = date.getDate();
    console.log(hours);

        var minutes = date.getMonth() + 1;
        switch (minutes) {
            case 1:
                formatedTime = hours + ' de enero';
                break;
            case 2:
                formatedTime = hours + ' de febrero';
                break;
            case 3:
                formatedTime = hours + ' de marzo';
                break;
            case 4:
                formatedTime = hours + ' de abril';
                break;
            case 5:
                formatedTime = hours + ' de mayo';
                break;
            case 6:
                formatedTime = hours + ' de junio';
                break;
            case 7:
                formatedTime = hours + ' de julio';
                break;
            case 8:
                formatedTime = hours + ' de agosto';
                break;
            case 9:
                formatedTime = hours + ' de septiembre';
                break;
            case 10:
                formatedTime = hours + ' de octubre';
                break;
            case 11:
                formatedTime = hours + ' de noviembre';
                break;
            case 12:
                formatedTime = hours + ' de diciembre';
                break;
            default:
                break;
        

    }


    return (
        <Card>
            <div className='row-title'>
                <h2>{props.data.data().date}</h2>
                <h4>Total: {props.data.data().total} pesos</h4>
            </div>
            <div className='conten-info'>
                <div className='column-resume'>
                    {
                        props.data.data().order.map(item=>{
                            return <div>
                                <p><strong>{item.quantity} - {item.title}</strong></p>
                            </div> 
                        })
                    }
                </div>
                <div className='column-info'>
                    <p>Dirección: <strong>{props.data.data().direction}</strong></p>
                    <p>Numero de teléfono: <strong>{props.data.data().numberPhone}</strong></p>
                    <p>Fecha: <strong>{formatedTime}</strong></p>
                    <p>Nombre: <strong>{props.data.data().name}</strong></p>
                    <p>Email: <strong>{props.data.data().email}</strong></p>
                </div>
            </div>
            {
                user.admin ?
                    <button className='btn-confirm'>Listo</button>
                    :
                    <button className='btn-confirm'>Cancelar</button>

            }
        </Card>
    )
}

const Card = styled.div`
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 15px;

    .row-title{
        display: flex;
        justify-content: space-between;
        text-align: center;
        align-self: center;
        align-items: center;
    }

    .row-title h2{
        text-align: left;
    }
    .row-title h4{
        text-align: right;
    }

    .conten-info{
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        justify-content: space-between;
    }

    .column-info{
        text-align:right;
    }
    .btn-confirm{
        /* position: absolute;
        left: 30px; */
        width: 100%;
        height: 40px;
        margin-top: 10px;
        border:none;
        border-radius: 5px;
        color:white;
        font-size: 20px;
        font-weight: 600;
        background-color: black;
    }

    .btn-confirm:hover{
        cursor: pointer;
    }

    .btn-confirm:active{
        transform: translateY(2px);
    }

    @media screen and (max-width: 768px){
        .column-info{
            margin-top: 5px;
            padding-top: 5px;
            text-align:left;
            border-top: 1px solid #ccc;
        }

        .conten-info{
            padding-top: 10px;
            display: block;
            justify-content: space-between;
        }
        
    }
`
