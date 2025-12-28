<template>
  <div>
    <div class="modal fade" id="exampleModal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <div id="hotelMap" style="height: 350px; width: 100%"></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="exampleModal333"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12">
                <div class="row">
                  <div class="col-12">
                    <h6 class="text-right" style="font-weight: bold">
                      <i class="fi fi-rr-bars-filter"></i>
                      فیلتر
                    </h6>
                  </div>
                  <div class="col-12">
                    <hr />
                  </div>
                  <div class="col-12 my-3">
                    <div class="form-group">
                      <label style="font-size: 0.8rem" for="">
                        جستجوی نام هتل
                      </label>
                      <input
                        type="text"
                        v-model="query"
                        style="border: 1px solid #f26419"
                        placeholder="جستجوی عنوان..."
                        class="form-control mt-2"
                        @input="handleSearch"
                      />
                    </div>
                  </div>
                  <div class="col-12 my-3">
                    <label style="font-size: 0.8rem">کشور / شهر</label>
                    <ClientOnly>
                      <multiselect
                        id="single-select-search"
                        v-model="selectedProvince"
                        :options="dataItemProvince"
                        :custom-label="nameWithLang"
                        placeholder="انتخاب کنید"
                        label="name"
                        track-by="id"
                        :multiple="false"
                        :allow-empty="false"
                        :close-on-select="true"
                        :clear-on-select="false"
                        :show-labels="false"
                      />
                    </ClientOnly>
                    <button
                      v-if="selectedProvinceId"
                      class="btn btn-sm btn-outline-danger ms-2"
                      @click="clearProvince"
                    >
                      حذف استان
                    </button>
                  </div>

                  <div class="col-12 my-3">
                    <label style="font-size: 0.8rem">بر اساس ستاره</label>

                    <!-- 5 ستاره -->
                    <div class="form-check mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="star"
                        :value="5"
                        v-model="starFilter"
                      />
                      <label class="form-check-label">
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <span class="mx-2 text-orange">5 ستاره</span>
                      </label>
                    </div>

                    <!-- 4 ستاره -->
                    <div class="form-check mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="star"
                        :value="4"
                        v-model="starFilter"
                      />
                      <label class="form-check-label">
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <span class="mx-2 text-orange">4 ستاره</span>
                      </label>
                    </div>

                    <!-- 3 ستاره -->
                    <div class="form-check mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="star"
                        :value="3"
                        v-model="starFilter"
                      />
                      <label class="form-check-label">
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <span class="mx-2 text-orange">3 ستاره</span>
                      </label>
                    </div>

                    <!-- 2 ستاره -->
                    <div class="form-check mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="star"
                        :value="2"
                        v-model="starFilter"
                      />
                      <label class="form-check-label">
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <span class="mx-2 text-orange">2 ستاره</span>
                      </label>
                    </div>

                    <!-- 1 ستاره -->
                    <div class="form-check mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="star"
                        :value="1"
                        v-model="starFilter"
                      />
                      <label class="form-check-label">
                        <img
                          src="/assets/images/starone.png"
                          style="height: 1rem"
                        />
                        <span class="mx-2 text-orange">1 ستاره</span>
                      </label>
                    </div>
                  </div>
                  <button
                    v-if="starFilter !== null"
                    class="btn btn-sm btn-outline-danger ms-2"
                    @click="clearStar"
                  >
                    حذف ستاره
                  </button>
                  <div class="col-12 my-3">
                    <label style="font-size: 0.8rem"
                      >بر اساس امتیاز کاربران</label
                    >

                    <!-- 5 امتیاز -->
                    <div class="form-check mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="rate"
                        :value="5"
                        v-model="rate"
                      />
                      <label class="form-check-label">
                        <div class="d-flex mt-1">
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                        </div>
                      </label>
                    </div>

                    <!-- 4 امتیاز -->
                    <div class="form-check mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="rate"
                        :value="4"
                        v-model="rate"
                      />
                      <label class="form-check-label">
                        <div class="d-flex mt-1">
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              border: 1px solid #f26419;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <span class="mx-1 text-green">4 به بالا</span>
                        </div>
                      </label>
                    </div>

                    <!-- 3 امتیاز -->
                    <div class="form-check mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="rate"
                        :value="3"
                        v-model="rate"
                      />
                      <label class="form-check-label">
                        <div class="d-flex mt-1">
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              border: 1px solid #f26419;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              border: 1px solid #f26419;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <span class="mx-1 text-green">3 به بالا</span>
                        </div>
                      </label>
                    </div>

                    <!-- 2 امتیاز -->
                    <div class="form-check mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="rate"
                        :value="2"
                        v-model="rate"
                      />
                      <label class="form-check-label">
                        <div class="d-flex mt-1">
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              border: 1px solid #f26419;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              border: 1px solid #f26419;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              border: 1px solid #f26419;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <span class="mx-1 text-green">2 به بالا</span>
                        </div>
                      </label>
                    </div>

                    <!-- 1 امتیاز -->
                    <div class="form-check mt-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="rate"
                        :value="1"
                        v-model="rate"
                      />
                      <label class="form-check-label">
                        <div class="d-flex mt-1">
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              border: 1px solid #f26419;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              border: 1px solid #f26419;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              border: 1px solid #f26419;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              border: 1px solid #f26419;
                              border-radius: 50%;
                            "
                          ></div>
                          <div
                            class="ms-1"
                            style="
                              width: 1rem;
                              height: 1rem;
                              background-color: #f26419 !important;
                              border-radius: 50%;
                            "
                          ></div>
                          <span class="mx-1 text-green">۱ به بالا</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <button
                    v-if="rate !== null"
                    class="btn btn-sm btn-outline-danger ms-2"
                    @click="clearRate"
                  >
                    حذف امتیاز
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section>
      <div
        class="container-fluid"
        style="margin-top: 70px; background-color: rgb(245 245 245)"
      >
        <div class="container">
          <div class="row">
            <div class="col-12">
              <h5 class="text-right text-black p-3" style="font-weight: bold">
                <img
                  src="/assets/images/flag/turkey.png"
                  style="height: 2rem"
                  class="img-fluid"
                  alt=""
                />

                هتل های ترکیه
              </h5>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container-fluid">
        <div class="container">
          <div class="row">
            <div class="col-lg-9 col-12">
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-12">
                      <div class="row d-flex align-items-center">
                        <div class="col-12 d-flex">
                          <NuxtLink class="" style="color: black" to="/hotels"
                            >هتل</NuxtLink
                          >

                          <p class="mb-0 mx-2">/</p>
                          <p class="mb-0 mx-2">هتل ترکیه</p>
                        </div>
                        <div class="col-12">
                          <button
                            type="button"
                            class="btn mt-2 d-lg-none"
                            style="background-color: #f26419; color: white"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal333"
                          >
                            فیلتر
                          </button>
                        </div>
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="row mt-3">
                        <div
                          v-for="(item, index) in dataLists"
                          :key="index + 'list-hotel'"
                          class="col-12 mt-3"
                        >
                          <div
                            class="card w-100 p-3 hover-card"
                            style="
                              border-radius: 10px;
                              box-shadow: 0 3px 4.75px 0.25px
                                rgba(24, 23, 24, 0.03);
                            "
                          >
                            <div class="row">
                              <div class="col-lg-4 col-12">
                                <img
                                  :src="item.image"
                                  class="d-block w-100"
                                  style="height: 18rem; border-radius: 10px"
                                  alt="..."
                                />
                              </div>
                              <div class="col-lg-8 col-12">
                                <div class="row">
                                  <div class="col-12">
                                    <div class="row">
                                      <div class="col-lg-9 col-12">
                                        <h5
                                          class="text-right mt-2"
                                          style="font-weight: bold"
                                        >
                                          {{ item.title }}
                                        </h5>
                                        <h6 class="text-right mt-3">
                                          {{ item.title_en }}
                                        </h6>
                                        <p
                                          class="mb-0 text-orange mt-3"
                                          style="font-size: 0.9rem"
                                        >
                                          <span v-if="item.star == 0">
                                            (بدون ستاره)
                                          </span>
                                          <span v-if="item.star == 1">
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />

                                            (1 ستاره)
                                          </span>
                                          <span v-if="item.star == 2">
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />

                                            (2 ستاره)
                                          </span>
                                          <span v-if="item.star == 3">
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />

                                            (3 ستاره)
                                          </span>
                                          <span v-if="item.star == 4">
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />

                                            (4 ستاره)
                                          </span>
                                          <span v-if="item.star == 5">
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />
                                            <img
                                              src="/assets/images/starone.png"
                                              class="img-fluid"
                                              style="height: 1rem"
                                              alt=""
                                            />

                                            (5 ستاره)
                                          </span>
                                        </p>
                                        <h6 class="text-right mt-3">
                                          <i class="fi fi-rr-marker"></i>
                                          {{ item.province.title }}
                                        </h6>
                                        <p
                                          class="mb-0 mt-3"
                                          style="font-size: 0.8rem"
                                        >
                                          <span
                                            ><i class="fi fi-rr-utensils"></i>
                                            رستوران</span
                                          >
                                          <br />
                                          <span
                                            ><i class="fi fi-rr-swimmer"></i>
                                            استخر</span
                                          >
                                          <br />
                                        </p>
                                        <p>
                                          <button
                                            class="btn btn-sm mt-2"
                                            style="
                                              background-color: #f26419;
                                              color: white;
                                              font-size: 0.8rem;
                                            "
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            @click="openMapModal(item)"
                                          >
                                            <i
                                              class="fi fi-rr-map-marker me-1"
                                            ></i>
                                            مشاهده روی نقشه
                                          </button>
                                        </p>
                                        <p class="mt-4">
                                          <span
                                            class="badge rounded-pill p-2 mx-1 text-black"
                                            style="
                                              background-color: lightgray;
                                              color: black;
                                            "
                                            >ترانسفر استقبال رایگان</span
                                          >
                                          <span
                                            class="badge rounded-pill p-2 mx-1 text-black"
                                            style="
                                              background-color: lightgray;
                                              color: black;
                                            "
                                            >هتل برگزیده</span
                                          >
                                        </p>
                                      </div>
                                      <div class="col-lg-3 col-12">
                                        <div class="row">
                                          <div class="col-12 mt-2">
                                            <p class="text-center">
                                              امتیاز کاربران
                                            </p>
                                            <span v-if="item.rating == 0">
                                              <div
                                                class="d-flex justify-content-center"
                                              >
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                              </div>
                                            </span>
                                            <span v-if="item.rating == 1">
                                              <div
                                                class="d-flex justify-content-center"
                                              >
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                              </div>
                                            </span>
                                            <span v-if="item.rating == 2">
                                              <div
                                                class="d-flex justify-content-center"
                                              >
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                              </div>
                                            </span>
                                            <span v-if="item.rating == 3">
                                              <div
                                                class="d-flex justify-content-center"
                                              >
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                              </div>
                                            </span>
                                            <span v-if="item.rating == 4">
                                              <div
                                                class="d-flex justify-content-center"
                                              >
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    border: 1px solid #f26419;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                              </div>
                                            </span>
                                            <span v-if="item.rating == 5">
                                              <div
                                                class="d-flex justify-content-center"
                                              >
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                                <div
                                                  class="ms-1"
                                                  style="
                                                    width: 1rem;
                                                    height: 1rem;
                                                    background-color: #f26419 !important;
                                                    border-radius: 50%;
                                                  "
                                                ></div>
                                              </div>
                                            </span>
                                          </div>
                                          <div
                                            class="col-12 d-flex justify-content-center"
                                          >
                                            <!-- :to="`/hotels/${slugify(item.title_en)}`" -->
                                            <NuxtLink
                                              :to="`/hotels/${item.slug}`"
                                              class="btn text-white mt-4"
                                              style="
                                                background-color: #f26419;
                                                font-size: 0.9rem;
                                              "
                                            >
                                              مشاهده و رزرو
                                            </NuxtLink>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          v-show="!finished && query"
                          v-if="loading"
                          class="text-center mt-3"
                        >
                          در حال بارگذاری...
                        </div>

                        <p
                          v-if="finished && !query"
                          class="text-center mt-3 text-muted"
                        >
                          همه موارد بارگزاری شد. (موردی یافت نشد)
                        </p>

                        <!-- نقطه برای اسکرول بی‌نهایت -->
                        <div ref="sentinel" style="height: 1px"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-12 d-none-mobile">
              <div class="row mt-5">
                <div class="col-12 mt-3">
                  <div class="card p-3 w-100">
                    <div class="row">
                      <div class="col-12">
                        <h6 class="text-right" style="font-weight: bold">
                          <i class="fi fi-rr-bars-filter"></i>
                          فیلتر
                        </h6>
                      </div>
                      <div class="col-12">
                        <hr />
                      </div>
                      <div class="col-12 my-3">
                        <div class="form-group">
                          <label style="font-size: 0.8rem" for="">
                            جستجوی نام هتل
                          </label>
                          <input
                            type="text"
                            v-model="query"
                            style="border: 1px solid #f26419"
                            placeholder="جستجوی عنوان..."
                            class="form-control mt-2"
                            @input="handleSearch"
                          />
                        </div>
                      </div>
                      <div class="col-12 my-3">
                        <label style="font-size: 0.8rem">کشور / شهر</label>
                        <ClientOnly>
                          <multiselect
                            id="single-select-search"
                            v-model="selectedProvince"
                            :options="dataItemProvince"
                            :custom-label="nameWithLang"
                            placeholder="انتخاب کنید"
                            label="name"
                            track-by="id"
                            :multiple="false"
                            :allow-empty="false"
                            :close-on-select="true"
                            :clear-on-select="false"
                            :show-labels="false"
                          />
                        </ClientOnly>
                        <button
                          v-if="selectedProvinceId"
                          class="btn btn-sm btn-outline-danger ms-2"
                          @click="clearProvince"
                        >
                          حذف استان
                        </button>
                      </div>

                      <div class="col-12 my-3">
                        <label style="font-size: 0.8rem">بر اساس ستاره</label>

                        <!-- 5 ستاره -->
                        <div class="form-check mt-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="star"
                            :value="5"
                            v-model="starFilter"
                          />
                          <label class="form-check-label">
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <span class="mx-2 text-orange">5 ستاره</span>
                          </label>
                        </div>

                        <!-- 4 ستاره -->
                        <div class="form-check mt-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="star"
                            :value="4"
                            v-model="starFilter"
                          />
                          <label class="form-check-label">
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <span class="mx-2 text-orange">4 ستاره</span>
                          </label>
                        </div>

                        <!-- 3 ستاره -->
                        <div class="form-check mt-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="star"
                            :value="3"
                            v-model="starFilter"
                          />
                          <label class="form-check-label">
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <span class="mx-2 text-orange">3 ستاره</span>
                          </label>
                        </div>

                        <!-- 2 ستاره -->
                        <div class="form-check mt-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="star"
                            :value="2"
                            v-model="starFilter"
                          />
                          <label class="form-check-label">
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <span class="mx-2 text-orange">2 ستاره</span>
                          </label>
                        </div>

                        <!-- 1 ستاره -->
                        <div class="form-check mt-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="star"
                            :value="1"
                            v-model="starFilter"
                          />
                          <label class="form-check-label">
                            <img
                              src="/assets/images/starone.png"
                              style="height: 1rem"
                            />
                            <span class="mx-2 text-orange">1 ستاره</span>
                          </label>
                        </div>
                      </div>
                      <button
                        v-if="starFilter !== null"
                        class="btn btn-sm btn-outline-danger ms-2"
                        @click="clearStar"
                      >
                        حذف ستاره
                      </button>
                      <div class="col-12 my-3">
                        <label style="font-size: 0.8rem"
                          >بر اساس امتیاز کاربران</label
                        >

                        <!-- 5 امتیاز -->
                        <div class="form-check mt-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="rate"
                            :value="5"
                            v-model="rate"
                          />
                          <label class="form-check-label">
                            <div class="d-flex mt-1">
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                            </div>
                          </label>
                        </div>

                        <!-- 4 امتیاز -->
                        <div class="form-check mt-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="rate"
                            :value="4"
                            v-model="rate"
                          />
                          <label class="form-check-label">
                            <div class="d-flex mt-1">
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border: 1px solid #f26419;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <span class="mx-1 text-green">4 به بالا</span>
                            </div>
                          </label>
                        </div>

                        <!-- 3 امتیاز -->
                        <div class="form-check mt-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="rate"
                            :value="3"
                            v-model="rate"
                          />
                          <label class="form-check-label">
                            <div class="d-flex mt-1">
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border: 1px solid #f26419;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border: 1px solid #f26419;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <span class="mx-1 text-green">3 به بالا</span>
                            </div>
                          </label>
                        </div>

                        <!-- 2 امتیاز -->
                        <div class="form-check mt-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="rate"
                            :value="2"
                            v-model="rate"
                          />
                          <label class="form-check-label">
                            <div class="d-flex mt-1">
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border: 1px solid #f26419;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border: 1px solid #f26419;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border: 1px solid #f26419;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <span class="mx-1 text-green">2 به بالا</span>
                            </div>
                          </label>
                        </div>

                        <!-- 1 امتیاز -->
                        <div class="form-check mt-2">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="rate"
                            :value="1"
                            v-model="rate"
                          />
                          <label class="form-check-label">
                            <div class="d-flex mt-1">
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border: 1px solid #f26419;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border: 1px solid #f26419;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border: 1px solid #f26419;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border: 1px solid #f26419;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="ms-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  background-color: #f26419 !important;
                                  border-radius: 50%;
                                "
                              ></div>
                              <span class="mx-1 text-green">۱ به بالا</span>
                            </div>
                          </label>
                        </div>
                      </div>
                      <button
                        v-if="rate !== null"
                        class="btn btn-sm btn-outline-danger ms-2"
                        @click="clearRate"
                      >
                        حذف امتیاز
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="row mt-5">
                <div class="col-12 mt-4">
                  <div class="card p-3 w-100">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-12">
                          <h5>لورم ایپسوم متن ساختگی</h5>
                          <p>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
                            و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
                            لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                            باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                            آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
                            نرم افزارها شناخت بیشتری را برای طراحان رایانه ای
                            علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی
                            ایجاد کرد. در این صورت می توان امید داشت که تمام و
                            دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به
                            پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای
                            اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                            اساسا مورد استفاده قرار گیرد.
                          </p>
                        </div>
                        <div class="col-12 mt-4">
                          <h5>لورم ایپسوم متن ساختگی</h5>
                          <p>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
                            و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
                            لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                            باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                            آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
                            نرم افزارها شناخت بیشتری را برای طراحان رایانه ای
                            علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی
                            ایجاد کرد. در این صورت می توان امید داشت که تمام و
                            دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به
                            پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای
                            اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                            اساسا مورد استفاده قرار گیرد.
                          </p>
                        </div>
                        <div class="col-12 mt-4">
                          <h5>لورم ایپسوم متن ساختگی</h5>
                          <p>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از
                            صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها
                            و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که
                            لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و
                            کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
                            باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و
                            آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
                            نرم افزارها شناخت بیشتری را برای طراحان رایانه ای
                            علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی
                            ایجاد کرد. در این صورت می توان امید داشت که تمام و
                            دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به
                            پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای
                            اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
                            اساسا مورد استفاده قرار گیرد.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="row mt-5">
                    <div class="col-lg-12">
                      <h5 class="text-black" style="font-weight: bold">
                        هتل های پیشنهادی
                      </h5>
                    </div>

                    <!-- <div class="col-lg-12">
                      <div class="row">
                        <div
                          v-for="(item, index) in dataListsSix
                            .reverse()
                            ?.slice(0, 4)"
                          :key="index + 'list-hotel'"
                          class="col-lg-6 col-12 mt-2"
                        >
                          <div class="row">
                            <div class="col-12 mt-3">
                              <div
                                class="card w-100 p-3 hover-card"
                                style="
                                  border-radius: 10px;
                                  box-shadow: 0 3px 4.75px 0.25px
                                    rgba(24, 23, 24, 0.03);
                                "
                              >
                                <div class="row">
                                  <div class="col-lg-4 col-12">
                                    <img
                                      :src="item.image"
                                      class="d-block w-100"
                                      style="height: 10rem; border-radius: 10px"
                                      alt="..."
                                    />
                                  </div>
                                  <div class="col-lg-8 col-12">
                                    <div class="row">
                                      <div class="col-12">
                                        <div class="row">
                                          <div class="col-lg-8 col-12">
                                            <h5
                                              class="text-right mt-2"
                                              style="font-weight: bold"
                                            >
                                              {{ item.title }}
                                            </h5>

                                            <h6 class="text-right mt-3">
                                              <i class="fi fi-rr-marker"></i>
                                              {{ item.province.title }}
                                            </h6>
                                          </div>
                                          <div class="col-lg-4 col-12">
                                            <div class="row">
                                              <div class="col-12 mt-2">
                                                <p class="text-center">
                                                  شروع قیمت از
                                                </p>
                                                <p
                                                  class="text-center text-orange"
                                                  style="font-weight: bold"
                                                >
                                                  40،444،000
                                                  <span class="text-black"
                                                    >تومان</span
                                                  >
                                                </p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-12">
              <div class="card p-3 w-100" style="border-radius: 10px">
                <div class="card-body">
                  <div class="row">
                    <div class="col-12 col-lg-8">
                      <div class="row">
                        <div class="col-12">
                          <h4 style="font-weight: bold">سوالات متداول</h4>
                        </div>

                        <div class="col-12 mt-3">
                          <div class="accordion mt-3" id="accordionExample">
                            <div
                              class="accordion-item"
                              v-for="(item, index) in faqs"
                              :key="item.id"
                            >
                              <h2 class="accordion-header">
                                <button
                                  class="accordion-button"
                                  :class="{ collapsed: index !== 0 }"
                                  data-bs-toggle="collapse"
                                  :data-bs-target="'#faq' + item.id"
                                >
                                  {{ item.question }}
                                </button>
                              </h2>

                              <div
                                :id="'faq' + item.id"
                                class="accordion-collapse collapse"
                                :class="{ show: index === 0 }"
                                data-bs-parent="#accordionExample"
                              >
                                <div class="accordion-body">
                                  {{ item.answer }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-lg-4">
                      <img
                        src="/assets/images/19333426.jpg"
                        class="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { nextTick } from "vue";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Multiselect from "vue-multiselect";
const selectedProvinceId = ref(null); // ✅ خروجی نهایی (عدد فقط)

const selectedProvince = computed({
  get() {
    return (
      dataItemProvince.value.find(
        (item) => item.id === selectedProvinceId.value
      ) || null
    );
  },
  set(val) {
    selectedProvinceId.value = val ? Number(val.id) : null;
  },
});

// ✅ label نمایشی
const nameWithLang = ({ title }) => title;
definePageMeta({
  layout: "public",
});

useHead({
  title: "صفحه اصلی",
  meta: [{ name: "description", content: "این صفحه اصلی پروژه Nuxt 3 شماست" }],
});

// سرچ
const query = ref("");

const faqs = ref([]);
const loadingFaq = ref(false);
const dataItemProvince = ref([]);

// دیتا
const dataLists = ref([]);
const dataListsSix = ref([]);

const page = ref(1);
const perPage = 10;

const loading = ref(false);
const finished = ref(false);

const starFilter = ref(null);

const rate = ref(null);

// آدرس کامل API
const API_BASE = "https://api.doornica.ir/api/v1/frontend";

const fetchFaqs = async () => {
  const url = "https://api.doornica.ir/api/v1/faq";

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const axiosResponse = await axios.get(url, config);
    const serverResponse = axiosResponse.data.data;

    faqs.value = serverResponse;
  } catch (e) {
    return false;
  }
};

// =======================
//  Load Without Search
// =======================
const hasActiveFilters = computed(() => {
  return (
    Number.isInteger(starFilter.value) ||
    Number.isInteger(rate.value) ||
    Number.isInteger(selectedProvinceId.value)
  );
});

const buildFilterParams = () => {
  const params = {
    per_page: perPage,
    page: page.value,
  };

  if (Number.isInteger(starFilter.value)) {
    params.star = starFilter.value;
  }

  if (Number.isInteger(rate.value)) {
    params.min_comment_rating = rate.value;
  }

  if (Number.isInteger(selectedProvinceId.value)) {
    params.province_id = selectedProvinceId.value;
  }

  return params;
};

const loadMore = async () => {
  if (loading.value || finished.value) return;

  loading.value = true;

  try {
    const params = buildFilterParams();

    const response = await axios.get(`${API_BASE}/hotels`, { params });

    const newItems = response.data.data.data;
    const meta = response.data.data.meta;

    if (!newItems || newItems.length === 0) {
      finished.value = true;
      return;
    }

    dataLists.value.push(...newItems);

    if (meta.current_page < meta.last_page) {
      page.value++;
    } else {
      finished.value = true;
    }
  } catch (e) {
    console.log(e);
  }

  loading.value = false;
};

const clearRate = () => {
  rate.value = null;
};

const clearStar = () => {
  starFilter.value = null;
};

const clearProvince = () => {
  selectedProvinceId.value = null;
};

const getProvinces = async () => {
  const url = "https://api.doornica.ir/api/v1/admin/province/list";

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const axiosResponse = await axios.post(url, {}, config);
    const serverResponse = axiosResponse.data;
    dataItemProvince.value = serverResponse.data;
  } catch (e) {
    return false;
  }
};

// =======================
//  Search (بدون صفحه‌بندی)
// =======================
const getData = async () => {
  if (!query.value.trim()) {
    dataLists.value = [];
    page.value = 1;
    finished.value = false;
    loadMore();
    return;
  }

  loading.value = true;

  try {
    const response = await axios.get(
      `${API_BASE}/hotels/search?q=${query.value}`
    );

    dataLists.value = response.data.data;
    finished.value = true; // سرچ infinite ندارد
  } catch (e) {
    console.log(e);
  }

  loading.value = false;
};

const resetToDefault = async () => {
  dataLists.value = [];
  page.value = 1;
  finished.value = false;

  await nextTick();
  loadMore();
};

// =======================
//  Star Filter
// =======================
const applyStarFilter = () => {
  if (!starFilter.value) {
    resetToDefault();
    return;
  }
  loadByFilters();
};

const applyRateFilter = () => {
  if (!rate.value) {
    resetToDefault();
    return;
  }
  loadByFilters();
};

const loadByFilters = async () => {
  // ریست pagination
  dataLists.value = [];
  page.value = 1;
  finished.value = false;

  await nextTick();
  loadMore();
};

watch([starFilter, rate, selectedProvinceId], async () => {
  if (query.value.trim()) return;
  loading.value = false; // ✅ خیلی مهم
  dataLists.value = [];
  page.value = 1;
  finished.value = false;

  await nextTick();
  loadMore();
});

// =======================
//  Live Search
// =======================
let debounceTimer = null;

const handleSearch = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    getData();
  }, 300);
};

// =======================
//  Get Latest Six
// =======================
const getDataSix = async () => {
  try {
    const response = await axios.get(`${API_BASE}/hotels`);
    dataListsSix.value = response.data.data.data;
  } catch (e) {
    console.log(e);
  }
};

// =======================
//  Infinite Scroll
// =======================
const sentinel = ref(null);
let observer = null;
const selectedHotel = ref(null);

const openMapModal = (item) => {
  selectedHotel.value = item;
};
let map = null;

let marker = null;
const initMap = () => {
  if (!selectedHotel.value) return;

  const lat = Number(selectedHotel.value.latitude);
  const lng = Number(selectedHotel.value.longitude);

  map = L.map("hotelMap").setView([lat, lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  marker = L.marker([lat, lng]).addTo(map);
};

const updateMap = () => {
  if (!map || !selectedHotel.value) return;

  const lat = Number(selectedHotel.value.latitude);
  const lng = Number(selectedHotel.value.longitude);

  map.setView([lat, lng], 15);
  marker.setLatLng([lat, lng]);
};

onMounted(() => {
  fetchFaqs();
  getProvinces();
  // getDataSix();
  loadMore();

  observer = new IntersectionObserver((entries) => {
    if (
      entries[0].isIntersecting &&
      !loading.value &&
      !finished.value &&
      !query.value.trim()
    ) {
      loadMore();
    }
  });

  observer.observe(sentinel.value);

  const modalEl = document.getElementById("exampleModal");
  if (!modalEl) return;

  modalEl.addEventListener("shown.bs.modal", () => {
    if (!map) {
      initMap();
    } else {
      updateMap();
    }

    // مهم‌ترین خط برای جلوگیری از tile سفید
    setTimeout(() => {
      map.invalidateSize(true);
    }, 200);
  });
});

onBeforeUnmount(() => {
  if (observer && sentinel.value) observer.unobserve(sentinel.value);
});

// -----------------------------
const slugify = (text) => {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};
</script>


<style>
/* ===============================
   vue-multiselect – clean UI
================================ */

/* حذف Press enter to select */
.multiselect__option--highlight::after {
  display: none !important;
}

/* حذف Press enter to remove */
.multiselect__option--selected::after {
  display: none !important;
}

/* حذف Selected */
.multiselect__option--selected.multiselect__option--highlight::after {
  display: none !important;
}

/* -------------------------------
   Hover (سبز دلخواه)
-------------------------------- */
.multiselect__option--highlight {
  background: #16a34a !important;
  color: #fff !important;
}

/* -------------------------------
   Selected
-------------------------------- */
.multiselect__option--selected {
  background: #22c55e !important;
  color: #fff !important;
  font-weight: 500;
}

/* -------------------------------
   RTL کامل
-------------------------------- */
.multiselect,
.multiselect__content-wrapper,
.multiselect__content,
.multiselect__option,
.multiselect__single,
.multiselect__input,
.multiselect__placeholder {
  direction: rtl;
  text-align: right;
}

/* فلش select */
.multiselect__select {
  right: auto;
  left: 12px;
}
</style>



