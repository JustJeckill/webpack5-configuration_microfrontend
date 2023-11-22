import {useState} from "react";
import {Outlet} from "react-router-dom";

import globalClasses from './global.module.scss';
import classes from './App.module.scss';

import PictureSVG from 'source/assets/icon-addons.svg';
import picturePNG from 'source/assets/icon-input-range.png';
import pictureJPG from 'source/assets/img-jpg-example.jpg';

export const App = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount(prev => prev + 1);

    // const timerId = setInterval(() => {
    //     setCount(count + 1);
    // }, 5000);

    return (
        <div className={globalClasses.container}>
            <h1>Platform={__PLATFORM__}</h1>
            <div>
                <img src={picturePNG} alt="PicturePNG"/>
            </div>
            <div>
                <img src={pictureJPG} alt="PictureJPG"/>
            </div>
            <div>
                <PictureSVG width={'100'} height={'100'} color={'red'} />
            </div>
            <h1>{count}</h1>
            <h2>gretyhrdhyjr</h2>
            <button className={classes.button} onClick={increment}>Click</button>
            <Outlet />
        </div>
    );
};
