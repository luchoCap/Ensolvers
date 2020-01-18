import React, { Component } from 'react';
import { Mongoose } from 'mongoose';



class EditWork extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: '',
            visible: 'none'


        }


        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleEstado = this.handleEstado.bind(this)

    }


    componentDidMount() {
        this.fetchTasks()
    }

    //cambia el estado del checkbox
    handleChangeCheck(id) {
        if (this.state.visible == "") {
            this.handleVisible()
        }

        fetch(`/api/tasks/edit/${id}`)
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

    //cambia el valor del campo que corresponda y actualiza el state
    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })

    }

    //saca el bloque de editar
    handleVisibleCancel() {

        if (this.state.visible === '') {
            console.log(this.state.visible)
            this.setState({
                title: '',
                _id: '',
                visible: 'none',

            }, () => console.log(this.state.visible))
        }
    }

    //saca el bloque de editar despues de mandarlo
    handleVisibleSend() {

        if (this.state.visible === '') {
            console.log(this.state.visible)
            this.setState({
                visible: 'none'
            }, () => console.log(this.state.visible))
        }
    }






    //cambia el estado para mostrar el componente App o el componente EditWork
    handleEstado() {

        this.props.cambiarEstado();

    }



    //agrego la tarea o la modifico
    addTask(event) {
        console.log(event.target.name)
        if (this.state._id && event.target.name != 'miForm') {
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
                    this.setState({ title: '', _id: '', visible: 'none' })
                    this.fetchTasks()
                })
        } else if (event.target.name == "miForm" && this.state._id == '') {
            fetch(`api/tasks/${this.props.folder}`, {
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
                    this.setState({ title: '', _id: '', visible: 'none' })
                    this.fetchTasks()
                })
                .catch(err => console.error(err))
        }
        document.getElementById("miForm").reset();
        event.preventDefault();

    }


    //traigo todas las tareas
    fetchTasks() {
        fetch(`/api/tasks/${this.props.folder}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data })
                console.log(this.state.tasks)
            })
    }

    //borro la tarea correspondiente
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

    //actualizo el state que me servira para despues editar
    editTask(id) {
        fetch(`/api/tasks/edit/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    description: data.description,
                    title: data.title,
                    _id: data._id,
                    visible: ''

                })
                console.log(this.state)

            })


    }

    render() {
        return (
            <div>

                <div className="container">
                    {/* navigate */}
                    <nav className="light-blue darken-4">
                        <div className="container">
                            <p className="brand-log" style={{ fontSize: '2em' }}>Ensolvers</p>
                        </div>
                    </nav>
                    <div className="row">
                        <div className="col s12 m12 l7" >
                            <div className="card" >
                                <div className="card-content">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th><button className="btn light-blue darken-4" onClick={this.handleEstado}>Folder > work </button> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.tasks.map(task => {
                                                    return (
                                                        <tr key={task._id}>
                                                            <td>
                                                                <form action="#">
                                                                    <label><input type="checkbox" id="check" onChange={() => this.handleChangeCheck(task._id)} checked={task.description}></input>
                                                                        <span htmlFor="check" style={{ fontSize: '1.2em', color: 'black' }}>  {task.title}</span>
                                                                    </label>
                                                                </form>
                                                            </td>
                                                            <td>
                                                                <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)}><i className="material-icons">delete</i></button>
                                                                <button className="btn light-blue darken-4" style={{ margin: '4px' }} onClick={() => { this.editTask(task._id) }}> <i className="material-icons">edit</i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>

                                    <form onSubmit={this.addTask} id="miForm" name="miForm" style={{ marginTop: '1em' }}>
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
                        <div className="col s12 m12 l5">
                            <div className="card" style={{ display: this.state.visible }}>
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>

                                        <h5>Editing Task "{this.state.title}"</h5>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" type="text" placeholder="task Title" onChange={this.handleChange} value={this.state.title}></input>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn light-blue darken-4" onClick={() => this.handleVisibleSend()}>Send</button>
                                        <button type="button" className="btn light-blue darken-4" onClick={() => this.handleVisibleCancel()} style={{ margin: '4px' }}>Cancel</button>
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

export default EditWork;
