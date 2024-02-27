<template>
  <div class="dl-detail-left-fr">
    <div class="box-heading">
      <div class="row align-items-center">
        <div class="col-lg-5">
          <div class="pr-img r11">
            <img
              v-if="
                leadDetails.first_name || leadDetails.email || leadDetails.logo
              "
              :src="
                leadDetails.logo
                  ? leadDetails.logo
                  : `https://ui-avatars.com/api/?name=${
                      leadDetails.first_name
                        ? leadDetails.first_name
                        : leadDetails.email
                        ? leadDetails.email
                        : ''
                    }%20${
                      leadDetails.last_name ? leadDetails.last_name : ''
                    }&size=128&background=e9ecef&bold=true`
              "
              alt=""
              class="img-responsive"
            />
          </div>
        </div>
        <div class="col-lg-7">
          <div
            v-if="
              leadDetails.is_current_owner === 1 ||
              leadDetails.is_current_owner === '1'
            "
            class="media sc_media"
          >
            <img src="@/assets/img/icon/logo-alt.svg" alt="" />
            <div class="media-body align-self-center">
              <h5>OWNER</h5>
            </div>
          </div>
          <h3>{{ leadDetails.first_name }} {{ leadDetails.last_name }}</h3>
        </div>
      </div>
    </div>
    <div class="dealer-contact">
      <div
        class="media sc_media"
        v-html="leadScoreHtml(leadDetails.lead_score)"
      ></div>
      <div class="media sc_media">
        <EmailIcon />
        <div class="media-body align-self-center">
          <h5>Email</h5>
          <p>
            <a :href="'mailto:' + leadDetails.email">
              {{ leadDetails.email }}</a
            >
          </p>
        </div>
      </div>
      <div class="media sc_media">
        <PhoneIcon />
        <div class="media-body align-self-center">
          <h5>Phone</h5>
          <p>
            <a v-if="leadDetails.phone" :href="'tel:' + leadDetails.phone">{{
              leadDetails.phone
            }}</a>
            <a v-else href="javascript:void(0);">{{ '-' }}</a>
          </p>
        </div>
      </div>
      <div class="media sc_media">
        <HomeIcon />
        <div class="media-body align-self-center">
          <h5>Address</h5>
          <p>
            {{ leadDetails.address_line_1
            }}<br v-if="leadDetails.address_line_1" />
            {{ leadDetails.address_line_2
            }}<br v-if="leadDetails.address_line_2" />
            <b v-if="leadDetails.city"></b> {{ leadDetails.city
            }}<br v-if="leadDetails.city" />
            <b v-if="leadDetails.state"></b> {{ leadDetails.state
            }}<br v-if="leadDetails.state" />
            <b v-if="leadDetails.country"></b>{{ leadDetails.country
            }}<br v-if="leadDetails.country" />
            <b v-if="leadDetails.zip_code"></b>
            {{ leadDetails.zip_code }}
          </p>
        </div>
      </div>
      <div class="media sc_media">
        <QualifiedIcon />
        <div class="media-body d-flex align-self-center">
          <label class="check-label"
            >Qualified
            <input
              v-model="qualify"
              type="checkbox"
              @change="$emit('checkRemark', $event)"
            />
            <span class="check-span"></span>
          </label>
        </div>
      </div>
      <transition name="fade">
        <div v-if="isRemark" class="form-group">
          <label class="control-label">Remarks</label>
          <textarea
            v-model="qualifyNote"
            cols="4"
            rows="4"
            class="form-control"
            placeholder="Qualification note here..."
          ></textarea>
          <button
            class="btn btn-sm mt1"
            @click="$emit('toggleLeadQualify', $event)"
          >
            Submit
          </button>
        </div>
      </transition>
    </div>
    <ul
      v-if="leadDetails.products && leadDetails.products.length"
      class="ld-list ld-list-bordered"
    >
      <template v-for="product in leadDetails.products">
        <li :key="product.product_id">
          <div class="clearfix mb20">
            <div class="pull-left">
              <h5>Model</h5>
              <p>{{ product.product_name }}</p>
              <div
                v-if="
                  product.product_variant_data &&
                  product.product_variant_data.length
                "
              >
                <span
                  v-for="variant in product.product_variant_data"
                  :key="variant.id"
                >
                  <span v-if="variant.variant_options_detailes">{{
                    variant.variant_options_detailes.option_name + ' '
                  }}</span>
                </span>
              </div>
            </div>
            <div v-if="product.product_variant_data" class="pull-right">
              <span
                v-if="product.product_variant_data.category_detailes"
                class="class bg-blue"
                >{{ product.product_variant_data.category_detailes.name }}</span
              >
            </div>
          </div>
          <h5 v-if="product.dealers.length" class="mb-3">Lead Assignment</h5>
          <div v-if="product.dealers.length">
            <span>Dealership</span>
            <p v-for="dealers in product.dealers" :key="dealers.id">
              {{ dealers.dealership_name }}
            </p>
          </div>
          <div v-if="product.rsm.length">
            <span>{{ product.rsm.length > 1 ? 'RSMs' : 'RSM' }}</span>
            <p v-for="(rsm, index) in product.rsm" :key="index">
              {{ rsm.name }}
            </p>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import LeadMixin from '~/mixins/lead.js'
export default {
  mixins: [LeadMixin],
  props: {
    leadDetails: {
      type: Object,
      required: true,
    },
    isRemark: {
      type: Boolean,
      required: true,
    },
    isQualify: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    qualifyNote: {
      get() {
        return this.leadDetails.qualify_note
      },
      set(v) {
        this.$emit('update:qualifyNote', v)
      },
    },
    qualify: {
      get() {
        return this.isQualify
      },
      set(v) {
        this.$emit('update:isQualify', v)
      },
    },
  },
}
</script>
