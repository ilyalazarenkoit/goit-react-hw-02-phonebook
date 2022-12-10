import { Component } from "react";
import PropTypes from 'prop-types'
import filterStyles from '../Filter/Filter.module.css'



const Filter = ({filter, onChange}) => (
    <div className={filterStyles.container}>
    <p className={filterStyles.text}>Search contacts:</p>
    <input className={filterStyles.input} value={filter} type="text" onChange={onChange}/>
    </div>
)
        
    
Filter.propTypes = {
    filter: PropTypes.string,
    onChange: PropTypes.func,
}


export {Filter}