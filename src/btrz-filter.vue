<template>
    <div class="filter-section white-panel mb-20">
      <div class="row">
        <div class="col-xs-12 filters-header mt-30">
          <a class="btn btn-rounded btn-filter pull-right"><span class="hidden-xs">Hide filters</span></a>
          <h3 class="mt-0">{{title}}</h3>
        </div>
      </div>
      <form class="frm_filter" id="frm_filter" action="index.html" method="GET">
        <div id="filter" class="filter">
          <slot></slot>
        </div>
        <div class="actions">
          <input id="filter_find" type="submit" value="Apply filters" class="primary btn btn-primary btn-sm">
        </div>
      </form>
    </div>
</template>

<script>
  export default {
    name: "BtrzFilter",
    props: ["title"],
    props: {
      title: {
        type: String,
        default: 'Filter'
      }
    }
  }
</script>
