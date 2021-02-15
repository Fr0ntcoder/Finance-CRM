<template>
    <div class="loader">
        <div class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div><div class="gap-patch">
                    <div class="circle"></div>
                </div><div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Loader",
    computed: {
        color() {
            const color = ["spinner-blue-only","spinner-red-only","spinner-green-only"];

            return color[Math.floor(Math.random() * 3)]
        }
    }
}
</script>

<style>

</style>