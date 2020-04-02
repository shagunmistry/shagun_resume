import React, { Component } from 'react';
import firebase from 'firebase';
import firebaseApp from '../Firebase';
import Quill from 'quill';

require('firebase/firestore');
require('../Styles/blogs.css');

const db = firebaseApp.firestore();
let quill;

const toolbarOptions = [
    ['bold', 'italic'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image'],
    [{ 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
];

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
        }
    }


    componentDidMount() {
        let referThis = this;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                referThis.setState({
                    signedIn: true,
                });
                const container = document.getElementById('editor');
                const editor = new Quill(container, {
                    modules: { toolbar: toolbarOptions },
                    theme: 'snow',
                    placeholder: 'Compose an epic...',
                    readOnly: false,
                });
                quill = editor;
            }
        });
    }

    getContentsAndSave = () => {
        if (quill) {
            // This is an array
            const content = quill.getContents();
            const blogTitle = document.getElementById('blogTitleInput').value;

            let text = "";
            const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < 5; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            if (this.state.signedIn) {
                db.collection('blogs').doc(text).set({
                    blogData: JSON.stringify(content),
                    blogTitle: blogTitle,
                }).catch((err) => {
                    window.alert('Error adding blog: ', err);
                }).then((res) => {
                    console.log('Success adding blog: ', res);
                    document.getElementById('apiMessage').innerText = 'Successfully added blog!';
                    quill.setText('');
                    document.getElementById('blogTitleInput').value = '';
                });
            }
        }
    }


    render() {
        if (!this.state.signedIn) {
            return (
                <div className='container'>
                    Please sign in.
                </div>
            );
        }
        return (
            <div className='container card-container'>
                <h1>Blogs</h1>
                <div className='card addBlogCard'>
                    <input type="text" className="form-control" placeholder="Blog Title" id='blogTitleInput' aria-describedby="basic-addon1">
                    </input>
                    <br />
                    <div className='card-block' id='editor'></div>
                    <div className='card-footer blog-card-footer'>
                        <button className='btn btn-sm btn-primary' onClick={() => this.getContentsAndSave()}>Save blog</button>
                        <br />
                        <small id='apiMessage'></small>
                    </div>
                </div>
            </div >
        );
    }
}

export default Blog;