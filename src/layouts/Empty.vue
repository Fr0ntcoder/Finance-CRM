<template>
    <router-view/>
</template>

<script>
import messages from "@/utils/messages"
import localizeFilter from "@/filters/localize.filter"
import {mapState} from "vuex"
export default {
    name: "Empty",
    computed: {
        ...mapState(["error"]),
        resultError() {
            return this.error;
        }
    },
    watch: {
        resultError(fbError) {
            this.$error(messages[fbError.code] || localizeFilter("Something-went-wrong"))
        }
    }

}
</script>

<style>

</style>