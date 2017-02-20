<template>
  <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="pull-left">
        <slot name="left">
        </slot>
      </div>
      <div class="navbar-collapse flex-container-right">
        <slot name="right">
        </slot>
      </div>
    </nav>
</template>

<script>
export default {
  name: "BtrzNavBar"
};
</script>
