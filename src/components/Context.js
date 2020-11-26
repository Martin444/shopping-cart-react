import React, { Component } from 'react'
import  firebase, { auth, provider }  from '../Utils/firebase'

export const DataContext = React.createContext();

export class DataProvider extends Component {

    state = {
        user: null,
        products: [],
        cart: [],
        total: 0,
        orders: null
    };


    resetData = () => {
        this.setState({cart: [], total: 0})
    }

    loginGoogle = () => {
        auth().signInWithPopup(provider).then((users)=>{
            var response =  firebase.firestore().collection('users').doc(users.user.uid).get();
            response.then((doc)=>{
                if(doc.exists){
                    this.setState({user: doc.data()})
                    // doc.data()
                } else {
                    const newDate = new Date().toISOString();
                    const data = {
                        'date': newDate,
                        'uid' : users.user.uid,
                        'displayName' : users.user.displayName,
                        'email' : users.user.email,
                        'photoUrl' : users.user.photoURL,
                        'numberPhone' : users.user.phoneNumber,
                        'admin' : false
                     }
                    var response =  firebase.firestore().collection('users').doc(users.user.uid).set(data);

                    response.then(()=>{
                        console.log('Listo!')
                        var responseData =  firebase.firestore().collection('users').doc(users.user.uid).get();
                        responseData.then((docts)=>{
                            this.setState({user: docts.data()})
                        })
                    })
                }
            })
        })
    }

    addCart = (producter) =>{

        const { cart } = this.state;

        console.log(producter.uid)
        const check = cart.every(item =>{
            return item.uid !== producter.uid
        })
        if(check){
            const data = [{
                ...producter,
                quantity:1
            }]

            this.setState({cart:[...cart,...data], total: producter.price})

        } else {
            alert("Este producto ya fue añadido al carrito")
        }
    };

    reduction = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.uid === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -=1;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    increase = id =>{
        const { cart } = this.state;
        cart.forEach(item =>{
            if(item.uid === id){
                console.log(item.quantity)
                item.quantity ++;
            }
        })
        this.setState({cart: cart});
        this.getTotal();
    };

    removeProduct = id =>{
        if(window.confirm("Quieres eliminar este producto?")){
            const {cart} = this.state;
            cart.forEach((item, index) =>{
                if(item.uid === id){
                    cart.splice(index, 1)
                }
            })
            this.setState({cart: cart});
            this.getTotal();
        }
       
    };

    getTotal = ()=>{
        const{cart} = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.quantity);
        },0)
        this.setState({total: res})
    };
    
    componentWillMount(){
      var response =  firebase.firestore().collection('products').get();
      response.then((doc)=>{
          this.setState({products: doc.docs })
          if(this.state.user){
            firebase.firestore().collection('orders').where('userID','==', this.state.user.uid).get().then((docer)=>{
                this.setState({orders: docer.docs})
            })
        }
      });

    //   this.getOrders();
    }
    componentDidUpdate(){
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
        localStorage.setItem('Useres', JSON.stringify(this.state.user))
    };


    componentDidMount(){
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if(dataCart !== null){
            this.setState({cart: dataCart});
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if(dataTotal !== null){
            this.setState({total: dataTotal});
        }
        const dataUser = JSON.parse(localStorage.getItem('Useres'));
        console.log(dataUser)
        if(dataUser !== null){
            this.setState({user: dataUser});
        }
    }
   

    render() {
        const {products, cart,total, user, orders} = this.state;
        const {addCart,reduction,increase,removeProduct,getTotal, loginGoogle, resetData} = this;
        return (
            <DataContext.Provider 
            value={{products, addCart, cart, reduction,increase,removeProduct,total,getTotal, loginGoogle, user, resetData, orders}}>
                {this.props.children}
            </DataContext.Provider>
        )
    }
}


