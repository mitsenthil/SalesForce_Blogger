/**
 * Created by ss7690 on 9/7/17.
 */
blogHandler.view.deleteBlog = {
    setUpUserInterface: function () {
        var deleteForm = document.forms['deleteBlog'],
            saveButton = document.forms['deleteBlog'].commit;
        Blog.loadAll(blogHandler.view.deleteBlog.handleData);
        saveButton.addEventListener("click", blogHandler.view.deleteBlog.handleSaveButton);
    },

    handleSaveButton: function () {

        var deleteForm = document.forms['deleteBlog'];
        var key = deleteForm.selectBlog.value;
        if (key) {
            Blog.delete(key);
            deleteForm.reset();
        }
    },
    handleData: function () {
        var deleteForm = document.forms['deleteBlog'];
        var keys = Object.keys(Blog.instances);
        var selectBlog = document.forms['deleteBlog'].selectBlog;
        for (let i = 0; i < keys.length; i++) {
            var optionEl = document.createElement("option");
            optionEl.text = Blog.instances[keys[i]].title;
            optionEl.value = Blog.instances[keys[i]].id;
            selectBlog.add(optionEl, null);
        }
    }

}