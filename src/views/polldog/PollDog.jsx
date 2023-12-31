import React, { useState } from 'react';
import axios from 'axios';
import './PollDog.css'
import Dropdown from "../../components/dropdown/Dropdown.jsx";
import Rating from "../../components/rating/Rating.jsx";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BrandsComponent = () => {
    const brands = { smoothie: ['Raspberry', 'Mango', 'Aronia'], joy: ['Multivitamin', 'Red fruits'] };
    const [isRatingOpened, setIsRatingOpened] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [ratingComment, setRatingComment] = useState('');
    const [selectedRating, setSelectedRating] = useState(null);
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);

    const handleOpeningRating = (product) => {
        setIsRatingOpened(true);
        setSelectedProduct(product);
    };

    const handleStarRating = (i) => {
        setSelectedRating(i);
    };

    const handleSettingComment = (comment) => {
        setRatingComment(comment)
    };

    const handleSubmit = async () => {
        if (!selectedRating || !ratingComment.length) {
            setError(true)
            setTimeout(() => setError(false) ,2000)
            return;
        }
        setLoader(true)
        setSelectedRating(null);
        setRatingComment('');
        setIsRatingOpened(false);
        let brand = null;
        for(let key in brands) {
            if(brands[key].includes(selectedProduct)) {
                brand = key;
                break;
            }
        }
        try {
            await axios.post('https://localhost:7070/PollDogAPI', {
                product: selectedProduct,
                Survey_Comment: ratingComment,
                brand: brand,
                Survey_Star_Rating: selectedRating
            });
            toast.success('Thank you for submitting review :)',{
                position: "bottom-center",
                autoClose: 3000,
                theme: "colored",
            })
        } catch (error) {
            toast.error('An error occurred while sending data',{
                position: "bottom-center",
                autoClose: 3000,
                theme: "colored",
            })
        } finally {
            setLoader(false)
        }
    };

    return (
        <>
            <div className="brands-container">
                <div className="dropdown">
                    <Dropdown brands={brands.smoothie} handleOpeningRating={handleOpeningRating}>
                        <p>Smoothie</p>
                    </Dropdown>
                </div>
                <div className="dropdown">
                    <Dropdown brands={brands.joy} handleOpeningRating={handleOpeningRating}>
                        <p>Joy</p>
                    </Dropdown>
                </div>
            </div>
            {!loader ? (
            <>
                {isRatingOpened && (
                    <Rating handleStarRating={handleStarRating}
                            handleSettingComment={handleSettingComment}
                            handleSubmit={handleSubmit}>
                              <p className="product-title">Rate product {selectedProduct}</p>
                    </Rating>
                )}
                {error && (
                    <div className="not-filled-form-container">
                        <p className="not-filled-form-p">You must enter all the data</p>
                    </div>
                )}
            </>
            ) : (
                <div className="loader-container">
                    <span className="loader"></span>
                </div>
            )}
        </>
    );
};

export default BrandsComponent;
