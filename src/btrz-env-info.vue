<template>
  <div class="env-info">Version: <a :href="commitUrl" target="_blank">{{version}}</a> - ServerId: {{serverId}}</div>
</template>

<script>
  export default {
    name: "BtrzEnvInfo",
    props: ["commitUrl", "version", "serverId"],
  }
</script>
