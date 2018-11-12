import React from 'react';

export default class Sources extends React.Component {
    render() {
        return (<div className="card mt-3">
            <div className="card-body">
                <h1 className="card-title">Sources</h1>
                <h4 className="card-subtitle mb-2 text-muted">The following sources were used in the creation of this site:</h4>
                <div className="scroll-box">
                    <ul>
                        <li>There is no official definition of a bear market.</li>
                        <li>This site assumes the following:</li>
                        <ul>
                            <li>A drop of 10% from the 52 week high constitues corretion territory.</li>
                            <li>A drop of 20% from the 52 week high constitues a bear market.</li>
                        </ul>
                    </ul>
                </div>
            </div>
        </div>
        )
    }
}