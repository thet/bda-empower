<template>
  <div>
  <section v-for="msg, cnt in messages" :key="`portal_message-${cnt}`" class="portal-message" :class="`message_type`">
    <header class="portal-message-header">
      {{ msg.title }}
    </header>
    <div class="portal-message-content">
      {{ msg.text }}
    </div>
  </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {

  computed: {
    ...mapState({
      messages: state => state.portal_message.messages,
    })
  }

};
</script>
