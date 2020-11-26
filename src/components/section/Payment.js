import React, { useContext } from 'react'
import styled from 'styled-components'
import { DataContext } from '../Context';

import firebase from '../../Utils/firebase'

export const Payment = () => {
    
    const {user, cart, total, resetData} = useContext(DataContext);
    
    
      const  sendOrder = (event) => {
            event.preventDefault();
            const form = new FormData(event.target);
            const newDate = new Date().toISOString();
    
            const data = {
                'date': newDate,
                'userID': user.uid,
                'name' : user.displayName,
                'email' : user.email,
                'photoUrl' : user.photoUrl,
                'numberPhone' : form.get('number'),
                'direction' : form.get('direction'),
                'order' : cart,
                'total' : total
            }

            
            firebase.firestore().collection('orders').add(data).then((doc)=>{
                console.log(user)
                resetData();
             });
        }
        return (
            <Conten>
                <h2 style={{textAlign: "center"}}>Ultimos datos para confirmar</h2>
                <form className='formis' onSubmit={sendOrder}>
                    <div className='dat'>
                        <input className='inpute' name="direction" placeholder="Dirección"/>
                        <input className='inpute' name="number" placeholder="Número de telefono"/>
                        <button className="btn-confirm" >Confirmar pedido</button>
                    </div>
                </form>
            </Conten>
        )

}

const Conten = styled.div`
    .formis{
        display: flex;
        justify-content: center;
    }

    .inpute{
        display: block;
        padding: 10px;
        margin-top: 20px;
        border-radius: 6px;
        width: 300px;
        /* width: 100%; */
    }

    .dat{
        display: block;
        margin: 0 auto;
        align-items: center;
        align-content:center;
        position: relative;
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

    .btn-confirm:active{
        transform: translateY(2px);
    }

`


export default Payment
