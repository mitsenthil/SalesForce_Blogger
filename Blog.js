/**
 * Created by ss7690 on 9/7/17.
 */


var blogHandler = {view: {}, ctrl: {}, model: {}};

Blog.instances = {};

function Blog(blogObj) {

    this.id = blogObj.id;
    this.title = blogObj.title;
    this.text = blogObj.text;
    this.timestamp = blogObj.timestamp;
}

function makeRequest(opts) {

    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method, opts.url);
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        if (opts.headers) {
            Object.keys(opts.headers).forEach(function (key) {
                xhr.setRequestHeader(key, opts.headers[key]);
            });
        }
        var params = opts.params;
        var jsonStr = JSON.stringify(params);
        xhr.send(jsonStr);
    });
}


Blog.loadAll = function (cb) {
    makeRequest({
        method: 'GET',
        url: 'http://restedblog.herokuapp.com/senthilkumarshanmugam/api/'
    }).then(function (data) {
        let blogs = JSON.parse(data);
        console.log(blogs);
        for (let blog of blogs) {
            Blog.instances[blog.id] = new Blog({
                id: blog.id,
                title: blog.title,
                text: blog.text,
                timestamp: blog.timestamp
            });
        }
    }).then(cb)
        .catch(function (err) {
            console.error('Error in fetching blogs', err.statusText);
        });
}

Blog.create = function (blogObj) {
    var blog = new Blog(blogObj);
    makeRequest({
        method: 'POST',
        url: 'http://restedblog.herokuapp.com/senthilkumarshanmugam/api/',
        header: {'Content-type': 'application/json; charset=utf-8'},
        params: blog
    }).then(function (data) {
        let blogs = JSON.parse(data);
        console.log(blogs);

    })
        .catch(function (err) {
            console.error('Error in creating blogs', err.statusText);
        });
}

Blog.update = function (blogObj) {
    var blog = new Blog(blogObj);
    makeRequest({
        method: 'POST',
        url: 'http://restedblog.herokuapp.com/senthilkumarshanmugam/api/' + blog.id,
        header: {'Content-type': 'application/json; charset=utf-8'},
        params: blog
    }).then(function (data) {
        let blogs = JSON.parse(data);
        console.log(blogs);

    })
        .catch(function (err) {
            console.error('Error in updating blogs', err.statusText);
        });
}

Blog.delete = function (id) {
    makeRequest({
        method: 'DELETE',
        url: 'http://restedblog.herokuapp.com/senthilkumarshanmugam/api/' + id
    }).then(function (data) {
        let blogs = JSON.parse(data);
        console.log(blogs);

    })
        .catch(function (err) {
            console.error('Error in updating blogs', err.statusText);
        });
}