import PropTypes from 'prop-types'
import listStyles from '../ContactList/ContactList.module.css'

const ContactList = ({contacts, deleteContact}) => (
    <>
    <ul className={listStyles.list}>
      {contacts.map(contact => {
        return (
          <li className={listStyles.contact} key={contact.id}><p className={listStyles.text}>{contact.name}</p><p className={listStyles.text}>:</p><p className={listStyles.text}>{contact.number}</p>
          <button className={listStyles.delete}type="button" key={contact.id} onClick={() => deleteContact(contact.id)}>Delete</button>
          </li> 
        )
      })}
     </ul>
     </>
)

ContactList.propTypes = {
 contacts: PropTypes.arrayOf(PropTypes.shape({
    id:PropTypes.string,
    name:PropTypes.string,
    number: PropTypes.string, 
 })),
 deleteContact:PropTypes.func,
}

export {ContactList}