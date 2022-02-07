import { LightningElement, track } from 'lwc';
import { getLoggedInUser } from 'data/authService';
import { setup } from 'twind/shim';

export default class App extends LightningElement {
    //tailwind Render
    renderedCallback() {
        setup({
            target: this.template
        });
    }

    
    @track loggedUser = undefined;
    @track state;

    connectedCallback() {
        getLoggedInUser().then((response) => {
            if (response.user_id === undefined) {
                this.loggedUser = undefined;
                this.state = 'login';
            } else {
                this.loggedUser = response;
                this.state = 'list';
            }
        });
    }

    get isLoginView() {
        return this.state === 'login';
    }

    get isSessionListView() {
        return this.state === 'list';
    }
}