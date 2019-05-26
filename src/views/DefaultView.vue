<template>
  <div class="viewWrapper">
    <h1>{{ context.title }}</h1>
  </div>
</template>
<script>
export default {

  props: {
    context: {
      type: Object,
      required: true
    }
  }

};
</script>
