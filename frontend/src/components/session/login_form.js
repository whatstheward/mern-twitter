import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            handle: '',
            password: '',
            errors: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.renderErrors = this.renderErrors.bind(this)
    }
    // Once the user has been authenticated. redirect to the Tweets page
    componentWillReceiveProps(nextProps){
        if(nextProps.currentUser === true){
            this.props.history.push('/tweets')
        }
        // set or clear errors
        this.setState({errors:nextProps.errors})
    }

    // handle field updates (called in the render method)
    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        })
    }

    // handle form submission
    handleSubmit(e){
        e.preventDefault()
        
        let user = {
            handle: this.state.handle,
            password: this.state.password
        }

        this.props.login(user)
    }

    // render the session errors if there are any
    renderErrors(){
        return(
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                    </li>
                ))}
            </ul>
        )
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input type='text'
                            value={this.state.handle}
                            onChange={this.update('handle')}
                            placeholder="Username"
                            />
                    <br/>
                        <input type='password'
                            value={this.state.password}
                            onChange={this.update('password')}
                            placeholder="Password"
                        />  
                    <br/>
                        <input type='submit' value="Submit" />
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginForm)