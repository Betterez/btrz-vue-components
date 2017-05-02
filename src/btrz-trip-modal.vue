<template>
  <div class="modal fade">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header text-center">
          <button type="button" class="close hidden-xs" data-dismiss="modal" aria-hidden="true">
            <i class="fa fa-times fa-lg"></i>
          </button>
          <h2 class="modal-title">{{$t("tripDetails")}}</h2>
        </div>
        <div class="modal-body">
          <div  v-for="(segment, i) of trip.segments">
            <div v-if="i != 0" id="connex">
              <div class="pull-left">{{$t("transfer")}}</div>
              <div class="pull-right"><small>{{$t("waitingTime")}}:</small> {{segment.stops[segment.stops.length -1].minsWaiting}}</div>
            </div>
            <div class="schedule-name">
              <div class="label label-info">{{segment.stops[0].scheduleDisplayName}}</div>
            </div>
            <ul class="itinerary">
              <li>
                <div class="small-text">{{segment.stops[0].departureDate}}</div>
                <div class="big-text">
                  {{segment.stops[0].departure | formatTime(accountPreferences.timeFormat[0])}} <span>{{segment.stops[0].name}}</span>
                </div>
              </li>
              <ul>
                <li v-for="(stop, j) of segment.stops" v-if="j != 0">
                  <div class="big-text">{{stop.departure | | formatTime(accountPreferences.timeFormat[0])}} <span>{{stop.name}}</span></div>
                </li>
                <i class="fa fa-arrow-down fromto-arrow fa-lg" v-if="!(segment.stops.length > 1)"></i>
              </ul>
              <li>
                <div class="big-text">
                  {{segment.stops[segment.stops.length - 1].arrival | formatTime(accountPreferences.timeFormat[0])}}
                  <span>{{segment.stops[segment.stops.length - 1].to}}</span>
                </div>
              </li>
            </ul>
            <div v-if="i === (trip.segments.length - 1)" class="text-right"><span class="small-text">{{$t('travelTime')}}:</span> {{trip.duration}}</div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="col-xs-6 pr5">
            <a class="btn btn-lg btn-default btn-block" data-dismiss="modal">{{$t('close')}}</a>
          </div>
          <div class="col-xs-6 pl5">
            <a class="btn btn-lg btn-success btn-block" @click="$emit('tripSelected', trip)" data-dismiss="modal">{{$t("chooseTrip")}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "BtrzTripModal",
    props: ["trip", "accountPreferences"]
  }
</script>
