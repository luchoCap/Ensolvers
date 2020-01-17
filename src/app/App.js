import React, { Component } from 'react';
import { Mongoose } from 'mongoose';
import EditWork from './EditWork'



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            folders: [],
            _id: '',
            taskvisible: false,

        };

        this.cambiarEstado = this.cambiarEstado.bind(this)
        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    componentDidMount() {
        this.fetchFolders()
    }

    cambiarEstado(data) {

        if (data) {
            this.setState({
                title: data.title,
                taskvisible: !this.state.taskvisible,
                _id: data._id
            }, () => console.log(this.state))
        } else {
            this.setState({
                taskvisible: !this.state.taskvisible
            }, console.log(this.state))
        }


    }

    fetchFolders() {
        fetch('/api/folders')
            .then(res => res.json())
            .then(data => {
                this.setState({ folders: data })
                console.log(this.state.folders)
            })
    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    addTask(e) {

        fetch('api/folders', {
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
                M.toast({ html: 'Folder Save' })
                this.setState({ title: '', description: '' })
                this.fetchFolders()
            })
            .catch(err => console.error(err))

        e.preventDefault();
    }

    deleteFolder(id) {
        if (confirm('Are you sure you want to delete it?')) {
            fetch(`/api/folders/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({ html: 'Folder deleted' })
                    this.fetchFolders()
                })
        }
    }



    render() {
        return (
            !this.state.taskvisible ? <div>
                {/* Navigation */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-log" href="/">Mern Stack</a>
                    </div>
                </nav>

                <div className="container">

                    <div className="row">

                        <div className="col s7" style={{ display: this.state.appvisible }}  >
                            <div className="card">
                                <div className="card-content">
                                    <table>

                                        <thead>
                                            <tr>
                                                <th>Folders</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.folders.map(folder => {
                                                    return (
                                                        <tr key={folder._id}>

                                                            <td> <form action="#">

                                                                <label>  {folder.title}</label>

                                                            </form></td>
                                                            <td>
                                                                <button className="btn light-blue darken-4" ><i className="material-icons" onClick={() => this.deleteFolder(folder._id)} > Delete</i></button>
                                                                <button className="btn light-blue darken-4" style={{ margin: '4px' }} onClick={() => this.cambiarEstado(folder)} > <i className="material-icons">View Items</i></button>
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

                    </div>
                </div>

            </div> :
                <div>
                    <EditWork folder={this.state._id} cambiarEstado={this.cambiarEstado} />
                </div>



        )

    }

}

export default App;