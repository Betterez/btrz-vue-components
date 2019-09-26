<template>
  <div :class="{
      'input--focused': focused,
      'input--empty': isEmpty,
      'input--filled': !isEmpty
    }">
    <btrz-label :id="id" :label="label"></btrz-label>
    <input class="form-control calendar-bkg"
    ref="input"
    :id="id"
    :name="name"
    :disabled="disabled"
    @input="valueUpdated($event.target.value);"
    @blur="focusUpdated('blur', $event.target.value);"
    @focus="focusUpdated('focus', $event.target.value);"/>
    <span aria-atomic="true" aria-live="assertive" class="sr-only">{{displayDate}}</span>
    <span :id="assertiveId" aria-atomic="true" aria-live="assertive" class="sr-only"></span>
    <btrz-errors :errors="errors"></btrz-errors>
  </div>
</template>

<script>
  import moment from "moment";
  import BtrzLabel from "../../btrz-vue-components/src/btrz-label";
  import BtrzErrors from "../../btrz-vue-components/src/btrz-errors";

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
    },
    de: {
      monthsFull: ["August", "April", "Mai", "April", "Mai", "April", "Mai", "April", "Mai", "August"],
      monthsShort: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"],
      weekdaysFull: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
      weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      // Buttons
      today: "Heute",
      clear: "Klar",
      close: "Schließen",
      // Accessibility labels
      labelMonthNext: "Nächsten Monat",
      labelMonthPrev: "Vorheriger Monat",
      labelMonthSelect: "Wähle einen Monat",
      labelYearSelect: "Wählen Sie ein Jahr aus"
    },
    nl: {
      monthsFull: ["Januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],
      monthsShort: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"],
      weekdaysFull: ["Zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
      weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      // Buttons
      today: "Vandaag",
      clear: "Duidelijk",
      close: "Dichtbij",
      // Accessibility labels
      labelMonthNext: "Mois suivant",
      labelMonthPrev: "Mois précédent",
      labelMonthSelect: "Sélectionner un mois",
      labelYearSelect: "Sélectionner une année"
    }
  };

  export default {
    name: "BtrzDateInput",
    components: {
      BtrzLabel,
      BtrzErrors
    },
    dependencies: ["logger"],
    computed: {
      getAriaLabel() {
        if (this.ariaLabel) {
          return this.ariaLabel.concat(" ");
        } 
        else {
          return this.label ? this.label.concat(" ") : "";
        }
      },
      getLabel() {
        return this.label ? this.label.concat(" ") : "";
      } 
    },    
    props: {
      id: {type: String, default: ('_' + Math.random().toString(36).substr(2, 9))},
      placeholder: {type: String},
      name: {type: String},
      "value": {"default": null},
      // value: Supports setting Date, [YEAR, MONTH, DAY], timestamp (int) or string matching submitFormat
      displayFormat: {type: String, "default": "dd mmmm, yyyy"}, // Pickadate format.
      submitFormat: {type: String, "default": "YYYY-MM-DD"}, // Momentjs format.
      minDate: {"default": false},
      maxDate: {"default": false},
      lang: {type: String, required: true},
      disabled: {type: Boolean, "default": false},
      errors: {type: Object},
      label: {type: String},
      ariaLabel: {type: String},      
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
        this.setPickadateLimit(newMinDate, "min");
      },
      maxDate(newMaxDate) {
        this.setPickadateLimit(newMaxDate, "max");
      }
    },
    mounted() {
      require("imports-loader?define=>false!pickadate/lib/picker.date");
      require("pickadate/lib/themes/default.css");
      require("pickadate/lib/themes/default.date.css");

      const baseConfig = {
        onSet: this.onSet,
        onClose: this.onClose,
        onOpen: this.onOpen,        
        format: this.displayFormat
      };

      const translations = this.getTranslation(this.lang);
      const config = Object.assign(baseConfig, translations);
      const $input = $(this.$refs.input).pickadate(config);
      this.picker = $input.pickadate("picker");
      this.pickerSelector = "#".concat(this.id, "_root");

      $input.on('mousedown',function(event){
         event.preventDefault();
      })

      this.setPickadateDate(this.value);
      this.setPickadateLimit(this.minDate, "min");
      this.setPickadateLimit(this.maxDate, "max");

      var updateAssertive = function(id, e) {
        var key = e.which || e.keyCode;
        if (key === 27 || key === 13) return;

        const date = document.querySelector(this.pickerSelector.concat(" .picker__day.picker__day--infocus.picker__day--highlighted"));
        document.querySelector("#".concat(id)).innerHTML = date.getAttribute("aria-label");
      }
      document.querySelector(this.pickerSelector).addEventListener("keyup", updateAssertive.bind(this, this.assertiveId) )

      document.querySelector(this.pickerSelector.concat(" .picker__wrap")).setAttribute("aria-label","Use arrow keys to navigate");
     
    },
    methods: {
      formatDate(date) {
        if (this.submitFormat) {
          return date ? moment(date).format(this.submitFormat) : date;
        } else {
          return date;
        }
      },
      onOpen() {
        const date = document.querySelector(this.pickerSelector.concat(" .picker__day.picker__day--infocus.picker__day--highlighted"));
        if (date) document.querySelector("#".concat(this.assertiveId)).innerHTML = this.getAriaLabel.concat(date.getAttribute("aria-label"));
      },      
      onClose() {
        document.querySelector("#".concat(this.assertiveId)).innerHTML = "";
      },      
      onSet(context) {

        if ("select" in context) {
          if (typeof context.select === 'object' )
            context.select = context.select.pick;  
            
          this.displayDate = this.getLabel.concat(this.$refs.input.value.concat(" selected."));            
                 
          const date = this.formatDate(context.select);
          this.$emit("change", date);
          this.isEmpty = !Boolean(date);
        } else if ("clear" in context) {

          this.displayDate = "";
          
          this.$emit("change", null);
          this.isEmpty = !Boolean(null);
        }
      },
      getTranslation(lang) {
        if (!(this.lang in pickadateI18nStrings)) {
          this.logger.warn(`Could not find the ${this.lang} language, defaulting to english...`);
          return pickadateI18nStrings.en;
        }
        return pickadateI18nStrings[lang];
      },
      setPickadateLimit(date, limit) {
        let parsedDate = null;

        if (date) {
          parsedDate = this.submitFormat ? moment(date, this.submitFormat).toDate() : date;
          const selectedDate = this.picker.get("select");
          if (selectedDate) {
            const isSelectedDateBeforeMinDate = (limit === "min" && moment(selectedDate.obj).isBefore(parsedDate, "days")),
              isSelectedDateAfterMaxDate = (limit === "max" && moment(selectedDate.obj).isAfter(parsedDate, "days"));

          // Clear value of input if the selected date is before the min date or after the max date
            if (isSelectedDateBeforeMinDate || isSelectedDateAfterMaxDate) {
              this.setPickadateDate(null);
              this.$emit("change", null);
            }
          }
        } else {
          parsedDate = false;
        }
        this.picker.set(limit, parsedDate);
      },
      setPickadateDate(newDate) {
        let date = null;

        if (typeof (newDate) === "string") {
          if (this.submitFormat) {
            date = moment(newDate, this.submitFormat);
            if (!date.isValid()) {
              throw new Error(date.toString());
            }
            date = date.toDate();
          } else {
            throw new Error("No submitFormat specified for this date");
          }
        } else if (newDate === null) {
          date = null;
        } else {
          date = moment(newDate).toDate();
        }
        this.picker.set("select", date, {muted: true});
      },
      valueUpdated(value) {
        this.inputValue = value;
      },
      focusUpdated(focus, value) {
        this.focused = !this.focused;
      }
    },
    data() {
      return {
        displayDate: '', 
        isEmpty: true, 
        focused: false, 
        inputValue: this.value,
        assertiveId: ('_' + Math.random().toString(36).substr(2, 9)),
        pickerSelector: ''};
    }
  };

</script>
