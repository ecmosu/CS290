import React from 'react';

export default class Subscribe extends React.Component {
    render() {
        return (<div className="card mt-3">
            <div className="card-body">
                <h1 className="card-title">Subscribe</h1>
                <h4 className="card-subtitle mb-2 text-muted">Receive Bear Market Alerts!</h4>
                <div className="alert alert-warning" role="alert">
                    The detail entered into this form is used for project demo purposes only, no subscription will actually be made.
                </div>
                <form action="http://web.engr.oregonstate.edu/~zhangluy/tools/class-content/form_tests/check_request.php" method="POST">
                    <div className="form-group">
                        <label htmlFor="inputName">Name</label>
                        <input type="text" className="form-control" name="inputName" id="inputName" placeholder="Enter name"></input>
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className="form-control" name="inputEmail" id="inputEmail" placeholder="Enter email"></input>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        )
    }
}