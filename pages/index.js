import React from 'react';
import SelectWidget from '../components/SelectWidget';
import '../components/index.scss'
const fetch = require("../util/clientFetch")
import axios from 'axios';
const getUri = require('../util/getUri');

class Index extends React.Component {
    constructor() {
        super();
        this.widgetRefs = [ React.createRef(), React.createRef(), React.createRef(), React.createRef() ];

        this.submitLayout = this.submitLayout.bind(this);
    }

    submitLayout() {
        var layout = [];

        this.widgetRefs.forEach((ref) => layout.push(ref.current.getLayout()));
        var uri = getUri(document, '/api/layout');
        axios.post(uri, layout);

    }

    componentDidMount() {
        fetch(document, '/api/layout', true).then(layout => {
            for(let i = 0; i < layout.length; i++) {
                this.widgetRefs[i].current.setLayout(layout[i]);
            }
        })
    }

    render() {
        return (
            <div className="Index">
                <SelectWidget ref={this.widgetRefs[0]}/>
                <SelectWidget ref={this.widgetRefs[1]}/>
                <SelectWidget ref={this.widgetRefs[2]}/>
                <SelectWidget ref={this.widgetRefs[3]}/>
                <button onClick={this.submitLayout}>Submit Layout</button>
            </div>
        );
    }
}

export default Index