import React, { Component } from 'react';
import { Mongoose } from 'mongoose';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: '',
            visible: 'none'

        }


        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }


    componentDidMount() {
        this.fetchTasks()
    }

    handleChangeCheck(id) {
        if (this.state.visible == "") {
            this.handleVisible()
        }

        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.description == "") {
                    console.log(data);
                    this.setState({
                        title: data.title,
                        description: "checked",
                        _id: data._id
                    }, () => {
                        console.log(this.state);
                        if (id) {
                            fetch(`/api/tasks/${id}`, {
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
                                    this.setState({ title: '', check: false, _id: '' })
                                    this.fetchTasks()
                                })
                        }
                    })

                } else {
                    console.log(data);
                    this.setState({
                        title: data.title,
                        description: "",
                        _id: data._id
                    }, () => {
                        console.log(this.state);
                        if (id) {
                            fetch(`/api/tasks/${id}`, {
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
                                    this.setState({ title: '', check: false, _id: '' })
                                    this.fetchTasks()
                                })
                        }
                    })
                }




            })


    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })

    }

    handleVisible() {
        if (this.state.visible === 'none') {
            console.log(this.state.visible)
            this.setState({
                visible: ''
            }, () => console.log(this.state.visible))
        } else if (this.state.visible === '') {
            console.log(this.state.visible)
            this.setState({
                visible: 'none'
            }, () => console.log(this.state.visible))
        }
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



    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data })
                console.log(this.state.tasks)
            })
    }


    deleteTask(id) {
        if (confirm('Are you sure you want to delete it?')) {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Task deleted' })
                    this.fetchTasks()
                })
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    title: data.title,
                    _id: data._id
                })
                console.log(this.state)

            })
    }

    render() {
        return (
            <div>
                {/* Navigation */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-log" href="/">Mern Stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s7">
                            <div className="card" >
                                <div className="card-content">
                                    <table>

                                        <thead>
                                            <tr>
                                                <th>To-Do List</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.tasks.map(task => {
                                                    return (
                                                        <tr key={task._id}>

                                                            <td> <form action="#">

                                                                <label><input type="checkbox" id="check" onChange={() => this.handleChangeCheck(task._id)} checked={task.description}></input>
                                                                    <span htmlFor="check">  {task.title}</span></label>




                                                            </form></td>
                                                            <td>
                                                                <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)}><i className="material-icons">delete</i></button>
                                                                <button className="btn light-blue darken-4" style={{ margin: '4px' }} onClick={() => { this.editTask(task._id); this.handleVisible() }}> <i className="material-icons">edit</i></button>
                                                            </td>

                                                        </tr>
                                                    )
                                                })
                                            }
                                            <div>

                                            </div>
                                        </tbody>
                                    </table>
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" type="text" placeholder="Add Task" onChange={this.handleChange} style={{ display: 'inline', width: 'auto' }} ></input>
                                                <button type="submit" className="btn light-blue darken-4" style={{ display: 'inline', marginLeft: '40px' }}>Send</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>

                        </div>
                        <div className="col s5">
                            <div className="card" style={{ display: this.state.visible }}>
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>

                                        <h5>Editing Task "{this.state.title}"</h5>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" type="text" placeholder="task Title" onChange={this.handleChange} value={this.state.title}></input>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4" onClick={() => this.handleVisible()}>Send</button>
                                        <button type="button" className="btn light-blue darken-4" onClick={() => this.handleVisible()} style={{ margin: '4px' }}>Cancel</button>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default App;