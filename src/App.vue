<template>
  <div id="app">
        <component :is="layout">
          <router-view/>
        </component>
  </div>
</template>
<script>
import Empty from "@/layouts/Empty"
import Main from "@/layouts/Main"
  export default {
    components: {
      Empty,Main
    },
    computed: {
      layout() {
        return this.$route.meta.layout || "empty"
      }
    }
  }
</script>
<style lang="scss">
@import "assets/css/reset.css";
@import "assets/css/constants.css";
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
body,html {
  font-family: "Roboto",sans-serif;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bolder;
}
.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%)
}
.wrap {
  position: relative;
  height: 100%;
}
.inner {
    &-title {
      display: flex;
       font-size: 25px;
        font-weight: 400; 
        padding-bottom: 15px;
        margin-bottom: 30px; 
        justify-content: space-between;
        border-bottom: 1px solid #dad4d4;
    }
}
.form {
    &-title {
        font-size: 22px;
        font-weight: 400; 
        margin-bottom: 30px; 
    }
    &-group {
            position: relative;
            margin-bottom: 30px;
            & input:not([type="radio"]) {
            width: 100%;
            font-size: 14px;
            padding-bottom: 10px;
            margin-bottom: 30px;
            border-bottom: 1px solid #dad4d4;
            color: #8f8c8c;
            &::-moz-placeholder {
                color: #8f8c8c;
            }
            &::-webkit-input-placeholder {
                color: #8f8c8c;
            }
      }   
      & select {
              width: 100%;
              font-size: 14px;
              padding: 5px 0;
              margin-bottom: 30px;
              border: 1px solid #dad4d4;
              color: #8f8c8c;
        }
    }
    &-error {
            position: absolute;
            font-size: 12px;
            left: 0;
            bottom: -15px;
            color: red;
      }
    &-btn {
            font-size: 16px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background:var(--btn-color);
            color: #fff;
            & svg {
                margin-left: 15px;
            }
        }
  &-radio {
    display: flex;
    &__group {
      display: flex;
      align-items: center;
      margin-right: 15px;
      color: #8f8c8c;
      & input {
        width: 15px;
        height: 15px;
        margin-right: 10px;
      }
    }
  }
}
</style>
