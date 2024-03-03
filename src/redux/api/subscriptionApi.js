import { baseApi } from "./baseApi";
export const SUBSCRIPTION_URL = "/subscriptions";


export const subscriptionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllSubscription: build.query({
            query: (arg) => ({
                url: SUBSCRIPTION_URL,
                method: "GET",
                params: arg,
            }),
            transformResponse: (response) => {
                return {
                    exams: response,
                    meta: response.meta,
                };
            },
            providesTags: ["subscriptions"],
        }),
        addSubscription: build.mutation({
            query: (data) => ({
                url: SUBSCRIPTION_URL,
                method: "POST",
                data: data,
            }),
            invalidatesTags: ["subscriptions"],
        }),
        deleteSubscription: build.mutation({
            query: (id) => ({
                url: `${SUBSCRIPTION_URL}/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['subscriptions']
        })
    }),
});

export const { useGetAllSubscriptionQuery, useAddSubscriptionMutation, useDeleteSubscriptionMutation } = subscriptionApi;