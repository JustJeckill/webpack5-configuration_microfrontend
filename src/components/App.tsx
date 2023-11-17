import {useState} from "react";
import globalClasses from './global.module.scss';
import classes from './App.module.scss';

export const App = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => setCount(prev => prev + 1);

    // const timerId = setInterval(() => {
    //     setCount(count + 1);
    // }, 5000);

    return (
        <div className={globalClasses.container}>
            <h1>{count}</h1>
            <button className={classes.button} onClick={increment}>Click</button>
        </div>
    );
};
