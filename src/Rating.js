import React, { Component } from 'react'

class Rating extends Component {
    getIndicatorColor() {
        return this.props.rating
    }
    render() {
        return (
            <p className={`rating rating--${this.getIndicatorColor()}`}>
                <strong>{this.props.id}</strong> ({this.props.rating})<br />
                <span dangerouslySetInnerHTML={{ __html: this.props.text }} />
            </p>
        )
    }
}

export default Rating
