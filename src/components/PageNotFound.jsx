import React from 'react';
import errorImage from '../assets/ErrorImage.jpeg';


const PageNotFound = () => {
    return (
        <div>
            <img src={errorImage} alt="Error, Page Not Found." />
        </div>
    );
};

export default PageNotFound;