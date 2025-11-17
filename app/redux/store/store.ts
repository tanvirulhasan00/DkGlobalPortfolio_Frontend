import { configureStore } from "@reduxjs/toolkit";
import leadershipReducer from "../features/leadershipSlice";
import companyInfoReducer from "../features/companyInfoSlice";
import blogReducer from "../features/blogSlice";
import ProfileImagesReducer from "../features/ProfileImageSlice";
import reportReducer from "../features/reportSlice";
import productReducer from "../features/productSlice";
import messageReducer from "../features/messageSlice";
import newsletterReducer from "../features/newsletterSlice";
import certificateReducer from "../features/certificateSlice";
import clientTestimonialReducer from "../features/clientTestimonialSlice";
import partnerReducer from "../features/partnerSlice";
export const store = configureStore({
  reducer: {
    leader: leadershipReducer,
    companyInfo: companyInfoReducer,
    blog: blogReducer,
    profile_images: ProfileImagesReducer,
    report: reportReducer,
    product: productReducer,
    message: messageReducer,
    newsletter: newsletterReducer,
    certificate: certificateReducer,
    clientTestimonial: clientTestimonialReducer,
    partner: partnerReducer,
  },
});
// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
