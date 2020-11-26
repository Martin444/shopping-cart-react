import React, { Component } from 'react'
import {DataContext} from '../Context'
import {Link} from 'react-router-dom'
import '../css/Details.css'
import '../css/Cart.css'

export class Cart extends Component {
    static contextType = DataContext;
    
    render() {
        const {cart,increase,reduction,removeProduct,total} = this.context;
        if(cart.length === 0){
            return <h2 style={{textAlign:"center"}}>No hay productos</h2>
        }else{
            return (
                <div className="conten-cart">
                    {
                        cart.map(item =>(
                            // console.log(item)
                            <div className="details cart" key={item.id}>
                                <img src={item.src} alt=""/>
                                <div className="box">
                                    <div className="row">
                                        <h2>{item.title}</h2>
                                        <span>${item.price * item.quantity}</span>
                                    </div>
                                    {/* <Colors colors={item.colors}/> */}
                                    <p>{item.description}</p>
                                    <p>{item.content}</p>
                                    <div className="amount">
                                        <button className="count" onClick={() => reduction(item.uid)}> - </button>
                                        <span>{item.quantity}</span>
                                        <button className="count" onClick={() => increase(item.uid)}> + </button>
                                    </div>
                                </div>
                                <div className="delete" onClick={() => removeProduct(item.uid)}>x</div>
                            </div>
                        ))
                    }
                    <div className="total">
                        <Link to="/payment">Pedir</Link>
                        <h3>Total: ${total}</h3>
                    </div>
                </div>
                )
            }
        }
}

export default Cart
