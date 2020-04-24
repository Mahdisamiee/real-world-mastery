<template>
    <div id="app">
        <div id="nav">
            <!-- with the name routes we have this advantage, when we want to change the url we simply change that in one place
        and nolomger need to change it every where that use from that path.
      -->
            <router-link :to="{ name: 'event-list' }">List</router-link> |
            <router-link :to="{ name: 'event-show' }"
                >Show event #1</router-link
            >
            |
            <router-link :to="{ name: 'event-create' }">create</router-link>
        </div>
        <router-view />
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
