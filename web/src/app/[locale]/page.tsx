"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import HotelCard from "@/components/hotelCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BookingSearch } from "@/components/home/booking-search";
import { useRouter } from "next/navigation";

const images = [
  "/images/Istanbul.jpg",
  "/images/Pariss.jpg",
  "/images/London.jpg",
  "/images/Burano.jpg",
];

export default function HomePage() {
  const t = useTranslations("HomePage");
  const router = useRouter();

  const handleSearch = () => {
    // BookingSearch component'i kendi validation'ını yapacak ve store'a kaydetecek
    // Başarılı olursa categories sayfasına yönlendir
    router.push(`/categories`);
  };



  const categories = [
    { name: t("categoryDaire"), label: "Daire", icon: "/icons/daire.svg" },
    { name: t("categoryHotel"), label: "Hotel", icon: "/icons/otel.svg" },
    { name: t("categoryVilla"), label: "Villa", icon: "/icons/villa.svg" },
    {
      name: t("categoryBungalow"),
      label: "Bungalov",
      icon: "/icons/bungalov.svg",
    },
    { name: t("categoryRoom"), label: "Oda", icon: "/icons/oda.svg" },
    {
      name: t("categoryCountryHouse"),
      label: "Tatil Köyü",
      icon: "/icons/tatilköyü.svg",
    },
    {
      name: t("categoryPension"),
      label: "Pansiyon",
      icon: "/icons/pansiyon.svg",
    },
    { name: t("categoryCamp"), label: "Kamp", icon: "/icons/kamp.svg" },
  ];

  const destinations = [
    { name: t("destinationParis"), image: "/images/paris.jpg" },
    { name: t("destinationMarrakech"), image: "/images/marakes.jpg" },
    { name: t("destinationRome"), image: "/images/roma.jpg" },
    { name: t("destinationIzmir"), image: "/images/izmir.jpg" },
    { name: t("destinationBarcelona"), image: "/images/barselona.jpg" },
    { name: t("destinationAntalya"), image: "/images/antalya.jpg" },
  ];

  const specialOffers = [
    {
      id: 1,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity1.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 4,
    },
    {
      id: 2,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.3,
      price: "39.000 TL",
      image: "/images/opportunity2jpg.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 3,
    },
    {
      id: 3,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.2,
      price: "42.500 TL",
      image: "/images/opportunity3.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 5,
    },
    {
      id: 4,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.8,
      price: "47.800 TL",
      image: "/images/opportunity4.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 6,
    },
    {
      id: 5,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity5.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 4,
    },
    {
      id: 6,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity6.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 4,
    },
    {
      id: 7,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity7.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 4,
    },
    {
      id: 8,
      name: t("offerKiadDeluxeHotel"),
      location: t("offerMarmaris"),
      rating: 4.5,
      price: "40.290 TL",
      image: "/images/opportunity8.jpg",
      cancel: true,
      breakfast: true,
      parking: true,
      nights: 4,
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative w-full flex flex-col items-center overflow-hidden">
        <div
          className="absolute -top-6 left-0 w-full h-[380px] flex justify-center items-start pointer-events-none z-0 opacity-40 dark:opacity-30"
          style={{
            mask: "url('/images/map.svg') no-repeat center / cover",
            WebkitMask: "url('/images/map.svg') no-repeat center / cover",
            background: "linear-gradient(135deg, oklch(0.97 0.01 240) 0%, oklch(0.92 0.02 260) 100%)",
          }}
        />
        <div className="relative z-10 w-full flex flex-col items-center justify-center pt-10 sm:pt-12 md:pt-16 pb-6 sm:pb-8 px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-5 tracking-tight text-foreground">
            {t("heroHeading")}
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-2xl text-muted-foreground font-medium leading-relaxed">
            {t("heroSubheading")}
          </p>
        </div>

        <div className="relative w-full h-[42vh] sm:h-[52vh] md:h-[62vh] max-h-[520px] -mt-4 z-20 px-4">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 dark:ring-white/5"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="relative z-40 w-full max-w-5xl -mt-24 sm:-mt-20 md:-mt-24 px-4 mb-12 sm:mb-16">
          <BookingSearch handleSearch={handleSearch} />
        </div>

        {/* Categories Section */}
        <section className="w-full px-4 py-14 sm:py-16">
          <div className="flex flex-col items-center mb-10 md:mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-primary/70 mb-3 px-3 py-1 rounded-full bg-primary/8 border border-primary/15">
              {t("popularCategoriesHeading")}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
              {t("popularCategoriesSubheading")}
            </h2>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
            {categories.map((category, i) => {
              const palettes = [
                { grad: "from-blue-500/20 to-indigo-500/10 dark:from-blue-500/15 dark:to-indigo-500/8", icon: "bg-blue-500/20 group-hover:bg-blue-500/35", ring: "group-hover:border-blue-400/40" },
                { grad: "from-violet-500/20 to-purple-500/10 dark:from-violet-500/15 dark:to-purple-500/8", icon: "bg-violet-500/20 group-hover:bg-violet-500/35", ring: "group-hover:border-violet-400/40" },
                { grad: "from-emerald-500/20 to-green-500/10 dark:from-emerald-500/15 dark:to-green-500/8", icon: "bg-emerald-500/20 group-hover:bg-emerald-500/35", ring: "group-hover:border-emerald-400/40" },
                { grad: "from-amber-500/20 to-yellow-500/10 dark:from-amber-500/15 dark:to-yellow-500/8", icon: "bg-amber-500/20 group-hover:bg-amber-500/35", ring: "group-hover:border-amber-400/40" },
                { grad: "from-orange-500/20 to-red-400/10 dark:from-orange-500/15 dark:to-red-400/8", icon: "bg-orange-500/20 group-hover:bg-orange-500/35", ring: "group-hover:border-orange-400/40" },
                { grad: "from-teal-500/20 to-cyan-500/10 dark:from-teal-500/15 dark:to-cyan-500/8", icon: "bg-teal-500/20 group-hover:bg-teal-500/35", ring: "group-hover:border-teal-400/40" },
                { grad: "from-rose-500/20 to-pink-500/10 dark:from-rose-500/15 dark:to-pink-500/8", icon: "bg-rose-500/20 group-hover:bg-rose-500/35", ring: "group-hover:border-rose-400/40" },
                { grad: "from-lime-500/20 to-green-400/10 dark:from-lime-500/15 dark:to-green-400/8", icon: "bg-lime-500/20 group-hover:bg-lime-500/35", ring: "group-hover:border-lime-400/40" },
              ];
              const p = palettes[i % palettes.length];
              return (
                <div
                  key={category.name}
                  className={`group flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-br ${p.grad} border border-border/60 ${p.ring} shadow-sm cursor-pointer hover:shadow-lg hover:scale-[1.04] hover:-translate-y-0.5 transition-all duration-200`}
                >
                  <div className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${p.icon} transition-colors`}>
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={32}
                      height={32}
                      className="w-7 h-7 sm:w-8 sm:h-8 object-contain drop-shadow-sm"
                    />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-foreground text-center leading-tight">
                    {category.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Destinations Section */}
        <section className="w-full px-4 py-14 sm:py-16 border-t border-border/60">
          <div className="flex flex-col items-center mb-10 md:mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-primary/70 mb-3 px-3 py-1 rounded-full bg-primary/8 border border-primary/15">
              Popüler Destinasyonlar
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center">
              {t("destinationsHeading")}
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" style={{ gridTemplateRows: "220px 220px 160px" }}>
            {destinations.map((destination, i) => (
              <div
                key={destination.name}
                className={[
                  "relative overflow-hidden rounded-3xl cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-300",
                  i === 0 ? "row-span-2" : "",
                  i === 5 ? "col-span-2 lg:col-span-3" : "",
                ].join(" ")}
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                {/* Always-visible gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                {/* Top badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-white/90 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-2.5 py-1">
                    ✦ Öne Çıkan
                  </span>
                </div>
                {/* Bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                  <p className="text-white font-bold text-lg sm:text-xl drop-shadow-md leading-tight">
                    {destination.name}
                  </p>
                  <p className="text-white/70 text-xs sm:text-sm mt-0.5 flex items-center gap-1 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    Keşfet
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section className="w-full px-4 py-14 sm:py-16 border-t border-border/60">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t("specialOffers")}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {specialOffers.map((offer) => {
              const cancelText = offer.cancel
                ? "Ücretsiz iptal"
                : "İptal edilemez";
              const breakfastText = offer.breakfast
                ? "Kahvaltı dahil"
                : "Kahvaltı dahil değil";
              const parkingText = offer.parking
                ? "Otopark"
                : "Otopark bulunmamakta";

              return (
                <HotelCard
                  key={offer.id}
                  item={{
                    ...offer,
                    price: Number(
                      offer.price.replace(" TL", "").replace(".", "")
                    ), // Fiyatı number'a dönüştür
                    cancelText,
                    breakfastText,
                    parkingText,
                    isDiscounted: false, // Varsayılan değerler eklendi
                    checkIn: "12:00",
                    checkOut: "14:00",
                    ownerId: "",
                    isActive: true,
                  }}
                />
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
