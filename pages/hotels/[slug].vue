<template>
  <div>
    <div class="modal fade" id="commentModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content p-4">
          <div class="modal-header">
            <h5 class="modal-title">ثبت نظر شما</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div class="modal-body">
            <!-- name -->
            <div class="mb-3">
              <label class="form-label">نام</label>
              <input
                v-model="form.name"
                class="form-control"
                placeholder="نام شما"
              />
            </div>

            <!-- comment -->
            <div class="mb-3">
              <label class="form-label">نظر شما</label>
              <textarea
                v-model="form.comment"
                class="form-control"
                rows="3"
                placeholder="نظر خود را بنویسید"
              ></textarea>
            </div>

            <!-- Ratings -->
            <div v-for="r in form.ratings" :key="r.title" class="mb-3">
              <div class="mb-1 fw-bold">
                {{ r.label }}
              </div>

              <span
                v-for="i in 5"
                :key="i"
                class="rating-star"
                :class="{ active: r.rate >= i }"
                @click="setRate(r.title, i)"
              >
                ★
              </span>

              <span class="ms-2 text-muted">
                {{ r.rate || "بدون امتیاز" }}
              </span>
            </div>
          </div>

          <div class="modal-footer">
            <button
              class="btn btn-primary"
              :disabled="submitting"
              @click="submitComment"
            >
              ثبت نظر
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="exampleModal"
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
            <div
              id="hotelMap"
              style="height: 350px; width: 100%"
              class="mt-4"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="container-fluid">
        <div class="container">
          <div class="row mt-5">
            <div class="col-12 mt-5">
              <div class="card w-100 p-3">
                <div class="row">
                  <div class="col-12">
                    <ClientOnly>
                      <Swiper
                        :slides-per-view="1"
                        :space-between="20"
                        :breakpoints="{
                          576: { slidesPerView: 1 },
                          768: { slidesPerView: 2 },
                          992: { slidesPerView: 3 },
                        }"
                        :pagination="{ clickable: true }"
                        :modules="modules"
                        class="mySwiper"
                      >
                        <SwiperSlide
                          v-for="(item, index) in hotel.images"
                          :key="index + 'list-hotel'"
                        >
                          <img :src="item.url" class="img-fluid" />
                        </SwiperSlide>

                        <SwiperSlide>
                          <img src="/assets/images/sq1.jpg" class="img-fluid" />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img src="/assets/images/sq1.jpg" class="img-fluid" />
                        </SwiperSlide>
                      </Swiper>
                    </ClientOnly>
                  </div>
                  <div class="col-12 mt-5">
                    <div class="row">
                      <div class="col-lg-3 col-12 mt-2">
                        <div class="row">
                          <div
                            class="col-12 d-flex justify-content-center my-2"
                          >
                            <img
                              src="/assets/images/hotel.png"
                              class="img-fluid"
                              style="height: 3rem"
                              alt=""
                            />
                          </div>
                          <div class="col-12 d-flex justify-content-center">
                            <span style="font-size: 0.8rem" class="text-muted"
                              >نام هتل
                            </span>
                          </div>
                          <div
                            class="col-12 mt-3 d-flex justify-content-center flex-column align-items-center"
                          >
                            <h4>
                              {{ hotel.title }}
                            </h4>
                            <h4>
                              {{ hotel.title_en }}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3 col-12 mt-2">
                        <div class="row">
                          <div
                            class="col-12 my-2 d-flex justify-content-center"
                          >
                            <img
                              src="/assets/images/good-feedback.png"
                              class="img-fluid"
                              style="height: 3rem"
                              alt=""
                            />
                          </div>
                          <div class="col-12 d-flex justify-content-center">
                            <span style="font-size: 0.8rem" class="text-muted"
                              >تعداد ستاره
                            </span>
                          </div>
                          <div
                            class="col-12 mt-3 d-flex justify-content-center"
                          >
                            <p
                              class="mb-0 text-orange"
                              style="font-size: 0.9rem"
                            >
                              <span v-if="hotel.star == 0"> (بدون ستاره) </span>
                              <span v-if="hotel.star == 1">
                                <img
                                  src="/assets/images/starone.png"
                                  class="img-fluid"
                                  style="height: 1rem"
                                  alt=""
                                />

                                (1 ستاره)
                              </span>
                              <span v-if="hotel.star == 2">
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
                              <span v-if="hotel.star == 3">
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
                              <span v-if="hotel.star == 4">
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
                              <span v-if="hotel.star == 5">
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
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3 col-12 mt-2">
                        <div class="row">
                          <div
                            class="col-12 my-2 d-flex justify-content-center"
                          >
                            <img
                              src="/assets/images/placeholder.png"
                              class="img-fluid"
                              style="height: 3rem"
                              alt=""
                            />
                          </div>
                          <div class="col-12 d-flex justify-content-center">
                            <span style="font-size: 0.8rem" class="text-muted"
                              >موقعیت
                            </span>
                          </div>
                          <div
                            class="col-12 mt-3 d-flex justify-content-center"
                          >
                            <h4>
                              {{ hotel?.province?.title_en }}
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-3 col-12 mt-2">
                        <div class="row">
                          <div
                            class="col-12 my-2 d-flex justify-content-center"
                          >
                            <img
                              src="/assets/images/treasure-map.png"
                              class="img-fluid"
                              style="height: 3rem"
                              alt=""
                            />
                          </div>
                          <div class="col-12 d-flex justify-content-center">
                            <span style="font-size: 0.8rem" class="text-muted">
                              موقعیت مکانی
                            </span>
                          </div>
                          <div
                            class="col-12 mt-3 d-flex justify-content-center flex-column align-items-center"
                          >
                            <button
                              type="button"
                              class="btn bg-orange text-white"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              مشاهده روی نقشه
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 mt-5">
                    <div class="row">
                      <div class="col-lg-6 col-12 mt-2">
                        <h6 class="text-center">آدرس : تست تست تست</h6>
                      </div>

                      <div class="col-lg-6 col-12 mt-2">
                        <h6 class="text-center">
                          افراد نمره
                          <span class="text-orange" style="font-weight: bold"
                            >{{ hotel.rating }} از 5</span
                          >
                          را به این هتل دادند
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 mt-5">
                    <h6 class="text-right" style="font-weight: bold">
                      توضیحات
                    </h6>
                    {{ hotel.description }}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mt-5">
              <div class="card p-3 w-100">
                <div class="row">
                  <div class="col-12">
                    <h5 class="text-center">
                      تور های هتل
                      {{ hotel.title }}
                    </h5>
                  </div>

                  <div
                    v-for="(item, index) in hotel.related_tours"
                    :key="index + 'list-hotel'"
                    class="col-12 mt-2"
                  >
                    <div class="row">
                      <div class="col-12">
                        <div class="card p-3 w-100">
                          <div class="row">
                            <div class="col-lg-3 col-12">
                              <img
                                :src="item.image"
                                class="img-fluid"
                                style="height: 15rem"
                                alt=""
                              />
                            </div>
                            <div class="col-lg-9 col-12">
                              <div class="row">
                                <div class="col-lg-6 col-12">
                                  <div class="row">
                                    <div class="col-12 mt-4">
                                      <h5 style="font-weight: bold">
                                        {{ item.title }}
                                      </h5>
                                      <h6
                                        class="text-muted mt-3"
                                        style="font-weight: bold"
                                      >
                                        {{ item.en_title }}
                                      </h6>
                                      <div class="d-flex">
                                        <h6 class="text-muted mt-3 ms-3">
                                          کد :
                                        </h6>
                                        <h6 class="text-black mt-3">
                                          {{ item.code }}
                                        </h6>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-lg-6 col-12">
                                  <div class="row">
                                    <div class="col-12 mt-4">
                                      <h5 style="font-weight: bold">
                                        شروع قیمت :
                                      </h5>

                                      <div v-if="item.off_price">
                                        <del
                                          ><h6>
                                            {{ item.starting_price }}
                                          </h6></del
                                        >

                                        <h6
                                          class="text-orange mt-3"
                                          style="font-weight: bold"
                                        >
                                          {{
                                            item.starting_price - item.off_price
                                          }}
                                          تومان
                                        </h6>
                                      </div>

                                      <h6
                                        class="text-orange mt-3"
                                        style="font-weight: bold"
                                      >
                                        {{ item.starting_price }} تومان
                                      </h6>
                                      <div
                                        class="d-flex justify-content-end mt-4"
                                      >
                                        <button
                                          class="btn text-white bg-orange"
                                        >
                                          مشاهده
                                        </button>
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
                  <div class="col-12 mt-4">
                    <p class="text-muted text-center">موردی یافت نشد !</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 mt-5">
              <div class="card p-3 w-100">
                <div class="row">
                  <div class="col-12">
                    <h5 class="text-center">
                      امکانات هتل
                      {{ hotel.title }}
                    </h5>
                  </div>

                  <div class="col-12 mt-4">
                    <span
                      class="badge bg-orange rounded-pill mx-2 p-2 text-black"
                      style=""
                      ><i class="fi fi-rr-wifi"></i> وای فای
                    </span>
                    <span
                      class="badge bg-orange rounded-pill mx-2 p-2 text-black"
                      style="background-color: lightgray"
                      ><i class="fi fi-rr-hot-tub"></i> جکوزی
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 mt-5">
              <div class="card p-3 w-100">
                <div class="row">
                  <div class="col-12">
                    <h5 class="text-center">
                      نقد و بررسی
                      {{ hotel.title }}
                    </h5>
                  </div>

                  <div class="col-12 mt-4">
                    <div class="row">
                      <div
                        class="col-lg-4 col-12 mt-2 d-flex justify-content-center"
                      >
                        <div
                          class="d-flex justify-content-center align-items-center"
                          style="
                            width: 15rem;
                            height: 15rem;
                            border: 21px solid #f26419;
                            border-radius: 50%;
                          "
                        >
                          <h1
                            class="mb-0 text-orange"
                            style="font-weight: bold"
                          >
                            {{ hotel.average_rating }}
                          </h1>
                        </div>
                      </div>
                      <div
                        class="col-lg-4 col-12 mt-2 d-flex align-items-center"
                      >
                        <div class="row">
                          <!-- خیلی خوب -->
                          <div
                            v-if="
                              hotel?.average_rating > 4 &&
                              hotel?.average_rating < 4.5
                            "
                          >
                            <h3>خیلی خوب</h3>

                            <div class="d-flex">
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>

                              <div
                                class="mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                  border: 1px solid #f26419;
                                "
                              ></div>
                            </div>
                          </div>
                          <div v-if="hotel.average_rating >= 4.5">
                            <h3>عالی</h3>

                            <div class="d-flex">
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>
                            </div>
                          </div>
                          <div
                            v-if="
                              hotel.average_rating >= 3 &&
                              hotel.average_rating < 4
                            "
                          >
                            <h3>خوب</h3>

                            <div class="d-flex">
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>

                              <div
                                class="mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                  border: 1px solid #f26419;
                                "
                              ></div>
                              <div
                                class="mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                  border: 1px solid #f26419;
                                "
                              ></div>
                            </div>
                          </div>
                          <div
                            v-if="
                              hotel.average_rating >= 2 &&
                              hotel.average_rating < 3
                            "
                          >
                            <h3>متوسط</h3>

                            <div class="d-flex">
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>

                              <div
                                class="mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                  border: 1px solid #f26419;
                                "
                              ></div>
                              <div
                                class="mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                  border: 1px solid #f26419;
                                "
                              ></div>
                              <div
                                class="mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                  border: 1px solid #f26419;
                                "
                              ></div>
                            </div>
                          </div>
                          <div
                            v-if="
                              hotel.average_rating > 0 &&
                              hotel.average_rating < 2
                            "
                          >
                            <h3>ضعیف</h3>

                            <div class="d-flex">
                              <div
                                class="bg-orange mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                "
                              ></div>

                              <div
                                class="mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                  border: 1px solid #f26419;
                                "
                              ></div>
                              <div
                                class="mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                  border: 1px solid #f26419;
                                "
                              ></div>
                              <div
                                class="mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                  border: 1px solid #f26419;
                                "
                              ></div>
                              <div
                                class="mx-1"
                                style="
                                  width: 1rem;
                                  height: 1rem;
                                  border-radius: 50%;
                                  border: 1px solid #f26419;
                                "
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-lg-4 col-12 mt-2">
                        <div class="row">
                          <!-- تعریف لیست برای نمایش راحت‌تر -->
                          <div
                            v-for="(label, key) in {
                              food: 'کیفیت غذا',
                              clean: 'نظافت',
                              personel: 'عملکرد کارکنان',
                              entertaiment: 'تفریحات',
                            }"
                            :key="key"
                            class="col-12 mt-3"
                          >
                            <div class="row">
                              <div class="col-6">
                                <h6 class="text-right">{{ label }}</h6>
                              </div>
                              <div
                                class="col-6 d-flex flex-row-reverse justify-content-end"
                              >
                                <!-- نمایش ۵ دایره -->
                                <div
                                  v-for="i in 5"
                                  :key="i"
                                  class="mx-1"
                                  :class="
                                    i <= averageRatings[key] ? 'bg-orange' : ''
                                  "
                                  :style="{
                                    width: '1rem',
                                    height: '1rem',
                                    borderRadius: '50%',
                                    border:
                                      i > averageRatings[key]
                                        ? '1px solid #f26419'
                                        : 'none',
                                    backgroundColor:
                                      i <= averageRatings[key]
                                        ? '#f26419'
                                        : 'transparent',
                                  }"
                                ></div>
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

            <div class="col-12 mt-5">
              <div class="card p-3 w-100">
                <div class="row">
                  <div class="col-12">
                    <h5 class="text-center">
                      نظرات کاربران درباره
                      {{ hotel.title }}
                    </h5>
                  </div>
                  <div class="col-12">
                    <button
                      class="btn bg-orange text-white"
                      @click="handleAddComment"
                    >
                      افزودن نظر
                    </button>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mt-4">
                    <!-- Loading -->
                    <div v-if="commentsLoading" class="mt-2">
                      در حال بارگذاری نظرات...
                    </div>

                    <!-- Error -->
                    <div v-else-if="commentsError" class="text-danger mt-2">
                      خطا در دریافت نظرات
                    </div>

                    <!-- Empty -->
                    <div v-else-if="!comments.length" class="mt-2">
                      هنوز نظری ثبت نشده است
                    </div>

                    <!-- List -->
                    <div v-else class="mt-3">
                      <div
                        v-for="comment in comments"
                        :key="comment.id"
                        class="border rounded p-3 mb-2"
                      >
                        <div class="d-flex justify-content-between mb-1">
                          <strong>{{
                            comment?.user?.name || "کاربر ناشناس"
                          }}</strong>

                          <div class="d-flex justify-content-center">
                            <span
                              style="
                                background-color: #f26419 !important;
                                border-radius: 5px;
                              "
                              class="p-2 text-white"
                              >{{ comment.rating }}</span
                            >
                            <div
                              v-for="i in 5"
                              :key="i"
                              class="mx-1 mt-3"
                              :style="{
                                width: '1rem',
                                height: '1rem',
                                borderRadius: '50%',
                                backgroundColor:
                                  i <= getFilledCount(comment.rating)
                                    ? '#f26419'
                                    : 'transparent',
                                border:
                                  i <= getFilledCount(comment.rating)
                                    ? 'none'
                                    : '1px solid #f26419',
                              }"
                            ></div>
                          </div>
                        </div>
                        <p
                          class="text-muted mt-1 my-2"
                          style="font-size: 0.9rem"
                        >
                          {{ comment?.created_at_human }}
                        </p>
                        <p class="mb-0">
                          {{ comment.comment }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 mt-4">
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
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import { useAuthStore } from "~/store/auth";
import { useRoute, useRouter } from "vue-router";
const { $toastSuccess, $toastError } = useNuxtApp();
import { ref, onMounted } from "vue";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Swiper Core Styles
import "swiper/css";
// import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Swiper Modules
import { Pagination } from "swiper/modules";

const modules = [Pagination];

const faqs = ref([]);
const loadingFaq = ref(false);

const router = useRouter();

const route = useRoute();

const comments = ref([]);
const commentsLoading = ref(false);
const commentsError = ref(false);

const circleStyle = (index, rating) => {
  const value = Number(rating) || 0;

  return {
    width: "1rem",
    height: "1rem",
    borderRadius: "50%",
    border: value >= index ? "none" : "1px solid #f26419",
    backgroundColor: value >= index ? "#f26419" : "transparent",
  };
};

const getFilledCount = (rating) => {
  return Math.floor(Number(rating) || 0);
};

// identifier همون slug صفحه‌ست
const loadHotelComments = async (hotelId) => {
  if (!hotelId) return;

  commentsLoading.value = true;
  try {
    const res = await axios.get(
      `https://api.doornica.ir/api/v1/comments/hotel/${hotelId}`
    );
    comments.value = res.data?.data.data || [];
  } catch (e) {
    console.error("Comments error:", e);
  } finally {
    commentsLoading.value = false;
  }
};

definePageMeta({
  layout: "public",
});

useHead({
  title: "صفحه اصلی",
  meta: [{ name: "description", content: "این صفحه اصلی پروژه Nuxt 3 شماست" }],
});

// آدرس کامل API
const API_BASE = "https://api.doornica.ir/api/v1/frontend";

const hotel = ref({});

const loadHotel = async () => {
  try {
    const identifier = route.params.slug;

    const res = await axios.get(`${API_BASE}/hotels/${identifier}`);
    hotel.value = res.data.data;

    // ✅ مهم: اینجا ID رو گرفتی
    await loadHotelComments(hotel.value.id);
  } catch (e) {
    console.error("Hotel error:", e);
  }
};
let map = null;

const initMap = () => {
  if (!hotel.value?.latitude || !hotel.value?.longitude) return;

  map = L.map("hotelMap").setView(
    [hotel.value.latitude, hotel.value.longitude],
    15
  );

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  L.marker([hotel.value.latitude, hotel.value.longitude]).addTo(map);
};

const validate = async () => {
  const auth = useAuthStore();
  const token = auth.tokken || localStorage.getItem("UserTokenWebsite");
  if (!token) return false;

  try {
    const { data } = await axios.get(
      "https://api.doornica.ir/api/v1/authenticate/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data?.status === "success";
  } catch {
    return false;
  }
};

const openCommentModal = () => {
  const el = document.getElementById("commentModal");
  if (!el) return;

  const modal = new bootstrap.Modal(el);
  modal.show();
};

const handleAddComment = async () => {
  const isLogin = await validate();

  if (isLogin) {
    // ✅ کاربر لاگین است → مودال باز شود
    openCommentModal();
    return;
  }

  // ❌ لاگین نیست → لاگین + برگشت
  router.push({
    path: "/login",
    query: {
      redirect: `${route.path}?openCommentModal=1`,
    },
  });
};

const submitting = ref(false);

const form = reactive({
  name: "",
  comment: "",
  ratings: [
    { title: "food", label: "کیفیت غذا", rate: 0 },
    { title: "clean", label: "نظافت", rate: 0 },
    { title: "personel", label: "رفتار کارکنان", rate: 0 },
    { title: "entertaiment", label: "تفریحات و امکانات هتل", rate: 0 },
  ],
});

const averageRatings = computed(() => {
  const summary = {
    food: 0,
    clean: 0,
    personel: 0,
    entertaiment: 0,
    count: comments.value.length,
  };

  if (summary.count === 0) return summary;

  comments.value.forEach((comment) => {
    comment.ratings.forEach((r) => {
      if (summary.hasOwnProperty(r.title)) {
        summary[r.title] += Number(r.rate);
      }
    });
  });

  // محاسبه میانگین نهایی (تقسیم جمع امتیازات بر تعداد نظرات)
  return {
    food: Math.round(summary.food / summary.count) || 0,
    clean: Math.round(summary.clean / summary.count) || 0,
    personel: Math.round(summary.personel / summary.count) || 0,
    entertaiment: Math.round(summary.entertaiment / summary.count) || 0,
  };
});

// ⭐ ست کردن امتیاز
const setRate = (title, rate) => {
  const item = form.ratings.find((r) => r.title === title);
  if (item) item.rate = Number(rate);
};

// ✅ بررسی اجباری بودن امتیازها
const validateRatings = () => {
  return form.ratings.every((r) => r.rate >= 1 && r.rate <= 5);
};

// ⭐ محاسبه میانگین
const overallRating = computed(() => {
  const sum = form.ratings.reduce((t, r) => t + r.rate, 0);
  return Number((sum / form.ratings.length).toFixed(1));
});

// ❌ بستن مودال
const closeCommentModal = () => {
  const el = document.getElementById("commentModal");
  if (!el) return;

  const modal = bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el);

  modal.hide();
};

// 🔄 ریست فرم
const resetForm = () => {
  form.name = "";
  form.comment = "";
  form.ratings.forEach((r) => (r.rate = 0));
};

// ✅ ثبت نظر
const submitComment = async () => {
  if (!validateRatings()) {
    $toastError("لطفاً به همه بخش‌ها امتیاز بدهید");

    return;
  }

  const auth = useAuthStore();
  const token = auth.tokken || localStorage.getItem("UserTokenWebsite");

  if (!token) return;

  submitting.value = true;

  const payload = {
    name: form.name.trim(),
    comment: form.comment.trim(),
    ratings: form.ratings.map((r) => ({
      title: r.title,
      rate: Number(r.rate),
    })),
    // rating: overallRating.value ← اگر API نهایی است، حذفش کن
  };

  try {
    await axios.post(
      `https://api.doornica.ir/api/v1/comments/hotel/${hotel.value.id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    closeCommentModal();
    resetForm();
    loadHotelComments(hotel.value.id);
  } catch (err) {
    console.error(err);
    $toastError("مشکلی بوجود آمده");
  } finally {
    submitting.value = false;
  }
};

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

onMounted(async () => {
  await loadHotel();
  fetchFaqs();
  const modalEl = document.getElementById("exampleModal");
  modalEl.addEventListener("shown.bs.modal", () => {
    // 👇 اگر قبلاً ساخته نشده
    if (!map) {
      initMap();
    } else {
      // 👇 اگر ساخته شده
      setTimeout(() => {
        map.invalidateSize(true);
      }, 200);
    }
  });

  if (route.query.openCommentModal === "1") {
    setTimeout(() => {
      openCommentModal();

      // ✅ پاک کردن query بدون reload
      const q = { ...route.query };
      delete q.openCommentModal;

      router.replace({
        path: route.path,
        query: q,
      });
    }, 200);
  }

  // loadMap();
});
</script>

<style>
.rating-star {
  font-size: 26px;
  color: #ddd;
  cursor: pointer;
  margin-left: 4px;
}

.rating-star.active {
  color: #ffc107;
}

/* tes */
</style>

