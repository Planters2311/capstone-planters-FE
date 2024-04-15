import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AddCartItem, getSingleInventory } from '../API';


export default function Singleitem({ SetNewItemtoCart, token }) {



    const [singleData, setSingleData] = useState(null);
    let { itemId } = useParams();

    const [quantity, setQuantity] = useState(1);

    const [showAlert, setShowAlert] = useState(false);

    const [addedToCartt, setAddedToCartt] = useState(false);


    useEffect(() => {

        async function single() {

            const data = await getSingleInventory(itemId)
            setSingleData(data);
        }

        single();
    }, []);


    async function addToCart(id, token, quantity) {

        try {
            const Add = await AddCartItem(id, token, quantity);
            SetNewItemtoCart(Add);
            setShowAlert(true);
            setAddedToCartt(true);
        } catch (error) {
            console.error(error);
        };
    };

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));

    };

    useEffect(() => {

        if (showAlert) {

            setTimeout(() => {
                setShowAlert(false);
                setAddedToCartt(false);
            }, 3000)
        }

    }, [showAlert]);



    return (
        <div>
            {singleData ? (
                <div>

                    <h2>{singleData.name}</h2>
                    {/* <img src={singleData.imageUrl}/> */}
                    <p>Description: {singleData.description}</p>
                    <p>Price: ${(singleData.price / 100).toFixed(2)}</p>

                    {token && !addedToCartt && (
                        <label>
                            Quantity:
                            <input
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min="1"
                            />
                        </label>
                    )}

                    <div>
                        {quantity === 1 ? showAlert && <div> <p>Added {quantity} {singleData.name} To Cart!</p></div> :
                            showAlert && <div> <p>Added {quantity} {singleData.name}s To Cart!</p></div>}
                    </div>

                    {token && !addedToCartt && (
                        <button onClick={() => addToCart(singleData.id, token, quantity)} >Add To Cart</button>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}


        </div>

    )
}