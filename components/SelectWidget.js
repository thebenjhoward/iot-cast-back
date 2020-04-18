import React from 'react';
import { v4 as uuid } from 'uuid';
import './SelectWidget.scss';

class SelectWidget extends (React.Component) {
    constructor() {
        super();
        this.state = {
            selected: "none"
        }

        this.selectRef = React.createRef();
        this.paramRefs = [];

        // This is how the dropdown menu is built and data is retrieved
        this.options = [
            {
                name: "Select a Widget...",
                id: "none",
                desc: "Select a widget from the dropdown menu."
            },
            {
                name: "Cat Facts",
                id: "CatsBlock",
                desc: "Provides the user with random cat facts every 10 seconds",
            },
            {
                name: "Module A",
                id: "moduleA",
                desc: "Demos passing parameters to the layout",
                params: [{ id: "text", ph: "Content..." }]
            },
            {
                name: "Module B",
                id: "moduleB",
                desc: "Demos passing multiple parameters to the layout",
                params: [{ id: "title", ph: "Title..." }, { id: "text", ph: "Content..." }]
            },
            {
                name: "Jokes",
                id: "JokeBlock",
                desc: "Displays a random jokes every 10 seconds"
            },
            {
                name: "Astronomy Picture of the Day",
                id: "NasaBlock",
                desc: "Displays a different picture of stars and space every day."
            },
            {
                name: "Clock",
                id: "ClockBlock",
                desc: "DIsplays the local date and time in 24hr format."
            }
        ]

        this.queuedChanges = [];

        this.getLayout = this.getLayout.bind(this);
        this.setLayout = this.setLayout.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.addRef = this.addRef.bind(this);
    }

    /** 
     * Gets the current states of all the inputs and returns a json representation which
     * will be posted to the server with all the other widgets
     * 
     * @returns {any} object to be added to the layout array.
    */
    getLayout() {
        if (this.state.selected == "none") {
            return null;
        } else {
            var layout = { type: this.state.selected };
            var widget = this.options.find((val) => val.id == this.state.selected);
            if (widget.params) {
                for (let i = 0; i < widget.params.length; i++) {
                    layout[widget.params[i].id] = this.paramRefs[i].current.value;
                }
            }
            return layout;
        }
    }

    setLayout(layout) {
        for (name in layout) {
            if (name != "type") {
                this.queuedChanges.push({ name, value: layout[name] });
            }
        }
        this.setState({ selected: layout.type })
    }

    /** @param {Event} event */
    handleChange(event) {
        this.setState({ selected: event.target.value })
    }

    handleClick() {
        console.log(this.getLayout())
    }
    /**
     * Creates a ref object and puts it the ref array
     * 
     * @returns {React.RefObject<any>}
     */
    addRef() {
        var ref = React.createRef();
        this.paramRefs.push(ref);
        return ref;
    }

    componentDidUpdate() {
        this.selectRef.current.selectedIndex = this.options.findIndex(val => val.id == this.state.selected);
        var widget = this.options.find((val) => val.id == this.state.selected);
        while (this.queuedChanges.length != 0) {
            try {
                let change = this.queuedChanges.pop();
                this.paramRefs[widget.params.findIndex(val => val.id == change.name)].current.value = change.value;
            } catch {}
        }
    }

    render() {
        var widget = this.options.find((val) => val.id == this.state.selected);
        if (!widget) {
            return (
                <div className="SelectWidget">
                    <select id="widgets" onChange={this.handleChange} ref={this.selectRef} value={this.state.selected}>
                        {this.options.map((widget) => (
                            <option key={uuid()} value={widget.id}>{widget.name}</option>
                        ))}
                    </select>
                    <b>UNKNOWN ERROR</b>
                </div>
            );
        } else if (widget.params) {
            this.paramRefs = []; // clear out param refs
            return (
                <div className="SelectWidget">
                    <select id="widgets" onChange={this.handleChange} ref={this.selectRef}>
                        {this.options.map((widget) => (
                            <option key={uuid()} value={widget.id}>{widget.name}</option>
                        ))}
                    </select>
                    <div className="widgetContent">
                        <div className="desc">Description: {widget.desc}</div>
                        <div className="params">
                            {widget.params.map((param) => {
                                return (
                                    <input key={uuid()} placeholder={param.ph} ref={this.addRef()} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="SelectWidget">
                    <select id="widgets" onChange={this.handleChange} ref={this.selectRef}>
                        {this.options.map((widget) => (
                            <option key={uuid()} value={widget.id}>{widget.name}</option>
                        ))}
                    </select>
                    <div className="widgetContent">
                        <div className="desc">Description: {widget.desc}</div>
                    </div>
                </div>
            )
        }
    }
};

export default SelectWidget