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
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 md:mb-10 text-center md:text-left">
            {t("popularCategoriesHeading")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {categories.map((category) => (
              <div
                key={category.name}
                className="group flex items-center justify-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-card border border-border shadow-sm cursor-pointer hover:shadow-md hover:border-primary/20 hover:bg-accent/50 dark:hover:bg-accent/30 transition-all duration-200"
              >
                <div className="flex shrink-0 w-9 h-9 sm:w-10 sm:h-10 items-center justify-center rounded-xl bg-muted/80 group-hover:bg-primary/10 transition-colors">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={28}
                    height={28}
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  />
                </div>
                <span className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap truncate">
                  {category.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Destinations Section */}
        <section className="w-full px-4 py-14 sm:py-16 border-t border-border/60">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8 md:mb-10 text-center md:text-left">
            {t("destinationsHeading")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
            {destinations.map((destination) => (
              <div
                key={destination.name}
                className="group flex flex-col items-center gap-4 cursor-pointer"
              >
                <div className="relative w-36 h-44 sm:w-40 sm:h-56 rounded-2xl overflow-hidden shadow-lg ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 160px, 180px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-0 left-0 right-0 p-3 text-center text-sm font-semibold text-white drop-shadow-lg translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {destination.name}
                  </span>
                </div>
                <span className="text-base font-semibold text-foreground text-center group-hover:text-primary transition-colors">
                  {destination.name}
                </span>
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
