import './Rating.css'
import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function Rating ({children, handleStarRating, handleSettingComment, handleSubmit}) {

    const [ratingComment, setRatingComment] = useState('');
    const [currIndex, setCurrIndex] = useState(0);
    return (
        <>
            <div className="rating-container">
                {children}
                <div className="star-container">
                    <div className="star-container-inner">
                        <div>
                            {[1, 2, 3, 4, 5].map((i) => (
                                <FontAwesomeIcon icon={faStar}
                                    alt="star"
                                    key={i}
                                    style={{color: i <= currIndex ? 'yellow' : null}}
                                    className="star"
                                    size="3x"
                                    onClick={() => {
                                        handleStarRating(i)
                                        setCurrIndex(i)
                                    }}
                                />
                            ))}
                        </div>
                        <input
                            placeholder="Add comment"
                            className="rating-input"
                            value={ratingComment}
                            onChange={(e) => {
                                setRatingComment(e.target.value)
                                handleSettingComment(e.target.value)
                            }}
                        />
                        <button className="btn-submit" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Rating