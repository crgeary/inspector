import React, { Component } from 'react'
import { helpers } from 'yoastseo'
import { forEach } from 'lodash'

import Rating from './Rating'

class Presenter extends Component {
    getScores() {
        return this.props.assessor.getValidResults().map(r => {
            r.rating = helpers.scoreToRating(r.score)
            return r
        });
    }
    addRating(item) {
        return {
            rating: item.rating,
            text: item.text,
            identifier: item.getIdentifier()
        }
    }

    render() {
        let ratings = []
        forEach (this.getScores(), (item, key) => ratings.push(this.addRating(item)))

        return (
            <div>
                {ratings.map(r => <Rating key={r.identifier} id={r.identifier} rating={r.rating} text={r.text} />)}
            </div>
        )
    }
}

export default Presenter
