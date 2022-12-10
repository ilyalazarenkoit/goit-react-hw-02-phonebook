import { Component } from "react";
import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'
import formStyle from '../ContactForm/ContactForm.module.css'

let INITIAL_STATE = {
    name: '',
    number: '',
}


class ContactForm extends Component {

  state = {
    name: '',
    number: '',
  };


  handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onSumbit = (e) => {
    e.preventDefault();
    this.props.onHandleClick(this.state)
    this.reset();
  }

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

 

  render() {
    const {name , number}= this.state
    return (
      <form onSubmit={this.onSumbit} className={formStyle.form}>
        <label className={formStyle.label}>
        <p className={formStyle.text}>Name :</p> 
        <input
        className={formStyle.input}
          onChange={this.handleChange}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        </label>
        <label className={formStyle.label}>
        <p className={formStyle.text}>Number :</p>
        <input
        className={formStyle.input}
        onChange={this.handleChange}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        </label>
        <button type="submit" className={formStyle.add}>Add to contacts</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onHandleClick: PropTypes.func,
}

export {ContactForm}