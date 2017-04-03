<template>
  <ul class="flex-item hidden-xs hidden-sm nav wizard-nav navbar-nav">
    <template v-for="(item, index) of routes">
      <li :class="[item.active ? 'active' : '', index > activeStep ? 'disabled' : 'completed']">
          <a v-if="index < activeStep" :href="item.path"><small>{{$t(item.title)}}</small></a>
          <a v-if="!(index < activeStep)"><small>{{$t(item.title)}}</small></a>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  name: "BtrzWizard",
  props: ["routes"],
  computed: {
    activeStep() {
      return this.routes.find(r => r.active).step;
    }
  }
};
</script>
