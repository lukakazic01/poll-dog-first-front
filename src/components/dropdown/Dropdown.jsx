import React from "react";
import './Dropdown.css'

function Dropdown({ brands, children, handleOpeningRating }) {
    console.log()

    return (
        <>
            <>{children}</>
            <ul className="brands">
                {brands.map((product) => (
                    <li className="ingredients" key={product} onClick={() => handleOpeningRating(product)}>
                        {product}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Dropdown;