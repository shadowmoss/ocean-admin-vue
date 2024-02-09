import {defineStore} from 'pinia';
import {store} from "@/store/index";
import { RouteLocationNormalizedLoaded } from 'vue-router';

interface TagsViewRecord{
    visitedViews:RouteLocationNormalizedLoaded[]    // 
}

export const useTagsViewStore = defineStore("tagsViewStore",{
    state:():TagsViewRecord=>{
        return {
            visitedViews:[]
        }
    },
    getters:{
        getVisitedViews():RouteLocationNormalizedLoaded[]{
            return this.visitedViews;
        }
    },
    actions:{
        addVisitedViews(route:RouteLocationNormalizedLoaded){
            if(this.visitedViews.some((item)=>item.name === route.name)){
                return;
            }
            this.visitedViews.push(route);
        }
    }
});