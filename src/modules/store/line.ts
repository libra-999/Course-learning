import { defineStore } from "pinia";
import type { Activities } from "@/app/components/Card/Timeline.vue";


export const timelineStore = defineStore ("timeline", {
   state: () => ({
      activities: [] as Activities[],
   }),
   actions: {
      load() {
         const timelineStorage = localStorage.getItem ("timeline");
         if (timelineStorage != null) {
            this.activities = JSON.parse (timelineStorage);
         }
      },
      isSave(activity: Activities) {
         this.activities.push (activity);
         localStorage.setItem ("timeline", JSON.stringify (this.activities));
      },
      delete(id: number) {
         this.activities.splice (id, 1);
         localStorage.setItem ("timeline", JSON.stringify (this.activities));
      },
   },
});
