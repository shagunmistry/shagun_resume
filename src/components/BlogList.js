import React, { Component } from 'react';
import firebaseApp from '../Firebase';
import Quill from 'quill';

require('firebase/firestore');
require('../Styles/blogs.css');

const db = firebaseApp.firestore();
class BlogList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogList: [],
            blogData: {},
            showBlogList: false,
        };
    }


    componentDidMount() {
        let blogList = [], referThis = this;
        console.log('State: ', this.props.match.params);
        if (this.props.match.params.blogid) {
            console.log('State 2: ', this.props.match.params.blogid);
            // The user is on a specific blog.
            db.collection('blogs').doc(this.props.match.params.blogid).get()
                .then((res) => {
                    console.log('Res: ', res.data());
                    const container = document.getElementById('blogEditor');
                    const editor = new Quill(container, {
                        modules: { toolbar: null },
                        theme: 'snow',
                        readOnly: true,
                    });
                    editor.setContents(JSON.parse(res.data().blogData));
                    referThis.setState({
                        blogData: {
                            title: res.data().blogTitle,
                            delta: res.data().blogData,
                        }
                    })
                })
                .catch((err) => {
                    console.log('There was an error getting particular blog info: ', err);
                    this.setState({
                        showBlogList: true,
                    })
                })
        }
        else {
            db.collection('blogs').get().then((res) => {
                res.forEach((eachBlog) => {
                    blogList.push({
                        blogTitle: eachBlog.data().blogTitle,
                        id: eachBlog.id,
                    });
                });
                referThis.setState({
                    blogList: blogList,
                    showBlogList: true,
                });
            });
        }

    }

    render() {
        if (this.state.showBlogList) {
            return (
                <div className='container'>
                    <div className='card blogsListCard'>
                        <h2 className='card-header blogListCardHeader'>Blogs</h2>
                        <div className='card-block'>
                            <ul className='list-group'>
                                {
                                    this.state.blogList.length > 0 ?
                                        this.state.blogList.map((eachBlog, idx) => {
                                            console.log('Blog: ', eachBlog.blogTitle);
                                            return (
                                                <li className='list-group-item blogListItem' key={idx}>
                                                    <a href={`/blogs/${eachBlog.id}`}>
                                                        {eachBlog.blogTitle}
                                                    </a>
                                                </li>
                                            )
                                        }) :
                                        <li className='list-group-item blogListItem'>No Blogs found.</li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <div className='container'>
                <h1 className='text-center'>{this.state.blogData.title}</h1>
                <hr />
                <div id='blogEditor'></div>
            </div>
        );
    }


}

export default BlogList;