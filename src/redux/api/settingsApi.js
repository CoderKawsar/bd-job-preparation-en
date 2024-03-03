import { baseApi } from "./baseApi";

export const SETTINGS_URL = "/settings";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSettings: build.query({
      query: (arg) => ({
        url: SETTINGS_URL,
        method: "GET",
        params: arg,
      }),
      transformResponse: (response, meta) => {
        return {
          settings: response,
          meta,
        };
      },
      providesTags: ["settings"],
    }),
    addSettings: build.mutation({
      query: (data) => ({
        url: SETTINGS_URL,
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["settings"],
    }),
    getShipppingChargeInsideDhaka: build.query({
      query: () => ({
        url: `${SETTINGS_URL}/shipping-charge-inside-dhaka`,
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    getShipppingChargeOutsideDhaka: build.query({
      query: () => ({
        url: `${SETTINGS_URL}/shipping-charge-outside-dhaka`,
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    deleteSettings: build.mutation({
      query: (settings_id) => ({
        url: `${SETTINGS_URL}/${settings_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["settings"],
    }),
  }),
});

export const {
  useAddSettingsMutation,
  useGetShipppingChargeInsideDhakaQuery,
  useGetShipppingChargeOutsideDhakaQuery,
  useGetAllSettingsQuery,
  useDeleteSettingsMutation,
} = settingsApi;
