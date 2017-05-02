<template>
  <li>
    <div class="col-xs-7 col-sm-4">
      <div class="small-text">{{trip.segments[0].departureDate}}</div>
      <div class="big-text">{{trip.departure | formatTime(accountPreferences.timeFormat[0])}} <span>{{trip.from}}</span></div>
      <i class="fa fa-arrow-down fromto-arrow fa-lg"></i>
      <div class="big-text">{{trip.arrival | formatTime(accountPreferences.timeFormat[0])}} <span>{{trip.to}}</span></div>
    </div>
    <div class="travel-time-column text-right col-xs-5 col-sm-2">
      <a class="check-trip phone trip-selection" @click="$emit('tripSelected', trip)"><i class="fa fa-check large-faicon"></i></a>
      <div class="small-text">{{$t('travelTime')}}</div>
      <div>{{trip.duration}}</div>
      <a :href="`#${index}`" data-toggle="modal">{{$t('tripDetails')}}</a>
    </div>
    <div class="col-xs-12 col-sm-3">
      <ul class="fare-list">
        <li v-for="fare of trip.fares">
          {{$t(fare.lexiconKeys.name)}} {{currency}}{{fare.valueToDisplay}}
        </li>
      </ul>
    </div>
    <a class="tablet col-sm-3 text-center trip-selection" @click="$emit('tripSelected', trip)">
      <i class="fa fa-check large-faicon"></i>
    </a>
  </li>
</template>
<script>
  export default {
    name: "BtrzTripResult",
    props: ["trip", "index", "currency", "accountPreferences"]
  }
</script>
