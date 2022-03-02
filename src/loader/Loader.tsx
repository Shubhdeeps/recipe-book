import React from 'react';
import './loader.css'


const Loader: React.FC = () => {
    return(<div className='center_spin'>
        <div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>)
}

export default Loader;