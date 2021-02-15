<template>
  <aside class="sidebar" :class="{open: value}">
      <ul class="sidebar-list">
        <router-link active-class="active" exact tag="li" :to="item.url" class="sidebar-item" v-for="(item,index) of navList" :key="index">
          <a href="#" class="sidebar-link"><font-awesome-icon :icon="item.icon" />{{item.title | localize}}</a>
        </router-link>
      </ul>
  </aside>
</template>

<script>
export default {
    name: "Sidebar",
    props: ["value"],
    data() {
      return {
        navList: [
          {
            title: "Score",
            url: "/",
            icon: "calculator"
          },
          {
            title: "History",
            url: "/history",
            icon: "history"
          },
          {
            title: "Planning",
            url: "/planning",
            icon: "calendar-alt"
          },
          {
            title: "New-record",
            url: "/record",
            icon: "pen"
          },
          {
            title: "Category",
            url: "/categories",
            icon: "folder-open"
          },
        ]
      }
    }
}
</script>

<style lang="scss">
  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(-100%);
    width: 15%;
    height: 100%;
    transition: transform 0.5s ease;
    box-shadow: 1px 0px 1px 1px rgba(0,0,0,.2);
    &.open {
      transform: translateX(0);
    }
    &-item {
      &.active {
        background: rgba(0,0,0,.1);
      }
    }
    &-link {
      display: block;
      font-size: 14px;
      font-weight: 600;
      padding: 25px 15px;
      transition: all 0.3s ease-in-out;
      color: #000;
      & svg {
        margin-right: 10px;
      }
      &:hover {
        background: rgba(0,0,0,.1);
      }
    }
  }
</style>