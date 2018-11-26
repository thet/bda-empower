<template>
  <div class="viewWrapper">
    <h1>{{ context.title }}</h1>

    <nav>
      <ul>
        <li v-for="item in context.items">
          <router-link :to="{ name: 'view-factory' }">{{ item.title }}</router-link>
        </li>
      </ul>

    </nav>

  </div>
</template>
<script>
export default {
  props: ['context'],
}
</script>
