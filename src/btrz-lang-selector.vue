<template v-if="languages && Object.keys(languages).length > 1">
  <div class="flex-item user-nav text-center">
    <span class="language-switcher">
      <select :value="lang" v-on:change="changeLang($event.target.value)">
        <option v-if="languages.en" value="en">English</option>
        <option v-if="languages.fr" value="fr">Français</option>
        <option v-if="languages.de" value="de">Deutsch</option>
        <option v-if="languages.nl" value="nl">Nederlands</option>
        <option v-if="languages.es" value="es">Español</option>
      </select>
    </span>
  </div>
</template>

<script>
  //usage: <btrz-lang-selector :languages="languages" v-model="lang"></btrz-lang-selector>
  export default {
    name: "BtrzLangSelector",
    model: {
      prop: 'language',
      event: 'change'
    },
    props: {
      "languages": Object,
      "language": String,
    },
    methods: {
      changeLang: function (val) {
        this.$emit("change", val);
      }
    },
    data () {
      return {lang: this.language};
    }
  };
</script>
