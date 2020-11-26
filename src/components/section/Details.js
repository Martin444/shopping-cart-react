import React, { Component } from 'react'
import {DataContext} from '../Context'
import {Link} from 'react-router-dom'
import Colors from './Colors'
import '../css/Details.css'


export class Details extends Component {
    static contextType = DataContext;
    state = {
        product: []
    }

    getProduct = () =>{
        if(this.props.match.params.id){
            const res = this.context.products;
            const data = res.filter(item =>{
                return item.data().uid === this.props.match.params.id
            })
            this.setState({product: data})
        }
    };

    componentDidMount(){
        this.getProduct();
    }



    render() {
        const {product} = this.state;
        const {addCart} = this.context;
        return (
            <>
                {
                    product.map(item =>(
                        <div className="details" key={item.id}>
                            <img src={item.data().src} alt=""/>
                            <div className="box">
                                <div className="row">
                                    <h2>{item.data().title}</h2>
                                    <span>${item.data().price}</span>
                                </div>
                                <Colors colors={item.data().colors}/>
                                <p>{item.data().description}</p>
                                <p>{item.data().content}</p>
                                <Link to="/cart" className="cart" onClick={() => addCart(item.data())}>
                                    Add to cart
                                </Link>
                            </div>
                        </div>
                    ))
                }
            </>
        )
    }
}

export default Details
