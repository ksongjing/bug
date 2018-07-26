import React, { Component } from 'react';
import './Page404.scss';

class Page404 extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className="Page404">
                <div className="Page404-title">This is 404 page.</div>
            </div>
        );
    }
}
export default Page404;