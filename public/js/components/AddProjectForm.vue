<template>
    <div>
        <form @submit.prevent="saveProject">
            <div class="md-form mb-5">
                <input type="text" id="name" class="form-control required" v-model="project.name">
                <label for="name">Project name</label>
            </div>

            <div class="md-form mb-5">
                <input type="text" id="url" class="form-control required" v-model="project.baseUrl">
                <label for="url">Base url</label>
            </div>

            <div class="md-form mb-5">
                <textarea type="text" id="description" class="md-textarea form-control" rows="3" v-model="project.description"></textarea>
                <label for="description">Description</label>
            </div>

            <div class="md-form mb-5">
                <div class="custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="publish" v-model="project.isPublished">
                    <label class="custom-control-label" for="publish">Published?</label>
                </div>
            </div>

            <hr>
            <div class="md-form text-right">
                <button type="submit" class="btn btn-default">Add project</button>
            </div>
        </form>
    </div>
</template>

<script>
module.exports = {
    data () {
        return {
            project: {}
        }
    },
    methods: {
        saveProject() {
            this.axios.post("/projects/create", this.project)
            .then((response) => {
                location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>

