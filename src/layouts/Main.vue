<template>
    <div class="wrapper">
        <Loader v-if="loading"/>
        <div class="main-content" v-else>
            <Header @click="isOpen = !isOpen" />
            <main class="main" :key="locale">
                <Sidebar v-model="isOpen" />
                <div class="content" :class="{full: !isOpen}">
                    <router-view/>
                </div>
                <router-link to="/record" class="link-add" v-tooltip="newCategory">
                    <font-awesome-icon icon="plus"/>
                </router-link>
            </main>
        </div>
    </div>
</template>

<script>
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import messages from "@/utils/messages"
import localizeFilter from "@/filters/localize.filter"
import {mapActions,mapState} from "vuex"
export default {
    name: "Main",
    data() {
        return {
            isOpen: true,
            loading: true
        }
    },
    methods: {
        ...mapActions(["fetchInfo"]),
    },
    computed: {
        ...mapState(["error","info"]),
        newCategory() {
            return localizeFilter("Create-new-category")
        },
        resultError() {
            return this.error;
        },
        locale() {
             return this.info.locale
        }
    },
   async mounted() {
        if(!this.info.balance || !this.info.name) {
            await this.fetchInfo()
        }
        this.loading = false;
    },
    watch: {
        resultError(fbError) {
            this.$error(messages[fbError.code] || localizeFilter("Something-went-wrong"))
        }
    },
    components: {
        Header,Sidebar
    }    
}
</script>
<style lang="scss">
.wrapper {
    position: relative;
    min-height: 100vh;
}
.link {
    &-add {
        position: absolute;
        display: flex;
        right: 2%;
        bottom: 2%;
        width: 50px;
        height: 50px;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--bg-color);
        color: #fff;
    }
}
.main {
    position: relative;
    display: flex;
    height: 90vh;
    justify-content: flex-end;
}
.content {
    width: 85%;
    padding: 50px 30px;
    transition: width 0.5s ease;
    &.full {
        width: 100%;
    }
}
</style>