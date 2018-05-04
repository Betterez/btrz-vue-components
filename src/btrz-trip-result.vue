<template>
  <li>
    <div class="col-xs-7 col-sm-4">
      <div class="small-text brand">{{trip.segments[0].brandName}}</div>
      <div class="small-text">{{trip.segments[0].departureDate}}</div>
      <div class="big-text">{{trip.departure | formatTime(accountPreferences.timeFormat[0])}} <span>{{trip.from}}</span></div>
      <div>
      	<i class="fa fa-arrow-down fromto-arrow fa-lg"></i>
      	<div :class="`small ${transferQty===0 ? 'text-success' : transferQty===1 ? 'text-info' : 'text-warning'} text-uppercase transfer-indicator`">
          {{transferQty===0 ? $t("noTransfers") : transferQty===1 ? `${transferQty} ${$t("transfer")}` : `${transferQty} ${$t("transfers")}`}}
        </div>
      </div>
      <div class="big-text">{{trip.arrival | formatTime(accountPreferences.timeFormat[0])}} <span>{{trip.to}}</span></div>
    </div>
    <div class="travel-time-column text-right col-xs-5 col-sm-2">
      <a class="check-trip phone trip-selection" @click="$emit('tripSelected', trip)"><i class="fa fa-check large-faicon"></i></a>
      <div class="small-text">{{$t('travelTime')}}</div>
      <div>{{trip.duration}}</div>
      <a class="trip-details" :href="`#${index}`" @click="$emit('openTripDetails')" data-toggle="modal">{{$t('tripDetails')}}</a>
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
    props: ["trip", "index", "currency", "accountPreferences"],
    data() {
      return {
        transferQty: this.trip.segments.length - 1
      };
    }
  };
</script>
