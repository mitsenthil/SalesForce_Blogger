/**
 * Created by ss7690 on 9/7/17.
 */
blogHandler.view.updateBlog = {
    setUpUserInterface: function () {
        var updateForm = document.forms['upBlog'],
            saveButton = document.forms['upBlog'].commit;


        Blog.loadAll(blogHandler.view.updateBlog.handleData);


        saveButton.addEventListener("click", blogHandler.view.updateBlog.handleSaveButton);
    },

    handleSaveButton: function () {

        var updateForm = document.forms['upBlog'];
        var key = updateForm.selectBlog.value;
        if (key) {
            var blog = {
                id: key,
                title: updateForm.title.value,
                text: updateForm.content.value

            }
            Blog.update(blog);
            updateForm.reset();
        }
    },
    handleData: function () {
        var updateForm = document.forms['upBlog'];
        var keys = Object.keys(Blog.instances);
        var selectBlog = document.forms['upBlog'].selectBlog;
        for (let i = 0; i < keys.length; i++) {
            var optionEl = document.createElement("option");
            optionEl.text = Blog.instances[keys[i]].title;
            optionEl.value = Blog.instances[keys[i]].id;
            selectBlog.add(optionEl, null);
        }
        selectBlog.addEventListener("change", function () {
            var blog = null, key = selectBlog.value;
            if (key) {
                blog = Blog.instances[key];
                updateForm.title.value = blog.title;
                updateForm.content.value = blog.text;
            } else {
                updateForm.reset();
            }
        })
    }

}