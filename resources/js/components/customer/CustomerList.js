import React from 'react';

export default class CustomerList extends React.Component {

    constructor() {
        super();

        this.state = {
            customerList: []
        };
    }

    componentDidMount() {

        fetch('/api/customers')
            .then(response => response.json())
            .then(jsonResponse => this.setState({
                customerList: jsonResponse
            }));

    }

    render() {

        let customerList = this.state.customerList.map( (customer) => {
            return(
                <div key={customer.id}>
                    <a href={'/customer/'+customer.id}><p>{customer.id} {customer.name}</p></a>
                </div>
            );
        });

        return (
            <div>
                <h1>Customer List</h1>
                {customerList}
            </div>
        );

    }

}
