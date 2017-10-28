import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './todo.css';

const TaskList = ({dataSource,check,status,deleteTask}) => {
    return (
        <div className="taskList">
            <ul className="todo-list">
                {dataSource.map(item => {
                    if(status === 1){//显示全部任务
                        return (
                            <li id={item.name} className={item.isCompleted?"completed":null}>
                                <div className="view">
                                    <input className="toggle" type="checkbox" onClick={() => check(item.name,dataSource)} checked={item.isCompleted} />
                                    <label>{item.name}</label>
                                    <button className="destroy" onClick={() => deleteTask(item.name,dataSource)}></button>
                                </div>
                            </li>
                        );
                    }else if(status === 2){//显示未完成任务
                        return (
                            !item.isCompleted
                            ?
                            <li id={item.name} className={item.isCompleted?"completed":null}>
                                <div className="view">
                                    <input className="toggle" type="checkbox" onClick={() => check(item.name,dataSource)} checked={item.isCompleted} />
                                    <label>{item.name}</label>
                                    <button className="destroy" onClick={() => deleteTask(item.name,dataSource)}></button>
                                </div>
                            </li>
                            :
                            null
                        );
                    }else{//显示已完成任务
                        return (
                            item.isCompleted
                            ?
                            <li id={item.name} className={item.isCompleted?"completed":null}>
                                <div className="view">
                                    <input className="toggle" type="checkbox" onClick={() => check(item.name,dataSource)} checked={item.isCompleted} />
                                    <label >{item.name}</label>
                                    <button className="destroy" onClick={() => deleteTask(item.name,dataSource)}></button>
                                </div>
                            </li>
                            :
                            null
                        );
                    }
                })
                }
            </ul>
        </div>
    );
};

const Footer = ({dataSource,showWay,showList,clearCompleted}) => {
    const active = dataSource.filter(item => !item.isCompleted);
    const clearCompletedButton = active.length < dataSource.length
        ? <button className="clear-completed" onClick={() => clearCompleted()}>Clear completed</button>
        : null;
    return(
        <footer className="footer">
            <span className="todo-count">
                <strong>{active.length} {active.length === 1 ? "item left" : "items left"}</strong>
            </span>
            <ul className="filters">
                <li><a className={showWay === 1?"selected":null} onClick={() => showList(1)}>All</a></li>
                <span> </span>
                <li><a className={showWay === 2?"selected":null} onClick={() => showList(2)}>Active</a></li>
                <span> </span>
                <li><a className={showWay === 3?"selected":null} onClick={() => showList(3)}>Completed</a></li>
            </ul>
            {clearCompletedButton}
        </footer>
    );
};

class Todo extends Component {
    constructor(){
        super();
        this.state = {
            list: [],
            list1: [],
            showWay: 1,
        }
        document.onkeydown = this.keyDownSearch;
    }

    //监听键盘回车键
    keyDownSearch = () => {
        let eve = window.event;
        if(eve.keyCode === 13){
            document.getElementById("chooseAll").checked = false;//新添加后，全选按钮恢复
            this.addTask();
        }
    }

    //添加新任务
    addTask = () => {
        let arr = this.state.list;
        let nameTask = document.getElementById("input").value;
        document.getElementById("input").value = "";
        if("" === nameTask){
            return ;
        }
        for(let i = 0; i < arr.length; i++){
            if(nameTask === arr[i].name){
                alert("该同名任务已经存在！");
                return;
            }
        }
        let newTask = {isCompleted:false,name:nameTask};
        arr.push(newTask);
        this.setState({list:arr});
    }

    //选择框操作
    check = (name,dataSource) => {
        for (let i = 0; i < dataSource.length; i++) {
            if(dataSource[i].name === name){
                dataSource[i].isCompleted = !dataSource[i].isCompleted;
                break;
            }
        };
        this.setState({list:dataSource});
    }

    //删除一个任务
    deleteTask = (name,dataSource) => {
        for (let i = 0; i < dataSource.length; i++) {
            if(dataSource[i].name === name){
                dataSource.splice(i, 1);
                break;
            }
        };
        this.setState({list:dataSource});
    }

    //删除已完成任务
    clearCompleted = () => {
        let arr = this.state.list;
        let arrNew = [];
        for(let i = 0; i < arr.length; i++) {
            if(!arr[i].isCompleted){
                arrNew.push(arr[i]);//未完成的就添加到新数组，然后setState新数组到原list
            }
        }
        document.getElementById("chooseAll").checked = false;//删除全部任务后，全选按钮恢复
        this.setState({list:arrNew});
    }

    //分类显示任务
    showList = (showWay) => {
        //1、显示全部
        //2、显示未完成
        //3、显示已完成
        this.setState({showWay:showWay});
    }

    //全选按钮
    chooseAll = () => {
        let isChecked = document.getElementById("chooseAll").checked;
        let arr = this.state.list;
        for(let i = 0; i < arr.length; i++) {
            arr[i].isCompleted = isChecked;
        }
        this.setState({list:arr});
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Wu Jianqiang</h1>
                </header>
                <div className="todos">
                    <header className="header">
                        <input id="chooseAll" className="toggle-all" type="checkbox" onClick={this.chooseAll} />
                        <span>全选</span>
                        <input id="input" className="new-todo" placeholder="What needs to be done?" />
                    </header>

                    <TaskList dataSource={this.state.list} check={this.check} status={this.state.showWay} deleteTask={this.deleteTask} />

                    <Footer dataSource={this.state.list} showWay={this.state.showWay} showList={this.showList} clearCompleted={this.clearCompleted} />
                </div>

            </div>
        );
     }
}

export default Todo;
