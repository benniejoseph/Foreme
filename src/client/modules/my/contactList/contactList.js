import { LightningElement} from 'lwc';
import { getContacts } from 'data/contactService';
import { setup } from 'twind/shim';


export default class ContactList extends LightningElement{
    //tailwind Render
    renderedCallback() {
        setup({
            target: this.template
        });
    }

    
    contacts = [];
    connectedCallback() {
        getContacts().then((result) => {
            this.contacts = this.allContacts = result;
            console.table(this.contacts);
        });
    }
    searchdata(event) {
        const searchKey = event.target.value.toLowerCase();
        this.contacts = this.allContacts.filter(
            contact => contact.lastName.toLowerCase().includes(searchKey)
        );
      }



      
    
}