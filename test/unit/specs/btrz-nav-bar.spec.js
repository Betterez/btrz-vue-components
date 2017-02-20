import Vue from 'vue'
import BtrzNavBar from '../../../src/btrz-nav-bar.vue'
import { expect } from "chai";

describe('BtrzNavBar', () => {
  it('The component name should be BtrzNavBar', () => {
    expect(BtrzNavBar.name).to.equal('BtrzNavBar')
  })
})
