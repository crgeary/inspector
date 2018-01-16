import React, { Component } from 'react'

class Rating extends Component {
    getIndicatorColor() {
        return this.props.rating
    }
    render() {
        return (
            <div className={`rating rating--${this.getIndicatorColor()}`}>
                <span className="rating__score">{this.props.rating}</span>
                <span dangerouslySetInnerHTML={{ __html: this.props.text }} />
            </div>
        )
    }
}

export default Rating
