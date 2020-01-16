import React, { Component } from 'react';
import { Mongoose } from 'mongoose';



class EditWork extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };

        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    addTask(e) {
        if (this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Task Updated' })
                    this.setState({ title: '', description: '', _id: '' })
                    this.fetchTasks()
                })
        } else {
            fetch('api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Task Save' })
                    this.setState({ title: '', description: '' })
                    this.fetchTasks()
                })
                .catch(err => console.error(err))
        }
        e.preventDefault();
    }



    render() {
        return (
            <div>
                <div className="card">
                    <div className="card-content">
                        <form onSubmit={this.addTask}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input name="title" type="text" placeholder="task Title" onChange={this.handleChange} value={this.state.title}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                    <textarea name="description" placeholder="Task Description" className="materialize-textarea" onChange={this.handleChange} value={this.state.description}></textarea>
                                </div>
                            </div>
                            <button type="submit" className="btn light-blue darken-4">Send</button>
                        </form>
                    </div>

                </div>
            </div>
        )

    }

}

export default createFandW;