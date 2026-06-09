import { createI18n, useI18n } from "vue-i18n";

import { computed } from "vue";
import en from "@/modules/locales/en.ts";
import ch from "@/modules/locales/ch.ts";
import kh from "@/modules/locales/kh";
import { en as epEn, km as epKh, zhCn as epZhCn, } from "element-plus/es/locales.mjs";


export const Locale = {
   EN: "en",
   CH: "ch",
   KH: "kh",
} as const;

export type LocaleType = (typeof Locale)[keyof typeof Locale];

const localeKey = localStorage.getItem ("localization") || Locale.EN;
const i18n = createI18n ({
   legacy: false, // must not change to true , vue 3 didn't support
   locale: localeKey,
   fallbackLocale: "en",
   allowComposition: true,
   messages: {
      en,
      ch,
      kh,
   },
});

export const locales: { label: string; value: LocaleType; code: string }[] = [
   {label: "English", value: "en", code: "en-US"},
   {label: "中文", value: "ch", code: "zh-CN"},
   {label: "ខ្មែរ", value: "kh", code: "km-KH"},
];

// map locale i18n to element i18n
export const elementPlusLocaleMap: Record<LocaleType, any> = {
   en: epEn,
   ch: epZhCn,
   kh: epKh,
};

export const useLocale = () => {
   const i18n = useI18n ();
   const currentLocale = computed (() => i18n.locale.value);
   
   // label display i18n in locale
   const currentLabel = computed (() => {
      const match = locales.find (
          (locales) => locales.value === currentLocale.value,
      );
      return match?.label || "English";
   });
   
   // value i18n in locale
   const currentValue = computed ((): LocaleType => {
      const match = locales.find (
          (locales) => locales.value === currentLocale.value,
      );
      return match?.value || "en";
   });
   
   // code i18n in locale
   const currentCode = computed (() => {
      const match = locales.find (
          (locales) => locales.value === currentLocale.value,
      );
      return match?.code || "en-US";
   });
   
   // i18n change header
   const changeLocale = (locale: LocaleType) => {
      if (i18n.locale.value !== locale) {
         i18n.locale.value = locale;
         localStorage.setItem ("localization", locale);
      }
   };
   
   // modify element i18n base on locale i18n
   const elementPlusLocale = computed (() => {
      return elementPlusLocaleMap[currentValue.value];
   });
   return {
      currentLocale,
      currentLabel,
      currentValue,
      currentCode,
      changeLocale,
      elementPlusLocale,
   };
};

export default i18n;
