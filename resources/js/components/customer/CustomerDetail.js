import React from 'react';

export default class CustomerDetail extends React.Component {

    constructor() {
        super();

        this.state = {
            customer: {}
        }
    }

    componentDidMount() {

        fetch('/api/customers/' + this.props.match.params.id)
            .then(response => response.json())
            .then(jsonResponse => {
                this.setState({
                    customer: jsonResponse
                });
            });

    }

    render() {
        return(
            <div>
                <p>{this.state.customer.id} {this.state.customer.name}</p>
            </div>
        )
    }

}
