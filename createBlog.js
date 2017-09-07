/**
 * Created by ss7690 on 9/7/17.
 */
blogHandler.view.createBlog = {
    setUpUserInterface: function () {
        var saveButton = document.forms['Blog'].commit;
        saveButton.addEventListener("click", blogHandler.view.createBlog.handleSaveButton);
    },

    handleSaveButton: function () {
        var createForm = document.forms['Blog'];
        var blog = {
            title: createForm.title.value,
            text: createForm.content.value

        }
        Blog.create(blog);
        createForm.reset();
    }

}