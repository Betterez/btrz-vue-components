<template>
  <div>
    <input class="form-control calendar-bkg"
           ref="input"
           :id="id"
           :disabled="disabled"/>
    <input type="hidden" :name="name" :value="value" />
  </div>
</template>

<script>
  import moment from "moment";

  const pickadateI18nStrings = {
    en: {
      monthsFull: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      weekdaysFull: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      // Buttons
      today: "Today",
      clear: "Clear",
      close: "Close",
      // Accessibility labels
      labelMonthNext: "Next month",
      labelMonthPrev: "Previous month",
      labelMonthSelect: "Select a month",
      labelYearSelect: "Select a year",
    },
    fr: {
      monthsFull: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      monthsShort: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"],
      weekdaysFull: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      // Buttons
      today: "Aujourd\"hui",
      clear: "Effacer",
      close: "Fermer",
      // Accessibility labels
      labelMonthNext: "Mois suivant",
      labelMonthPrev: "Mois précédent",
      labelMonthSelect: "Sélectionner un mois",
      labelYearSelect: "Sélectionner une année"
    }
  };

  export default {
    name: "BtrzDateInput",
    dependencies: ["logger"],
    props: {
      id: {type: String},
      placeholder: {type: String},
      name: {type: String},
      "value": {"default": null},
      // value: Supports setting Date, [YEAR, MONTH, DAY], timestamp (int) or string matching submitFormat
      displayFormat: {type: String, "default": "d mmmm, yyyy"}, // Pickadate format
      submitFormat: {type: String, "default": "YYYY-MM-DD"}, // Momentjs format
      minDate: {"default": false},
      lang: {type: String, required: true},
      disabled: {type: Boolean, "default": false}
    },
    model: {
      prop: "value",
      event: "change"
    },
    watch: {
      value(newValue) {
        this.setPickadateDate(newValue);
      },
      lang(newLang) {
        const translations = this.getTranslation(newLang);
        Object.assign(this.picker.component.settings, translations);
        this.picker.set("select", this.picker.get("select"), {muted: true});
        this.picker.render(true);
      },
      minDate(newMinDate) {
        this.setPickadateMinDate(newMinDate);
      }
    },
    mounted() {
      require("imports-loader?define=>false!pickadate/lib/picker.date");
      require("pickadate/lib/themes/default.css");
      require("pickadate/lib/themes/default.date.css");

      const baseConfig = {
        onSet: this.onSet,
        format: this.displayFormat
      };

      const translations = this.getTranslation(this.lang);
      const config = Object.assign(baseConfig, translations);
      const $input = $(this.$refs.input).pickadate(config);
      this.picker = $input.pickadate("picker");
      this.setPickadateDate(this.value);
      this.setPickadateMinDate(this.minDate);
    },
    methods: {
      formatDate(date) {
        if (this.submitFormat) {
          return date ? moment(date).format(this.submitFormat) : date;
        } else {
          return date;
        }
      },
      onSet(context) {
        if ("select" in context) {
          const date = this.formatDate(context.select);
          this.$emit("change", date);
        } else if ("clear" in context) {
          this.$emit("change", null);
        }
      },
      getTranslation(lang) {
        if (!(this.lang in pickadateI18nStrings)) {
          this.logger.warn("Could not find the specified language, defaulting to english...");
          return pickadateI18nStrings.en;
        }
        return pickadateI18nStrings[lang];
      },
      setPickadateMinDate(minDate) {
        let parsedMinDate = null;
        if (minDate) {
          parsedMinDate = this.submitFormat ? moment(minDate, this.submitFormat).toDate() : minDate;
          const selectedDate = this.picker.get("select");
          if (selectedDate) {
            if (moment(selectedDate.obj).isBefore(parsedMinDate, "days")) {
              this.setPickadateDate(null);
              this.$emit("change", null);
            }
          }
        } else {
          parsedMinDate = false;
        }
        this.picker.set("min", parsedMinDate);
      },
      setPickadateDate(newDate) {
        let date = null;

        if (typeof (newDate) === "string") {
          if (this.submitFormat) {
            date = moment(newDate, this.submitFormat);
            if (!date.isValid()) {
              throw date.toString();
            }
            date = date.toDate();
          } else {
            throw "No submitFormat specified for this date";
          }
        } else if (newDate === null) {
          date = null;
        } else {
          date = moment(newDate).toDate();
        }
        this.picker.set("select", date, {muted: true});
      }
    }
  };

</script>
