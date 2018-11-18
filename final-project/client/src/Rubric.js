import React from 'react';

export default class Rubric extends React.Component {
    render() {
        return (<div className="card mt-3">
            <div className="card-body">
                <h1 className="card-title">Grading Rubric</h1>
                <h4 className="card-subtitle mb-2 text-muted">Location of Grading Rubric Items</h4>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Criteria</th>
                            <th scope="col">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Contains pictures or videos.</td>
                            <td>Main</td>
                        </tr>
                        <tr>
                            <td>Website has 1 homepage and at least 3 subpages; the homepage and subpages have a horizontal menu that leads to the other pages.</td>
                            <td>See NavBar links</td>
                        </tr>
                        <tr>
                            <td>The homepage has picture carousel animation.</td>
                            <td>Main</td>
                        </tr>
                        <tr>
                            <td>Scroll box in one page.</td>
                            <td>Sources</td>
                        </tr>
                        <tr>
                            <td>One page has unordered HTML list with several entries.</td>
                            <td>Calculation Methodology</td>
                        </tr>
                        <tr>
                            <td>Button to download files.</td>
                            <td>Sources</td>
                        </tr>
                        <tr>
                            <td>Link that you can click and leads to outside webpages.</td>
                            <td>Sources</td>
                        </tr>
                        <tr>
                            <td>One page has a form.</td>
                            <td>Subscribe</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}