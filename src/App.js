import React, { Component } from 'react'
import { Paper } from 'yoastseo'
import { zipObject, omit } from 'lodash'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paper: new Paper()
        }

        this.changeText = this.changeText.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.changeKeyword = this.changeKeyword.bind(this)
        this.changeUrl = this.changeUrl.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
    }

    changePaper(item) {
        const paper = Object.assign({}, {
            text: this.state.paper.getText(),
            keyword: this.state.paper.getKeyword(),
            description: this.state.paper.getDescription(),
            title: this.state.paper.getTitle(),
            titleWidth: this.state.paper.getTitleWidth(),
            url: this.state.paper.getUrl(),
            locale: this.state.paper.getLocale(),
            permalink: this.state.paper.getPermalink(),
        }, item)
        
        this.setState({
            paper: new Paper(paper.text, omit(paper, 'text'))
        })
    }

    changeTitle(event) {
        this.changePaper({ title: event.target.value })
    }

    changeText(event) {
        this.changePaper({ text: event.target.value })
    }

    changeKeyword(event) {
        this.changePaper({ keyword: event.target.value })
    }

    changeUrl(event) {
        this.changePaper({ url: event.target.value })
    }

    changeDescription(event) {
        this.changePaper({ description: event.target.value })
    }

    research(paper) {
        this.researcher.setPaper(paper)

        let keys = Object.keys(this.researcher.getAvailableResearches())
        let values = keys.map(r => this.researcher.getResearch(r))

        return zipObject(keys, values)
    }

    render() {
        return (
            <div className="App">
                
                <div className="form">
                    <div className="form__group">
                        <label for="title">Title</label>
                        <input type="text" id="title" onChange={this.changeTitle} value={this.state.paper.getTitle()} />
                    </div>
                    <div className="form__group">
                        <label for="text">Content</label>
                        <textarea id="text" onChange={this.changeText} value={this.state.paper.getText()} />
                    </div>
                    <div className="form__group">
                        <label for="keyword">Focus Keyword</label>
                        <input type="text" id="keyword" onChange={this.changeKeyword} value={this.state.paper.getKeyword()} />
                    </div>
                    <div className="form__group">
                        <label for="url">URL</label>
                        <input type="url" id="url" onChange={this.changeUrl} value={this.state.paper.getUrl()} />
                    </div>
                    <div className="form__group">
                        <label for="meta-description">Meta Description</label>
                        <textarea id="meta-description" onChange={this.changeDescription} value={this.state.paper.getDescription()} />
                    </div>
                </div>

                <pre>{JSON.stringify(this.state.paper, null, 4)}</pre>

            </div>
        )
    }
}

export default App
