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

    //muestra el componente App o EditWork segun taskvisible, y si muestra EditWork actualizo el state
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

    //trae todas las carpetas
    fetchFolders() {
        fetch('/api/folders')
            .then(res => res.json())
            .then(data => {
                this.setState({ folders: data })
                console.log(this.state.folders)
            })
    }

    //va cambiando el valor del state segun corresponda
    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    //agrega las carpetas
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

        document.getElementById("miForm").reset();
    }

    //borra las carpetas
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
            // muestra componente App si cumple la condicion 
            !this.state.taskvisible ? <div>



                <div className="container">
                    {/* navigate */}
                    <nav className="light-blue darken-4">
                        <div className="container">
                            <p className="brand-log" style={{ fontSize: '2em' }}>Ensolvers</p>
                        </div>
                    </nav>
                    <div className="row">

                        <div className="s12 m12 l7" style={{ display: this.state.appvisible }}  >
                            <div className="card">
                                <div className="card-content">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th style={{ fontSize: '1.5em' }}>Folders</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        {/* en la tabla traigo y enlisto todas las carpetas */}
                                        <tbody>
                                            {
                                                this.state.folders.map(folder => {
                                                    return (
                                                        <tr key={folder._id}>

                                                            <td> <form action="#">

                                                                <label style={{ fontSize: '1.2em', color: 'black' }}> - {folder.title}</label>

                                                            </form></td>
                                                            <td>
                                                                <button className="btn light-blue darken-4" onClick={() => this.deleteFolder(folder._id)}>  Delete</button>
                                                                <button className="btn light-blue darken-4" style={{ margin: '4px' }} onClick={() => this.cambiarEstado(folder)} > View Items</button>
                                                            </td>

                                                        </tr>
                                                    )
                                                })
                                            }
                                            <div>

                                            </div>
                                        </tbody>
                                    </table>
                                    {/* el formulario con el cual se agregaran las carpetas */}
                                    <form onSubmit={this.addTask} style={{ marginTop: '1em' }} id="miForm">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" type="text" placeholder="Add Folder" onChange={this.handleChange} style={{ display: 'inline', width: 'auto' }} ></input>
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
                // muestra componente EditWork si cumple la condicion 
                <div>

                    <EditWork folder={this.state._id} cambiarEstado={this.cambiarEstado} />
                </div>



        )

    }

}

export default App;