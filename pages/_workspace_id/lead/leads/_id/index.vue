<template>
  <div class="body-content bg-gray-light body-content-has-right">
    <div class="body-content-left h-100">
      <div class="common-box-header">
        <h2 class="title">
          <nuxt-link
            class="back"
            :to="{
              name: 'workspace_id-lead-leads',
              params: {
                workspace_id: $_auth().id,
              },
            }"
          >
            <BackIcon />
          </nuxt-link>
          Lead Detail
        </h2>
      </div>
      <div class="box customscrollbar dl-detail-left ld-detail-left p0">
        <ProfileLoader
          v-if="leadLoading"
          style="min-width: 390px !important; min-height: 700px !important"
        />
        <a href="javascript:void(0);" class="dl-editicon">
          <EditIcon />
        </a>
        <LeadView
          :lead-details="leadDetails"
          :is-qualify="isQualify"
          :is-remark="isRemark"
          @update:isQualify="isQualify = $event"
          @update:qualifyNote="leadDetails.qualify_note = $event"
          @toggleLeadQualify="toggleLeadQualify"
          @checkRemark="checkRemark"
        />
        <div class="dl-detail-left-bk">
          <form class="form" @submit.prevent="editLeadhandleSubmit()">
            <div class="box-heading">
              <div class="row align-items-center">
                <div class="col-lg-5">
                  <div class="pr-img r11">
                    <img
                      :src="
                        imagePreview
                          ? imagePreview
                          : leadDetails.logo
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
                  <imageInput @input="onImageUpload">
                    <template slot="activator">
                      <label class="logo-update">{{
                        imagePreview || leadDetails.logo
                          ? 'Change Image'
                          : 'Upload Image'
                      }}</label>
                    </template>
                  </imageInput>
                </div>
              </div>
              <a
                v-if="form.logo"
                v-tooltip="'Delete Image'"
                class="dl-editicon"
                @click="removeImage"
              >
                <DeleteIcon />
              </a>
            </div>
            <div class="p1">
              <div class="form-group">
                <label class="control-label">Product Owner</label>
                <div class="radio-group mt-2">
                  <label class="radio-label">
                    <input
                      v-model="form.is_current_owner"
                      type="radio"
                      name="product-owner"
                      :value="1"
                    />
                    <span class="radio-span"></span>
                    Yes
                  </label>
                  <label class="radio-label text-center">
                    <input
                      v-model="form.is_current_owner"
                      type="radio"
                      name="product-owner"
                      :value="0"
                    />
                    <span class="radio-span"></span>
                    No
                  </label>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">Lead score</label>
                <input
                  v-model="form.lead_score"
                  type="number"
                  name="lead-score"
                  class="form-control"
                />
              </div>
              <div class="form-group required">
                <label class="control-label">Email Address</label>
                <input
                  v-model.lazy="$v.form.email.$model"
                  type="email"
                  name="dealership-email"
                  class="form-control"
                />
                <div
                  v-if="$v.form.email.$error && !$v.form.email.required"
                  class="input-error"
                >
                  Please provide email
                </div>
                <div
                  v-if="$v.form.email.$error && !$v.form.email.email"
                  class="input-error"
                >
                  Please provide valid email
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">First name</label>
                <input
                  v-model="form.first_name"
                  type="text"
                  name="first-name"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label class="control-label">Last name</label>
                <input
                  v-model="form.last_name"
                  type="text"
                  name="last-name"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label class="control-label">Contact Number</label>
                <input
                  v-model="form.phone"
                  type="text"
                  name="dealership-phone"
                  class="form-control"
                />
              </div>
              <div class="form-group required">
                <label class="control-label">Address Line 1</label>
                <client-only>
                  <vue-google-autocomplete
                    id="address"
                    ref="autocompleteRef"
                    v-model="form.address_line_1"
                    classname="form-control"
                    placeholder="Enter address line 1"
                    :country="['us', 'ca', 'aus']"
                    @placechanged="getAddressData"
                  >
                  </vue-google-autocomplete>
                  <div
                    v-if="
                      $v.form.address_line_1.$error &&
                      !$v.form.address_line_1.required
                    "
                    class="input-error"
                  >
                    Please provide Address
                  </div>
                </client-only>
              </div>
              <div class="form-group">
                <label class="control-label">Address Line 2</label>
                <input
                  v-model="form.address_line_2"
                  type="text"
                  name="dealership-address2"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label class="control-label">Zip Code</label>
                <input
                  v-model="form.zip_code"
                  type="text"
                  name="dealership-zipcode"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label class="control-label">City</label>
                <input
                  v-model="form.city"
                  type="text"
                  name="dealership-city"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <label class="control-label">State</label>
                <input
                  v-model="form.state"
                  type="text"
                  name="dealership-state"
                  class="form-control"
                />
              </div>
              <div class="form-group">
                <Select
                  v-model="form.country"
                  :items="['United States', 'Canada']"
                  label="Country"
                  :select_first="false"
                ></Select>
              </div>
              <div class="form-group">
                <label class="control-label">Latitude</label>
                <input
                  :value="form.lat"
                  type="text"
                  name="latitude"
                  class="form-control"
                  disabled
                />
              </div>
              <div class="form-group">
                <label class="control-label">Longitude</label>
                <input
                  :value="form.lon"
                  type="text"
                  name="longitude"
                  class="form-control"
                  disabled
                />
              </div>
              <div class="row xs-gutters">
                <div class="col-7">
                  <button type="submit" class="btn btn-blue btn-block">
                    Update Info
                  </button>
                </div>
                <div class="col-5">
                  <button
                    type="button"
                    class="btn btn-gray dealer-edit-cancel btn-block"
                    @click="cancelEdit()"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="body-content-main h-100">
      <div class="tabs-view">
        <ul class="nav nav-left" role="tablist">
          <li class="nav-item">
            <a
              ref="lifeOfLeadTab"
              class="nav-link active tab-click"
              data-toggle="tab"
              href="#life-of-lead"
              @click="loadLife()"
              >Life of Lead</a
            >
          </li>
          <li class="nav-item">
            <a
              ref="taskTab"
              class="nav-link tab-click"
              data-toggle="tab"
              href="#task"
              @click="loadTask()"
              >Tasks</a
            >
          </li>
          <li class="nav-item">
            <a
              ref="notesTab"
              class="nav-link tab-click"
              data-toggle="tab"
              href="#notes"
              @click="loadNotes()"
              >Notes</a
            >
          </li>
          <li class="nav-item">
            <a
              ref="productTab"
              class="nav-link tab-click"
              data-toggle="tab"
              href="#lead-assignments"
              @click="loadAssignments()"
              >Product Assignment</a
            >
          </li>
        </ul>
        <div class="tab-content relative">
          <div id="life-of-lead" class="tab-pane active">
            <div class="row h-100">
              <div class="col-lg-7 h-100">
                <div class="common-box box h-100">
                  <div class="tl-notes h-100">
                    <a
                      v-if="lifeOfLead.length"
                      id="addLifeofLead"
                      href="javascript:void(0);"
                      class="add-tl-notes"
                      @click="isLifeAdding = true"
                    >
                      <PlusIcon :white="true" />
                      <span>Add New</span></a
                    >
                    <div class="leadFilter">
                      <Select2
                        :options="listOfLifeLine"
                        :value="lifeFilterType"
                        placeholder="Filter Life of lead"
                        @input="filterLifeOfLead"
                      />
                    </div>
                    <ul class="tl customscrollbar w-100">
                      <LifeofleadList
                        v-for="life in lifeOfLead"
                        :key="life.id"
                        :life="life"
                        :class="[
                          life.tagColor,
                          activeLifeOfLeadNote.id === life.id ? 'active' : '',
                        ]"
                        @click.native="loadLifeDetails($event, life, true)"
                      />
                      <client-only>
                        <infinite-loading
                          :identifier="lifeOfLeadInfiniteId"
                          @infinite="lifeOfLeadInfiniteHandler"
                        >
                          <div slot="spinner" class="mt5">
                            <LifeOfLeadLoader />
                          </div>
                          <div slot="no-more"></div>
                          <div slot="no-results">
                            <EmptyState class="mt5" />
                          </div>
                        </infinite-loading>
                      </client-only>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                class="col-lg-5 h-100 new-lead-note new-leads table-list-view table-list-scrolling"
                :style="isLifeAdding ? 'display:block' : 'display:none'"
              >
                <form
                  class="h-100"
                  @submit.prevent="
                    isComposeEmail ? addComposeEmail('send') : addLifeOfLead()
                  "
                >
                  <div
                    ref="lifeOfleadScroll"
                    class="common-box box customscrollbar no_header"
                  >
                    <div
                      v-if="isComposeEmail && !isSMTPenabled"
                      class="alert alert-warning"
                    >
                      {{ warningText }}
                    </div>
                    <h5>Add Life of Lead</h5>
                    <div class="form-group w-75 required">
                      <label class="control-label">Type</label>
                      <Select2
                        v-model.lazy="queryType"
                        :options="lifeOfleadType"
                        placeholder="Type"
                      />
                      <div
                        v-if="$v.queryType.$error && !$v.queryType.required"
                        class="input-error"
                      >
                        Please select a type
                      </div>
                    </div>
                    <div
                      v-show="!isComposeEmail"
                      class="form-group w-75 required"
                    >
                      <label class="control-label">Product Inquired</label>
                      <Select2
                        v-model.lazy="lifeOfleadForm.product_id"
                        class="form-control"
                        :options="productOption"
                        placeholder="Product name"
                      />
                      <div
                        v-if="
                          $v.lifeOfleadForm.product_id.$error &&
                          !$v.lifeOfleadForm.product_id.required
                        "
                        class="input-error"
                      >
                        Please select a product
                      </div>
                    </div>
                    <div v-show="!isComposeEmail" class="form-group w-75">
                      <label class="control-label">Title</label>
                      <input
                        v-model.lazy="lifeOfleadForm.title"
                        type="text"
                        name="task-title"
                        class="form-control"
                        placeholder="Title"
                      />
                    </div>
                    <div
                      v-show="!isComposeEmail"
                      class="form-group w-75 required"
                    >
                      <label class="control-label">Date</label>
                      <DatePicker
                        human
                        :placeholder="'Date'"
                        :class-obj="'datepicker form-control'"
                        :start-date="lifeOfleadForm.date"
                        :max-date="new Date()"
                        :custom-event="true"
                        @dateChanged="dateHandler(...arguments)"
                      />
                      <div
                        v-if="
                          $v.lifeOfleadForm.date.$error &&
                          !$v.lifeOfleadForm.date.required
                        "
                        class="input-error"
                      >
                        Please select a date
                      </div>
                    </div>
                    <div v-show="!isComposeEmail" class="form-group">
                      <label class="control-label">Description</label>
                      <textarea
                        v-model="lifeOfleadForm.description"
                        class="form-control"
                        rows="10"
                      ></textarea>
                    </div>
                    <div v-show="!isComposeEmail" class="form-group required">
                      <div class="file-upload">
                        <file-drag-and-drop
                          v-slot="{ dragEnter }"
                          @error="$toast.error('found invalid files')"
                          @input="lifeOfLeadAddAttachement($event)"
                        >
                          <input
                            ref="lifeOfLeadAttachment"
                            class="file-upload-input"
                            style="display: none"
                            type="file"
                            @change="lifeOfLeadAddAttachement($event)"
                          />
                          <div
                            v-if="lifeOfleadForm.attach === null"
                            class="image-upload-wrap"
                            :class="{ dragEnter }"
                            @click="$refs.lifeOfLeadAttachment.click()"
                          >
                            <div class="drag-text">
                              <UploadIcon />
                              <h3>
                                Drop file to upload or
                                <a href="javascript:void(0);"
                                  ><span>browse.</span></a
                                >
                              </h3>
                            </div>
                          </div>
                          <div v-if="lifeOfleadForm.attach !== null">
                            <div class="upload-preview-wrapper no-gutters">
                              <div class="upload-preview">
                                <span>{{ lifeOfLeadAttachFileName }}</span>
                                <div class="preview-action">
                                  <a
                                    v-tooltip="'Remove Attachment'"
                                    @click="removeAttachedFile"
                                  >
                                    <DeleteIcon class="white" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </file-drag-and-drop>
                      </div>
                    </div>
                    <div
                      v-show="templates.length && isComposeEmail"
                      class="form-group w-75 required"
                    >
                      <label class="control-label">Template</label>
                      <Select2
                        :options="templates"
                        placeholder="Select Template"
                        @input="parseTemplate"
                      />
                      <div
                        v-if="
                          $v.composeEmailForm.templateId.$error &&
                          !$v.composeEmailForm.templateId.required
                        "
                        class="input-error"
                      >
                        Please select a type
                      </div>
                    </div>
                    <div
                      v-show="isComposeEmail"
                      class="form-group w-75 required"
                    >
                      <label class="control-label">Subject</label>
                      <input
                        v-model.lazy="composeEmailForm.subject"
                        type="text"
                        name="task-title"
                        class="form-control"
                        placeholder="Subject"
                      />
                      <div
                        v-if="
                          $v.composeEmailForm.subject.$error &&
                          !$v.composeEmailForm.subject.required
                        "
                        class="input-error"
                      >
                        Please enter Subject
                      </div>
                    </div>
                    <div v-show="isComposeEmail" class="form-group required">
                      <label class="control-label">Body</label>
                      <textarea
                        v-model="composeEmailForm.body"
                        cols="4"
                        rows="4"
                        name="desc"
                        class="form-control resizeauto"
                      ></textarea>
                      <div
                        v-if="
                          $v.composeEmailForm.body.$error &&
                          !$v.composeEmailForm.body.required
                        "
                        class="input-error"
                      >
                        Please enter body
                      </div>
                    </div>
                    <div
                      v-show="isComposeEmail && signatureStatus"
                      class="form-group"
                    >
                      <label class="control-label">Signature</label>
                      <client-only>
                        <vue-editor
                          ref="editor"
                          v-model.lazy="composeEmailSignature"
                          :editor-toolbar="editorToolbar"
                        />
                      </client-only>
                    </div>
                    <div v-show="isComposeEmail" class="form-group">
                      <label class="control-label">Attachments</label>
                      <div class="file-upload big">
                        <div class="file-select">
                          <div id="fileName" class="file-select-button">
                            Browse File
                          </div>
                          <div id="noFile" class="file-select-name">
                            No file chosen...
                          </div>
                          <input
                            id="chooseFile"
                            ref="composeEmailForm"
                            type="file"
                            name="chooseFile"
                            @change="fileChange('composeEmailForm')"
                          />
                        </div>
                      </div>
                      <!-- Loop attachments -->
                      <div
                        v-for="(atc, atc_index) in composeEmailForm.attachments"
                        :key="atc.org_file_name + atc_index"
                        class="preview-upload mt1 d-flex align-items-center"
                      >
                        <input
                          type="text"
                          name=""
                          :value="atc.org_file_name"
                          class="form-control"
                          disabled=""
                        />
                        <button
                          type="button"
                          class="btn btn-big btn-danger ml-2"
                          @click="
                            composeEmailForm.attachments.splice(atc_index, 1)
                          "
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="tfooter">
                    <button
                      v-show="isComposeEmail && isSMTPenabled"
                      type="submit"
                      class="btn"
                    >
                      Send
                    </button>
                    <button v-show="!isComposeEmail" type="submit" class="btn">
                      Save
                    </button>
                    <button
                      v-show="isComposeEmail"
                      type="button"
                      class="btn"
                      @click.stop="addComposeEmail('draft')"
                    >
                      Save as draft
                    </button>
                    <button
                      id="cancelLifeofLead"
                      type="reset"
                      class="btn btn-gray cancel-btn"
                      @click="resetLifeOfLead()"
                    >
                      <span>Cancel</span>
                    </button>
                  </div>
                </form>
              </div>
              <transition name="fade">
                <div
                  class="col-lg-5 h-100 box customscrollbar"
                  :style="isLifeAdding ? 'display:none;' : 'display:block;'"
                >
                  <div
                    v-if="activeLifeOfLeadNote.info.isLoading"
                    class="innerLoader"
                  >
                    <RefreshIcon />
                    Loading...
                  </div>
                  <div v-else class="life-of-lead active-lead">
                    <div class="common-box h-100">
                      <div class="media sc_media">
                        <span
                          class="media-left align-self-start"
                          v-html="
                            lifeOfLeadDetailIconSvg(
                              activeLifeOfLeadNote.data.type
                            )
                          "
                        ></span>
                        <div class="media-body align-self-start">
                          <h5>
                            {{ activeLifeOfLeadNote.data.type }}
                          </h5>
                          <p>
                            {{
                              activeLifeOfLeadNote.data.created_at &&
                              $moment(activeLifeOfLeadNote.data.created_at)
                                .tz($auth.user.timezone)
                                .format(`MMM Do YYYY, hh:mm A`)
                            }}
                          </p>
                          <div
                            v-if="
                              [
                                'Dealer Assigned',
                                'New Product Inquiry Added',
                                'Created Through SharpSpring Data Sync',
                              ].includes(activeLifeOfLeadNote.data.type)
                            "
                            class="notes-desc"
                          >
                            <div class="tb-data">
                              <p>
                                <label>Description</label>
                                {{
                                  activeLifeOfLeadNote.data.description || '-'
                                }}
                              </p>
                            </div>
                          </div>
                          <div v-else-if="isNoteAddedRes" class="notes-desc">
                            <div
                              v-for="(myNotes, index) in activeLifeOfLeadNote
                                .info.data"
                              :key="index"
                              class="notes-box"
                            >
                              <span>
                                {{
                                  $moment(myNotes.created_at)
                                    .tz($auth.user.timezone)
                                    .format(`MMM Do YYYY, hh:mm A`) || '-'
                                }}
                              </span>
                              <p class="ck-content">
                                <label>User Name</label>
                                {{ myNotes.user ? myNotes.user.name : ' -' }}
                              </p>
                              <p
                                class="ck-content"
                                v-html="
                                  getLabelDesc(myNotes.description, 'Content')
                                "
                              ></p>
                            </div>
                          </div>
                          <div
                            v-else-if="
                              activeLifeOfLeadNote.data.type ===
                                'Lead Status Updated' &&
                              typeof activeLifeOfLeadNote.data.description ===
                                'object'
                            "
                            class="notes-desc"
                          >
                            <div
                              v-for="status in activeLifeOfLeadNote.info.data"
                              :key="status.id"
                              class="notes-box"
                            >
                              <p>
                                <label>New Status</label
                                >{{ status.description['new_status'] || '-' }}
                              </p>
                              <p>
                                <label>Old Status</label
                                >{{ status.description['old_status'] || '-' }}
                              </p>
                              <p>
                                <label>Product Name</label
                                >{{ status.description['product_name'] || '-' }}
                              </p>
                            </div>
                          </div>
                          <div
                            v-else-if="
                              ['Email Received', 'Email Sent'].includes(
                                activeLifeOfLeadNote.data.type
                              ) &&
                              !activeLifeOfLeadNote.data
                                .sharp_spring_event_id &&
                              isValidJson(activeLifeOfLeadNote.data.description)
                            "
                            class="notes-desc"
                          >
                            <div class="notes-box">
                              <p>
                                <label>Subject</label>
                                {{
                                  parseJSON(
                                    activeLifeOfLeadNote.data.description
                                  ).subject
                                }}
                              </p>
                              <p
                                v-if="
                                  activeLifeOfLeadNote.data.type ===
                                  'Email Received'
                                "
                                v-html="
                                  getLabelDesc(
                                    getTrimmedContent(
                                      parseJSON(
                                        activeLifeOfLeadNote.data.description
                                      ).body
                                    )[0],
                                    'Content'
                                  )
                                "
                              ></p>
                              <a
                                v-if="
                                  activeLifeOfLeadNote.data.type ===
                                    'Email Received' &&
                                  getTrimmedContent(
                                    parseJSON(
                                      activeLifeOfLeadNote.data.description
                                    ).body
                                  )[1]
                                "
                                href="#email-received"
                                class="accordion-toggle show-gmail-content collapsed"
                                aria-expanded="false"
                                data-toggle="collapse"
                              >
                                <ShowContentIcon />
                              </a>
                              <div
                                v-if="
                                  activeLifeOfLeadNote.data.type ===
                                  'Email Received'
                                "
                                id="email-received"
                                class="collapse"
                                style=""
                              >
                                <p
                                  v-html="
                                    getTrimmedContent(
                                      parseJSON(
                                        activeLifeOfLeadNote.data.description
                                      ).body
                                    )[1]
                                  "
                                ></p>
                              </div>
                              <p
                                v-else
                                v-html="
                                  getLabelDesc(
                                    parseJSON(
                                      activeLifeOfLeadNote.data.description
                                    ).body,
                                    'Content'
                                  )
                                "
                              ></p>
                              <p
                                v-if="
                                  parseJSON(
                                    activeLifeOfLeadNote.data.description
                                  ).signature
                                "
                                class="mt2"
                                v-html="
                                  getLabelDesc(
                                    parseJSON(
                                      activeLifeOfLeadNote.data.description
                                    ).signature,
                                    'Signature'
                                  )
                                "
                              ></p>
                              <div
                                v-if="
                                  parseJSON(
                                    activeLifeOfLeadNote.data.description
                                  ).attachments.length
                                "
                              >
                                <a
                                  v-for="atch in parseJSON(
                                    activeLifeOfLeadNote.data.description
                                  ).attachments"
                                  :key="atch.org_file_name"
                                  href="javascript:void(0);"
                                  class="bg-gray dl-brochure"
                                >
                                  <PdfIcon />
                                  {{ atch.org_file_name }}
                                  <span class="pull-right">
                                    <AttachmentIcon />
                                  </span>
                                </a>
                              </div>
                            </div>
                          </div>
                          <div
                            v-else-if="
                              addLifeOfLeadType.includes(
                                activeLifeOfLeadNote.data.type
                              ) &&
                              !Array.isArray(activeLifeOfLeadNote.info.data)
                            "
                            class="notes-desc"
                          >
                            <div class="tb-data">
                              <p>
                                <label>Product Inquired</label
                                >{{
                                  activeLifeOfLeadNote.info.data.product || '-'
                                }}
                              </p>
                              <p>
                                <label>Title</label
                                >{{
                                  activeLifeOfLeadNote.info.data.title || '-'
                                }}
                              </p>
                              <p>
                                <label>Date</label
                                >{{
                                  $moment(
                                    activeLifeOfLeadNote.info.data.created_at
                                  )
                                    .tz($auth.user.timezone)
                                    .format(`MMM Do YYYY, hh:mm A`) || '-'
                                }}
                              </p>
                              <p
                                class="ck-content"
                                v-html="
                                  getLabelDesc(
                                    $options.filters.cleanHtnml(
                                      activeLifeOfLeadNote.info.data
                                        .description || '-'
                                    ),
                                    'Description'
                                  )
                                "
                              ></p>
                              <a
                                v-if="
                                  activeLifeOfLeadNote.info.data.attach &&
                                  isDoc(
                                    activeLifeOfLeadNote.info.data.file_type
                                  )
                                "
                                :href="activeLifeOfLeadNote.info.data.attach"
                                class="bg-gray dl-brochure"
                                download=""
                              >
                                <PdfIcon />
                                {{ activeLifeOfLeadNote.info.data.file_name }}
                                <span class="pull-right">
                                  <AttachmentIcon />
                                </span>
                              </a>
                              <div
                                v-else-if="
                                  activeLifeOfLeadNote.info.data.attach
                                "
                                class="r21 bg-gray mb2 mt2"
                              >
                                <img
                                  :src="
                                    activeLifeOfLeadNote.info.data.attach
                                      | imgUrl
                                  "
                                  alt=""
                                  class="img-responsive"
                                  width="100%"
                                  height="100%"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            v-else-if="
                              addLifeOfLeadType.includes(
                                activeLifeOfLeadNote.data.type
                              ) && Array.isArray(activeLifeOfLeadNote.info.data)
                            "
                            class="notes-desc"
                          >
                            <div class="tb-data">
                              <p>
                                <label>Product Inquired</label
                                >{{
                                  activeLifeOfLeadNote.info.data[0].product ||
                                  '-'
                                }}
                              </p>
                              <p>
                                <label>Title</label
                                >{{
                                  activeLifeOfLeadNote.info.data[0].title || '-'
                                }}
                              </p>
                              <p>
                                <label>Date</label
                                >{{
                                  $moment(
                                    activeLifeOfLeadNote.info.data[0].created_at
                                  )
                                    .tz($auth.user.timezone)
                                    .format(`MMM Do YYYY, hh:mm A`) || '-'
                                }}
                              </p>
                              <label
                                v-if="
                                  activeLifeOfLeadNote.info.data[0].description
                                "
                                >Description
                              </label>
                              <div
                                class="ck-content"
                                v-html="
                                  $options.filters.cleanHtnml(
                                    activeLifeOfLeadNote.info.data[0]
                                      .description
                                  )
                                "
                              ></div>
                              <a
                                v-if="
                                  activeLifeOfLeadNote.info.data.attach &&
                                  isDoc(
                                    activeLifeOfLeadNote.info.data[0].file_type
                                  )
                                "
                                :href="activeLifeOfLeadNote.info.data[0].attach"
                                class="bg-gray dl-brochure"
                                download=""
                              >
                                <PdfIcon />
                                {{
                                  activeLifeOfLeadNote.info.data[0].file_name
                                }}
                                <span class="pull-right">
                                  <AttachmentIcon />
                                </span>
                              </a>
                              <div
                                v-else-if="
                                  activeLifeOfLeadNote.info.data[0].attach
                                "
                                class="r21 bg-gray mb2 mt2"
                              >
                                <img
                                  :src="
                                    activeLifeOfLeadNote.info.data[0].attach
                                      | imgUrl
                                  "
                                  alt=""
                                  class="img-responsive"
                                  width="100%"
                                  height="100%"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            v-else-if="
                              activeLifeOfLeadNote.data.type ===
                              'Qualified Contact'
                            "
                            class="notes-desc"
                          >
                            <div class="tb-data">
                              <p>
                                <label>User</label
                                >{{ activeLifeOfLeadNote.data.user.name }}
                              </p>
                              <p>
                                <label>Email</label
                                >{{ activeLifeOfLeadNote.data.user.email }}
                              </p>
                              <p>
                                <label>Note</label
                                >{{
                                  activeLifeOfLeadNote.data.description || '-'
                                }}
                              </p>
                            </div>
                          </div>
                          <div
                            v-else-if="
                              [
                                'Sent notification to RSM',
                                'Sent notification to Dealer',
                              ].includes(activeLifeOfLeadNote.data.type)
                            "
                            class="notes-desc"
                          >
                            <div class="tb-data">
                              <p>
                                <label>User</label
                                >{{ activeLifeOfLeadNote.data.user.name }}
                              </p>
                              <p>
                                <label>Email</label
                                >{{ activeLifeOfLeadNote.data.user.email }}
                              </p>
                              <p>
                                <label>Product</label
                                >{{
                                  activeLifeOfLeadNote.data.description.product
                                }}
                              </p>
                              <p>
                                <label>Category</label
                                >{{
                                  activeLifeOfLeadNote.data.description.category
                                }}
                              </p>
                              <p
                                v-if="
                                  activeLifeOfLeadNote.data.type ===
                                  'Sent notification to RSM'
                                "
                              >
                                <label>RSMs</label
                                ><template
                                  v-for="rsm in activeLifeOfLeadNote.data
                                    .description.rsm"
                                >
                                  {{ rsm }} <br :key="rsm"
                                /></template>
                              </p>
                              <p v-else>
                                <label>Dealer</label
                                >{{
                                  activeLifeOfLeadNote.data.description.dealer
                                }}
                              </p>
                            </div>
                          </div>
                          <div v-else-if="isWebVisits" class="notes-desc">
                            <div class="tb-data">
                              <table class="table table-borderless">
                                <tbody v-if="webVisitLinks.length">
                                  <tr
                                    v-for="(
                                      visited_pages, index
                                    ) in webVisitLinks"
                                    :key="index"
                                  >
                                    <td>
                                      <div v-html="visited_pages"></div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div
                            v-else-if="
                              activeLifeOfLeadNote.info.data &&
                              activeLifeOfLeadNote.info.data.description &&
                              activeLifeOfLeadNote.data.type === 'Task Created'
                            "
                            class="notes-desc"
                          >
                            <div class="tb-data">
                              <LifeDetails
                                is-task
                                :data="
                                  activeLifeOfLeadNote.info.data.description
                                "
                                :attachment-details="
                                  activeLifeOfLeadNote.info.data
                                "
                              />
                            </div>
                          </div>
                          <div v-else-if="isFormSubmittion" class="notes-desc">
                            <div class="tb-data">
                              <LifeDetails
                                v-if="
                                  activeLifeOfLeadNote.info.data.description
                                "
                                :data="
                                  activeLifeOfLeadNote.info.data.description
                                "
                              />
                            </div>
                          </div>
                          <div
                            v-else-if="
                              activeLifeOfLeadNote.data.type ===
                              'Created from Import'
                            "
                            class="notes-desc"
                          >
                            <div class="tb-data">
                              <LifeDetails
                                v-if="
                                  activeLifeOfLeadNote.info.data.description
                                "
                                :data="
                                  activeLifeOfLeadNote.info.data.description
                                "
                              />
                            </div>
                          </div>
                          <div
                            v-else-if="
                              activeLifeOfLeadNote.data.type === 'Lead Updated'
                            "
                            class="notes-desc"
                          >
                            <div class="tb-data">
                              <LifeDetails
                                is-lead-update
                                :data="
                                  activeLifeOfLeadNote.info.data.description
                                "
                              />
                            </div>
                          </div>
                          <div
                            v-else-if="
                              activeLifeOfLeadNote.data.type === 'Email Drafted'
                            "
                            class="notes-desc"
                          >
                            <div
                              v-if="!isSMTPenabled"
                              class="alert alert-warning"
                            >
                              {{ warningText }}
                            </div>
                            <div class="form-group required">
                              <label class="control-label">Subject</label>
                              <input
                                v-model="draftEmailData.subject"
                                type="text"
                                name="subject"
                                class="form-control"
                                placeholder="Subject"
                              />
                              <div
                                v-if="
                                  $v.draftEmailData.subject.$error &&
                                  !$v.draftEmailData.subject.required
                                "
                                class="input-error"
                              >
                                Please enter any subject
                              </div>
                            </div>
                            <div class="form-group required">
                              <label class="control-label">Body</label>
                              <textarea
                                v-model="draftEmailData.body"
                                cols="4"
                                rows="4"
                                name="desc"
                                class="form-control resizeauto"
                              ></textarea>
                              <div
                                v-if="
                                  $v.draftEmailData.body.$error &&
                                  !$v.draftEmailData.body.required
                                "
                                class="input-error"
                              >
                                Please enter body
                              </div>
                            </div>
                            <div
                              v-if="draftEmailData.signatureStatus"
                              class="form-group"
                            >
                              <label class="control-label">Signature</label>
                              <client-only>
                                <vue-editor
                                  ref="editor"
                                  v-model.lazy="draftEmailData.signature"
                                  :editor-toolbar="editorToolbar"
                                />
                              </client-only>
                            </div>
                            <div class="form-group">
                              <label class="control-label">Attachments</label>
                              <div class="file-upload big">
                                <div class="file-select">
                                  <div id="fileName" class="file-select-button">
                                    Browse File
                                  </div>
                                  <div id="noFile" class="file-select-name">
                                    No file chosen...
                                  </div>
                                  <input
                                    id="chooseFile"
                                    ref="draftEmailData"
                                    type="file"
                                    name="chooseFile"
                                    @change="fileChange('draftEmailData')"
                                  />
                                </div>
                              </div>
                              <!-- Loop attachments -->
                              <div
                                v-for="(
                                  atc, atc_index
                                ) in draftEmailData.attachments"
                                :key="atc.org_file_name + atc_index"
                                class="preview-upload mt1 d-flex align-items-center"
                              >
                                <input
                                  type="text"
                                  name=""
                                  :value="atc.org_file_name"
                                  class="form-control"
                                  disabled=""
                                />
                                <button
                                  type="button"
                                  class="btn btn-big btn-danger ml-2"
                                  @click="
                                    draftEmailData.attachments.splice(
                                      atc_index,
                                      1
                                    )
                                  "
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                            <button
                              v-if="isSMTPenabled"
                              type="button"
                              class="btn"
                              @click="sendDraftEmail()"
                            >
                              Send
                            </button>
                            <button
                              type="button"
                              class="btn btn-danger"
                              @click="deleteDraft()"
                            >
                              Delete draft
                            </button>
                          </div>
                          <div
                            v-else-if="
                              Array.isArray(activeLifeOfLeadNote.info.data)
                            "
                            class="notes-desc"
                          >
                            <div
                              v-for="(myNotes, index) in activeLifeOfLeadNote
                                .info.data"
                              :key="index"
                              class="notes-box"
                            >
                              <span>
                                {{
                                  $moment(myNotes.created_at)
                                    .tz($auth.user.timezone)
                                    .format(`MMM Do YYYY, hh:mm A`) || '-'
                                }}</span
                              >
                              <p>
                                {{ myNotes.description || '-' }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <div id="task" class="tab-pane">
            <a
              href="javascript:void(0);"
              class="btn btn-small btn-icon add-task-btn"
              @click="isTaskAdding = true"
            >
              <PlusIcon />
              Add Task
            </a>
            <div class="common-box bg-gray h-100">
              <div class="filter-dropdown">
                <a href="javascript:void(0);" class="filter-dropdown-toggle">
                  <MenuIcon />
                </a>
                <ul class="filter-dropdown-menu">
                  <li v-for="item in filterHideList" :key="item.name">
                    <a href="javascript:void(0);"
                      ><label class="check-label">
                        {{ item.name }}
                        <input
                          v-model="item.isActive"
                          type="checkbox"
                          name=""
                          :checked="item.isActive" /><span
                          class="check-span"
                        ></span></label
                    ></a>
                  </li>
                </ul>
              </div>
              <div
                class="table-list-view project-task-list table-list-scrolling"
              >
                <div class="thead">
                  <div class="project_task_row">
                    <div class="sorting task__wrapper">
                      <span>Task</span>
                    </div>
                    <div class="sorting task__column">
                      <span v-if="checkHiddenFilter('Product Inquired')"
                        >Product Inquired</span
                      >
                    </div>
                    <div class="sorting task__column">
                      <span v-if="checkHiddenFilter('Assigned To')"
                        >Assigned To</span
                      >
                    </div>
                    <div class="sorting task__column mid_cell status">
                      <span v-if="checkHiddenFilter('Status')">Status</span>
                    </div>
                    <div class="sorting task__column bigger_cell description">
                      <span v-if="checkHiddenFilter('Description')"
                        >Description</span
                      >
                    </div>
                    <div class="sorting task__column mid_cell ChooseFile">
                      <span v-if="checkHiddenFilter('File Upload')"
                        >File Upload</span
                      >
                    </div>
                    <div class="sorting task__column sm_cell">
                      <span v-if="checkHiddenFilter('Due Date')">Due Date</span>
                    </div>
                    <div class="sorting task__column xsm_cell actions">
                      <span>Action</span>
                    </div>
                  </div>
                </div>
                <div class="customscrollbar no_footer">
                  <div class="tbody">
                    <div class="project_task_list">
                      <div
                        v-for="(task, index) in tasks"
                        :key="task.id + '-' + index"
                        class="project_task_row"
                      >
                        <div
                          class="StatusBgColor"
                          :style="
                            'background-color:' + getStatusColor(task.status)
                          "
                        ></div>
                        <div class="tb-column task__wrapper">
                          <div class="editable__box">
                            <label class="editable__label">
                              <div class="editable__preview">
                                {{ task.title }}
                              </div>
                              <input
                                v-model.lazy="task.title"
                                type="text"
                                autocomplete="off"
                                placeholder="Write your task title..."
                                class="editable__textarea"
                                @change="updateTitle(task)"
                              />
                            </label>
                          </div>
                        </div>
                        <div class="tb-column task__column">
                          <div
                            v-if="checkHiddenFilter('Product Inquired')"
                            class="normal-dropdown no-border"
                          >
                            <Select2
                              :options="productOption"
                              :value="
                                task.product !== null ? task.product.id : 0
                              "
                              item_text="product_name"
                              placeholder="Product name"
                              @input="updateTaskProduct(task, $event)"
                            />
                          </div>
                        </div>
                        <div class="tb-column task__column">
                          <div class="assignee-dropdown no-border visible-text">
                            <Select2WithImage
                              v-if="
                                checkHiddenFilter('Assigned To') &&
                                taskUserList.length
                              "
                              :value="getTaskUserValue(task.dealership_user_id)"
                              :options="taskUserList"
                              :custom-event="true"
                              dropdown-css-class="owner-select"
                              @optionChangeHandler="
                                updateTaskUser(task, $event)
                              "
                            />
                          </div>
                        </div>
                        <div class="tb-column task__column mid_cell status">
                          <div
                            v-if="checkHiddenFilter('Status')"
                            class="status-dropdown no-border"
                          >
                            <Select2WithColor
                              v-model="task.status"
                              :class-obj="{ 'status-select': true }"
                              dropdown-css-class="status-select"
                              :options="taskStatusList"
                              :custom-event="true"
                              @optionChangeHandler="
                                taskStatusChangeHandler(...arguments, task)
                              "
                            />
                          </div>
                        </div>
                        <div
                          class="tb-column task__column bigger_cell description"
                        >
                          <div
                            v-if="checkHiddenFilter('Description')"
                            class="NoteBox"
                            data-toggle="modal"
                            data-target="#quick-note"
                            @click="addQuickNoteDialog(task, task.description)"
                          >
                            <p>
                              {{ task.description || 'Quick notes here...' }}
                            </p>
                          </div>
                        </div>
                        <div class="tb-column task__column ChooseFile">
                          <div
                            v-if="checkHiddenFilter('File Upload')"
                            class="file-upload"
                          >
                            <div class="file-select">
                              <div id="fileName" class="file-select-button">
                                Browse File
                              </div>
                              <div id="noFile" class="file-select-name">
                                {{
                                  task.attach
                                    ? task.file_name
                                    : 'No file chosen...'
                                }}
                              </div>
                              <input
                                id="chooseFile"
                                type="file"
                                name="chooseFile"
                                accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                @change="addAttachement($event, index, task)"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="tb-column task__column sm_cell">
                          <DatePicker
                            v-if="checkHiddenFilter('Due Date')"
                            human
                            placeholder="Due date"
                            :class-obj="'datepicker form-control'"
                            :start-date="task.due_date"
                            :min-date="
                              checkMinDate(task.due_date || new Date())
                            "
                            :disable-date="
                              getDisabledDateList(task.due_date || new Date())
                            "
                            :custom-event="true"
                            @dateChanged="dueDateHandler(...arguments, task)"
                          />
                        </div>
                        <div class="tb-column task__column xsm_cell actions">
                          <a
                            v-tooltip="'Delete task'"
                            @click.stop="setDeletedTask(task.id)"
                          >
                            <DeleteIcon />
                          </a>
                        </div>
                      </div>
                      <div v-show="isTaskAdding" class="project_task_row">
                        <div class="tb-column task__wrapper">
                          <div class="editable__box">
                            <label class="editable__label">
                              <div class="editable__preview">
                                {{ taskForm.title }}
                              </div>
                              <input
                                id="focusBox"
                                v-model="taskForm.title"
                                type="text"
                                autocomplete="off"
                                placeholder="Write your task title..."
                                class="editable__textarea"
                                @blur="addNewTask"
                                @keydown.enter="addNewTask"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <client-only>
                      <infinite-loading
                        v-if="tasksLoaded"
                        :identifier="tasksInfiniteId"
                        @infinite="tasksInfiniteHandler"
                      >
                        <div slot="spinner"><TaskLoader /></div>
                        <div slot="no-more"></div>
                        <div slot="no-results">
                          <EmptyState v-if="!tasks.length">
                            <p>You haven't added any task yet!</p>
                          </EmptyState>
                        </div>
                      </infinite-loading>
                    </client-only>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Note Tab -->
          <div id="notes" class="tab-pane">
            <div class="row h-100">
              <NoteList
                :notes-infinite-id="notesInfiniteId"
                :notes-loaded="notesLoaded"
                :notes="notes"
                @newNote="showNote = $event"
                @viewNote="viewNote"
                @notesInfiniteHandler="notesInfiniteHandler"
              />
              <!-- active note for note details -->
              <NoteView
                v-if="showNote && notes.length"
                :viewed-note="viewedNote"
              />
              <AddNote
                ref="addNoteRef"
                :show-note="showNote"
                @update:note="note = $event"
                @addNote="addNote"
                @showNote="showNote = $event"
              />
              <!-- End of Note -->
            </div>
          </div>
          <!-- Assignment Tab -->
          <div id="lead-assignments" class="tab-pane lead-assignments">
            <div class="row h-100">
              <div class="col-lg-4 h-100">
                <div class="customscrollbar">
                  <ul
                    v-if="assignments.length"
                    class="ld-list ld-list-bordered p0"
                  >
                    <li
                      v-if="assignments && assignments.length"
                      class="bg-white new-lead-add text-center"
                      @click="newAssignement()"
                    >
                      <a href="javascript:void(0);">
                        <PlusIcon />
                        Product Assignment
                      </a>
                    </li>
                    <AssignmentList
                      v-for="assignmentData in assignments"
                      :key="assignmentData.assignment_id"
                      :assignment="assignmentData"
                      :lead-status-options="leadStatusOptions"
                      @click.native="viewAssignment(assignmentData, $event)"
                      @onEdit="editAssignment"
                      @onDelete="deleteAssignment"
                      @update:status="assignment.lead_status = $event"
                      @onStatusChange="statusChangeHandler"
                    />
                  </ul>
                  <EmptyState v-else-if="!assignementLoading" dense>
                    <p>No assignment yet!</p>
                    <span class="btn btn-icon" @click="newAssignement()">
                      <PlusIcon />
                      New Assignment</span
                    ></EmptyState
                  >
                  <client-only>
                    <infinite-loading
                      :identifier="assignmentsInfiniteId"
                      @infinite="assignmentsInfiniteHandler"
                    >
                      <div slot="spinner">
                        <AssignmentLoader />
                      </div>
                      <div slot="no-more"></div>
                      <div slot="no-results"></div>
                    </infinite-loading>
                  </client-only>
                </div>
              </div>
              <div
                v-if="assignment.product_name && !assignmentForm"
                class="col-lg-8 h-100"
              >
                <div class="box customscrollbar bg-white">
                  <div class="dl-detail-left">
                    <div class="dealer-contact mt0">
                      <div class="row dealer-contact-col xs-gutters">
                        <div class="col-lg-4">
                          <div class="media sc_media">
                            <div class="media-body align-self-center">
                              <h5>Model</h5>
                              <p>{{ assignment.product_name }}</p>
                            </div>
                          </div>
                        </div>
                        <div
                          v-for="v in getAssignmentOption(
                            assignment.variant_options
                          )"
                          :key="v.id"
                          class="col-lg-4"
                        >
                          <div class="media sc_media">
                            <div class="media-body align-self-center">
                              <h5 v-if="v.variant_display_options.savedOption">
                                {{ v.variant_name }}
                              </h5>
                              <p v-if="v.variant_display_options.savedOption">
                                {{ v.variant_display_options.savedOption }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div v-if="assignment.dealership_id" class="box-heading">
                      <img
                        :src="
                          assignment.dealership_logo
                            ? assignment.dealership_logo
                            : `https://ui-avatars.com/api/?name=${
                                assignment.dealership_name
                                  ? assignment.dealership_name.charAt(0)
                                  : assignment.dealership_email
                                  ? assignment.dealership_email.charAt(0)
                                  : ''
                              }&size=128&background=e9ecef&bold=true`
                        "
                        alt="dealership logo"
                        style="height: 75px; width: auto"
                      />
                      <h3>{{ assignment.dealership_name }}</h3>
                    </div>
                    <div v-if="assignment.dealership_id" class="dealer-contact">
                      <div class="media sc_media">
                        <EmailIcon />
                        <div class="media-body align-self-start">
                          <h5>Email</h5>
                          <p>
                            <a
                              :href="'mailto:' + assignment.dealership_email"
                              >{{ assignment.dealership_email }}</a
                            >
                          </p>
                        </div>
                      </div>
                      <div class="media sc_media">
                        <PhoneIcon />
                        <div class="media-body align-self-start">
                          <h5>Phone</h5>
                          <p>
                            <a :href="'tel:' + assignment.dealership_phone">{{
                              assignment.dealership_phone
                            }}</a>
                          </p>
                        </div>
                      </div>
                      <div class="media sc_media">
                        <HomeIcon />
                        <div class="media-body align-self-start">
                          <h5>Address</h5>
                          <p>
                            {{ assignment.dealership_address_line_1 }}<br />
                            {{ assignment.dealership_address_line_2
                            }}<br v-if="assignment.dealership_address_line_2" />
                            {{ assignment.dealership_city || '-' }}<br />
                            {{ assignment.dealership_zip_code || '-' }}
                          </p>
                        </div>
                      </div>
                      <div class="row dealer-contact-col mt2 xs-gutters">
                        <div class="col-lg-4">
                          <div class="media sc_media">
                            <div class="media-body align-self-center">
                              <h5>Distance</h5>
                              <p>From the lead</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="media sc_media">
                            <div class="media-body align-self-center">
                              <h5>{{ assignment.dealership_distance }}</h5>
                              <p>Miles</p>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="media sc_media">
                            <div class="media-body align-self-center">
                              <h5>{{ assignment.dealership_time }}</h5>
                              <p>Minutes</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="
                        assignment.dealership_lat && assignment.dealership_lon
                      "
                      class="map-part"
                    >
                      <iframe
                        :src="
                          'https://maps.google.com/maps?q=' +
                          assignment.dealership_lat +
                          ',' +
                          assignment.dealership_lon +
                          '&hl=en&z=14&amp;output=embed'
                        "
                        src1="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.342090590568!2d-88.14682488441055!3d34.443463104458374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x888781b6b94e32d7%3A0x76b1f72d9f012107!2sTiffin%20Motorhomes%20Inc.!5e0!3m2!1sen!2sin!4v1611210960164!5m2!1sen!2sin"
                        width="350"
                        height="260"
                        frameborder="0"
                        style="border: 0"
                        allowfullscreen=""
                        aria-hidden="false"
                        tabindex="0"
                      ></iframe>
                    </div>
                    <div class="btns mt10">
                      <button
                        v-if="assignment.rsm.length"
                        type="button"
                        href="javascript:void(0);"
                        class="btn"
                        :class="{ disabled: isNotificationSending }"
                        :disabled="isNotificationSending"
                        @click="
                          sendNotification('rsm', assignment.assignment_id)
                        "
                      >
                        <i
                          v-if="isRsmNotificationSending"
                          class="fa fa-circle-o-notch fa-spin"
                        >
                        </i>
                        Send Notification to RSM
                      </button>
                      <button
                        v-if="assignment.dealership_id"
                        type="button"
                        :disabled="isNotificationSending"
                        :class="{ disabled: isNotificationSending }"
                        href="javascript:void(0);"
                        class="btn"
                        @click="
                          sendNotification('dealer', assignment.assignment_id)
                        "
                      >
                        <i
                          v-if="isDealerNotificationSending"
                          class="fa fa-circle-o-notch fa-spin"
                        >
                        </i>
                        Send Notification to Dealer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <transition name="fade">
                <div v-if="assignmentForm" class="col-lg-8 h-100">
                  <form class="h-100" @submit.prevent>
                    <div class="table-list-view customscrollbar p0">
                      <div class="sc_nav_section">
                        <div class="box">
                          <div class="media sc_media">
                            <div class="media-body align-self-center">
                              <h5>RV Details</h5>
                            </div>
                          </div>
                          <div class="rv-detail-form">
                            <div class="row align-items-end">
                              <div class="col-md-4">
                                <Select
                                  v-if="products.length"
                                  v-model="product"
                                  label="Product"
                                  :items="products"
                                  :disabled="editAssignmentFlag"
                                  :select_first="false"
                                  item_text="name"
                                  item_value="id"
                                  required
                                  return_object
                                ></Select>
                              </div>
                              <div
                                v-for="v in leadProduct.variant_options"
                                :key="v.id"
                                class="col-md-4 mst-1"
                              >
                                <div class="form-group">
                                  <label class="control-label">{{
                                    v.variant_name
                                  }}</label>
                                  <Select2
                                    v-if="v.variant_display_options.isDropdown"
                                    v-once
                                    v-model="
                                      v.variant_display_options.savedOption
                                    "
                                    :item-value="
                                      v.variant_display_options.savedOption
                                    "
                                    :options="v.variant_display_options.options"
                                    placeholder="Select"
                                  ></Select2>
                                </div>
                              </div>

                              <div class="col-md-12">
                                <div class="form-group">
                                  <label>Lead Source</label>
                                  <div class="radio-group mt-2">
                                    <label class="radio-label">
                                      <input
                                        v-model="leadProduct.lead_source"
                                        type="radio"
                                        value="Web"
                                        name="lead-source"
                                        @change="updateSource"
                                      />
                                      <span>
                                        <svg
                                          id="Layer_1"
                                          class="web-icon blue"
                                          version="1.1"
                                          xmlns="http://www.w3.org/2000/svg"
                                          xmlns:xlink="http://www.w3.org/1999/xlink"
                                          x="0px"
                                          y="0px"
                                          viewBox="0 0 18 18"
                                          xml:space="preserve"
                                        >
                                          <path
                                            id="Icon_ionic-md-globe-2"
                                            class="fill-color"
                                            d="M9,0C4,0,0,4,0,9s4,9,9,9s9-4,9-9S14,0,9,0z M8.1,16.4c-4.1-0.5-7-4.2-6.5-8.3c0.2-1.5,0.8-2.8,1.7-4c0,0.3,0.1,0.7,0.1,1C3.2,6,3.3,6.9,3.8,7.6C4,8,4.1,8.4,4.2,8.8C4.3,9.2,4.7,9.4,5,9.6c0.6,0.5,1.2,1,1.8,1.4c0.4,0.3,0.7,0.4,0.6,0.9c-0.1,0.4-0.2,0.7-0.3,1c0,0.3,0.2,0.7,0.4,0.9c0.3,0.3,0.6,0.6,1,0.9C8.9,15.2,8.3,15.8,8.1,16.4L8.1,16.4z M14.3,14.3c-1.1,1.1-2.4,1.8-3.9,2.1c0.2-0.5,0.5-0.9,0.9-1.2c0.3-0.3,0.6-0.6,0.8-1c0.2-0.3,0.4-0.7,0.6-1c0.3-0.5-0.7-1.1-1.1-1.3c-0.7-0.3-1.4-0.8-2-1.2c-0.5-0.3-1.4,0.2-2-0.1c-0.7-0.4-1.4-0.8-2-1.4C5.1,8.7,5.1,8.1,5.1,7.4c0.5,0,1.2-0.1,1.6,0.3c0.1,0.1,0.5,0.7,0.7,0.5c0.2-0.2-0.2-0.8-0.2-1C7,6.7,7.7,6.5,8,6.1C8.5,5.7,9.5,5,9.4,4.7s-1-1.2-1.5-1.1C7.8,3.7,7.1,4.4,7,4.5C7,4.3,7,4,7,3.8c0-0.2-0.3-0.3-0.3-0.4c0-0.2,0.7-0.7,0.9-0.9C7.5,2.4,7.1,2.1,6.9,2.1C6.6,2.2,6.3,2.3,6,2.4c0-0.1,0-0.2,0-0.3c0.6-0.3,1.2-0.5,1.9-0.6l0.6,0.2l0.4,0.5l0.4,0.4l0.4,0.1l0.6-0.5l-0.2-0.4V1.6c1.1,0.2,2.2,0.6,3.2,1.2c-0.2,0-0.4,0-0.6,0.1c-0.1,0-0.2-0.1-0.3-0.1C12.7,3.4,13,4,13.3,4.5c0.3,0.6,1,1.3,1.1,1.9c0.1,0.8,0,1.5,0.1,2.4c0.2,0.7,0.5,1.3,1,1.9c0.2,0.1,0.5,0.1,0.8,0.1C15.9,12.1,15.3,13.3,14.3,14.3L14.3,14.3z"
                                          ></path>
                                        </svg>
                                        Web</span
                                      >
                                      <span class="radio-span"></span>
                                    </label>
                                    <label class="radio-label">
                                      <input
                                        v-model="leadProduct.lead_source"
                                        type="radio"
                                        value="Phone"
                                        name="lead-source"
                                        checked=""
                                        @change="updateSource"
                                      />
                                      <span>
                                        <svg
                                          id="Layer_1"
                                          class="phone-icon blue"
                                          version="1.1"
                                          xmlns="http://www.w3.org/2000/svg"
                                          xmlns:xlink="http://www.w3.org/1999/xlink"
                                          x="0px"
                                          y="0px"
                                          viewBox="0 0 18 18"
                                          xml:space="preserve"
                                        >
                                          <g
                                            id="Icon_feather-phone"
                                            transform="translate(-741.165 -659.595)"
                                          >
                                            <path
                                              id="Path_3511"
                                              class="fill-color"
                                              d="M756.8,677.6c-0.1,0-0.1,0-0.2,0c-2.7-0.3-5.2-1.2-7.5-2.7c-2.1-1.3-3.9-3.1-5.2-5.2c-1.5-2.3-2.4-4.8-2.7-7.5c-0.1-1.3,0.8-2.4,2.1-2.6c0,0,0,0,0,0c0.1,0,0.1,0,0.2,0h2.5c1.2,0,2.2,0.9,2.3,2c0.1,0.8,0.3,1.5,0.5,2.2c0.3,0.9,0.1,1.8-0.5,2.5l-0.7,0.7c1,1.6,2.4,3,4,4l0.7-0.7c0.7-0.6,1.6-0.9,2.5-0.5c0.7,0.3,1.4,0.4,2.2,0.5c1.2,0.2,2.1,1.2,2,2.4v2.5C759.1,676.5,758.1,677.6,756.8,677.6L756.8,677.6z M746,661h-2.5c-0.3,0-0.6,0.1-0.7,0.4c-0.2,0.2-0.2,0.5-0.2,0.7c0.3,2.5,1.1,4.8,2.4,6.9c1.2,1.9,2.9,3.6,4.8,4.8c2.1,1.3,4.4,2.2,6.9,2.5c0.3,0,0.6-0.1,0.8-0.3c0.2-0.2,0.3-0.4,0.3-0.7v-2.5c0-0.5-0.3-0.9-0.8-1c-0.9-0.1-1.7-0.3-2.5-0.6c-0.4-0.1-0.8,0-1,0.2l-1.1,1.1c-0.2,0.2-0.6,0.3-0.8,0.1c-2.2-1.2-4-3.1-5.3-5.3c-0.2-0.3-0.1-0.6,0.1-0.8l1.1-1.1c0.3-0.3,0.3-0.7,0.2-1c-0.3-0.8-0.5-1.6-0.6-2.5C746.9,661.3,746.5,661,746,661L746,661z"
                                            ></path>
                                          </g>
                                        </svg>
                                        Phone</span
                                      >
                                      <span class="radio-span"></span>
                                    </label>
                                    <label class="radio-label">
                                      <input
                                        v-model="leadProduct.lead_source"
                                        type="radio"
                                        value="Event"
                                        name="lead-source"
                                        checked=""
                                        @change="updateSource"
                                      />
                                      <span>
                                        <svg
                                          id="Layer_1"
                                          class="event-icon"
                                          version="1.1"
                                          xmlns="http://www.w3.org/2000/svg"
                                          xmlns:xlink="http://www.w3.org/1999/xlink"
                                          x="0px"
                                          y="0px"
                                          viewBox="0 0 18 18"
                                          xml:space="preserve"
                                        >
                                          <g
                                            id="Group_4421"
                                            transform="translate(-1042.37 -658.583)"
                                          >
                                            <path
                                              id="Path_3523"
                                              class="fill-color"
                                              d="M1044.9,676.6c-1.3,0-2.4-1.1-2.5-2.4v-11.6c0.1-1.3,1.2-2.4,2.5-2.4h13c1.3,0,2.4,1.1,2.5,2.4v11.6c-0.1,1.4-1.2,2.4-2.5,2.4H1044.9z M1044.9,661.8c-0.5,0-0.9,0.4-1,0.9v11.5c0,0.5,0.5,0.9,1,0.9h12.9c0.5,0,1-0.4,1.1-0.9v-11.5c0-0.5-0.5-0.9-1-0.9L1044.9,661.8z"
                                            />
                                            <path
                                              id="Path_3524"
                                              class="fill-color"
                                              d="M1055,663.4c-0.4,0-0.8-0.3-0.8-0.8v-3.3c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v3.3C1055.8,663.1,1055.5,663.4,1055,663.4z"
                                            />
                                            <path
                                              id="Path_3525"
                                              class="fill-color"
                                              d="M1047.7,663.4c-0.4,0-0.8-0.3-0.8-0.8v-3.3c0-0.4,0.4-0.8,0.8-0.8c0.4,0,0.8,0.3,0.8,0.8v3.3C1048.5,663.1,1048.1,663.4,1047.7,663.4z"
                                            />
                                            <g id="Group_4420">
                                              <path
                                                id="Path_3526"
                                                class="fill-color"
                                                d="M1049.7,672.5l-3.2-3.2c-0.3-0.3-0.3-0.8,0-1.1c0.3-0.3,0.8-0.3,1,0l2.2,2.2l5.5-5.5c0.3-0.3,0.8-0.3,1.1,0c0.3,0.3,0.3,0.8,0,1L1049.7,672.5z"
                                              />
                                            </g>
                                          </g>
                                        </svg>
                                        Event</span
                                      >
                                      <span class="radio-span"></span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="box mt20">
                          <div class="clearfix mb1">
                            <div class="pull-left">
                              <div class="media sc_media mb0 mt10">
                                <div class="media-body align-self-center">
                                  <h5>Assign Dealer/RSM</h5>
                                </div>
                              </div>
                            </div>
                            <div class="pull-right">
                              <button
                                type="button"
                                href="javascript:void(0);"
                                :disabled="assigning || product === null"
                                class="btn btn-blue"
                                @click="assign()"
                              >
                                <i
                                  v-if="assigning"
                                  class="fa fa-circle-o-notch fa-spin"
                                >
                                </i>
                                {{
                                  editAssignmentFlag
                                    ? 'Update Assignment'
                                    : 'Assign'
                                }}
                              </button>
                            </div>
                          </div>
                          <div class="dlrsm-search">
                            <svg
                              id="Layer_1"
                              class="search-icon"
                              version="1.1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlns:xlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 18 18"
                              xml:space="preserve"
                            >
                              <path
                                id="Icon_ionic-ios-search"
                                class="fill-color"
                                d="M17.8,16.7l-5-5.1c2.5-3.1,1.9-7.6-1.1-10.1C8.5-0.9,4-0.4,1.6,2.7c-2.5,3.1-1.9,7.6,1.1,10.1c2.6,2.1,6.4,2.1,9,0l5,5c0.3,0.3,0.8,0.3,1.1,0.1C18.1,17.5,18.1,17,17.8,16.7C17.8,16.7,17.8,16.7,17.8,16.7L17.8,16.7z M7.1,12.8c-3.1,0-5.7-2.5-5.7-5.7S4,1.5,7.1,1.5c3.1,0,5.7,2.5,5.7,5.7c0,1.5-0.6,2.9-1.7,4C10.1,12.2,8.6,12.8,7.1,12.8L7.1,12.8z"
                              ></path>
                            </svg>
                            <input
                              v-model="searchTerm"
                              type="text"
                              name="dlrsm-search"
                              class="form-control"
                              placeholder="Search Dealer/RSM"
                              :disabled="!product"
                            />
                          </div>
                          <div class="clearfix">
                            <div class="box bg-white p20">
                              <h5 class="mt0">Dealers</h5>
                              <ul class="thead">
                                <li>
                                  <div
                                    class="name-email sorting sortarrow flex65"
                                    :class="[
                                      dealershipOrderBy === 'dealership_name' &&
                                      dealershipOrder === 'DESC'
                                        ? 'active descending'
                                        : '',
                                    ]"
                                    @click="sortDealers('dealership_name')"
                                  >
                                    <span>Dealer Name / City</span>
                                  </div>
                                  <div
                                    class="last-score sorting sortarrow flex15"
                                    :class="[
                                      dealershipOrderBy === 'distance' &&
                                      dealershipOrder === 'DESC'
                                        ? 'active descending'
                                        : '',
                                    ]"
                                    @click="sortDealers('distance')"
                                  >
                                    <span>Distance And Time</span>
                                  </div>
                                  <div class="last-activity sorting flex10">
                                    &nbsp;
                                  </div>
                                </li>
                              </ul>
                              <div class="clearfix">
                                <ul class="tbody">
                                  <li v-for="d in dealerships" :key="d.id">
                                    <div class="name-email tb-column flex65">
                                      <div class="media">
                                        <div class="media-left p0">
                                          <div
                                            v-if="d.dealership_logo"
                                            class="profile-bg"
                                            :title="d.dealership_name"
                                            :style="{
                                              backgroundImage: `url(${d.dealership_logo})`,
                                            }"
                                          ></div>
                                          <div
                                            v-else
                                            class="profile-char bg-gray"
                                            :title="d.dealership_name"
                                          >
                                            {{
                                              d.dealership_name
                                                .charAt(0)
                                                .toUpperCase()
                                            }}
                                          </div>
                                        </div>

                                        <div class="media-body">
                                          <div class="top-column">
                                            <label
                                              ><a>{{
                                                d.dealership_name
                                              }}</a></label
                                            >
                                            <span>
                                              {{ d.city }}, {{ d.state }}
                                            </span>
                                          </div>
                                          <div class="bottom-column">
                                            Last Lead:
                                            <span
                                              >{{
                                                d.lead_assign_date
                                                  | leadDateFormatted
                                              }}&nbsp; &nbsp;
                                              {{ d.lead_assign_day }}</span
                                            >
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="as_leads tb-column flex25">
                                      <div class="top-column">
                                        <label>{{ d.distance }}</label>
                                      </div>
                                      <div class="bottom-column">
                                        <span>{{ d.time }}</span>
                                      </div>
                                    </div>
                                    <div class="tb-column flex10">
                                      <div class="top-column">
                                        <label class="check-label">
                                          <input
                                            v-model="leadProduct.dealership_id"
                                            type="radio"
                                            :value="d.id"
                                            name="dealers"
                                            @click="handleRemove"
                                          />
                                          <span class="check-span"></span>
                                        </label>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="box bg-white p20 mt10">
                              <h5 class="mt0">RSM</h5>
                              <ul class="thead">
                                <li>
                                  <div
                                    class="name-email sorting sortarrow"
                                    :class="[
                                      rsmOrderBy === 'DESC'
                                        ? 'active descending'
                                        : '',
                                    ]"
                                    @click="sortRsm"
                                  >
                                    <span>RSM Name / Designation</span>
                                  </div>
                                </li>
                              </ul>
                              <div class="clearfix">
                                <ul class="tbody">
                                  <li v-for="rsm in rsms" :key="rsm.id">
                                    <div class="name-email tb-column flex90">
                                      <div class="media">
                                        <div class="media-left p0">
                                          <div
                                            v-if="rsm.display_profile_image"
                                            class="profile-bg"
                                            title="Travel and Leisure Vehicles LTD"
                                            :style="
                                              rsm.display_profile_image
                                                ? 'background-image: url(' +
                                                  rsm.display_profile_image +
                                                  ');'
                                                : ''
                                            "
                                          ></div>
                                          <div
                                            v-else
                                            class="profile-char bg-gray"
                                            :title="rsm.name"
                                          >
                                            {{
                                              rsm.name.charAt(0).toUpperCase()
                                            }}
                                          </div>
                                        </div>
                                        <div class="media-body">
                                          <div class="top-column">
                                            <label>{{ rsm.name }}</label>
                                          </div>
                                          <div class="bottom-column">
                                            Designation: <span>RSM</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="tb-column flex10">
                                      <div class="top-column">
                                        <label class="check-label">
                                          <input
                                            v-model="leadProduct.rsm_user_id"
                                            type="checkbox"
                                            name="rsm"
                                            :value="rsm.id"
                                          />
                                          <span class="check-span"></span>
                                        </label>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a href="javascript:void(0);" class="body-content-fixed-toggle">
      <SideBarWhiteIcon />
      <SideBarInvertIcon />
    </a>
    <VoiceNoteModal
      ref="voiceModal"
      @update:annotation="note = $event"
      @addNote="addNote"
    />
    <ToggleableContent
      :submitted-forms="submittedForms"
      :most-visited="mostVisited"
      :last-visited="lastVisited"
      :top-notes-data="topNotesData"
      :recent-web-visits="recentWebVisits_"
    />
    <QuickNoteModal
      :description="loadedDescription"
      @update:description="(newValue) => (loadedDescription = newValue)"
      @saveDescription="addQuickNote"
    />
    <ConfirmationDialog
      v-model="showDeleteDialog"
      @click:confirm-button="deleteTask"
    >
      <template slot="header">Delete Task</template>
      Are you sure you want to delete the task?
    </ConfirmationDialog>
  </div>
</template>
<script>
import axios from 'axios'
import { required, email } from 'vuelidate/lib/validators'
import Moment from 'moment-timezone'
import _ from 'lodash'
import $ from 'jquery'
import Select2WithColor from '@/components/plugins/Select2WithColor'
import ConfirmationDialog from '@/components/theme/settings/ConfirmationDialog'
import { _debounce, clone } from '~/utils/helper.js'
import {
  isSame,
  docExtensions,
  pdfExtensions,
  txtExtensions,
} from '~/utils/index.js'
import { tagStyle } from '~/mixins/lifeOfLeadConstants.js'
import Select2 from '~/components/plugins/Select2'
import Select from '~/components/lead/Select'
import MenuIcon from '~/components/lead/Icons/MenuIcon'
import DatePicker from '~/components/plugins/DatePicker'
import imageInput from '~/components/lead/ImageInput'
import mixin from '~/mixins/lead.js'
// import LeadTaskUser from '~/components/lead/LeadTaskUser.vue'
import scrolling from '~/mixins/scrolling'
import FileDragAndDrop from '~/components/lead/FileDragAndDrop.vue'
import LifeDetails from '~/components/lead/LeadDetails/lifeDetails.vue'
import ToggleableContent from '~/components/lead/LeadDetails/ToggleableContent.vue'
import VoiceNoteModal from '~/components/lead/LeadDetails/VoiceNoteModal.vue'
import NoteView from '~/components/lead/LeadDetails/Notes/NoteView.vue'
import LeadView from '~/components/lead/LeadDetails/LeadView.vue'
import AddNote from '~/components/lead/LeadDetails/Notes/AddNote.vue'
import QuickNoteModal from '~/components/lead/QuicknoteModal.vue'
import EmptyState from '~/components/theme/global/EmptyState'
import leadConfiguration from '~/mixins/leadConfiguration.js'
import NoteList from '~/components/lead/LeadDetails/Notes/NoteList'
import LifeofleadList from '~/components/lead/LeadDetails/Lifeoflead/LifeofleadList.vue'
import AssignmentList from '~/components/lead/LeadDetails/Assignment/AssignmentList.vue'
import LifeOfLeadLoader from '~/components/lead/LeadDetails/Loaders/LifeOfLeadLoader.vue'
import AssignmentLoader from '~/components/lead/LeadDetails/Loaders/AssignmentLoader.vue'
import TaskLoader from '~/components/lead/LeadDetails/Loaders/TaskLoader.vue'
import ProfileLoader from '~/components/lead/LeadDetails/Loaders/ProfileLoader.vue'
import Select2WithImage from '@/components/plugins/Select2WithImage.vue'
const alertMessage =
  'Changes not applied until saved. Do you want to continue without saving it?'
export default {
  components: {
    MenuIcon,
    imageInput,
    Select2,
    DatePicker,
    QuickNoteModal,
    Select,
    // LeadTaskUser,
    Select2WithImage,
    FileDragAndDrop,
    LifeDetails,
    EmptyState,
    ConfirmationDialog,
    Select2WithColor,
    ToggleableContent,
    VoiceNoteModal,
    NoteView,
    LeadView,
    AddNote,
    NoteList,
    LifeofleadList,
    AssignmentList,
    LifeOfLeadLoader,
    AssignmentLoader,
    TaskLoader,
    ProfileLoader,
    VueGoogleAutocomplete: () => import('vue-google-autocomplete'),
  },
  mixins: [mixin, scrolling, leadConfiguration],
  beforeRouteLeave(to, from, next) {
    if (this.note !== '' || this.isLifeOfLeadFilled || this.product) {
      const x = confirm(alertMessage)
      next(x)
    } else {
      next()
    }
  },
  layout: 'leadLayout',
  middleware: ['authCheck', 'can-access-lead-module'],
  transition: 'fade',
  data() {
    return {
      dealershipOrderBy: '',
      dealershipOrder: '',
      rsmOrderBy: 'ASC',
      isTaskAdding: false,
      isTaskAddLoading: false,
      leadDetails: {},
      leadStatusOptions: [],
      form: {},
      imagePreview: null,
      loadStatus: false,
      note: '',
      notes: [],
      annotation: '',
      topNotesData: [],
      submittedForms: [],
      mostVisited: [],
      lastVisited: [],
      notesPage: 0,
      viewedNote: { user_details: {} },
      showNote: true,
      notesInfiniteId: +new Date(),
      notesLoaded: false,
      productOption: [],
      map: '',
      tempDeletedTaskId: null,
      showDeleteDialog: false,
      taskForm: {
        title: '',
        due_date: '',
        status: 0,
        dealership_user_id: 0,
        lead_id: this.$route.params.id,
      },
      attachFileName: [],
      attachFiles: [],
      // reRender: true,
      loadedDescription: '',
      loadedTask: null,
      taskStatusList: [],
      taskUserList: [],
      userList: false,
      tasks: [],
      tasksLoaded: false,
      tasksPage: 0,
      tasksInfiniteId: new Date().getTime(),
      lifeOfleadForm: this.createLifeForm(),
      composeEmailForm: this.createLifeForm(true),
      dealerships: [],
      listOfLifeLine: [],
      lifeFilterType: null,
      queryType: null,
      lifeOfLeadAttachFileName: null,
      lifeOfLeadPage: 0,
      lifeOfLeadInfiniteId: +new Date(),
      lifeOfLead: [],
      assignments: [],
      assignmentsInfiniteId: new Date().getTime(),
      assignmentsPage: 0,
      assignementLoading: false,
      assignment: {
        dealership: {},
        location: null,
      },
      assignmentForm: false,
      product: null,
      products: [],
      rsms: [],
      leadAssignment: this.newLeadAssignment(),
      leadProduct: this.newProduct(),
      editAssignmentFlag: false,
      selectedVariantOptions: [],
      variants: [],
      searchTerm: '',
      lifeOfleadType: [],
      isFilterOpen: false,
      addLifeOfLeadType: [
        'Outgoing Call',
        'outgoingCall',
        'Call – Outgoing',
        'Incoming Call',
        'Incomming Call',
        'Email Sent',
        'emailOpened',
        'Email Received',
        'emailVisit',
        'Product/Model Not Found',
        'RSM Assigned',
      ],
      recentWebVisits_: [],
      webVisitLinks: [],
      resulttext: '',
      leadLifeDetails: '',
      activeLifeOfLeadNote: {
        id: null,
        data: {},
        info: {
          isLoading: false,
          data: null,
        },
      },
      initialLoading: false,
      assigning: false,
      removeDealershipIdFlag: false,
      isDealerLoading: false,
      attachments: [],
      templates: [],
      draftEmailData: {
        signature: '',
        signatureStatus: 0,
        leadId: '',
        emailId: '',
        subject: '',
        body: '',
        attachments: [],
        tempFiles: [],
      },
      isLifeAdding: false,
      last_sort_order: null,
      activeTab: this.$route.params.tab,
      clonedLife: null,
      isSMTPenabled: true,
      warningText: '',
      isNotificationSending: false,
      isDealerNotificationSending: false,
      isRsmNotificationSending: false,
      isRemark: false,
      isQualify: false,
      signatureStatus: false,
      composeEmailSignature: '',
      leadLoading: false,
    }
  },
  computed: {
    getTaskUserValue() {
      return (userId) => {
        const user = this.taskUserList.find(
          (e) => parseInt(e.id) === parseInt(userId)
        )
        if (user) {
          return user.id
        } else {
          return 0
        }
      }
    },
    getLabelDesc() {
      return (html, title) => `<label>${title}</label>` + html
    },
    getTrimmedContent() {
      return (data) => {
        const breakPoint = `<div class="gmail_quote">`
        const [first, ...rest] = data.split(breakPoint)
        return [first, rest.join(breakPoint)]
      }
    },
    isValidJson() {
      return (str) => {
        if (!str) return false
        try {
          JSON.parse(str)
        } catch (e) {
          return false
        }
        return true
      }
    },
    getAssignmentOption() {
      return (option) =>
        option?.filter((op) => op.variant_display_options.savedOption)
    },
    isDoc() {
      return (docType) =>
        docExtensions.includes(docType) ||
        pdfExtensions.includes(docType) ||
        txtExtensions.includes(docType)
    },
    parseJSON() {
      return (content) => JSON.parse(content)
    },
    isComposeEmail() {
      return this.queryType === 'Compose Email'
    },
    getStatusColor() {
      return (taskStatus) => {
        const color = this.taskStatusList.find(
          (status) => status.id === taskStatus
        )?.status_color
        return color
      }
    },
    checkHiddenFilter() {
      return (name) => this.filterHideList.find((e) => e.name === name).isActive
    },
    isLifeOfLeadFilled() {
      if (this.isComposeEmail) {
        if (
          !(
            this.queryType === null ||
            isSame(this.composeEmailForm, this.clonedLife)
          )
        ) {
          return true
        }
      } else if (
        !(
          this.queryType === null ||
          isSame(this.composeEmailForm, this.clonedLife)
        )
      ) {
        return true
      }
      return false
    },
  },
  watch: {
    isLifeAdding: {
      handler(v) {
        if (v) {
          if (this.isComposeEmail) {
            this.clonedLife = clone(this.composeEmailForm)
          } else {
            this.clonedLife = clone(this.lifeOfleadForm)
          }
        }
      },
    },
    '$route.query'(to) {
      this.activeTab = to?.tab
    },
    // activeTab(newVal) {
    //   if (newVal === 'task') {
    //     this.$refs.taskTab.click()
    //     this.loadTaskProductList()
    //     this.loadTaskStatusList()
    //     this.loadTaskUserList()
    //   }
    //   if (newVal === 'life') {
    //     this.$refs.lifeOfLeadTab.click()
    //   }
    //   if (newVal === 'notes') {
    //     this.$refs.notesTab.click()
    //   }
    //   if (newVal === 'product') {
    //     this.$refs.productTab.click()
    //   }
    // },
    queryType: {
      handler() {
        if (this.isComposeEmail) {
          this.$axios
            .$post('lm/leads/life_line/get-templates')
            .then(({ data }) => {
              this.templates = data.templates
              this.composeEmailSignature = data.signature.signature
              this.signatureStatus = data.signature.status
            })
            .catch((e) => {
              console.log(e)
            })
        } else {
          this.lifeOfleadForm = this.createLifeForm()
        }
      },
    },
    product: {
      handler() {
        this.handleProductChange()
      },
      deep: true,
    },
    searchTerm() {
      _debounce(() => {
        this.loadDealerships()
      }, 500)
    },
    isTaskAdding() {
      if (this.isTaskAdding) {
        _debounce(() => {
          window.$('#focusBox').focus()
        }, 100)
      }
    },
    filterHideList: {
      handler() {
        localStorage.setItem(
          'filterHeaderList',
          JSON.stringify(this.filterHideList)
        )
      },
      deep: true,
    },
  },

  beforeMount() {
    const filters = JSON.parse(localStorage.getItem('filterHeaderList'))
    if (filters) {
      this.filterHideList = filters
    }
    window.addEventListener('beforeunload', (event) => {
      if (this.note === '') return
      event.preventDefault()
      // Chrome requires returnValue to be set.
      event.returnValue = ''
    })
  },
  mounted() {
    $('.tab-click').on('click', (evt) => {
      this.checkLeadIsOpen(evt)
    })
    document.addEventListener('change', () => {
      this.changeAddressIfNotFound()
    })
    this.navigateTaskTab()
  },
  destroyed() {
    $('.tab-click').off('click')
    const cleanfs = setTimeout(() => {
      document.removeEventListener('change', () => {
        this.changeAddressIfNotFound()
      })
    }, 100)
    clearTimeout(cleanfs)
  },
  created() {
    this.loadLeadData()
    this.loadLeadStatusOption()
    this.lifeOfLeadTypes()
    this.recentData()
    this.topNotes()
    this.loadAllProduct()
    this.getLifeLineList()
    // this.loadTaskProductList()
    // this.loadTaskStatusList()
    // this.loadTaskUserList()
  },
  methods: {
    handleRemove() {
      this.leadProduct.dealership_id = null
      // console.log('called')
      _debounce(() => {
        this.loadRSM()
      }, 200)
    },
    updateSource() {
      if (!this.editAssignmentFlag) {
        return
      }
      this.$axios
        .$post(`lm/leads/assignment/edit-source`, {
          url_workspace_id: this.$route.params.workspace_id,
          lead_id: this.leadAssignment.lead_id,
          assignment_id: this.leadAssignment.assignment_id,
          dealership_id: this.leadAssignment.dealership_id,
          product_id: this.leadAssignment.product_id,
          lead_source: this.leadProduct.lead_source,
        })
        .then(({ message }) => {
          this.$toast.success(message)
          const assign = this.assignments.find(
            (i) => i.assignment_id === this.leadAssignment.assignment_id
          )
          assign.lead_source = this.leadProduct.lead_source
          this.assignments.splice(1, assign)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    sendNotification(type, assignment_id) {
      this.isNotificationSending = true
      type === 'dealer'
        ? (this.isDealerNotificationSending = true)
        : (this.isRsmNotificationSending = true)
      this.$axios
        .$post(`/lm/leads/assignment/send-mail-to-${type}`, {
          url_workspace_id: this.$route.params.workspace_id,
          lead_id: this.$route.params.id,
          assignment_id,
        })
        .then(({ message }) => {
          this.$toast.success(message)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          this.isNotificationSending = false
          this.isDealerNotificationSending = false
          this.isRsmNotificationSending = false
        })
    },
    handleProductChange() {
      this.searchTerm = ''
      this.removeDealershipIdFlag = false
      if (this.product) {
        this.leadProduct.product_id = this.product.id
        this.leadProduct.category_id = this.product.category_id
        this.leadProduct.product_name = this.product.name

        this.$axios
          .$post(`lm/product/variant/get-by-product`, {
            workspace_id: this.$route.params.workspace_id,
            product_id: this.product.id,
          })
          .then(({ data }) => {
            if (!this.editAssignmentFlag) {
              this.leadProduct.variant_options = []
            }
            if (this.editAssignmentFlag) {
              // const variant_options = this.leadDetails.products.find(
              //   (o) => o.product_id === this.product.id
              // )?.variant_options
              const variant_options = this.assignments.find(
                (o) => o.assignment_id === this.leadAssignment.assignment_id
              )?.variant_options
              if (variant_options) {
                // eslint-disable-next-line array-callback-return
                const mergedVariants = data.filter((e) => {
                  if (variant_options.every((f) => f.id !== e.id)) {
                    return e
                  }
                })
                this.leadProduct.variant_options = [
                  ...clone(variant_options),
                  ...mergedVariants,
                ]
                this.leadProduct.variant_options.forEach((e, i) => {
                  e.variant_display_options.options =
                    data[i].variant_display_options.options
                })
              } else {
                this.leadProduct.variant_options = data
              }
            } else {
              this.leadProduct.variant_options = data
            }
            this.variants = data
          })

        this.loadDealerships()
        // this.loadRSM()
        // if (!this.editAssignmentFlag) this.loadRSM()
      } else {
        this.dealerships = []
        this.rsms = []
        this.variants = []
        this.leadProduct.variant_options = []
      }
    },
    async updateTabUrl(tabName) {
      await this.$router.push({
        name: 'workspace_id-lead-leads-id',
        params: {
          workspace_id: this.$route.params.workspace_id,
          id: this.$route.params.id,
        },
        query: {
          tab: tabName,
        },
      })
    },
    createLifeForm(composeEmail = false) {
      if (composeEmail) {
        return {
          body: '',
          subject: '',
          signature: '',
          // status: '',
          attachments: [],
          emailAttachments: [],
          lead_id: this.$route.params.id,
          templateId: '',
          url_workspace_id: this.$route.params.workspace_id,
        }
      }
      return {
        type: null,
        product_id: null,
        title: '',
        description: '',
        attach: null,
        date: null,
        lead_id: this.$route.params.id,
        url_workspace_id: this.$route.params.workspace_id,
      }
    },
    changeAddressIfNotFound() {
      if (this.$refs?.autocompleteRef?.autocompleteText) {
        this.form.address_line_1 = this.$refs.autocompleteRef?.autocompleteText
      } else {
        this.form.address_line_1 = ''
      }
    },
    navigateTaskTab() {
      const { tab } = this.$route.query
      if (tab === 'life') {
        this.$refs.lifeOfLeadTab.click()
      } else if (tab === 'task') {
        this.$refs.taskTab.click()
      } else if (tab === 'notes') {
        this.$refs.notesTab.click()
      } else if (tab === 'product') {
        this.$refs.productTab.click()
      }
    },
    filterLifeOfLead(val) {
      if (val === 'All') {
        this.lifeFilterType = null
      } else {
        this.lifeFilterType = val
      }
      this.loadLife()
    },
    async getLifeLineList() {
      try {
        const { data } = await this.$axios.$get(
          'lm/leads/life_line/get-life-of-lead-event-list'
        )
        this.listOfLifeLine = data
        this.listOfLifeLine.unshift('All')
      } catch (error) {
        console.error(error)
      }
    },
    handleFilterOpen() {
      this.isFilterOpen = false
    },
    checkMinDate(taskDate) {
      if (Moment(taskDate) > Moment()) {
        return new Date()
      }
      return taskDate
    },
    getDisabledDateList(taskDate) {
      const dateArray = []
      const c = Moment(taskDate).add(1, 'days').format('YYYY-MM-DD')
      const s = Moment().format('YYYY-MM-DD')
      let currentDate = Moment(c)
      const stopDate = Moment(s)
      while (currentDate < stopDate) {
        dateArray.push(Moment(currentDate).format('YYYY-MM-DD'))
        currentDate = Moment(currentDate).add(1, 'days')
      }
      return dateArray
    },
    checkRemark(ev) {
      if (ev.target.checked) {
        this.isRemark = true
      } else if (this.leadDetails.is_qualify) {
        // this.isRemark = false
        this.toggleLeadQualify()
      } else {
        this.isRemark = false
      }
    },
    toggleLeadQualify() {
      this.$axios
        .$post('lm/leads/qualify-lead', {
          url_workspace_id: this.$route.params.workspace_id,
          lead_id: this.leadDetails.id,
          is_qualify: (this.isQualify && 1) || 0,
          qualify_note: this.leadDetails.qualify_note,
        })
        .then(({ message }) => {
          this.isRemark = false
          this.$toast.success('Lead contact status updated.')
          this.loadLeadData()
        })
        .catch((err) => {
          this.loading = false
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    addQuickNoteDialog(task, desc) {
      this.loadedDescription = desc
      this.loadedTask = task
    },
    setDeletedTask(id) {
      this.$nextTick(() => {
        this.showDeleteDialog = true
      })
      this.tempDeletedTaskId = id
    },
    addQuickNote() {
      if (
        this.loadedDescription !== '' &&
        this.loadedDescription !== null &&
        this.loadedDescription !== this.loadedTask.description
      ) {
        this.$axios
          .$post(
            `lm/leads/task/edit`,
            this.createFormData(
              this.loadedTask,
              'description',
              this.loadedDescription
            )
          )
          .then((response) => {
            this.$toast.global.success(response.message)
            const task = this.tasks.find(
              ({ id }) => parseInt(this.loadedTask.id) === parseInt(id)
            )
            task && (task.description = this.loadedDescription)
            const index = this.tasks.findIndex(
              ({ id }) => parseInt(this.loadedTask.id) === parseInt(id)
            )
            this.tasks.splice(index, 1, task)
          })
          .catch((error) => {
            this.$toast.error(this.$getErrorMessage(error.message))
          })
      }
    },
    getAddressData(data) {
      this.form.address_line_1 = ''
      let street = ''
      let route = ''
      if (data.street_number) street += data.street_number + ' '
      if (data.route) {
        route += data.route
      }
      const address = street + route
      this.form.address_line_1 = address
    },
    checkIsInclued(type) {
      for (const x of tagStyle) {
        if (x.type.includes(type)) {
          return true
        }
      }
    },
    checkLeadIsOpen(event) {
      if (this.isLifeOfLeadFilled || this.product) {
        if (confirm(alertMessage)) {
          $('.new-note').hide()
          this.isLifeAdding = false
          this.lifeOfleadForm = this.createLifeForm()
          this.product = null
          this.queryType = null
          this.assignmentForm = false
          return true
        } else {
          event.preventDefault()
          event.stopImmediatePropagation()
          return false
        }
      }
      return true
    },
    async loadAllProduct() {
      await this.$axios
        .$get(`lm/product/all-products`, {
          params: {
            url_workspace_id: this.$route.params.workspace_id,
          },
        })
        .then(({ data }) => {
          this.products = data
        })
        .catch((error) => {
          this.$toast.error(error.message)
        })
    },
    async loadLeadData() {
      this.leadLoading = true
      await this.$axios
        .$get(`lm/leads/view`, {
          params: {
            url_workspace_id: this.$route.params.workspace_id,
            id: this.$route.params.id,
          },
        })
        .then((response) => {
          this.leadDetails = response.data
          const { msg = '', status = false } = this.leadDetails.smtp
          this.isSMTPenabled = status
          this.warningText = msg
          this.leadDetails.is_qualify = Boolean(
            parseInt(response.data.is_qualify)
          )
          this.isQualify = this.leadDetails.is_qualify
          if (this.leadDetails.products.length) {
            this.leadDetails.products = this.leadDetails.products.map(
              (data) => {
                if (data.lead_status === null) {
                  data.lead_status = '1'
                }
                return data
              }
            )
          }
          this.imagePreview = response.data.logo
          this.lifeOfleadForm.lead_id = response.data.id
          this.taskForm.lead_id = response.data.id
          this.form = { ...response.data }
          const config = { responseType: 'blob' }
          if (response.data.logo !== null) {
            axios.get(response.data.logo, config).then((response) => {
              this.form.logo = new File([response.data], _.uniqueId() + '.jpeg')
            })
          }
          this.leadLoading = false
          if (!response.data.isRead) {
            this.$axios
              .$post('lm/leads/add-lead-read', {
                workspace_id: this.$route.params.workspace_id,
                lead_id: this.$route.params.id,
                user_id: this.$auth.user.id,
                is_read: true,
              })
              .catch((error) => {
                this.$toast.global.error(error.message)
              })
          }
        })
    },

    // recent data module
    async recentData() {
      await this.$axios
        .$post(`lm/sharpspring/get-lead-analitics`, {
          lead_id: this.$route.params.id,
        })
        .then(({ data }) => {
          this.submittedForms = data.submitted_forms
          this.mostVisited = data.visited_pages_chart_data
          this.lastVisited = data.last_web_visit
          if (Array.isArray(this.mostVisited)) {
            this.recentWebVisits_ = this.mostVisited.map((e) => {
              if (isNaN(e.name) && e.name.search('http') === -1) {
                const HTTPS = e.name.replace(`href='`, `href='https://`)
                return HTTPS
              }
              return e.name
            })
          }
        })
        .catch((error) => {
          this.$toast.error(error.message)
        })
    },
    // end of recent data module

    // top notes module
    async topNotes() {
      await this.$axios
        .$get('/lm/leads/notes/list', {
          params: {
            workspace_id: this.$route.params.workspace_id,
            lead_id: this.$route.params.id,
            page: 1,
          },
        })
        .then(({ data }) => {
          this.topNotesData = data.notesList.slice(0, 2)
        })
        .catch((error) => {
          this.$toast.error(error.message)
        })
    },
    // top notes module ends
    loadLifeDetailsChecked(lifeEl) {
      this.activeLifeOfLeadNote.id = lifeEl.id
      this.activeLifeOfLeadNote.data = lifeEl
      this.activeLifeOfLeadNote.info.isLoading = true
      // this.$store.dispatch('loading/setOverlay', {
      //   isLoading: true,
      //   loadingText: 'Loading',
      // })
      this.$axios
        .$post('lm/leads/life_line/get-life-of-lead-event-detail', {
          event_id: lifeEl.id,
        })
        .then(({ data }) => {
          // data && this.$toast.error(data.error)
          if (data.type === 'Email Drafted') {
            const parsed = this.parseJSON(data.description)
            this.draftEmailData.leadId = parsed.leadId
            this.draftEmailData.body = parsed.body
            this.draftEmailData.subject = parsed.subject
            this.draftEmailData.emailId = parsed.emailId
            this.draftEmailData.signature = parsed.signature
            this.draftEmailData.attachments = parsed.attachments
            this.draftEmailData.tempFiles = [...parsed.attachments]
            this.draftEmailData.signatureStatus = parseInt(
              parsed.signatureStatus
            )
          } else {
            this.activeLifeOfLeadNote.info.data = data
            const lifeData = this.activeLifeOfLeadNote.info.data
            if (this.isWebVisits && Array.isArray(lifeData)) {
              const webvisitLinks = []
              lifeData.forEach((e) => {
                if (e.description.search('http') === -1) {
                  const HTTPS = e.description.replace(
                    `href='`,
                    `href='https://`
                  )
                  webvisitLinks.push(HTTPS)
                } else {
                  webvisitLinks.push(e.description)
                }
                // const HTTPS = e.description.replace(`href='`, `href='https://`)
                // webvisitLinks.push(HTTPS)
              })
              this.webVisitLinks = webvisitLinks
            }
          }
        })
        .catch((e) => {
          this.$toast.error(e.message)
        })
        .finally(() => {
          this.activeLifeOfLeadNote.info.isLoading = false
          // this.$store.dispatch('loading/setOverlay', {
          //   isLoading: false,
          // })
        })
    },
    // life of lead module
    loadLifeDetails($event, lifeEl, shouldCheckConfirmation) {
      if ($event.srcElement.nodeName === 'A') return
      // checking if it should check confirmation
      if (shouldCheckConfirmation) {
        if (this.isLifeOfLeadFilled) {
          if (confirm(alertMessage)) {
            this.lifeOfleadForm = this.createLifeForm()
            this.product = null
            this.queryType = null
            this.assignmentForm = false
            this.isLifeAdding = false
            this.loadLifeDetailsChecked(lifeEl)
          }
        } else {
          this.isLifeAdding = false
          this.loadLifeDetailsChecked(lifeEl)
        }
      }
    },
    sendDraftEmail() {
      this.$v.draftEmailData.$touch()
      if (this.$v.draftEmailData.$invalid) {
        return false
      }
      this.$store.dispatch('loading/setOverlay', {
        isLoading: true,
        loadingText: 'Sending Draft email',
      })
      const draftEmailData = new FormData()
      draftEmailData.append('leadId', this.draftEmailData.leadId)
      draftEmailData.append('emailId', this.draftEmailData.emailId)
      draftEmailData.append('subject', this.draftEmailData.subject)
      draftEmailData.append('body', this.draftEmailData.body)
      this.draftEmailData.signature &&
        draftEmailData.append('signature', this.draftEmailData.signature)
      draftEmailData.append(
        'signatureStatus',
        this.draftEmailData.signatureStatus
      )
      draftEmailData.append('eventId', this.activeLifeOfLeadNote.id)
      const newFiles = this.draftEmailData.attachments
        // eslint-disable-next-line array-callback-return
        .filter((e) => {
          if ('newFile' in e) {
            return e
          }
        })
        .map((e) => e.file)
      const deletedIds = this.draftEmailData.tempFiles
        // eslint-disable-next-line array-callback-return
        .filter((e) => {
          if (this.draftEmailData.attachments.every((f) => f.id !== e.id)) {
            return e
          }
        })
        .map((e) => e.id)
      draftEmailData.append('deleteAttachments', JSON.stringify(deletedIds))
      newFiles.length &&
        newFiles.forEach((f) => {
          draftEmailData.append('emailAttachments[]', f)
        })
      this.$axios
        .$post(`lm/leads/life_line/send-drafted-email`, draftEmailData)
        .then(({ data }) => {
          this.resetLifeOfLead()
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.$store.dispatch('loading/setOverlay', {
            isLoading: false,
          })
        })
    },
    deleteDraft() {
      this.$store.dispatch('loading/setOverlay', {
        isLoading: true,
        loadingText: 'Deleting Draft email',
      })
      this.$axios
        .$post(`lm/leads/life_line/delete-drafted-email`, {
          eventId: this.activeLifeOfLeadNote.id,
          emailId: this.draftEmailData.emailId,
          leadId: this.$route.params.id,
        })
        .then(({ data }) => {
          this.resetLifeOfLead()
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.$store.dispatch('loading/setOverlay', {
            isLoading: false,
          })
        })
    },
    addComposeEmail(type) {
      this.$v.queryType.$touch()
      this.$v.composeEmailForm.$touch()
      if (this.$v.composeEmailForm.$invalid || this.$v.queryType.$invalid) {
        return false
      }
      this.$store.dispatch('loading/setOverlay', {
        isLoading: true,
        loadingText:
          type === 'send' ? `Sending the email` : 'Drafting the email',
      })
      const composeFromData = new FormData()
      composeFromData.append('leadId', this.$route.params.id)
      composeFromData.append('templateId', this.composeEmailForm.templateId)
      composeFromData.append('subject', this.composeEmailForm.subject)
      composeFromData.append('body', this.composeEmailForm.body)
      composeFromData.append('signatureStatus', parseInt(this.signatureStatus))
      this.signatureStatus &&
        this.composeEmailSignature &&
        composeFromData.append('signature', this.composeEmailSignature)
      const newFiles = this.composeEmailForm.attachments
        // eslint-disable-next-line array-callback-return
        .filter((e) => {
          if ('newFile' in e) {
            return e
          }
        })
        .map((e) => e.file)
      // eslint-disable-next-line array-callback-return
      const oldFiles = this.composeEmailForm.attachments.filter((e) => {
        if (!('newFile' in e)) {
          return e
        }
      })
      composeFromData.append('templateAttachments', JSON.stringify(oldFiles))
      newFiles.length &&
        newFiles.forEach((f) => {
          composeFromData.append('emailAttachments[]', f)
        })
      this.$axios
        .$post(`lm/leads/life_line/${type}-email`, composeFromData)
        .then(({ data }) => {
          this.resetLifeOfLead()
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.$store.dispatch('loading/setOverlay', {
            isLoading: false,
          })
        })
    },
    parseTemplate(tid) {
      if (tid === 'custom') {
        this.composeEmailForm = this.createLifeForm(true)
        this.composeEmailForm.templateId = tid
        return
      }
      this.composeEmailForm.templateId = tid
      this.$axios
        .$post('lm/leads/life_line/parse-email-template', {
          emailTemplateId: tid,
          leadId: this.$route.params.id,
        })
        .then(({ data }) => {
          this.composeEmailForm.subject = data.subject
          this.composeEmailForm.body = data.body
          this.composeEmailForm.attachments = data.attachments
        })
        .catch((e) => {
          console.log(e)
        })
    },
    async addLifeOfLead() {
      this.$v.queryType.$touch()
      this.$v.lifeOfleadForm.$touch()
      if (this.$v.lifeOfleadForm.$invalid || this.$v.queryType.$invalid) {
        return false
      }
      for (const optionData of this.lifeOfleadType) {
        if (this.queryType === optionData.id) {
          this.lifeOfleadForm.type = optionData.text
        }
      }
      this.lifeOfleadForm.url_workspace_id = this.$route.params.workspace_id
      const formData = new FormData()
      Object.keys(this.lifeOfleadForm).forEach((e) => {
        if (typeof this.lifeOfleadForm[e] !== 'object' && e !== 'file') {
          formData.append(e, this.lifeOfleadForm[e])
        } else if (this.lifeOfleadForm[e] instanceof File) {
          formData.append('attach', this.lifeOfleadForm[e])
        }
      })
      this.$store.dispatch('loading/setOverlay', {
        isLoading: true,
        loadingText: 'Loading',
      })
      await this.$axios
        .$post(`lm/leads/life_line/add`, formData)
        .then((response) => {
          this.$toast.global.success(response.message)
          this.resetLifeOfLead()
        })
        .catch((error) => {
          this.$toast.global.error(error.message)
        })
        .finally(() => {
          this.$store.dispatch('loading/setOverlay', {
            isLoading: false,
          })
        })
    },
    dateHandler(data) {
      this.lifeOfleadForm.date = data.startDate
    },
    resetLifeOfLead() {
      this.loadLife()
      this.isLifeAdding = false
      this.lifeOfleadForm = this.createLifeForm()
      this.composeEmailForm = this.createLifeForm(true)
      this.queryType = null
      this.lifeOfLeadAttachFileName = null
      this.$v.lifeOfleadForm.$reset()
      this.$v.composeEmailForm.$reset()
      this.$v.queryType.$reset()
      this.$refs.lifeOfleadScroll.scrollTop = 0
    },
    lifeOfLeadAddAttachement(data) {
      if (data.target.files.length) {
        this.lifeOfLeadAttachFileName = data.target.files[0].name
        this.lifeOfleadForm.attach = data.target.files[0]
      }
    },
    removeAttachedFile() {
      this.lifeOfLeadAttachFileName = null
      this.lifeOfleadForm.attach = null
    },
    removeAttachedFileForTask() {
      this.attachFileName = null
      this.taskForm.attach = null
    },
    lifeOfLeadInfiniteHandler($state) {
      this.lifeOfLeadPage += 1
      this.$axios
        .$post(
          `lm/leads/life_line/list`,
          {
            url_workspace_id: this.$route.params.workspace_id,
            lead_id: this.$route.params.id,
            type: this.lifeFilterType || '',
          },
          {
            params: {
              url_workspace_id: this.$route.params.workspace_id,
              page: this.lifeOfLeadPage,
            },
          }
        )
        .then(({ data }) => {
          if (
            data.LeadLifeLineList &&
            data.LeadLifeLineList.length &&
            this.lifeOfLeadPage === data.current_page
          ) {
            // eslint-disable-next-line array-callback-return
            const cleaned = data.LeadLifeLineList.filter((d) => {
              if (d.type !== '' || d.title !== '') return d
            })
            this.lifeOfLead.push(...cleaned)
            this.loadLifeDetailsChecked(data.LeadLifeLineList[0])
            this.lifeOfLead = this.lifeOfLead.map((data) => {
              for (const x of tagStyle) {
                if (x.type.includes(data.type)) {
                  Object.assign(data, {
                    tagColor: x.tagColor,
                  })
                  break
                } else {
                  Object.assign(data, {
                    tagColor: 'bggreen',
                  })
                }
              }
              return data
            })
            $state.loaded()
            if (data.last_page <= data.current_page) {
              $state.complete()
            }
          } else {
            $state.complete()
            // $('.active-note').hide()
            this.isLifeAdding = false
          }
        })
        .catch((e) => {
          this.$toast.$getErrorMessage(e)
        })
    },
    loadLife() {
      this.lifeOfLead = []
      this.lifeOfLeadPage = 0
      this.lifeOfLeadInfiniteId += 1
      this.updateTabUrl('life')
    },
    // addQuery() {
    //   $('.active-note').hide()
    //   $('.new-note').show()
    // },
    async lifeOfLeadTypes() {
      await this.$axios
        .$get(`lm/dashboard/lead-type`)
        .then(({ data }) => {
          this.lifeOfleadType = data
        })
        .catch((error) => {
          this.$toast.error(error.message)
        })
    },
    // end of life of lead module

    loadTask() {
      this.updateTabUrl('task')
      this.loadTaskProductList()
      this.loadTaskStatusList()
      this.loadTaskUserList()
      this.loadTasks()
    },
    taskStatusChangeHandler(args, task) {
      this.$axios
        .$post(
          `lm/leads/task/edit`,
          this.createFormData(task, 'status', args.id)
        )
        .then((response) => {
          this.$toast.global.success(response.message)
          task.status = response.data.status_text
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error.message))
        })
    },
    updateTaskProduct(task, productId) {
      this.$axios
        .$post(
          `lm/leads/task/edit`,
          this.createFormData(task, 'product_id', productId)
        )
        .then((response) => {
          this.$toast.global.success(response.message)
          task.product_id = response.data.product_id
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error.message))
        })
    },
    updateTaskUser(task, { id }) {
      this.$axios
        .$post(
          `lm/leads/task/edit`,
          this.createFormData(task, 'dealership_user_id', id)
        )
        .then((response) => {
          task.dealership_user_id = response.data.user_id
          this.$toast.success(response.message)
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error.message))
        })
    },
    loadTaskStatusList() {
      this.$axios.$get(`lm/common/list-lead-task-status`).then(({ data }) => {
        data.forEach((e) => {
          e.id = e.id.toString()
          Object.assign(e, {
            status_text_color: '#FFFFFF',
            text: e.status_name,
          })
        })
        this.taskStatusList = data
      })
    },
    async loadTaskProductList() {
      await this.$axios
        .$get(`lm/leads/task/get-products`, {
          params: {
            lead_id: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          this.productOption = data
          this.productOption = this.productOption.map((data) => {
            Object.assign(data, { text: data.product_name })
            data.id = data.product_id
            return data
          })
        })
    },
    loadTaskUserList() {
      const formData = new FormData()
      formData.append('url_workspace_id', this.$route.params.workspace_id)
      this.$axios
        .$post(`lm/leads/task/get-sell-persons`, formData, {
          params: {
            lead_id: this.$route.params.id,
          },
        })
        .then(({ data }) => {
          this.userList = true
          this.taskUserList = data
        })
    },
    deleteAssignment(assignment) {
      this.$axios
        .$get(`lm/leads/assignment/delete`, {
          params: {
            lead_id: this.$route.params.id,
            product_id: assignment.product_id,
            dealership_id: assignment.dealership_id,
            assignment_id: assignment.assignment_id,
          },
        })
        .then(() => {
          this.assignmentForm = false
          const i = this.assignments.findIndex(
            (a) => a.assignment_id === assignment.assignment_id
          )
          this.assignments.splice(i, 1)
          if (this.assignments.length) {
            this.viewAssignment(this.assignments[0])
          } else {
            this.assignment = {
              dealership: {},
            }
          }
          this.loadLeadData()
          this.$toast.success('Assignment deleted sucessfully')
        })
    },

    editAssignment(assignment, e = false) {
      this.initialLoading = true
      if (this.product) {
        if (confirm(alertMessage)) {
          this.product = null
          this.editAssignmentFlag = true
        } else {
          e.preventDefault()
          e.stopImmediatePropagation()
          return false
        }
      }
      this.leadAssignment = this.newLeadAssignment()
      this.leadAssignment.assignment_id = assignment.assignment_id
      this.editAssignmentFlag = true
      this.assignmentForm = true
      this.leadAssignment.dealership_id = assignment.dealership_id
      this.leadProduct = this.newProduct()
      this.product = this.products.find((p) => p.id === assignment.product_id)
      this.leadProduct.lead_source = assignment.lead_source
      this.leadProduct.dealership_id = assignment.dealership_id
      this.leadAssignment.product_id = assignment.product_id
      this.loadRSM()
      if (assignment.rsm.length) {
        this.leadProduct.rsm_user_id = assignment.rsm.map((r) => r.id)
      }
    },
    loadDealerships(sort = false) {
      this.$store.dispatch('startOverlay')
      this.isDealerLoading = true
      const reqParams = {
        product_id: this.product ? this.product.id : '',
        name: this.searchTerm,
        zipcode: this.leadDetails.zip_code,
        lead_id: this.$route.params.id,
      }
      const sortVal = {
        sortvalue: this.dealershipOrderBy,
        orderby: this.dealershipOrder,
      }
      if (sort) {
        Object.assign(reqParams, sortVal)
      }
      this.$axios
        .$post(`lm/leads/dealership-list`, reqParams)
        .then(({ data }) => {
          const dealers = data
          const includeNA = []
          const excludeNA = []
          // eslint-disable-next-line array-callback-return
          dealers.map((dealer) => {
            if (dealer.distance === 'NA') {
              includeNA.push(dealer)
            } else {
              excludeNA.push(dealer)
            }
          })
          this.dealerships = excludeNA
          this.dealerships.push(...includeNA)
          if (
            !this.editAssignmentFlag &&
            this.dealerships.length &&
            this.leadDetails.automatic_lead_assignment
          ) {
            this.leadProduct.dealership_id = this.dealerships[0]?.id
          }
          this.loadRSM()
          this.isDealerLoading = false
          this.$store.dispatch('stopOverlay')
        })
    },
    loadRSM() {
      this.$store.dispatch('startOverlay')
      this.$axios
        .$post('lm/leads/rsm-list-based-dealer', {
          workspace_id: this.$route.params.workspace_id,
          dealership_id: this.leadProduct.dealership_id || '',
          orderby: this.rsmOrderBy,
          name: this.searchTerm,
          product_id: this.product && this.product.id | '',
        })
        .then((data) => {
          this.rsms = data.data
          if (
            !this.editAssignmentFlag &&
            this.leadDetails.automatic_lead_assignment
          ) {
            data.data.forEach((rsm) => {
              if (!this.leadProduct.rsm_user_id.includes(rsm.id)) {
                this.leadProduct.rsm_user_id.push(rsm.id)
              }
            })
          }
          this.initialLoading = false
          if (!this.isDealerLoading) {
            this.$store.dispatch('stopOverlay')
          }
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
        })
    },
    newLeadAssignment() {
      return {
        url_workspace_id: this.$route.params.workspace_id,
        assignment_id: null,
        lead_id: this.$route.params.id,
        product_id: 0,
        dealership_id: 0,
        new_dealership_id: 0,
        products: [],
      }
    },
    newProduct() {
      return {
        product_id: 0,
        category_id: 0,
        product_name: '',
        variant_options: [],
        sort_order: null,
        rsm_user_id: [],
        dealership_id: 0,
        lead_status: 1,
        lead_source: 'Web',
      }
    },
    loadAssignments() {
      this.updateTabUrl('product')
      this.assignmentsPage = 0
      this.assignments = []
      this.assignmentsInfiniteId += 1
    },
    assignmentsInfiniteHandler($state) {
      this.assignmentsPage += 1
      this.assignementLoading = true
      this.$axios
        .$get(`lm/leads/assignment/list`, {
          params: {
            lead_id: this.$route.params.id,
            page: this.assignmentsPage,
          },
        })
        .then(({ data }) => {
          if (
            data.leadAssignmentList &&
            data.leadAssignmentList.length &&
            this.assignmentsPage === data.current_page
          ) {
            this.last_sort_order = data.last_sort_order
            this.assignments.push(...data.leadAssignmentList)
            if (this.assignments.length) {
              this.viewAssignment(this.assignments[0])
            }
            $state.loaded()
            if (data.last_page <= data.current_page) $state.complete()
          } else $state.complete()
          this.assignementLoading = false
        })
    },
    viewAssignment(assignment, e = false) {
      if ((e && !e.target.classList.contains('dropdown-item')) || !e) {
        this.assignment = { ...assignment }
        this.assignment.location = null
        if (this.product) {
          if (confirm(alertMessage)) {
            this.assignmentForm = false
            this.product = null
            this.editAssignmentFlag = false
          }
        } else {
          this.assignmentForm = false
        }
        // this.getCoordinates(assignment)
      }
    },
    newAssignement() {
      this.leadAssignment = this.newLeadAssignment()
      this.removeDealershipIdFlag = true
      this.leadProduct = this.newProduct()
      this.dealerships = []
      this.rsms = []
      this.product = null
      this.assignmentForm = true
      this.editAssignmentFlag = false
    },
    assign() {
      this.assigning = true
      if (!this.dealerships.length) {
        this.leadProduct.dealership_id = null
      }
      const selectedRSMs = [...this.leadProduct.rsm_user_id]
      const rsms = this.rsms.reduce((p, a) => {
        const temp = []
        temp.push(...p, a.id)
        return temp
      }, [])
      const tempIds = []
      selectedRSMs.forEach((e, i) => {
        if (!rsms.includes(e)) {
          tempIds.push(i)
        }
      })
      tempIds.forEach((i) => {
        selectedRSMs[i] = null
      })
      this.leadProduct.rsm_user_id = selectedRSMs.filter((e) => e)
      this.leadProduct.sort_order = this.last_sort_order + 1
      if (!this.editAssignmentFlag) {
        this.leadAssignment.dealership_id = this.leadProduct.dealership_id
        this.leadAssignment.product_id = this.leadProduct.product_id
        delete this.leadAssignment.new_dealership_id
      } else if (this.editAssignmentFlag) {
        this.leadAssignment.new_dealership_id = this.leadProduct.dealership_id
      }

      this.leadAssignment.products = JSON.stringify([this.leadProduct])
      // console.log(this.leadAssignment.products)
      const mode = this.editAssignmentFlag ? 'edit' : 'add'
      this.$axios
        .$post(`lm/leads/assignment/${mode}`, this.leadAssignment)
        .then((response) => {
          this.loadLeadData()
          this.assignmentForm = false
          this.leadAssignment = this.newLeadAssignment()
          this.leadProduct = this.newProduct()
          this.product = null
          this.loadAssignments()
          this.loadTaskProductList()
          this.dealerships = []
          this.rsms = []
          this.$toast.success(response.message)
          this.assigning = false
        })
        .catch((err) => {
          this.$toast.error(this.$getErrorMessage(err))
          this.assigning = false
        })
    },
    resetTask() {
      this.taskForm = {
        title: '',
        due_date: '',
        status: 0,
        dealership_user_id: 0,
        lead_id: this.$route.params.id,
      }
      this.$v.taskForm.$reset()
      this.$refs.taskScroll.scrollTop = 0
    },
    updateTitle(task) {
      if (!task.title) {
        return false
      }
      this.$axios
        .$post(
          `lm/leads/task/edit`,
          this.createFormData(task, 'title', task.title)
        )
        .then((response) => {
          this.$toast.global.success(response.message)
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error.message))
        })
    },
    addNewTask() {
      if (!/\S/.test(this.taskForm.title)) {
        this.taskForm.title = ''
        this.isTaskAdding = false
        this.isTaskAddLoading = false
        return
      }
      if (this.isTaskAddLoading) {
        return
      }
      this.isTaskAddLoading = true
      const formData = new FormData()
      Object.keys(this.taskForm).forEach((e) => {
        if (typeof this.taskForm[e] !== 'object' && e !== 'file') {
          formData.append(e, this.taskForm[e])
        } else if (this.taskForm[e] instanceof File) {
          formData.append('attach', this.taskForm[e])
        }
      })
      this.$axios
        .$post(`lm/leads/task/add`, formData)
        .then((response) => {
          this.$toast.global.success(response.message)
          const obj = {
            attach: '',
            dealership_user_id: null,
            description: null,
            due_date: '',
            file_name: '',
            id: response.data.id,
            lead_id: response.data.lead_id,
            product: null,
            product_id: null,
            status: '0',
            title: response.data.title,
            user: null,
          }
          this.tasks.push(obj)
          this.taskForm.title = ''
          this.isTaskAdding = false
          this.isTaskAddLoading = false
        })
        .catch((error) => {
          this.isTaskAdding = false
          this.isTaskAddLoading = false
          this.loadTasks()
          this.$toast.error(this.$getErrorMessage(error.message))
        })
    },
    addAttachement(data, index, task) {
      if (!data.target.files.length) return
      this.$store.dispatch('loading/setOverlay', {
        isLoading: true,
        loadingText: 'Uploading file please wait...',
      })
      const temFile = data.target.files[0]
      const maxSize = 26214400 // 25
      if (temFile?.size > maxSize) {
        this.$toast.error('File size should not be more than 25mb')
        return
      }
      if (data.target.files.length) {
        // this.attachFileName[index] = temFile.name
        // this.attachFiles[index] = temFile
        this.$set(this.attachFileName, index, temFile.name)
        this.$set(this.attachFiles, index, temFile)
      }
      this.$axios
        .$post(
          `lm/leads/task/edit`,
          this.createFormData(task, 'attach', temFile)
        )
        .then((response) => {
          task.attach = temFile
          task.file_name = temFile.name
          this.$toast.global.success(response.message)
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error.message))
        })
        .finally(() => {
          this.$store.dispatch('loading/setOverlay', {
            isLoading: false,
          })
        })
    },
    dueDateHandler(data, task) {
      // taking date as 2020-2-2 12:00
      this.$axios
        .$post(
          `lm/leads/task/edit`,
          this.createFormData(task, 'due_date', data.startDate.split(' ')[0])
        )
        .then((response) => {
          this.$toast.global.success(response.message)
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error.message))
        })
    },
    createFormData(task, exclude, value) {
      const formData = new FormData()
      Object.keys(task).forEach((e) => {
        if (typeof task[e] !== 'object' && e !== 'file') {
          formData.append(e, task[e])
        } else if (task[e] instanceof File) {
          formData.append('attach', task[e])
        }
      })
      formData.delete(exclude)
      formData.append(exclude, value)
      return formData
    },
    loadTasks() {
      this.tasksLoaded = true
      this.tasks = []
      this.tasksPage = 0
      this.tasksInfiniteId += 1
    },
    tasksInfiniteHandler($state) {
      this.tasksPage += 1
      this.$axios
        .$post(`lm/leads/task/list`, {
          page: this.tasksPage,
          lead_id: this.$route.params.id,
          url_workspace_id: this.$route.params.url_workspace_id,
        })
        .then(({ data }) => {
          if (
            data.leadTaskList &&
            data.leadTaskList.length &&
            this.tasksPage === data.current_page
          ) {
            this.tasks.push(...data.leadTaskList)
            $state.loaded()
            if (data.last_page <= data.current_page) $state.complete()
          } else $state.complete()
        })
    },
    deleteTask() {
      // this.reRender = false
      this.$axios
        .$get(`lm/leads/task/delete`, {
          params: {
            id: this.tempDeletedTaskId,
          },
        })
        .then((r) => {
          if (!r.error.length) {
            const i = this.tasks.findIndex(
              (t) => t.id === this.tempDeletedTaskId
            )
            this.tasks.splice(i, 1)
            if (this.taskForm.id === this.tempDeletedTaskId) {
              this.resetTask()
              this.tempDeletedTaskId = null
              // this.$nextTick(() => {
              //   this.reRender = true
              // })
            }
            this.$toast.success(r.message)
          } else {
            this.$toast.error(r.message)
          }
        })
    },

    // lead Notes
    addNewNote() {
      this.showNote = false
    },
    hideAddNewNote() {
      this.showNote = true
    },
    notesInfiniteHandler($state) {
      this.notesPage += 1
      this.$axios
        .$get('/lm/leads/notes/list', {
          params: {
            workspace_id: this.$route.params.workspace_id,
            lead_id: this.$route.params.id,
            page: this.notesPage,
          },
        })
        .then(({ data }) => {
          if (
            data.notesList &&
            data.notesList.length &&
            this.notesPage === data.current_page
          ) {
            this.notes.push(...data.notesList)
            if (this.notesPage === 1) this.viewedNote = this.notes[0]
            $state.loaded()
            if (data.last_page <= data.current_page) $state.complete()
          } else {
            $state.complete()
          }
          this.showNote = true
        })
        .catch((e) => {
          $state.error(e)
        })
    },
    viewNote(note) {
      this.viewedNote = note
      this.showNote = true
    },
    loadNotes() {
      this.updateTabUrl('notes')
      this.notesLoaded = true
      this.notes = []
      this.notesPage = 0
      this.notesInfiniteId += 1
    },
    addNote(annotation = false) {
      if (annotation && !this.note) return
      this.$store.dispatch('loading/setOverlay', {
        isLoading: true,
        loadingText: 'Loading',
      })
      this.$axios
        .$post('/lm/leads/notes/add', {
          workspace_id: this.$route.params.workspace_id,
          lead_id: this.leadDetails.id,
          note: this.note,
        })
        .then((response) => {
          this.$toast.success(response.message)
          this.annotation = ''
          this.$refs.voiceModal.annotation = ''
          this.topNotes()
          this.note = ''
          this.$refs.addNoteRef.$v.note.$reset()
          this.$refs.addNoteRef.note = ''
          if (this.notes.length) {
            this.notes.unshift(response.data)
            this.viewNote(this.notes[0])
          } else {
            this.notesPage = 0
            this.notesInfiniteId += 1
          }
          this.hideAddNewNote()
        })
        .finally(() => {
          this.$store.dispatch('loading/setOverlay', {
            isLoading: false,
          })
        })
    },
    async loadLeadStatusOption() {
      await this.$axios
        .$get(`lm/common/list-lead-status`, {
          params: {
            url_workspace_id: this.$route.params.workspace_id,
          },
        })
        .then(({ data }) => {
          this.leadStatusOptions = data
          this.leadStatusOptions = this.leadStatusOptions.map((data) =>
            Object.assign(data, {
              text: data.status_name,
              status_text_color: '#FFFFFF',
            })
          )
          this.loadStatus = true
        })
    },
    removeImage() {
      this.imagePreview = null
      this.form.logo = null
      this.leadDetails.logo = null
    },
    onImageUpload(obj) {
      this.imagePreview = obj.imageURL
      this.form.logo = obj.imageFile
    },
    statusChangeHandler(args, productId, dealerId) {
      this.$axios
        .$post(`lm/leads/update-status`, {
          lead_id: this.leadDetails.id,
          lead_status: args.id,
          product_id: productId,
          dealership_id: dealerId,
        })
        .then((response) => {
          this.$toast.success(response.message)
        })
        .catch((error) => {
          this.$toast.error(this.$getErrorMessage(error))
        })
    },
    cancelEdit() {
      this.form = { ...this.leadDetails }
      this.$refs.autocompleteRef.clear()
      this.$refs.autocompleteRef.autocompleteText = this.form.address_line_1
    },
    editLeadhandleSubmit() {
      this.$v.form.$touch()
      if (this.$v.form.$invalid) {
        return false
      }
      this.$store.dispatch('loading/setOverlay', {
        isLoading: true,
        loadingText: 'Loading',
      })
      const formData = new FormData()
      Object.keys(this.form).forEach((e) => {
        if (typeof this.form[e] !== 'object' && e !== 'file') {
          formData.append(e, this.form[e])
        } else if (this.form[e] instanceof File) {
          formData.append('logo', this.form[e])
          // console.log(this.form[e])
        }
      })
      if (this.leadDetails.logo === null && this.form.logo === null) {
        formData.append('logo', null)
      }
      const updatedKeys = getObjectDiff(this.form, this.leadDetails)
      const updatedKeyVals = []
      Object.keys(this.form).forEach((e) => {
        if (updatedKeys.includes(e)) {
          updatedKeyVals.push({
            [e]: this.form[e],
          })
        }
      })
      formData.append('updateData', JSON.stringify(updatedKeyVals))
      this.$axios
        .$post(`lm/leads/edit`, formData, {
          params: {
            url_workspace_id: this.$route.params.workspace_id,
          },
        })
        .then((response) => {
          this.$toast.success(response.message)
          this.loadLeadData()
          this.$nextTick(() => {
            $('.dl-detail-left-fr').show()
            $('.dl-detail-left-bk').hide()
            $('.dl-detail-left a.dl-editicon').show()
          })
        })
        .catch((e) => {
          this.$toast.error(this.$getErrorMessage(e))
        })
        .finally(() => {
          this.$store.dispatch('loading/setOverlay', {
            isLoading: false,
          })
        })
    },
    sortDealers(column) {
      if (!this.leadProduct.dealership_id) {
        return
      }
      if (this.dealershipOrderBy === column) {
        this.dealershipOrder = this.dealershipOrder === 'ASC' ? 'DESC' : 'ASC'
      } else {
        this.dealershipOrderBy = column
        this.dealershipOrder = 'DESC'
      }
      this.loadDealerships(true)
    },
    sortRsm() {
      if (!this.leadProduct.rsm_user_id.length) {
        return
      }
      this.rsmOrderBy = this.rsmOrderBy === 'ASC' ? 'DESC' : 'ASC'
      this.loadRSM()
    },
    fileChange(key) {
      const file = this.$refs[key].files[0]
      const maxSize = 26214400 // Twenty five megabyete in bytes
      if (file.size > maxSize) {
        this.$toast.error('File size should not be more than 25mb')
        return
      }
      this[key].attachments.push({
        org_file_name: file.name,
        file,
        newFile: true,
      })
      // clear file input
      this.$refs[key].value = ''
    },
  },
  validations: {
    title: { required },
    subject: { required },
    body: { required },
    form: {
      email: { required, email },
      address_line_1: { required },
    },
    taskForm: {
      // product_id: { required },
      title: { required },
    },
    note: { required },
    lifeOfleadForm: {
      product_id: { required },
      date: { required },
    },
    composeEmailForm: {
      templateId: { required },
      subject: { required },
      body: { required },
    },
    draftEmailData: {
      body: { required },
      subject: { required },
    },
    queryType: { required },
  },
}
function getObjectDiff(obj1, obj2) {
  const diff = Object.keys(obj1).reduce((result, key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!obj2.hasOwnProperty(key)) {
      result.push(key)
    } else if (_.isEqual(obj1[key], obj2[key])) {
      const resultKeyIndex = result.indexOf(key)
      result.splice(resultKeyIndex, 1)
    }
    return result
  }, Object.keys(obj2))

  return diff
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: scale(0.9);
}
</style>
