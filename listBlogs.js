/**
 * Created by ss7690 on 9/7/17.
 */
blogHandler.view.listBlogs = {

    setUpUserInterface: function () {
        Blog.loadAll(blogHandler.view.listBlogs.handleData);

    },
    handleData: function () {
        console.log("Blogs", Blog.instances);
        var keys = Object.keys(Blog.instances);

        var navDiv = document.querySelector("#nav");
        var navList = document.createElement("ul");
        for (let i = 0; i < keys.length; i++) {
            var navLi = document.createElement("li");
            navLi.textContent = Blog.instances[keys[i]]["timestamp"] + " - " + Blog.instances[keys[i]]["title"];
            navList.appendChild(navLi);
        }
        navDiv.appendChild(navList);


        var blogsDiv = document.querySelector("#blogs");
        for (let i = 0; i < keys.length; i++) {
            for (let field in Blog.instances[keys[i]]) {
                var fieldDiv = document.createElement("div");
                fieldDiv.textContent = Blog.instances[keys[i]][field];
                blogsDiv.appendChild(fieldDiv);
            }
        }
    }
}