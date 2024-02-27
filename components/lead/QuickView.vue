<template>
  <div class="right-quick-view pl10">
    <div class="rightClickBox">
      <div class="common-box-header">
        <h2 class="title">Quick View</h2>
      </div>
      <div class="box customscrollbar dl-detail-left ld-detail-left p0">
        <div class="dl-detail-left-fr">
          <div class="box-heading">
            <div class="clearfix mb1">
              <div class="pull-right">
                <a class="close-quick-view" @click="$emit('activateQuickView')">
                  <CloseIcon :is-white="true" />
                </a>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-5">
                <div
                  v-if="quickView.data.logo"
                  class="pr-img r11"
                  :class="[!quickView.data.logo ? 'border' : '']"
                >
                  <img
                    :src="quickView.data.logo"
                    alt=""
                    class="img-responsive"
                  />
                </div>
                <div v-else class="pr-char r11 border">
                  <span>
                    {{
                      (quickView.data.name + quickView.data.email)
                        .trim()
                        .charAt(0)
                    }}
                  </span>
                </div>
              </div>
              <div class="col-lg-7">
                <div
                  v-if="quickView.info && quickView.info.is_current_owner == 1"
                  class="media sc_media"
                >
                  <img
                    src="@/assets/img/logo-alt.svg"
                    alt=""
                    style="width: 27px"
                  />
                  <div class="media-body align-self-center">
                    <h5>OWNER</h5>
                  </div>
                </div>
                <h3>{{ quickView.data.name }}</h3>
                <nuxt-link
                  :to="{
                    name: 'workspace_id-lead-leads-id',
                    params: {
                      workspace_id: $_auth().id,
                      id: quickView.data.id,
                    },
                  }"
                  class="view-profile"
                  >View Full Profile</nuxt-link
                >
              </div>
            </div>
          </div>
          <div class="dealer-contact">
            <div class="media sc_media">
              <EmailIcon />
              <div class="media-body align-self-center">
                <h5>Email</h5>
                <p>
                  <a :href="getEmail">{{ quickView.data.email }}</a>
                </p>
              </div>
            </div>
            <div class="media sc_media">
              <PhoneIcon />
              <div class="media-body align-self-center">
                <h5>Phone</h5>
                <p>
                  <a :href="getPhone">{{ quickView.info.phone }}</a>
                </p>
              </div>
            </div>
            <div class="media sc_media">
              <HomeIcon />
              <div class="media-body align-self-center">
                <h5>Address</h5>
                <p>
                  {{ quickView.info && quickView.info.address_line_1
                  }}<br v-if="quickView.info.address_line_1" />
                  {{ quickView.info && quickView.info.address_line_2
                  }}<br v-if="quickView.info.address_line_2" />
                  City:
                  {{ (quickView.info && quickView.info.city) || '-' }}
                  <br />
                  State: {{ (quickView.info && quickView.info.state) || '-'
                  }}<br />
                  Zip-Code:
                  {{ (quickView.info && quickView.info.zip_code) || '-' }}<br />
                  Country:
                  {{ (quickView.info && quickView.info.country) || '-' }}
                </p>
              </div>
            </div>
          </div>
          <ul
            v-if="quickView.info.products && quickView.info.products.length"
            class="ld-list ld-list-bordered"
          >
            <li v-for="product of products" :key="product.assignment_id">
              <div class="clearfix mb20">
                <div class="pull-left">
                  <h5>Model</h5>
                  <p>{{ product.product_name }}</p>
                  <!-- Broken variant options response -->
                  <!-- Need to fix the response according to the design -->
                  <!-- <div
                        v-if="
                          product.product_variant_data.variant_options_detailes
                        "
                      >
                        <span>{{
                          product.product_variant_data.variant_options_detailes
                            .option_name || '-'
                        }}</span>
                      </div> -->
                </div>
                <div class="pull-right">
                  <span class="class bg-blue">{{
                    product.product_variant_data &&
                    product.product_variant_data.category_detailes &&
                    product.product_variant_data.category_detailes.name
                  }}</span>
                </div>
              </div>
              <div class="form-group">
                <div class="status-dropdown w-50">
                  <Select2WithColor
                    v-model="product.lead_status"
                    :class-obj="{ 'status-select': true }"
                    dropdown-css-class="status-select"
                    :options="leadStatusOptions"
                    :custom-event="true"
                    @optionChangeHandler="
                      handleStatusChange(...arguments, quickView.data, product)
                    "
                  />
                </div>
              </div>
              <h5 v-if="product.dealers.length" class="mb-3">
                Lead Assignment
              </h5>
              <template v-if="product.dealers[0]">
                <span>Dealership</span>
                <p>
                  {{ product.dealers[0].dealership_name || '-' }}
                </p>
              </template>
              <div v-if="product.rsm && product.rsm.length">
                <span>{{ product.rsm.length > 1 ? 'RSMs' : 'RSM' }}</span>
                <p v-for="rsm of product.rsm" :key="rsm.email">
                  {{ rsm.name }}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <ul class="ld-list p0">
          <li class="bg-gray">
            <div class="media">
              <NoteIcon :start-align="true" custom-class="orange" />
              <div class="media-body align-self-center">
                <h5>Forms Completed</h5>
              </div>
            </div>
            <div class="tb-data">
              <p v-if="!submittedForms.length">No data found</p>
              <template v-for="(formData, index) in submittedForms" v-else>
                <p v-if="index < 5" :key="index">
                  {{ formData.form }} <br /><span>{{ formData.date }}</span>
                </p>
              </template>
            </div>
          </li>
          <li class="bg-gray">
            <div class="media">
              <WebIcon custom-class="orange" :start-align="true" />
              <div class="media-body align-self-center">
                <h5>Most Visited Pages</h5>
              </div>
            </div>
            <div class="tb-data">
              <table class="table table-borderless">
                <tbody>
                  <tr v-if="!mostVisited.length">
                    <td>No data found</td>
                  </tr>
                  <tr
                    v-for="(recentPageVisit, index) in mostVisited"
                    v-else
                    :key="index"
                  >
                    <template v-if="index < 5">
                      <td><div v-html="recentWebVisits[index]"></div></td>
                      <td class="text-gray" align="right">
                        {{ recentPageVisit.last_visit }}
                      </td>
                    </template>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li class="bg-gray">
            <div class="media">
              <NoteIcon :start-align="true" custom-class="orange" />
              <div class="media-body align-self-center">
                <h5>Last Web Visit</h5>
              </div>
            </div>
            <div class="tb-data">
              <table class="table table-borderless">
                <tbody>
                  <tr v-if="!lastWebVisits.length">
                    <td>No data found</td>
                  </tr>
                  <tr v-for="time in lastWebVisits" :key="time.date">
                    <td>{{ time.date }}</td>
                    <td class="text-gray" align="right">{{ time.time }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </li>
          <li class="ld-list-title">
            <div class="media">
              <NoteIcon :start-align="true" custom-class="orange" />
              <div class="media-body align-self-center">
                <h5>Recent Note(s)</h5>
              </div>
            </div>
          </li>
          <li v-if="!topNotesData.length" class="bg-yellow">No notes added</li>
          <li
            v-for="recentNotes in topNotesData"
            v-else
            :key="recentNotes.id"
            class="bg-yellow"
          >
            <template>
              <div class="ck-content" v-html="recentNotes.note"></div>
              <h5 class="mb0">{{ recentNotes.user_details.name }}</h5>
              <span
                >{{ recentNotes.created_date }}
                {{ recentNotes.created_time }}</span
              >
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Select2WithColor from '@/components/plugins/Select2WithColor'
export default {
  components: { Select2WithColor },
  props: {
    quickView: {
      required: true,
      type: Object,
    },
    submittedForms: {
      required: true,
      type: Array,
    },
    topNotesData: {
      required: true,
      type: Array,
    },
    lastWebVisits: {
      required: true,
      type: Array,
    },
    mostVisited: {
      required: true,
      type: Array,
    },
    recentWebVisits: {
      required: true,
      type: Array,
    },
    leadStatusOptions: {
      required: true,
      type: Array,
    },
    getEmail: {
      required: true,
      type: String,
    },
    getPhone: {
      required: true,
      type: String,
    },
  },
  computed: {
    products() {
      return this.quickView.info.products
    },
  },
  methods: {
    handleStatusChange(v, product_id, dealership_id) {
      this.$emit('onStatusChange', v, product_id, dealership_id)
    },
  },
}
</script>
