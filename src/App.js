import React, { Component } from 'react'
import { Paper, SEOAssessor, ContentAssessor } from 'yoastseo'
import { zipObject, omit } from 'lodash'
import Jed from 'jed'

import Presenter from './Presenter'

import InspectorImage from './inspector.svg'

class App extends Component {
    constructor(props) {
        super(props)

        this.contentAssessor = new ContentAssessor(this.i18n())
        this.seoAssessor = new SEOAssessor(this.i18n())

        this.state = {
            paper: new Paper()
        }

        this.assessContent(this.state.paper)
        this.assessSEO(this.state.paper)

        this.changeText = this.changeText.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.changeKeyword = this.changeKeyword.bind(this)
        this.changeUrl = this.changeUrl.bind(this)
        this.changeDescription = this.changeDescription.bind(this)
    }

    i18n() {
        return new Jed({
            domain: `js-text-analysis`,
            locale_data: {
                "js-text-analysis": { "": {} }
            }
        })
    }

    changePaper(item) {
        const data = Object.assign({}, {
            text: this.state.paper.getText(),
            keyword: this.state.paper.getKeyword(),
            description: this.state.paper.getDescription(),
            title: this.state.paper.getTitle(),
            titleWidth: this.state.paper.getTitleWidth(),
            url: this.state.paper.getUrl(),
            locale: this.state.paper.getLocale(),
            permalink: this.state.paper.getPermalink(),
        }, item)
        
        const paper = new Paper(data.text, omit(data, 'text'))

        this.setState({ paper })
        this.assessContent(paper)
        this.assessSEO(paper)
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

    assessContent(paper) {
        this.contentAssessor.assess(paper)
    }

    assessSEO(paper) {
        this.seoAssessor.assess(paper)
    }

    render() {
        return (
            <div className="App">

                <header className="header" role="banner">
                    <img className="header__brand" src={InspectorImage} alt="Inspector" />
                </header>

                <div className="wrapper">

                    <form className="form">
                        <div className="form__group">
                            <label htmlFor="title" className="form__label">Title</label>
                            <input type="text" className="input" id="title" onChange={this.changeTitle} value={this.state.paper.getTitle()} />
                        </div>
                        <div className="form__group">
                            <label htmlFor="text" className="form__label">Content</label>
                            <textarea className="input" id="text" onChange={this.changeText} value={this.state.paper.getText()} />
                        </div>
                        <div className="form__group">
                            <label htmlFor="keyword" className="form__label">Focus Keyword</label>
                            <input type="text" className="input" id="keyword" onChange={this.changeKeyword} value={this.state.paper.getKeyword()} />
                        </div>
                        <div className="form__group">
                            <label htmlFor="url" className="form__label">URL</label>
                            <input type="url" className="input" id="url" onChange={this.changeUrl} value={this.state.paper.getUrl()} />
                        </div>
                        <div className="form__group">
                            <label htmlFor="meta-description" className="form__label">Meta Description</label>
                            <textarea className="input" id="meta-description" onChange={this.changeDescription} value={this.state.paper.getDescription()} />
                        </div>
                    </form>

                    <div className="output">

                        <div className="ratings">
                            <h3 className="ratings__heading">Content</h3>
                            <Presenter assessor={this.contentAssessor} />
                        </div>
                        <div className="ratings">
                            <h3 className="ratings__heading">SEO</h3>
                            <Presenter assessor={this.seoAssessor} />
                        </div>

                    </div>

                </div>

                <footer className="footer" role="contentinfo">
                    Built by <a href="https://www.crgeary.com" rel="noopener noreferrer" target="_blank">CrGeary</a>
                </footer>

            </div>
        )
    }
}

export default App
