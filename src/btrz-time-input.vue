<template>
  <div :class="{
      'input--focused': focused,
      'input--empty': isEmpty,
      'input--filled': !isEmpty
    }">
    <btrz-label :id="id" :label="label"></btrz-label>
    <input
      class="clock-bkg form-control full-width"
      type="text"
      name="date"
      ref="timepicker"
      :value="value"
      :disabled="disabled"
      @keydown="onKeyDown"
      @keyup="onKeyUp"
      @input="userInput($event.target.value)"
      @click="selectElement"
      @keydown.right="switchElement"
      @keydown.left="switchElement"
      @keydown.up="increaseElement"
      @keydown.down="decreaseElement"
      @blur="focusUpdated('blur', $event.target.value);"
      @focus="focusUpdated('focus', $event.target.value);"/>
      <btrz-errors :errors="errors"></btrz-errors>
  </div>
</template>

<script>
import BtrzLabel from "../../btrz-vue-components/src/btrz-label";
import BtrzErrors from "../../btrz-vue-components/src/btrz-errors";

export default {
  name: 'BtrzTimeInput',
  components:{
    BtrzLabel,
    BtrzErrors
  },
  props: {
    value: {
      type: String,
      required: false,
      default: '00:00'
    },
    disabled: {
      type: Boolean
    },
    errors: {type: String}
  },
  computed: {
    hasError: {
      get() { return this.errors && this.errors.length > 0 }
    },
    isEmpty: {
      get() {
        return !Boolean(this.value);
      }
    }
  },
  methods: {
    timeChange() {
      this.inputRangeSelect();
      let hours = this.getHour();
      let minutes = this.getMinutes();
      if(hours > 23) {
        hours = 23;
      }
      if(minutes > 59) {
        minutes = 59;
      }
      let _hours = (hours<=9) ? "0" + hours : hours;
      let _minutes = (minutes<=9) ? "0" + minutes : minutes;
      this.value = _hours +":"+ _minutes;
    },
    onKeyDown(event) {
      var valid = "0123456789";
      let pressed = event.key || String.fromCharCode(event.keyCode);
      let hours = this.getHour();
      let minutes = this.getMinutes();
      let restrictedInHours = '3456789';
      let restrictedInMinutes = '6789';
      // Avoid selecting all the input content.
      if(this.$refs.timepicker.selectionStart === 0 && this.$refs.timepicker.selectionEnd) {
        this.$refs.timepicker.selectionStart = 0;
        this.$refs.timepicker.selectionEnd = 2;
      }
      // Enable only numbers to be inserted
      if (valid.indexOf(pressed) === -1) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // if hours selected and hours have one digit and its 0 next valids are 0123
        if (this.value.split(":")[0].length === 1) {
          if(parseInt(this.value.charAt(0)) === 2) {
            valid = '0123';
          }
          if(restrictedInHours.indexOf(this.value.charAt(0)) !== -1){
            event.preventDefault();
            event.stopPropagation();
          }
        }
        // if minutes selected and minutes have one digit and its a 2 next valids are 012345
        if (this.value.split(":")[1].length === 1) {
          if(parseInt(this.value.charAt(3)) === 2) {
            valid = '012345';
          }
          if(restrictedInMinutes.indexOf(this.value.charAt(3)) !== -1){
            event.preventDefault();
            event.stopPropagation();
          }
        }
        // No input allowed beyond 5 digits
        if(this.$refs.timepicker.selectionStart >= 5) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    },
    userInput(value){
      if(this.$refs.timepicker.selectionStart === 2) {
        this.selectedElement = 'minutes';
        this.$emit('timeChange', this.value);
      }
      this.value = value;
    },
    inputRangeSelect() {
      if (this.selectedElement === 'hours') {
        setTimeout(this.selectRange.bind(null, 0, 2), 0);
      }
      if (this.selectedElement === 'minutes') {
        setTimeout(this.selectRange.bind(null, 3, 5), 0);
      }
    },
    selectRange(start, end) {
      if (this.$refs.timepicker.setSelectionRange) { this.$refs.timepicker.focus(); this.$refs.timepicker.setSelectionRange(start, end); } /* WebKit */
      else if (this.$refs.timepicker.createTextRange) { var range = this.$refs.timepicker.createTextRange(); range.collapse(true); range.moveEnd('character', end); range.moveStart('character', start); range.select(); } /* IE */
      else if (this.$refs.timepicker.selectionStart) { this.$refs.timepicker.selectionStart = start; this.$refs.timepicker.selectionEnd = end; }
    },
    switchElement(element) {
      if(this.selectedElement === 'hours'){
        this.selectedElement = 'minutes';
      } else {
        this.selectedElement = 'hours';
      }
      this.$emit('timeChange', this.value);
    },
    selectElement() {
      if(this.$refs.timepicker.selectionStart < 2) {
        this.selectedElement = 'hours';
      }
      else {
        this.selectedElement = 'minutes';
      }
      this.$emit('timeChange', this.value);
    },
    increaseElement() {
      let hours = this.getHour();
      let minutes = this.getMinutes();
      if(this.selectedElement === 'hours') {
        if (hours < 23) {
          hours = hours +1;
        } else {
          hours = 0;
        }
      }
      if(this.selectedElement === 'minutes') {
        if(minutes < 59) {
          minutes = minutes +1;
        } else {
          minutes = 0;
        }
      }
      let _hours = (hours<=9) ? "0" + hours : hours;
      let _minutes = (minutes<=9) ? "0" + minutes : minutes;
      this.value = _hours +":"+ _minutes;
      this.$emit('timeChange', this.value);
    },
    decreaseElement() {
      let hours = this.getHour();
      let minutes = this.getMinutes();
      if(this.selectedElement === 'hours') {
        if (hours > 0) {
          hours = hours -1;
        } else {
          hours = 23;
        }
      }
      if(this.selectedElement === 'minutes') {
        if(minutes > 0) {
          minutes = minutes -1;
        } else {
          minutes = 59;
        }
      }
      let _hours = (hours<=9) ? "0" + hours : hours;
      let _minutes = (minutes<=9) ? "0" + minutes : minutes;
      this.value = _hours +":"+ _minutes;
      this.$emit('timeChange', this.value);
    },
    getHour() {
      return parseInt(this.value.split(':')[0] || "00");
    },
    getMinutes() {
      return parseInt(this.value.split(':')[1] || "00");
    },
    focusUpdated(focus, value) {
      this.$emit(focus, value);
      this.focused = !this.focused;
    }
  },
  mounted() {
    this.$on('timeChange', this.timeChange);
  },
  data () {
    return {
      selectedElement: null,
      focused: false
    }
  }
}
</script>
